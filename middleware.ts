
import { auth } from "@/lib/auth";

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = [
    "/admin",
    "/profile",
    "/orders",
    "/cart",
    "/wishlist",
    "/notifications",
  ];


  // Check if route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !req.auth) {
    // Redirect to login
    return Response.redirect(new URL("/auth/login", req.url));
  }

  // Role-based access control for /admin and /profile
  if (req.auth && req.auth.user) {
    const userRole = req.auth.user.role;
    // If accessing /admin but not allowed
    if (pathname.startsWith("/admin")) {
      if (userRole === "admin" && !pathname.startsWith("/admin/dashboard")) {
        // Allow admin to access all /admin
        return null;
      }
      if (userRole === "staff" && !pathname.startsWith("/admin/staff")) {
        // Redirect staff to their dashboard
        return Response.redirect(new URL("/admin/staff", req.url));
      }
      if (userRole === "customer" || userRole === "guest") {
        // Redirect customer/guest to profile or login
        return Response.redirect(new URL("/profile", req.url));
      }
    }
    // If accessing /profile but not allowed
    if (pathname.startsWith("/profile") && userRole === "admin") {
      // Redirect admin to admin dashboard
      return Response.redirect(new URL("/admin/dashboard", req.url));
    }
    if (pathname.startsWith("/profile") && userRole === "staff") {
      // Redirect staff to staff dashboard
      return Response.redirect(new URL("/admin/staff", req.url));
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
