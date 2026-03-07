import { connectToDatabase } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/utils/auth";
import { getPostNumberNumeric, getPostNumberDisplay } from "@/app/utils/postNumber";

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

    const stories = await collection.find({}).toArray();
    const withNum = stories.map((s) => ({
      ...s,
      _num: getPostNumberNumeric(s.post_number),
    }));
    withNum.sort((a, b) => b._num - a._num);

    let sortOrder = 10000;
    for (const s of withNum) {
      const cleanPostNumber = getPostNumberDisplay(s.post_number);
      const update = { sortOrder };
      if (cleanPostNumber && cleanPostNumber !== String(s.post_number || "").trim()) {
        update.post_number = cleanPostNumber;
      }
      await collection.updateOne({ _id: s._id }, { $set: update });
      sortOrder -= 1;
    }

    return new NextResponse(
      JSON.stringify({ success: true, message: `Reindexed ${stories.length} stories` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST /api/admin_route/reindex:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
