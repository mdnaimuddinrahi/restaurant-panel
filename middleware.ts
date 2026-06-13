import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes
  const publicRoutes = ["/login"];

  // If not logged in and trying to access protected routes
  // if (!token && !publicRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // If already logged in and visiting login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/pos/:path*",
    "/login",
  ],
};