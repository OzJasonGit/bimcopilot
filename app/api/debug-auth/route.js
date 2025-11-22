import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/utils/auth";

// Debug endpoint to check current user's authentication status and role
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({
        authenticated: false,
        message: "No user found. Please sign in."
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isAdmin: user.role === 1
      },
      message: user.role === 1 
        ? "You have admin access (role = 1)" 
        : `You do not have admin access. Your role is ${user.role}. Admin requires role = 1`
    });
  } catch (error) {
    console.error("Error in debug-auth:", error);
    return NextResponse.json({
      error: error.message,
      authenticated: false
    }, { status: 500 });
  }
}

