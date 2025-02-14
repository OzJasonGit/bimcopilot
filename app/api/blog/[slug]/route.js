import { connectToDatabase } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { slug } = params;
    const db = await connectToDatabase();

    const story = await db.collection("stories").findOne({ slug });

    if (!story) {
        return new NextResponse(JSON.stringify({ error: "Story not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ story }), { status: 200 });
}
