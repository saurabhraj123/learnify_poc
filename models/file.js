import mongoose from "mongoose";

export const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
  },
  duration: Number,
  lastModified: {
    type: Number,
    required: true,
  },
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;
