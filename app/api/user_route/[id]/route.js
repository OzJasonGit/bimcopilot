import { connectToDatabase } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const db = await connectToDatabase();

    // Extract the user ID from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract the ID from the URL

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
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

    // Update the user
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) }, // Filter by user ID
      { $set: { name, email, role } } // Update fields
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