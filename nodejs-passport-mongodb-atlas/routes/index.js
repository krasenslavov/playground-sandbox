const express = require("express");
const router = express.Router();
const { ensureAuthenicated } = require("../config/auth");

// Home Page
router.get("/", (req, res) => {
  res.render("welcome");
});

// Dashboard
router.get("/dashboard", ensureAuthenicated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
