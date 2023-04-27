const express = require('express')
const router = express.Router()
const playerController = require('../Controller/playerController')
const verifyToken = require("../middlewares/verifyToken")

//chat search users
router.route("/").get(verifyToken.protect, playerController.allUsers);

//search satde
router.post('/searchstade', verifyToken.protect, playerController.SearchStade)
router.post('/getstadebyID/:id', verifyToken.protect,playerController.getStadeByID)
router.post('/reserver', verifyToken.protect,playerController.Reserver)
router.post('/annulerRes', verifyToken.protect,playerController.CancelReserv)

//search groupe
router.post('/searchgroupe', verifyToken.protect, playerController.SearchGroupe)
router.post('/accept', verifyToken.protect, playerController.AcceptGroup)
router.post('/leave', verifyToken.protect, playerController.LeaveGroupe)
router.post('/sendReq', verifyToken.protect, playerController.SendRequestGroup)


module.exports = router;