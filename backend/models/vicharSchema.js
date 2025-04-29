import mongoose from "mongoose";

const vicharSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    likes: { type: Array, required: true, default: [] },
    comments: { type: Array, required: true, default: [] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userDetails: [],
  },
  { timestamps: true }
);

const vicharModel =
  mongoose.model.vichar || mongoose.model("vichar", vicharSchema);

export default vicharModel;
