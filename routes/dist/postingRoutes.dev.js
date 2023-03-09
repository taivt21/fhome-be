"use strict";

var express = require("express");

var postingController = require("../controllers/postingController");

var authenticate = require("../middlewares/authenticate");

var router = express.Router();

var uploadImage = require("../middlewares/uploadImage");

router.post('/postingNew', uploadImage, authenticate, postingController.createPosting);
router.get('/getAllPostings', postingController.getAllPostings);
router.get('/getPostingById/:id', postingController.getPostingById);
router.put('/updatePosting/:id', postingController.updatePosting);
router["delete"]('/deletePosting/:id', postingController.deletePosting);
module.exports = router;