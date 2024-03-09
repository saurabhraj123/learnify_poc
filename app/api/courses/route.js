/** External */
import { NextResponse } from "next/server";

/** Internal */
import { connectDb } from "@/utils/db";
import Course from "@/models/course";

export const GET = async (request) => {
  try {
    await connectDb();
    const courses = await Course.find({});
    return NextResponse.json({ courses });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const { course } = body;

  console.log({ body, course });
  if (!course)
    return NextResponse.json(
      { error: "Course is not provided in the request!" },
      { status: 400 }
    );

  try {
    // ** Do a sanity check of Course object before saving it to DB.. Just doing it right now for testing.
    console.log({ course });
    await connectDb();
    const newCourse = new Course(course);
    await newCourse.save();
    return NextResponse.json({ message: "Course saved successfully!" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
