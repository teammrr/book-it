import mongoose, { Schema, models } from "mongoose";

const lineuserSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: String,
      required: true,
    },
    scope: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const lineUser = models.User || mongoose.model("User", lineuserSchema);

export default lineUser;
