import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
    // Try getting the token from cookies manually
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
        console.log("[Middleware] No token found in cookies");
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (!process.env.JWT_SECRET) {
        console.error("[Middleware] JWT_SECRET environment variable is not set");
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
        // Verify the token signature using jose (Edge runtime compatible)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        
        console.log("[Middleware] Token decoded successfully. User ID:", payload.id, "Role from token:", payload.role);

        // Check role from token (database check should be done at API route level for Edge runtime)
        if (payload.role !== 1) {
            console.log("[Middleware] Access denied. User role is", payload.role, "but admin requires role 1");
            return NextResponse.redirect(new URL("/", req.url));
        }

        console.log("[Middleware] Admin access granted");
        return NextResponse.next();
    } catch (error) {
        if (error.code === "ERR_JWT_EXPIRED") {
            console.error("[Middleware] Token expired:", error.message);
        } else if (error.code === "ERR_JWT_INVALID") {
            console.error("[Middleware] Invalid token:", error.message);
        } else {
            console.error("[Middleware] Error verifying token:", error);
        }
        return NextResponse.redirect(new URL("/signin", req.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};
