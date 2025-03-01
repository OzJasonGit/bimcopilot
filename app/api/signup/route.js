// /api/signup

import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const db = await connectToDatabase();

    const {firstName, lastName, email, password, confirmPassword, role}  =  await  req.json();
    // console.log("data from backend", firstName,lastName,email,password,confirmPassword)
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
            name: `${firstName} ${lastName}`,
            email,
            role: 0,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { email: result.email, id: result._id, role: result.role },
            "test",
            { expiresIn: "1h" }
        ); 

        return new NextResponse(JSON.stringify({ result, token }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: JSON.parse(error.message) }));
    }
}
