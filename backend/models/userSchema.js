import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    followers: {
      type: Array,
      required: true,
      default: [],
    },
    followings: {
      type: Array,
      required: true,
      default: [],
    },
    profileBio: { type: String },
    bookmarks: { type: Array, required: true, default: [] },
    profileImage: { type: String },
    coverImage: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
