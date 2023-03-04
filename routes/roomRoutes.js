const express = require("express");
const router = express.Router();
// const uploadImage = require("../middlewares/uploadImage");
const roomController = require("../controllers/roomController");
const authenticate = require("../middlewares/authenticate");
const uploadImage = require("../middlewares/uploadImage");


router.post('/createRooms',authenticate, uploadImage, roomController.createRoom);


module.exports = router;
