// /api/signup

import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail, getAppUrl } from "../../utils/sendEmail";
import { getWelcomeEmail } from "../../utils/emailTemplates";
import { addSignupSubscriberToKit } from "../../utils/convertkit";

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, password, confirmPassword } = body;

        console.log("[signup] Request body keys:", Object.keys(body));
        console.log("[signup] Parsed:", {
            firstName: firstName ? `${String(firstName).slice(0, 20)}...` : "(empty)",
            lastName: lastName ? `${String(lastName).slice(0, 20)}...` : "(empty)",
            email: email ? `${String(email).slice(0, 30)}...` : "(empty)",
            hasPassword: !!password,
            hasConfirmPassword: !!confirmPassword,
        });

        const db = await connectToDatabase();
        const User = db.collection("users");

        // Input validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            const missing = [
                !firstName && "firstName",
                !lastName && "lastName",
                !email && "email",
                !password && "password",
                !confirmPassword && "confirmPassword",
            ].filter(Boolean);
            console.log("[signup] 400: All fields required. Missing:", missing);
            return new NextResponse(
                JSON.stringify({ error: { message: "All fields are required" } }),
                { status: 400 }
            );
        }

        // Validate name length
        if (firstName.trim().length < 1 || firstName.trim().length > 50) {
            console.log("[signup] 400: First name invalid length:", firstName.trim().length);
            return new NextResponse(
                JSON.stringify({ error: { message: "First name must be between 1 and 50 characters" } }),
                { status: 400 }
            );
        }

        if (lastName.trim().length < 1 || lastName.trim().length > 50) {
            console.log("[signup] 400: Last name invalid length:", lastName.trim().length);
            return new NextResponse(
                JSON.stringify({ error: { message: "Last name must be between 1 and 50 characters" } }),
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("[signup] 400: Invalid email format");
            return new NextResponse(
                JSON.stringify({ error: { message: "Invalid email format" } }),
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 8) {
            console.log("[signup] 400: Password too short:", password.length);
            return new NextResponse(
                JSON.stringify({ error: { message: "Password must be at least 8 characters long" } }),
                { status: 400 }
            );
        }

        // Check for password complexity (at least one letter and one number)
        if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
            console.log("[signup] 400: Password missing letter or number");
            return new NextResponse(
                JSON.stringify({ error: { message: "Password must contain at least one letter and one number" } }),
                { status: 400 }
            );
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            console.log("[signup] 400: Passwords do not match");
            return new NextResponse(
                JSON.stringify({ error: { message: "Passwords do not match" } }),
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            console.log("[signup] 409: User already exists:", email);
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

        // Send welcome email via Kit (if configured) or SMTP (fallback)
        const normalizedEmail = email.toLowerCase().trim();
        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        try {
            if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_TAG_ID) {
                console.log("[signup] Sending welcome via Kit (subscriber + tag)");
                const ck = await addSignupSubscriberToKit({
                    email: normalizedEmail,
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                });
                if (ck.success) {
                    console.log("[signup] Kit: subscriber added and tagged. Welcome email depends on your Kit automation.");
                } else {
                    console.error("[signup] Kit welcome failed:", ck.error);
                    // Fallback: try SMTP so user still gets an email
                    const appUrl = getAppUrl();
                    const { subject, text, html } = getWelcomeEmail({ name: fullName, appUrl });
                    const smtp = await sendEmail({ to: normalizedEmail, subject, text, html });
                    if (smtp.success) console.log("[signup] SMTP fallback: welcome email sent.");
                    else console.error("[signup] SMTP fallback failed:", smtp.error);
                }
            } else {
                console.log("[signup] Kit not configured, using SMTP for welcome email");
                const appUrl = getAppUrl();
                const { subject, text, html } = getWelcomeEmail({
                    name: fullName,
                    appUrl,
                });
                const smtp = await sendEmail({
                    to: normalizedEmail,
                    subject,
                    text,
                    html,
                });
                if (smtp.success) {
                    console.log("[signup] Welcome email sent via SMTP.");
                } else {
                    console.error("[signup] SMTP welcome failed (is SMTP configured?):", smtp.error);
                }
            }
        } catch (emailError) {
            console.error("[signup] Welcome email error:", emailError);
        }

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
