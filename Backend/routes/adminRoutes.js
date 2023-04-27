require('dotenv').config()
const router = require("express").Router()
const adminController = require("../Controller/adminController")
const verifyToken = require("../middlewares/verifyToken")

//User
router.post('/seeUser', verifyToken.protect, adminController.seeUser)
router.post('/acceptUser/:id', verifyToken.protect, adminController.acceptUser)
router.post('/deleteUser/:id', verifyToken.protect, adminController.deleteUser)
router.post('/addOwner', verifyToken.protect, adminController.addOwner)

//Ville
router.post('/addVille', verifyToken.protect, adminController.addVille)
router.post('/removeVille', verifyToken.protect, adminController.deleteVille)

//Profile
router.post('/messageContact', verifyToken.protect, adminController.contactMessageView)
router.post('/deletemessageContact', verifyToken.protect, adminController.deleteMessage)


module.exports = router;