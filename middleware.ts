
import { auth } from "@/lib/auth";

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  // Protected routes that require authentication
  const adminRoutes = ["/admin"];
  const staffRoutes = ["/staff"];
  const customerRoutes = ["/customer", "/orders", "/cart", "/wishlist"];
  const publicGuestRoutes = ["/guest"];

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isStaffRoute = staffRoutes.some((route) => pathname.startsWith(route));
  const isCustomerRoute = customerRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicGuestRoute = publicGuestRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const protectedRoutes = [
    ...adminRoutes,
    ...staffRoutes,
    ...customerRoutes,
    ...publicGuestRoutes,
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check authentication
  if (isProtected && !req.auth) {
    return Response.redirect(new URL("/guest/auth/login", req.url));
  }

  // Role-based access control
  if (req.auth && req.auth.user) {
    const userRole = req.auth.user.role;

    // Admin routes - only admin can access
    if (isAdminRoute) {
      if (userRole !== "admin") {
        if (userRole === "staff") {
          return Response.redirect(new URL("/staff/dashboard", req.url));
        } else if (userRole === "customer") {
          return Response.redirect(new URL("/customer/dashboard", req.url));
        } else {
          return Response.redirect(new URL("/guest/auth/login", req.url));
        }
      }
      return null;
    }

    // Staff routes - only staff and admin can access
    if (isStaffRoute) {
      if (userRole !== "staff" && userRole !== "admin") {
        if (userRole === "customer") {
          return Response.redirect(new URL("/customer/dashboard", req.url));
        } else {
          return Response.redirect(new URL("/guest/auth/login", req.url));
        }
      }
      return null;
    }

    // Customer routes - only customer can access
    if (isCustomerRoute) {
      if (userRole !== "customer") {
        if (userRole === "admin") {
          return Response.redirect(new URL("/admin/dashboard", req.url));
        } else if (userRole === "staff") {
          return Response.redirect(new URL("/staff/dashboard", req.url));
        } else {
          return Response.redirect(new URL("/guest/auth/login", req.url));
        }
      }
      return null;
    }

    // Guest routes
    if (isPublicGuestRoute) {
      // Allow guest routes for all authenticated users
      return null;
    }
  }

  return null;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
