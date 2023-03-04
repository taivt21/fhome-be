const express = require("express");
const router = express.Router();
// const uploadImage = require("../middlewares/uploadImage");
const roomController = require("../controllers/roomController");
const authenticate = require("../middlewares/authenticate");
const uploadImage = require("../middlewares/uploadImage");


router.post('/rooms', uploadImage, roomController.createRoom);

// Lấy thông tin post
router.get('/users', userController.getAllUsers);

module.exports = router;
