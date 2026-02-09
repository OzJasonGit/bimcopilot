import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req) {
  const { token, accessToken } = await req.json();
  const db = await connectToDatabase();
  const User = db.collection("users");

  try {
    let sub;
    let name;
    let email;
    let picture;

    if (token) {
      // Verify Google ID token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      ({ sub, name, email, picture } = payload);
    } else if (accessToken) {
      const userInfoRes = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!userInfoRes.ok) {
        throw new Error("Failed to fetch Google user info");
      }

      const userInfo = await userInfoRes.json();
      ({ sub, name, email, picture } = userInfo);
    } else {
      return NextResponse.json(
        { message: "Missing Google token" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create one
      user = {
        googleId: sub,
        name,
        email,
        avatar: picture,
        createdAt: new Date(),
      };
      await User.insertOne(user);
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id, role: user.role || 0 },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "User logged in successfully!",
      user,
      token: jwtToken,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return NextResponse.json(
      { message: "Google Login Failedddd!" },
      { status: 500 }
    );
  }
}
