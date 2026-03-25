import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

function getConnectionOptions(mongoUri) {
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 20000,
  };

  try {
    const pathname = new URL(mongoUri).pathname.replace(/^\/+/, "");

    if (!pathname) {
      options.dbName = process.env.MONGO_DB_NAME || "wattpulse";
    }
  } catch {
    options.dbName = process.env.MONGO_DB_NAME || "wattpulse";
  }

  return options;
}

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGO_URI environment variable.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, getConnectionOptions(mongoUri))
      .then((instance) => instance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
