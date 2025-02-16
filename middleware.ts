import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth-related public routes
const authRoutes = ["/sign-in", "/sign-up", "/admin/sign-in"];

const protectedRoutes = ["/admin/", "/profile/"];
// others are public routes

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isAuthenticated = !!request.cookies.get("authUser");

    const isAdmin = !!request.cookies.get("adminData");

    if (
        isAuthenticated &&
        (pathname.includes("/sign-in") || pathname.includes("/sign-up")) &&
        !pathname.startsWith("/admin")
    ) {
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
    }

    if (
        isAdmin &&
        pathname.includes("/admin/sign-in") &&
        pathname.startsWith("/admin")
    ) {
        const adminUrl = new URL("/admin/dashboard", request.url);
        return NextResponse.redirect(adminUrl);
    }

    if (
        !isAuthenticated &&
        !(pathname.startsWith("/sign-in") || pathname.startsWith("sign-up")) &&
        pathname.startsWith("/profile")
    ) {
        const signInUrl = new URL("/sign-in", request.url);
        return NextResponse.redirect(signInUrl);
    }

    if (
        !isAdmin &&
        !pathname.startsWith("/admin/sign-in") &&
        pathname.startsWith("/admin")
    ) {
        console.log("Protected route");
        const signInUrl = new URL("/admin/sign-in", request.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
        "/admin/:path*",
        "/profile/:path*",
    ],
};
