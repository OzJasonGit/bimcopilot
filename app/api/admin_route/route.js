import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/utils/auth";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 1) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    const db = await connectToDatabase();
    const collection = db.collection("stories");
    const stories = await collection
      .find({})
      .sort({ post_number: -1 })
      .toArray();
    return new NextResponse(
      JSON.stringify({ success: true, data: stories }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in GET /api/admin_route:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 1) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    const db = await connectToDatabase();
    const collection = db.collection("stories");
    const data = await req.json();
    // Insert data
    const result = await collection.insertOne(data);
    return new NextResponse(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST /api/admin_route:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 1) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    const db = await connectToDatabase();
    const collection = db.collection("stories");
    const { _id, ...updateData } = await req.json();
    
    if (!_id) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Story ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Remove _id from updateData if it exists
    delete updateData._id;
    
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Story not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in PUT /api/admin_route:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
