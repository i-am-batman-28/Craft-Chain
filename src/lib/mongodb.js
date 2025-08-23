import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    try {
        cached.promise = mongoose.connect(MONGODB_URI);
        cached.conn = await cached.promise;
        console.log("MongoDB connected successfully");
        return cached.conn;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

export default dbConnect;
