import mongoose from "mongoose";

let connection;

export const connectDb = async () => {
  if (connection) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection = db.connection;
  } catch (err) {
    console.log("Error connecting to the database", err);
  }
};

export const disconnectDb = async () => {
  if (connection) {
    if (process.env.NODE_ENV == "production") {
      await mongoose.disconnect();
      connection = null;
    } else {
      console.log("not disconnected");
    }
  }
};
