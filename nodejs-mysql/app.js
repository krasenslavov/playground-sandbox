const express = require("express");
const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_mysql",
});

// Connect
db.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("MySQL connected!");
});

const app = express();

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE node_mysql";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    res.send("Database created!");
  });
});

// Create Table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts (id INT AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.send("Posts table created!");
  });
});

// Insert Post 1
app.get("/addpostone", (req, res) => {
  let post = { title: "Post One", body: "This is post number one." };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.send("Posts one added!");
  });
});

// Insert Post 2
app.get("/addposttwo", (req, res) => {
  let post = { title: "Post Two", body: "This is post number two." };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.send("Posts two added!");
  });
});

// Select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.send("Posts fetched!");
  });
});

// Select single posts
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    res.send("Post fetched!");
  });
});

// Update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Upadted Title";
  let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    res.send("Post updated!");
  });
});

// Delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    res.send("Post deleted!");
  });
});

app.listen(3000, () => {
  console.log(`Server started on port 3000...`);
});
