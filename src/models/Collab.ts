import mongoose, { Document, Schema } from "mongoose";

export interface ICollab extends Document {
  _id: string;
  title: string;
  coverImage: string;
  description?: string;
  impact?: string;
  collaborators?: string;
  galleryImages: string[];
  instagramLink?: string;
  date?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CollabSchema = new Schema<ICollab>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters"],
      default: "",
    },
    impact: {
      type: String,
      trim: true,
      maxlength: [5000, "Impact cannot exceed 5000 characters"],
      default: "",
    },
    collaborators: {
      type: String,
      trim: true,
      maxlength: [300, "Collaborators cannot exceed 300 characters"],
      default: "",
    },
    galleryImages: [
      {
        type: String,
        trim: true,
      },
    ],
    instagramLink: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: String,
      trim: true,
      maxlength: [100, "Date cannot exceed 100 characters"],
      default: "",
    },
    sortOrder: {
      type: Number,
      default: 0,
      min: [0, "Sort order cannot be negative"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CollabSchema.index({ sortOrder: 1, createdAt: -1 });
CollabSchema.index({ title: "text", description: "text", impact: "text", collaborators: "text" });

const Collab = mongoose.models.Collab || mongoose.model<ICollab>("Collab", CollabSchema);

export default Collab;
