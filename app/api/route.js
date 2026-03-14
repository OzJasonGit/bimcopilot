import { connectToDatabase } from "../utils/mongodb";
import { NextResponse } from "next/server";
import { getPostNumberNumeric } from "../utils/postNumber";

export async function GET(req) {
    const db = await connectToDatabase();
    const collection = db.collection("stories");
    const publishedQuery = { published: true };
    const raw = await collection.find(publishedQuery).toArray();
    const sorted = raw.sort(
        (a, b) => getPostNumberNumeric(b.post_number) - getPostNumberNumeric(a.post_number)
    );
    const data = sorted.slice(0, 4);
    const firstStory = sorted[0] ?? null;
    const topStories = sorted.slice(1, 6);

    const responseData = {
        data,
        firstStory,
        topStories,
    };
    return new NextResponse(JSON.stringify({ responseData }));
}


export async function DELETE(req) {
    const db = await connectToDatabase();
    const collection = db.collection("stories");

    const latestStory = await collection.findOne(
        {},
        { sort: { post_number: -1 } }
    );

    if (!latestStory) {
        return new NextResponse("No stories found", { status: 404 });
    }

    await collection.deleteOne({ _id: latestStory._id });

    return new NextResponse("Latest story deleted successfully", {
        status: 200,
    });
}
