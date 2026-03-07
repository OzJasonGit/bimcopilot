import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";


export async function GET(req) {
    const db = await connectToDatabase();

    const collection = db.collection("stories");

    const publishedQuery = { published: true };
    const sortOpt = { sortOrder: -1, post_number: -1 };
    const data = await collection
        .find(publishedQuery)
        .sort(sortOpt)
        .limit(2)
        .toArray();

    const firstStory = await collection.findOne(publishedQuery, { sort: sortOpt });

    const topStoriesToSlice = await collection.find(publishedQuery).sort(sortOpt).toArray();
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
