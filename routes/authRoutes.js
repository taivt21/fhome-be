const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Đăng nhập

router.post("/login", authController.login);
router.get("/getUser",authController.getData)
//http://localhost:3000/login
router.put("/setUserStatus/:userId", authController.setUserStatus);
//example http://localhost:3000/setUserStatus/63fc61ef617136555e017603
router.delete("/deleteUser/:userId",authController.deleteUser)
//example http://localhost:3000/deleteUser/63fc6149d0db61d24a614b62
module.exports = router;
