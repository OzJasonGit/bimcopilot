// /api/signup

import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const db = await connectToDatabase();

    const {firstName, lastName, email, password, confirmPassword}  =  await  req.json();
    // Removed sensitive data logging - passwords should never be logged
    const User = db.collection("users");

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error(JSON.stringify({ message: "User already exists" }));
        }

        if (password !== confirmPassword) {
            throw new Error(JSON.stringify({ message: "Passwords do not match" }));
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.insertOne({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET environment variable is not set");
            return new NextResponse(
                JSON.stringify({ error: { message: "Server configuration error" } }),
                { status: 500 }
            );
        }
        const token = jwt.sign(
            { email: result.email || email, id: result.insertedId, role: 0 },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return new NextResponse(JSON.stringify({ result, token }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: JSON.parse(error.message) }));
    }
}
