import express from "express";
const router = express.Router();

import userController from "../Controller/User/user.controller.js";
import blogController from "../Controller/Blog/blog.controller.js";

router
  .route("/user")
  .post(userController.UserRegisterController)
  .get(userController.AdminDataController);

router.route("/user/login").post(userController.UserLoginController);

router
  .route("/blog")
  .post(blogController.CreateBlogController)
  .get(blogController.GetAllBlogController);

export default router;
