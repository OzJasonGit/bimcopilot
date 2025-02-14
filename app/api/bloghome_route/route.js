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


export async function POST(req) {
    const db = await connectToDatabase();
    const collection = db.collection("stories");

    const newStory = {
        text: "Title of Fourth Story.",
        author: "John Doe",
        image: "https://upload.wikimedia.org/wikipedia/en/0/00/Popeye_the_Sailor.png",
        video: "https://www.youtube.com/watch?v=CBi0HUmTrkI&ab_channel=GordonGoose",
        timestamp: "2023-11-26T12:03:00Z",
        post_id: "004",
        post_number: "4",
    };
    
    await collection.insertOne(newStory);
    return new NextResponse(newStory, { status: 200 });
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
