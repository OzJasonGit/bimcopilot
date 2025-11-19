import { connectToDatabase } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/app/utils/auth";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== 1) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }
        const db = await connectToDatabase();
        const users = await db.collection("users").find({}).toArray();
        // Don't return password hashes
        const sanitizedUsers = users.map(({ password, ...user }) => user);
        return NextResponse.json(sanitizedUsers, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== 1) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }
        const db = await connectToDatabase();
        const { name, email, password, role = 0 } = await req.json();

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Password strength validation
        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
        }

        // Check if email already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert the new user with hashed password
        const result = await db.collection("users").insertOne({ name, email, password: hashedPassword, role });

        return NextResponse.json({ message: "User added", userId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
