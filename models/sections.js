import mongoose from "mongoose";
import { fileSchema } from "./file";

export const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: Number,
  files: [fileSchema],
});

const Section =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;
