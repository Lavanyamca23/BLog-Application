import mongoose from "mongoose";

const CreateBlog = mongoose.Schema({
  Image: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: String,
    required: true,
  },
});

export default mongoose.model("blogs", CreateBlog);
