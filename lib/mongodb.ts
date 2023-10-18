import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as mongoose.ConnectOptions);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
