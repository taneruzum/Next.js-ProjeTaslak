import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function checkAuthMiddleware(req: NextRequest) {
  const token = req.cookies.get("TOKEN_NAME")?.value;
  const { pathname } = req.nextUrl;

  // Login olmuş kullanıcı /login'e giremez
  if (pathname === "/login" && token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/admin", req.url));
    } catch {
      // token geçersiz → login açık kalsın
    }
  }

  // Admin koruması
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}