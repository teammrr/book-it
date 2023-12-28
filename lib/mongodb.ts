import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectToDatabase = async () => {
  dotenv.config({ path: ".env.local" });
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  } catch (error) {
    console.error(error);
  }
};
