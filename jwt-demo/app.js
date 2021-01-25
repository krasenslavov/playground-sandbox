const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = 4321;

app.get("/api", (_req, res) => {
  res.json({ message: "Welcome to the API." });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "Post was created...", authData });
    }
  });
});

app.post("/api/login", (_req, res) => {
  const demoUser = {
    id: 1,
    username: "demo",
    email: "demo@email.com",
  };

  jwt.sign(
    { user: demoUser },
    "secretkey",
    { expiresIn: "30s" },
    (_err, token) => {
      res.json({
        token: token,
      });
    }
  );
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // Split BearerHeader (Authorization: Bearer <acceess_token>)
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}...`);
});
