import mongoose, { Schema, Model, Document } from "mongoose";

interface Iuser extends Document {
  email: string;
  name: string;
  role: string;
}

const UserSchema = new Schema<Iuser>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: false },
  },
  { timestamps: true }
);

let user: Model<Iuser> | null = null;

try {
  user = mongoose.model<Iuser>("User");
} catch (e) {
  user = mongoose.model<Iuser>("User", UserSchema);
}

export default user;
