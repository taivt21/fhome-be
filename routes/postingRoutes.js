const express = require("express");
const postingController = require("../controllers/postingController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const uploadImage = require("../middlewares/uploadImage");
router.post('/postingNew',uploadImage, authenticate, postingController.createPosting)
router.get('/getAllPostings',postingController.getAllPostings)
router.get('/getPostingById/:id',postingController.getPostingById)
router.put('/updatePosting/:id',postingController.updatePosting)
router.delete('/deletePosting/:id',postingController.deletePosting)

module.exports = router;