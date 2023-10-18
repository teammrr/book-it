import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectToDatabase = async () => {
  dotenv.config({ path: ".env.local" });
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
