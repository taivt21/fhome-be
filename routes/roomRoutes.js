const express = require("express");
const router = express.Router();
// const uploadImage = require("../middlewares/uploadImage");
const roomController = require("../controllers/roomController");
const authenticate = require("../middlewares/authenticate");
const uploadImage = require("../middlewares/uploadImage");


router.post('/createRoom', authenticate, uploadImage, roomController.createRoom);

// Lấy thông tin post
router.get('/getRooms', roomController.getAllRooms);

module.exports = router;
