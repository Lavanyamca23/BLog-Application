import CreateBlog from "../../Model/Blog/createblog.model.js";

const CreateBlogController = async (req, res) => {
  try {
    const { Image, Title, Description, Content, Category, Author, CreatedAt } =
      req.body;

    try {
      await CreateBlog.create({
        Image,
        Title,
        Description,
        Content,
        Category,
        Author,
        CreatedAt,
      });
      res.status(201).send("New Blog Created Successfully");
    } catch (error) {
      res.status(500).send(error.stack);
    }
  } catch (error) {
    res.status(500).send(error.stack);
  }
};

const GetAllBlogController = async (req, res) => {
  try {
    const data = await CreateBlog.find();

    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.stack });
  }
};

export default {
  CreateBlogController,
  GetAllBlogController,
};

// default: ,
