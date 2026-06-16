import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log('Middleware token::>', token)
  const pathname = request.nextUrl.pathname;
  console.log('request', request)


  // If already logged in and visiting login page
  
  // Visiting login page
  if (pathname === "/admin-login") {
    if (token) {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    return NextResponse.next();
  }

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin-login" &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/admin-login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/pos/:path*",
    "/admin-login",
  ],
};