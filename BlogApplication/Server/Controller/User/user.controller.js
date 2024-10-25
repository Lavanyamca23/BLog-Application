import UserSchema from "../../Model/User/user.model.js";
import CreateBlog from "../../Model/Blog/createblog.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const UserRegisterController = async (req, res) => {
  try {
    const { Name, Email, Phone, Password } = req.body;

    const isEmailExists = await UserSchema.findOne({ Email });

    if (isEmailExists) {
      return res.status(404).send(`${isEmailExists.Email} already exists`);
    }

    let HashedPassword = await bcrypt.hash(Password, 10);

    try {
      await UserSchema.create({
        Name,
        Email,
        Phone,
        Password: HashedPassword,
      });
      res.status(201).send("Registered Successfully");
    } catch (error) {
      res.status(500).send(error.stack);
    }
  } catch (error) {
    res.status(500).send(error.stack);
  }
};

const UserLoginController = async (req, res) => {
  const { Email, Password } = req.body;

  const email = await UserSchema.findOne({ Email });

  if (!email) {
    return res.status(404).send("User not found - Invalid Email Id");
  }

  const isPasswordValid = await bcrypt.compare(Password, email.Password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid Password");
  }

  const payload = {
    id: email._id,
    name: email.Name,
    email: Email,
    role: email.Role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  try {
    res.status(200).json({ message: "Login Successfully", token: token });
  } catch (error) {
    res.status(500).send(error.stack);
  }
};

const AdminDataController = async (req, res) => {
  try {
    const users = await UserSchema.find();
    const blogs = await CreateBlog.find();

    const userCount = users.length;
    const blogCount = blogs.length;

    res.status(200).json({
      usercount: userCount,
      blogcount: blogCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.stack,
      message: "An error occurred while fetching user data.",
    });
  }
};

export default {
  UserRegisterController,
  UserLoginController,
  AdminDataController,
};
