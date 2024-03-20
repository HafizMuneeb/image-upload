import mongoose from "mongoose";

export async function connect () {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)

    const connection = mongoose.connection;

    connection.on("Connected Succesfully", () => {
      console.log("MongoDB connected Succesfully");
    });
    connection.on("Error while connecting with MongoDB", () => {
      console.log("Oops! Error Occured while connecting with MongoDB");
    })
  } catch (error) {
    console.log("Something went wrong with MongoDB");
    console.error(error);
  }
}