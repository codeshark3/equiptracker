import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "~/lib/auth";

// Define route categories
const publicRoutes = ["/"];
const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const staffRoutes = ["/staff"];
const adminRoutes = ["/admin"];
const userRoutes = ["/user"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathName);
  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isStaffRoute = staffRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);
  const isUserRoute = userRoutes.includes(pathName);

  // Fetch session from API
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // If no session (unauthenticated)
  if (!session) {
    // Allow access to public, auth, and password routes
    if (isPublicRoute || isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }
    // Redirect all other requests to "/sign-in"
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If authenticated, restrict access based on role
  const userRole = session.user.role;

  // Staff can access public and staff routes only
  if (userRole === "staff") {
    if (isPublicRoute || isStaffRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/staff", request.url));
  }

  // Admin can access public and admin routes only
  if (userRole === "admin") {
    if (isPublicRoute || isAdminRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Users can access public and user routes only
  if (userRole === "user") {
    if (isPublicRoute || isUserRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // Default: Redirect unauthorized access to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// import { betterFetch } from "@better-fetch/fetch";
// import { NextResponse, type NextRequest } from "next/server";
// import type { Session } from "~/lib/auth";

// const authRoutes = ["/sign-in", "/sign-up"];
// const passwordRoutes = ["/reset-password", "/forgot-password"];
// const adminRoutes = ["/admin"];
// const staffRoutes = ["/staff"];
// const userRoutes = ["/user"];

// export default async function authMiddleware(request: NextRequest) {
//   const pathName = request.nextUrl.pathname;
//   const isAuthRoute = authRoutes.includes(pathName);
//   const isPasswordRoute = passwordRoutes.includes(pathName);
//   const isAdminRoute = adminRoutes.includes(pathName);
//   const isStaffRoute = staffRoutes.includes(pathName);
//   const isUserRoute = userRoutes.includes(pathName);

//   const { data: session } = await betterFetch<Session>(
//     "/api/auth/get-session",
//     {
//       baseURL: process.env.BETTER_AUTH_URL,
//       headers: {
//         //get the cookie from the request
//         cookie: request.headers.get("cookie") || "",
//       },
//     },
//   );

//   if (!session) {
//     if (isAuthRoute || isPasswordRoute) {
//       return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (isAuthRoute || isPasswordRoute) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (isAdminRoute && session.user.role !== "admin") {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (isStaffRoute && session.user.role !== "staff") {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (isUserRoute && session.user.role !== "user") {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
