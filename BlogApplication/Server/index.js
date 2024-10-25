import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./Config/dbConfig.js";
import Routers from "./Router/router.js";

const app = express();
const PORT = process.env.port || 8080;

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use("/demo", Routers);
db;

app.get("/", (req, res) => {
  res.status(200).send("Hello Blog");
});

app.listen(PORT, () => {
  console.log(`Server running on port : http://localhost:${PORT}`);
});
