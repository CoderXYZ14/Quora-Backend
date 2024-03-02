const express = require("express");
const app = express();

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require("uuid");
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "apna collge",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "shahwaiz",
    content: "I love dancing",
  },
  {
    id: uuidv4(),
    username: "islam",
    content: "I love singing",
  },
];

app.get("/", (req, res) => {
  //res.send("server running well");
  res.render("index.ejs", { posts });
});

//implement post
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/", (req, res) => {
  let { username, content } = req.body;
  // console.log(req.body);
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/");
  res.send("post request working");
});

//show a particular post
app.get("/:id", (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let post = posts.find((p) => id === p.id);
  // res.send("request working");
  res.render("show.ejs", { post });
});

//to update a specific post
app.patch("/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  // console.log(newContent);
  // console.log(id);
  console.log(post);
  // res.send("patch request working ");
  res.redirect("/");
});

app.get("/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  //res.send("delete success");
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
