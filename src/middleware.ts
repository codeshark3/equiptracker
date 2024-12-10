// import { betterFetch } from "@better-fetch/fetch";
// import { NextResponse, type NextRequest } from "next/server";
// import type { Session } from "~/lib/auth";
// interface Props {
//   params: {
//     id: string;
//   };
// }

// // Define route categories
// const publicRoutes = ["/", "/search", "/datasets"];
// const authRoutes = ["/sign-in", "/sign-up"];
// const passwordRoutes = ["/reset-password", "/forgot-password"];
// const staffRoutes = ["/staff"];
// const adminRoutes = [
//   "/admin",
//   "/admin/users",
//   "/admin/users/new",
//   "/admin/users/id",
// ];
// const customerRoutes = ["/customer"];

// export default async function authMiddleware(
//   request: NextRequest,
//   { params: { id } }: Props,
// ) {
//   const pathName = request.nextUrl.pathname;

//   const isPublicRoute = publicRoutes.includes(pathName);
//   const isAuthRoute = authRoutes.includes(pathName);
//   const isPasswordRoute = passwordRoutes.includes(pathName);
//   const isStaffRoute = staffRoutes.includes(pathName);
//   const isAdminRoute = adminRoutes.includes(pathName);
//   const iscustomerRoute = customerRoutes.includes(pathName);

//   // Fetch session from API
//   const { data: session } = await betterFetch<Session>(
//     "/api/auth/get-session",
//     {
//       baseURL: process.env.BETTER_AUTH_URL,
//       headers: {
//         cookie: request.headers.get("cookie") || "",
//       },
//     },
//   );

//   // If no session (unauthenticated)
//   if (!session) {
//     // Allow access to public, auth, and password routes
//     if (isPublicRoute || isAuthRoute || isPasswordRoute) {
//       return NextResponse.next();
//     }
//     // Redirect all other requests to "/sign-in"
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   // If authenticated, restrict access based on role
//   const customerRole = session.user.role;

//   // Staff can access public and staff routes only
//   if (customerRole === "staff") {
//     if (isPublicRoute || isStaffRoute) {
//       return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL("/staff", request.url));
//   }

//   // Admin can access public and admin routes only
//   if (customerRole === "admin") {
//     if (isPublicRoute || isAdminRoute) {
//       return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL("/admin", request.url));
//   }

//   // customers can access public and customer routes only
//   if (customerRole === "user") {
//     if (isPublicRoute || iscustomerRoute) {
//       return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL("/customer", request.url));
//   }

//   // Default: Redirect unauthorized access to home
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

// // import { betterFetch } from "@better-fetch/fetch";
// // import { NextResponse, type NextRequest } from "next/server";
// // import type { Session } from "~/lib/auth";

// // const authRoutes = ["/sign-in", "/sign-up"];
// // const passwordRoutes = ["/reset-password", "/forgot-password"];
// // const adminRoutes = ["/admin"];
// // const staffRoutes = ["/staff"];
// // const customerRoutes = ["/customer"];

// // export default async function authMiddleware(request: NextRequest) {
// //   const pathName = request.nextUrl.pathname;
// //   const isAuthRoute = authRoutes.includes(pathName);
// //   const isPasswordRoute = passwordRoutes.includes(pathName);
// //   const isAdminRoute = adminRoutes.includes(pathName);
// //   const isStaffRoute = staffRoutes.includes(pathName);
// //   const iscustomerRoute = customerRoutes.includes(pathName);

// //   const { data: session } = await betterFetch<Session>(
// //     "/api/auth/get-session",
// //     {
// //       baseURL: process.env.BETTER_AUTH_URL,
// //       headers: {
// //         //get the cookie from the request
// //         cookie: request.headers.get("cookie") || "",
// //       },
// //     },
// //   );

// //   if (!session) {
// //     if (isAuthRoute || isPasswordRoute) {
// //       return NextResponse.next();
// //     }
// //     return NextResponse.redirect(new URL("/sign-in", request.url));
// //   }

// //   if (isAuthRoute || isPasswordRoute) {
// //     return NextResponse.redirect(new URL("/", request.url));
// //   }

// //   if (isAdminRoute && session.customer.role !== "admin") {
// //     return NextResponse.redirect(new URL("/sign-in", request.url));
// //   }

// //   if (isStaffRoute && session.customer.role !== "staff") {
// //     return NextResponse.redirect(new URL("/sign-in", request.url));
// //   }

// //   if (iscustomerRoute && session.customer.role !== "customer") {
// //     return NextResponse.redirect(new URL("/sign-in", request.url));
// //   }
// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// // };
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "~/lib/auth";

// Type for route matching
const publicRoutes = ["/", "/search", "/datasets"];
const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const staffRoutes = ["/staff"];
const adminRoutes = [
  "/admin",
  "/admin/users",
  "/admin/users/new",
  "/admin/users/[id]",
];
const customerRoutes = ["/customer"];

interface Params {
  params: { id: string };
}

export default async function authMiddleware(
  request: NextRequest,
  { params }: Params,
) {
  const pathName = request.nextUrl.pathname;

  // Check if the request path matches any of the defined routes
  const isPublicRoute = publicRoutes.includes(pathName);
  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isStaffRoute = staffRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.some((route) => pathName.includes(route));
  const isCustomerRoute = customerRoutes.includes(pathName);

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
    if (isPublicRoute || isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If authenticated, restrict access based on role
  const { role } = session.user;

  // Staff can access public and staff routes only
  if (role === "staff") {
    if (isPublicRoute || isStaffRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/staff", request.url));
  }

  // Admin can access public and admin routes only
  if (role === "admin") {
    if (isPublicRoute || isAdminRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Customers can access public and customer routes only
  if (role === "user") {
    if (isPublicRoute || isCustomerRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  // Default: Redirect unauthorized access to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
