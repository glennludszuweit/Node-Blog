const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const ejs = require("ejs");
const BlogPost = require("./models/BlogPost.js");

const homeController = require("./controllers/home");
const newPostController = require("./controllers/newPost");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

const validateMiddleware = require("./middlewares/validateMiddleware");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/posts/store", validateMiddleware);

mongoose.connect("mongodb://localhost/node-blog", { useNewUrlParser: true });
app.listen(4000, () => {
  console.log("Server running on PORT 4000...");
});

app.get("/", homeController);
app.get("/post/:id", getPostController);
app.get("/posts/new", newPostController);
app.post("/posts/store", storePostController);
app.get("/auth/register", newUserController);
app.post("/users/register", storeUserController);
app.get("/auth/login", loginController);
app.post("/users/login", loginUserController);
