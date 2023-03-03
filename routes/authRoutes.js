const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const auth = require('../middlewares/authenticate')

// Đăng nhập

router.post("/login",auth.authenticate, authController.login);
module.exports = router;
