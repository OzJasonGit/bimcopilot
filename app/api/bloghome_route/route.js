import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("stories");

        const publishedQuery = { published: true };
        const data = await collection
            .find(publishedQuery)
            .sort({ post_number: -1 })
            .toArray();

        const firstStory = await collection.findOne(publishedQuery, { sort: { post_number: -1 } });
        const topStoriesToSlice = await collection.find(publishedQuery).toArray();
        const topStories = topStoriesToSlice.slice(1, 6);

        const responseData = {
            data: data || [],
            firstStory,
            topStories: topStories || [],
        };
        return new NextResponse(JSON.stringify({ responseData }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("bloghome_route GET error:", err);
        return new NextResponse(
            JSON.stringify({ error: "Stories unavailable", message: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
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
