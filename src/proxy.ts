import { NextRequest, NextResponse } from "next/server";
import { checkAuthMiddleware } from "./middlewares/checkAuthMiddleware";

export function proxy(req: NextRequest) {
  const response = checkAuthMiddleware(req);

  if (response) return response;

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:path*", "/admin/:path*"],
};
