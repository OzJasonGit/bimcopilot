import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb"; 

// GET /api/header - Fetch user authentication status and details
export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      // If no token is found, the user is not authenticated
      return NextResponse.json({ isAuthenticated: false }, { status: 200 });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    // Connect to the database
    const db = await connectToDatabase();
    const User = db.collection("users");

    // Find the user by ID (convert decoded.id to ObjectId if necessary)
    const user = await User.findOne({ _id: new ObjectId(decoded.id) });
    if (!user) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 });
    }

    // Return user details (excluding sensitive data)
    return NextResponse.json(
      {
        isAuthenticated: true,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/header:", error);
    return NextResponse.json(
      { isAuthenticated: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST /api/logout - Clear the token cookie and log the user out
export async function POST() {
  try {
    // Clear the token cookie
    const cookieStore = cookies();
    cookieStore.delete("token");

    return NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/logout:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}