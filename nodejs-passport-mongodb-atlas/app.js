if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 5000;

// Passport.js Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to MongoDB (Atlas)
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// EJS Middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

// BodyParser  Middleware
app.use(express.urlencoded({ extended: false }));

// Express Session  Middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport.js Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global Vars Middleware
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});

// Routes Middleware
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
