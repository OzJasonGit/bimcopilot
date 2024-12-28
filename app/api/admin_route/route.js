import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("stories");
    const data = await req.json();

    // // Validation
    // if (!data.title || !data.author || !data.image || !data.introduction) {
    //   return new NextResponse(
    //     JSON.stringify({ success: false, error: "Missing required fields" }),
    //     { status: 400, headers: { "Content-Type": "application/json" } }
    //   );
    // }

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
