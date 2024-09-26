import { MongoClient } from "mongodb";

const uri = "mongodb+srv://oz_nwachukwu:bigROAR2005@bimcopilot.dy1nnak.mongodb.net/" 

let cachedClient = null;

export async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient.db("bimcopilot");
    }

    const client = new MongoClient(uri);

    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    cachedClient = client;

    return client.db("bimcopilot");
}






