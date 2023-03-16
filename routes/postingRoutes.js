const express = require("express");
const postingController = require("../controllers/postingController");
const authenticate = require("../middlewares/authenticate");
const uploadImage = require("../middlewares/uploadImage");
const router = express.Router();

router.post('/createPosting', authenticate, uploadImage, postingController.createPosting)

router.get('/getAllPostings',postingController.getAllPostings)

router.get('/getPostingByUserId', authenticate, postingController.getAllPostings)

router.get('/getPostingById/:id',postingController.getPostingById)

router.put('/updatePosting/:id',postingController.updatePosting)

router.put('/setStatusPosting/:id', postingController.setStatusPosting)

router.delete('/deletePosting/:id',postingController.deletePosting)

module.exports = router;
