import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: String,
    content: { type: String, required: true },
    category: String,
    author: String,
    image: String,
    tags: [String],
  },
  { timestamps: true },
);

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
