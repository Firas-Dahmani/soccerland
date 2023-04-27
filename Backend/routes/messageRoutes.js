const express = require("express");
const verifyToken = require("../middlewares/verifyToken")
const {
  allMessages,
  sendMessage,
} = require("../Controller/messageControllers");

const router = express.Router();

router.route("/:chatId").get(verifyToken.protect, allMessages);
router.route("/").post(verifyToken.protect, sendMessage);

module.exports = router;