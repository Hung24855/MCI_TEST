import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token");

    const isLoginPage = req.nextUrl.pathname === "/dang-nhap";
    const isAuthenticated = !!token;

    if (isAuthenticated && isLoginPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isAuthenticated && !isLoginPage) {
        return NextResponse.redirect(new URL("/dang-nhap", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dang-nhap", "/"]
};
