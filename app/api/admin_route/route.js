import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/utils/auth";

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
