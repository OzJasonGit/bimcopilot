import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "test");
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return null;
      }
      return null;
    }

    // Connect to the database
    const db = await connectToDatabase();
    const User = db.collection("users");

    // Find the user by ID
    const user = await User.findOne({ _id: new ObjectId(decoded.id) });
    if (!user) {
      return null;
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export function requireAuth() {
  return async (req) => {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Authentication required", status: 401 };
    }
    return { user };
  };
} 