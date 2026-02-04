import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password, confirmPassword } = await req.json();

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: { message: "Token, password and confirm password are required" } },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: { message: "Password must be at least 8 characters long" } },
        { status: 400 }
      );
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: { message: "Password must contain at least one letter and one number" } },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: { message: "Passwords do not match" } },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const User = db.collection("users");

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: { message: "Invalid or expired reset link. Please request a new one." } },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpires: "" },
      }
    );

    return NextResponse.json({ message: "Password has been reset. You can sign in now." });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: { message: "Something went wrong" } },
      { status: 500 }
    );
  }
}
