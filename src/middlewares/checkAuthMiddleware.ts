import { NextRequest, NextResponse } from "next/server";

export function checkAuthMiddleware(
  req: NextRequest,
): NextResponse | undefined {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  //const adminToken = req.cookies.get("excury-admin-access")?.value;

  const isUserProtectedPage = pathname.startsWith("/user");
  const isAdminProtectedPage = pathname.startsWith("/admin");

  if (!token && isUserProtectedPage) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl.origin));
  }

  // if (!adminToken && isAdminProtectedPage) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  // }

  //   if (token && pathname === "/") {
  //     return NextResponse.redirect(
  //       new URL("/user/dashboard", req.nextUrl.origin),
  //     );
  //   }

  return undefined;
}
