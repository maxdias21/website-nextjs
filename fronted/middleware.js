import {NextResponse} from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

function parseJwt(token) {
    try {
        const payload = token.split(".")[1];
        const decode = atob(payload);

        return JSON.parse(decode);
    } catch {
        return null;
    }
}

export async function middleware(request) {
    const acess_token = request.cookies.get("access_token")?.value;
    const refresh_token = request.cookies.get("refresh_token")?.value;

    const {pathname} = request.nextUrl;
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);


    if (!acess_token && !refresh_token) {
        if (!isPublicRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }

    const refreshPayload = parseJwt(refresh_token);
    const refreshExpired = !refreshPayload || refreshPayload.exp * 1000 < Date.now();

    if (refreshExpired) {
        if(!isPublicRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }

    if (isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|django|.*\\...*).*)",
    ],
};
