import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";


export async function GET(req) {
    const db = await connectToDatabase();
    const collection = db.collection("stories");

    const { searchParams } = new URL(req.url);
    const pageParam = Number(searchParams.get("page") || 1);
    const limitParam = Number(searchParams.get("limit") || 9);
    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 9;
    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
        collection
            .find({})
            .sort({ post_number: -1 })
            .skip(skip)
            .limit(limit)
            .toArray(),
        collection.countDocuments(),
    ]);

    const firstStory = await collection.findOne({});
    const topStoriesToSlice = await collection.find({}).toArray();
    const topStories = topStoriesToSlice.slice(1, 6);

    const responseData = {
        data,
        firstStory,
        topStories,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
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
