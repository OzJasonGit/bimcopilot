import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    // Try getting the token from cookies manually
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
        const user = jwt.decode(token);


        if (!user || user.role !== 1) { 
            return NextResponse.redirect(new URL("/", req.url));
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
