import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = mongoose.connect(process.env.DBCONNECTION);
try {
  dbConnect;
  console.log("Database Connected!");
} catch (error) {
  console.log(error.message);
}

export default dbConnect