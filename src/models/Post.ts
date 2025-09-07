import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhotoURL: {
      type: String,
      required: false, 
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", postSchema);
export default Post;
