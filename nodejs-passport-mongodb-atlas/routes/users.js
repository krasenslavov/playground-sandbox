const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");

// Local User Model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_message", "You are logged out");
  res.redirect("/users/login");
});

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register New User
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please fill in all fields" });
  }

  // Check password match
  if (password !== password2) {
    errors.push({ message: "Password do not match" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 5 chars" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation Pass
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User Exist
        errors.push({ message: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          email,
          name,
          user,
          password,
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            // Set Hashed Password
            newUser.password = hash;
            // Save User into DB
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_message",
                  "You are now registered and can login"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
