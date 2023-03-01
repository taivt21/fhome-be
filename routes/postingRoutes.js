const express = require("express");
const postingController = require("../controllers/postingController");
// const authorize = require("../middlewares/authorize");
const router = express.Router();

router.post('/postingNew',postingController.createPosting)
router.get('/getAllPostings',postingController.getAllPostings)
router.get('/getPostingById/:id',postingController.getPostingById)
router.put('/updatePosting/:id',postingController.updatePosting)
router.delete('/deletePosting/:id',postingController.deletePosting)

module.exports = router;