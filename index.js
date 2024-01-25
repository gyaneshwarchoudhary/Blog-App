const express = require("express");
const path = require("path");
const app = express();
const userRoutes = require("./Routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
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

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

//// handling routes

app.use("/user", userRoutes);

app.listen(PORT, (err) => {
  console.log("hey");
});
