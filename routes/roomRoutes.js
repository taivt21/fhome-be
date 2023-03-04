const express = require("express");
const router = express.Router();
// const uploadImage = require("../middlewares/uploadImage");
const roomController = require("../controllers/roomController");
const authenticate = require("../middlewares/authenticate");


router.post('/createRooms', authenticate, roomController.createRoom);


module.exports = router;
