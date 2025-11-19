// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// let cachedClient = null;

// export async function connectToDatabase() {
//     if (cachedClient) {
//         return cachedClient.db("bimcopilot");
//     }

//     const client = new MongoClient(uri);

//     await client.connect();
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     cachedClient = client;

//     return client.db("bimcopilot");
// }



// mongodb.js
// app/utils/mongodb.js
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is required");
}
const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 30000,
};

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedClient.topology.isConnected() && cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    // Connect MongoDB client
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("Connected to MongoDB");

    // Connect Mongoose
    await mongoose.connect(uri, {
      ...options,
      dbName: "bimcopilot",
      bufferCommands: true, // Enable buffering, but we'll increase timeout
    });
    console.log("Mongoose connected to MongoDB");

    cachedClient = client;
    cachedDb = client.db("bimcopilot");

    // Handle connection events
    client.on("error", (err) => {
      console.error("MongoDB client error:", err);
      cachedClient = null;
      cachedDb = null;
      mongoose.connection.close();
    });
    client.on("close", () => {
      console.log("MongoDB connection closed");
      cachedClient = null;
      cachedDb = null;
      mongoose.connection.close();
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });

    return cachedDb;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}