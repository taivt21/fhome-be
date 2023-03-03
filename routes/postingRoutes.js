const express = require("express");
const postingController = require("../controllers/postingController");
// const authorize = require("../middlewares/authorize");
const router = express.Router();

router.post('/postingNew',postingController.createPosting)
module.exports = router;