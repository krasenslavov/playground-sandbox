const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   // res.send("Hello World");
//   // res.send("h1>Hello World</h1>");
//   // res.json({ message: "Hello World" });
//   // res.send(req.header("host"));
//   res.send(req.rawHeaders);
// });

app.post("/contact", (req, res) => {
  // res.send(req.body);
  // res.send(req.header("Content-Type"));
  if (!req.body.name) {
    return res.status(400).send("Name is required.");
  }

  res.status(201).send(`Thank you ${req.body.name}`);
});

app.post("/login", (req, res) => {
  if (!req.header("x-auth-token")) {
    return res.status(400).send("No token.");
  }

  if (req.header("x-auth-token") !== "123456") {
    return res.status(401).send("No authorized.");
  }

  // DATABSE STUFF

  res.send("Logged in.");
});

app.put("/post/:id", (req, res) => {
  // DATABSE STUFF

  res.json({
    id: req.params.id,
    title: req.body.title,
  });
});

app.delete("/post/:id", (req, res) => {
  // DATABSE STUFF

  res.json({
    message: `Post ${req.params.id} deleted.`,
  });
});

app.listen(4000, () => console.log(`Server started on port 4000`));
