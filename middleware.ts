import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "~/lib/auth";
import { useSessionStore } from "~/store/sessionStore";

// Simplified route structure
const publicRoutes = [
  "/",
  "/:id",
  "/create",
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/forgot-password",
];

const managementRoutes = [
  "/management",
  "/management/bookings",
  "/management/users",
  "/management/equipment",
];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // Check if the request path matches any of the defined routes
  const isPublicRoute = publicRoutes.includes(pathName);
  const isDynamicAccessRoute = /^\/access\/[^\/]+$/.test(pathName);
  const isManagementRoute =
    managementRoutes.includes(pathName) || isDynamicAccessRoute;

  console.log(
    "Path:",
    pathName,
    "isPublic:",
    isPublicRoute,
    "isManagement:",
    isManagementRoute,
  );

  let session: Session | null = null;
  try {
    const response = await betterFetch<Session>("/api/auth/get-session", {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: { cookie: request.headers.get("cookie") || "" },
    });

    session = response?.data || null;

    if (session?.user) {
      useSessionStore.setState({
        user: {
          id: session.user.id,
          name: session.user.name,
          role: session.user.role,
        },
      });
    }
  } catch (error) {
    console.error("Failed to fetch session:", error);
  }

  // If no session (unauthenticated)
  if (!session) {
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If authenticated, restrict access based on role
  const { role } = session.user;

  // Only admins can access management routes
  if (role === "admin") {
    return NextResponse.next();
  }

  // Regular users can only access public routes
  if (role === "user") {
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default: Redirect unauthorized access to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
