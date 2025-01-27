import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IPublication extends Document {
  id: string;
  summary: string;
  sentiment: string;
  flags: number;
  commentCount: number;
  isHidden: boolean;
  createdAt?: Date; // Optional because `timestamps` adds these fields
  updatedAt?: Date;
}

const PublicationSchema = new Schema<IPublication>(
  {
    id: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    sentiment: {
      type: String,
      required: true
    },
    flags: {
      type: Number,
      default: 0,
      required: true
    },
    commentCount: {
      type: Number,
      default: 0,
      required: true
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Publication = mongoose.model("Publication", PublicationSchema);

export default Publication;
