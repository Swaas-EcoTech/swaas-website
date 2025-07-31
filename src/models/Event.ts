import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  date: string;
  month: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  projectImages: string[];
  instagramLink?: string;
  category: 'Past Events' | 'Upcoming Events' | 'Signature Events';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  date: {
    type: String,
    required: [true, 'Date is required'],
    trim: true
  },
  month: {
    type: String,
    required: [true, 'Month is required'],
    trim: true
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Main image is required'],
    trim: true
  },
  projectImages: [{
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
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Past Events', 'Upcoming Events', 'Signature Events'],
      message: 'Category must be either Past Events, Upcoming Events, or Signature Events'
    },
    default: 'Upcoming Events'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
EventSchema.index({ category: 1, createdAt: -1 });
EventSchema.index({ title: 'text', description: 'text' });

// Ensure model is only compiled once
const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;