const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  AcceptRequest,
  fetchReqGroup,
} = require("../controller/chatControllers");
const verifyToken = require("../middlewares/verifyToken")

const router = express.Router();

router.route("/").post(verifyToken.protect, accessChat);
router.route("/").get(verifyToken.protect, fetchChats);
router.route("/group").post(verifyToken.protect, createGroupChat);
router.route("/rename").put(verifyToken.protect, renameGroup);
router.route("/groupremove").put(verifyToken.protect, removeFromGroup);
router.route("/groupadd").put(verifyToken.protect, addToGroup);
router.route("/fetch").post(verifyToken.protect, fetchReqGroup);
router.route("/accReq").put(verifyToken.protect, AcceptRequest);

module.exports = router;