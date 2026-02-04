import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";
import { sendEmail, getAppUrl } from "../../utils/sendEmail";
import crypto from "crypto";

const RESET_TOKEN_EXPIRY_HOURS = 1;

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: { message: "Email is required" } },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const User = db.collection("users");

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Don't reveal whether the email exists; always return success
      return NextResponse.json({
        message: "If an account exists with this email, you will receive a password reset link.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

    await User.updateOne(
      { _id: user._id },
      { $set: { resetToken: token, resetTokenExpires: expires } }
    );

    const baseUrl = getAppUrl();
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    const { success, error } = await sendEmail({
      to: user.email,
      subject: "Reset your Bimcopilot password",
      text: `You requested a password reset. Click the link below to set a new password (valid for ${RESET_TOKEN_EXPIRY_HOURS} hour(s)):\n\n${resetLink}\n\nIf you didn't request this, you can ignore this email.`,
      html: `
        <p>You requested a password reset for your Bimcopilot account.</p>
        <p>Click the link below to set a new password (valid for ${RESET_TOKEN_EXPIRY_HOURS} hour(s)):</p>
        <p><a href="${resetLink}">Reset password</a></p>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    });

    if (!success) {
      console.error("Forgot password email failed:", error);
      return NextResponse.json(
        { error: { message: "Failed to send reset email. Please try again later." } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "If an account exists with this email, you will receive a password reset link.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: { message: "Something went wrong" } },
      { status: 500 }
    );
  }
}
