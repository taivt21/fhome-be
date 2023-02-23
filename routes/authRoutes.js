const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Đăng nhập

router.post("/login", authController.login);

module.exports = router;
