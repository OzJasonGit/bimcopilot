import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";
import { serialize } from "cookie";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const db = await connectToDatabase();
        const User = db.collection("users");

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return new NextResponse(
                JSON.stringify({ error: { message: "User does not exist" } }),
                { status: 404 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return new NextResponse(
                JSON.stringify({ error: { message: "Invalid Credentials" } }),
                { status: 401 }
            );
        }

        if (!process.env.JWT_SECRET) {
            return new NextResponse(
                JSON.stringify({ error: { message: "Server configuration error" } }),
                { status: 500 }
            );
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set HTTP-only cookie
        const cookie = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });

        // Return sanitized user data without password hash
        const { password: _, ...userWithoutPassword } = existingUser;
        const response = new NextResponse(
            JSON.stringify({ 
                result: {
                    _id: userWithoutPassword._id,
                    name: userWithoutPassword.name,
                    email: userWithoutPassword.email,
                    role: userWithoutPassword.role
                }
            }),
            { status: 200 }
        );
        response.headers.set("Set-Cookie", cookie);

        return response;
    } catch (error) {
        console.error("Error in /api/signin:", error);
        return new NextResponse(
            JSON.stringify({ error: { message: "Something went wrong" } }),
            { status: 500 }
        );
    }
}
