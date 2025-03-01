import { connectToDatabase } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs"

export async function GET() {
    try {
        const db = await connectToDatabase();
        const users = await db.collection("users").find({}).toArray();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const db = await connectToDatabase();
        const { name, email, password, role = 0 } = await req.json();

        // Check if email already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user with hashed password
        const result = await db.collection("users").insertOne({ name, email, password: hashedPassword, role });

        return NextResponse.json({ message: "User added", userId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
