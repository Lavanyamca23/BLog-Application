import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    default: "user",
  },
});
export default mongoose.model("users", UserSchema);
