"use strict";

var express = require("express");

var postingController = require("../controllers/postingController");

var authenticate = require("../middlewares/authenticate");

var uploadImage = require("../middlewares/uploadImage");

var router = express.Router(); //create post

router.post("/create", authenticate, uploadImage, postingController.createPosting); // get user post

router.get("/user", authenticate, postingController.getUserPosts); // get post by id

router.get("/detail/:id", authenticate, postingController.getPostingById); // get all posts

router.get("/", authenticate, postingController.getAllStatus); // get published posts

router.get("/published", authenticate, postingController.getAllPostings); // get draft posts

router.get("/draft", authenticate, postingController.getPostingDraft); // get pending posts

router.get("/pending", authenticate, postingController.getPostingPending); // get approved post

router.get("/approved", authenticate, postingController.getPostingApproved); // get rejected post

router.get("/rejected", authenticate, postingController.getPostingRejected); // update post

router.put("/update/:id", authenticate, postingController.updatePosting); // reject post

router.put("/reject/:id", authenticate, postingController.rejectPost); // confirm post

router.put("/confirm/:id", authenticate, postingController.confirmPost); // approve post

router.put("/approve/:id", authenticate, postingController.approvedPost); // delete post

router["delete"]("/delete/:id", authenticate, postingController.deletePost);
module.exports = router;