import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const protectedApiPrefix = "/api/bookings";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  const { pathname } = request.nextUrl;

  // Protect admin pages
  if (protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    const loginUrl = new URL("/admin/login", request.url);

    // Allow access to the login page itself
    if (pathname === "/admin/login") {
      // If already logged in, redirect to admin dashboard
      if (session) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!session) {
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect GET and PATCH on bookings API
  if (pathname.startsWith(protectedApiPrefix)) {
    const method = request.method;
    if (method === "GET" || method === "PATCH") {
      if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/bookings/:path*"],
};
