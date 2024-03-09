import mongoose from "mongoose";
import { sectionSchema } from "./sections";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
    min: 0,
  },
  uploadedAt: {
    type: Date,
    required: true,
  },
  duration: Number,
  sections: [sectionSchema],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
