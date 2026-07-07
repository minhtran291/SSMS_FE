import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_FLAG_COOKIE_NAME = 'auth_flag';

export function proxy(request: NextRequest) {

    const hasAuthFlag = request.cookies.has(AUTH_FLAG_COOKIE_NAME);

    if (!hasAuthFlag) {
        const redirect = request.nextUrl.pathname + request.nextUrl.search;

        const loginUrl = new URL("/login", request.url);

        loginUrl.searchParams.set(
            "redirect",
            redirect
        );

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!$|login|callback|api|_next|favicon.ico).*)",
    ],
}