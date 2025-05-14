const express = require("express");
const { register, login } = require("../controller/auth.controller");
const { authenticateUser } = require("../middleware/auth.middleware");
const { rateLimiter } = require("../middleware/rate.limiter");

const router = express.Router();

router.post("/register", rateLimiter, register);
router.post("/login", rateLimiter, login);
router.get("/protected", authenticateUser, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.user?.id });
});

module.exports = router;
