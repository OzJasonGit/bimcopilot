// /api/basket

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";

export async function POST(req) {
    const { email, password } = await req.json();
 
    const db = await connectToDatabase();

    const User = db.collection("users");

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            throw new Error(JSON.stringify({ message: "User does not exist" }));

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect)
            throw new Error(JSON.stringify({ message: "Invalid Credentials" }));

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );

        return new NextResponse(
            JSON.stringify({ result: existingUser, token })
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: JSON.parse(error.message) })
        );
    }
}


