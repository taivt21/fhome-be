const pushNoti = require("../controllers/pushNotification");
const authenticate = require("../middlewares/authenticate");
const express = require('express');
const router = express.Router();

router.post("/pushNoti", authenticate, pushNoti.sendNotification)

module.exports = router