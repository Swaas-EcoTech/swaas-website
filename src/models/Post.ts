import mongoose, { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    name: String,
    content: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", postSchema);
export default Post;
