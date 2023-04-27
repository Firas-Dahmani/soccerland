const express = require('express')
const router = express.Router()
const rootController = require('../Controller/rootController')
const verifyToken = require("../middlewares/verifyToken")

//ville
router.get('/getVille', rootController.showVille)
//Satde
router.post('/addStade',verifyToken.protect, rootController.createStade)
router.post('/getStade', verifyToken.protect, rootController.getAllStadeByVille)
router.post('/getMystade', verifyToken.protect, rootController.getMyStadeName)
router.post('/removeStade', verifyToken.protect, rootController.deleteStade)
//User 
router.post('/profile', verifyToken.protect, rootController.profileUserView)
router.post('/updatepic', verifyToken.protect, rootController.changePhoto)
router.post('/updateprofile', verifyToken.protect, rootController.editProfile)
//saerch Users 
router.post('/search', verifyToken.protect, rootController.searchUsers)
//reservation
router.post('/createEvent',verifyToken.protect, rootController.createReservation)
router.post('/getEvent',verifyToken.protect, rootController.getAllReservation)
router.post('/removeReservation',verifyToken.protect,  rootController.deleteReservation)

module.exports = router;