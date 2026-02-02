import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";


export async function GET(req) {
    const db = await connectToDatabase();

    const collection = db.collection("stories");

    const data = await collection
        .find({})
        .sort({ post_number: -1 })
        .limit(20)
        .toArray();

    const firstStory = await collection.findOne({});
    const topStoriesToSlice = await collection.find({}).toArray();
    const topStories = topStoriesToSlice.slice(1, 6);

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
