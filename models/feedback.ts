import mongoose, { Schema, Model, Document } from "mongoose";

interface IFeedback extends Document {
  name: string;
  email: string;
  message: string;
}

const feedbackSchema = new Schema<IFeedback>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

let Feedback: Model<IFeedback> | null = null;

try {
  Feedback = mongoose.model<IFeedback>("Feedback");
} catch (e) {
  Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);
}

export default Feedback;
