// /api/signup

import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const db = await connectToDatabase();
        const { firstName, lastName, email, password, confirmPassword } = await req.json();
        const User = db.collection("users");

        // Input validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return new NextResponse(
                JSON.stringify({ error: { message: "All fields are required" } }),
                { status: 400 }
            );
        }

        // Validate name length
        if (firstName.trim().length < 1 || firstName.trim().length > 50) {
            return new NextResponse(
                JSON.stringify({ error: { message: "First name must be between 1 and 50 characters" } }),
                { status: 400 }
            );
        }

        if (lastName.trim().length < 1 || lastName.trim().length > 50) {
            return new NextResponse(
                JSON.stringify({ error: { message: "Last name must be between 1 and 50 characters" } }),
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new NextResponse(
                JSON.stringify({ error: { message: "Invalid email format" } }),
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 8) {
            return new NextResponse(
                JSON.stringify({ error: { message: "Password must be at least 8 characters long" } }),
                { status: 400 }
            );
        }

        // Check for password complexity (at least one letter and one number)
        if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
            return new NextResponse(
                JSON.stringify({ error: { message: "Password must contain at least one letter and one number" } }),
                { status: 400 }
            );
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return new NextResponse(
                JSON.stringify({ error: { message: "Passwords do not match" } }),
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ error: { message: "User already exists" } }),
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const result = await User.insertOne({
            name: `${firstName.trim()} ${lastName.trim()}`,
            email: email.toLowerCase().trim(),
            role: 0,
            password: hashedPassword,
        });

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET environment variable is not set");
            return new NextResponse(
                JSON.stringify({ error: { message: "Server configuration error" } }),
                { status: 500 }
            );
        }

        const token = jwt.sign(
            { email: result.email || email.toLowerCase().trim(), id: result.insertedId, role: 0 },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Return user data without password
        const userData = {
            _id: result.insertedId,
            name: `${firstName.trim()} ${lastName.trim()}`,
            email: email.toLowerCase().trim(),
            role: 0,
        };

        return new NextResponse(JSON.stringify({ result: userData, token }), { status: 201 });
    } catch (error) {
        console.error("Error in /api/signup:", error);
        
        // Handle JSON parsing errors gracefully
        let errorMessage = "Something went wrong";
        try {
            if (error.message) {
                const parsed = JSON.parse(error.message);
                errorMessage = parsed.message || errorMessage;
            }
        } catch {
            // If error.message is not JSON, use a generic message
            errorMessage = "An error occurred during signup";
        }

        return new NextResponse(
            JSON.stringify({ error: { message: errorMessage } }),
            { status: 500 }
        );
    }
}
