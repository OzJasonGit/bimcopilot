// import { connectToDatabase } from "../../utils/mongodb";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const db = await connectToDatabase();
//     const collection = db.collection("stories");
//     const data = await req.json();
//     // Insert data
//     const result = await collection.insertOne(data);
//     return new NextResponse(
//       JSON.stringify({ success: true, data: result }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Error in POST /api/admin_route:", error);
//     return new NextResponse(
//       JSON.stringify({ success: false, error: "Internal server error" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { connectToDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/auth"; // Make sure this works correctly

export async function POST(req) {
  try {
    const session = await getSession(req); // Get user session
    console.log("Session in admin route:", session);

    if (!session || Number(session.user.role) !== 1) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("stories");
    const data = await req.json();

    const result = await collection.insertOne(data);
    return NextResponse.json({ success: true, data: result }, { status: 200 });

  } catch (error) {
    console.error("Error in POST /api/admin_route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
