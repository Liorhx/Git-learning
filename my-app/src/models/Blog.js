// models/Blog.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    title: String,
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", UserSchema);
