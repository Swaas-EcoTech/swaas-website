import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

// Define type for cached connection
type Cached = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

// Add type safety for global
declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached | undefined;
}

const cached: Cached = global.mongoose ?? { conn: null, promise: null };

export default async function dbConnect(): Promise<Connection> {
  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("📡 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}
