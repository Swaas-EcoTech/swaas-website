import mongoose, { Schema, Document } from 'mongoose';

export interface ICollab extends Document {
  _id: string;
  src: string;
  alt: string;
  impact: string;
  collaborators: string;
  images: string[];
  instagramLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CollabSchema = new Schema<ICollab>({
  src: {
    type: String,
    required: [true, 'Main image source is required'],
    trim: true
  },
  alt: {
    type: String,
    required: [true, 'Alt text is required'],
    trim: true,
    maxlength: [200, 'Alt text cannot exceed 200 characters']
  },
  impact: {
    type: String,
    required: [true, 'Impact description is required'],
    trim: true,
    maxlength: [5000, 'Impact description cannot exceed 5000 characters']
  },
  collaborators: {
    type: String,
    required: [true, 'Collaborators field is required'],
    trim: true,
    maxlength: [500, 'Collaborators field cannot exceed 500 characters']
  },
  images: [{
    type: String,
    trim: true
  }],
  instagramLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Optional field
        return /^https?:\/\/(www\.)?instagram\.com\/.*/.test(v);
      },
      message: 'Please provide a valid Instagram URL'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Collab = mongoose.models.Collab || mongoose.model<ICollab>('Collab', CollabSchema);

export default Collab;