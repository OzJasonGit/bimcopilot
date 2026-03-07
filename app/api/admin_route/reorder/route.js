import { connectToDatabase } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/utils/auth";
import { ObjectId } from "mongodb";
import { getPostNumberNumeric } from "@/app/utils/postNumber";

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
    const { storyId, direction } = await req.json();

    if (!storyId || !direction || !["up", "down"].includes(direction)) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "storyId and direction (up/down) required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const all = await collection.find({}).sort({ sortOrder: -1, post_number: -1 }).toArray();
    const idx = all.findIndex((s) => String(s._id) === String(storyId));
    if (idx < 0) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Story not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= all.length) {
      return new NextResponse(
        JSON.stringify({ success: true, message: "Already at boundary" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const story = all[idx];
    const swapStory = all[swapIdx];
    const storySort = story.sortOrder ?? getPostNumberNumeric(story.post_number);
    const swapSort = swapStory.sortOrder ?? getPostNumberNumeric(swapStory.post_number);

    await Promise.all([
      collection.updateOne({ _id: story._id }, { $set: { sortOrder: swapSort } }),
      collection.updateOne({ _id: swapStory._id }, { $set: { sortOrder: storySort } }),
    ]);

    return new NextResponse(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST /api/admin_route/reorder:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
