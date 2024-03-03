const express = require("express");
const path = require("path");
const app = express();
const userRoutes = require("./Routes/user");
const blogRoutes = require("./Routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");
const {
  checkForAuthentificationCookie,
} = require("./middlewares/authentication");

const PORT = 8000;

////// CONNECTIONS TO THE DATABASE

mongoose
  .connect("mongodb://127.0.0.1:27017/BLOG-first")
  .then((err) => console.log("he from db"));

///// View-Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

///// MIDDLEWARE TO HANDLE FORM DATA
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentificationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

//// handling routes

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, (err) => {
  console.log("hey");
});
