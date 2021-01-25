const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// app.get("/", (req, res) => {
// res.send("<h1>Hello World!</h1>");
// res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Set static folder (option #1)
// app.use(express.static(path.join(__dirname, "public")));

// Express Handlebars Middleware (option #2)
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Homepage Route
app.get("/", (req, res) => {
  res.render("index", { title: "Member App", members: members });
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/members", require("./routes/api/members"));

// logger Middleware
// app.use(logger);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));
