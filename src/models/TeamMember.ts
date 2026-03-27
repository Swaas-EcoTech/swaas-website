import mongoose, { Document, Schema , Types} from "mongoose";

export interface ITeamMember extends Document {
  _id: Types.ObjectId;
  name: string;
  role?: string;
  category: string;
  description?: string;
  imageUrl: string;
  linkedInLink?: string;
  membershipType: "team" | "alumni";
  academicYear?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"],
    },
    role: {
      type: String,
      trim: true,
      maxlength: [120, "Role cannot exceed 120 characters"],
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [120, "Category cannot exceed 120 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [3000, "Description cannot exceed 3000 characters"],
      default: "",
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    linkedInLink: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: function (value: string) {
          if (!value) return true;
          return /^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(value);
        },
        message: "Please provide a valid LinkedIn URL",
      },
    },
    membershipType: {
      type: String,
      required: [true, "Membership type is required"],
      enum: {
        values: ["team", "alumni"],
        message: "Membership type must be team or alumni",
      },
    },
    academicYear: {
      type: String,
      trim: true,
      maxlength: [40, "Academic year cannot exceed 40 characters"],
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

TeamMemberSchema.index({ membershipType: 1, category: 1, sortOrder: 1, createdAt: -1 });
TeamMemberSchema.index({ name: "text", role: "text", category: "text", academicYear: "text" });

const TeamMember =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
