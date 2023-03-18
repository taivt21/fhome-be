"use strict";

var express = require("express");

var postingController = require("../controllers/postingController");

var authenticate = require("../middlewares/authenticate");

var uploadImage = require("../middlewares/uploadImage");

var router = express.Router();
router.post('/createPosting', authenticate, uploadImage, postingController.createPosting);
router.get('/getAllPostings', postingController.getAllPostings);
router.get('/getPostingByUserId', authenticate, postingController.getPostingByUserId);
router.get('/getPostingById/:id', postingController.getPostingById);
router.put('/updatePosting/:id', postingController.updatePosting); // router.put('/setStatusPosting/:id', postingController.setStatusPosting)

router["delete"]('/deletePosting/:id', postingController.deletePosting);
module.exports = router;