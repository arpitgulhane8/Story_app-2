const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
} = require("../../Controller/auth_controller.js");
const authMiddleware = require("../../Middleware/auth.js");

// Register route
router.post("/register", register);
router.post("/login", login);
router.get("/getuser", authMiddleware, getUser);

module.exports = router;
