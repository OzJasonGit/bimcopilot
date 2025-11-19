import { connectToDatabase } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/app/utils/auth";

export async function DELETE(req) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 1) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    const db = await connectToDatabase();

    // Extract the user ID from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract the ID from the URL

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Prevent self-deletion
    if (user.id.toString() === id) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
    }

    // Delete the user
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    // Check if the user was found and deleted
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 1) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    const db = await connectToDatabase();

    // Extract the user ID from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract the ID from the URL

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Extract updated data from the request body
    const { name, email, role } = await req.json();

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
    }

    // Update the user
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) }, // Filter by user ID
      { $set: updateData } // Update fields
    );

    // Check if the user was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}