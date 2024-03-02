import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export function middleware(req: any) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("AUTH_TOKEN");
    const url = new URL("/signin", req.nextUrl.origin);
    if (!token) {
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/:path*", "/playlist/:path*", "/library/:path*"],
};
