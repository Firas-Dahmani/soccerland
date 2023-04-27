require('dotenv').config()
const User = require('../models/user')
const Ville = require('../models/Ville')
const Stade = require('../models/stade')
const ContactMessage = require('../models/Contact')
const nodemailer = require("nodemailer");
const {
    v4: uuidv4
} = require('uuid');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAil, // generated ethereal user
        pass: process.env.AUTH_PASS, // generated ethereal password
    },
});

// Home page 
// See user owner and player ==> accept -- delete user
exports.seeUser = async (req, res) => {
    try {
        const users = await User.find({
            role: 'User',
            isAvail: false
        })

        res.json({
            status: "SUCCESS",
            message: "Tous les utilisateurs sont disponibles !",
            users: users
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'affichage des utilisateurs!"
        })
    }
}

exports.acceptUser = async (req, res) => {
    const {
        id
    } = req.params
    const {
        email
    } = req.body

    // send mail with defined transport object
    const mailOptions = {
        from: process.env.AUTH_EMAil, // sender address
        to: email, // list of receivers
        subject: "Admin Acceptez votre compte ✔", // Subject line
        text: "Hey", // plain text body
        html: `    <p>Admin Acceptez votre profil, vous pouvez utiliser l'application maintenant.</p><p>SoccerLand</p>`, // html body
    };

    try {
        await User.findByIdAndUpdate( id,{ 
            isAvail: true
        })
        await transporter.sendMail(mailOptions)
        res.json({
            status: "SUCCESS",
            message: "Utilisateur accepté avec succès!"
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'acceptation de l'utilisateur !"
        })
    }
}

exports.deleteUser = async (req, res) => {
    const {
        id
    } = req.params

    try {
        await User.deleteOne({
            _id: id
        }, {
            isAvail: true
        })
        res.json({
            status: "SUCCESS",
            message: "Utilisateur supprimé avec succès !"
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la suppression de l'utilisateur !"
        })
    }
}

exports.addOwner = async (req, res) => {
    const checkEmail = await User.find({
        email: req.body.email
    })

    if (checkEmail.length > 0){
        return res.json({
            status: "FAILED",
            message: "L'utilisateur avec l'adresse e-mail fournie existe déjà"
        })
    }

    try {
        const Pass = uuidv4()
        const user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            tel: req.body.tel,
            birthDay: new Date(req.body.date),
            Genre: req.body.genre,
            adress: req.body.adress,
            VilleID: req.body.ville,
            password: Pass,
            role: 'Owner',
            pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            isAvail: true,
            verified: true
        })

        await user.save()
        res.json({
            status: "SUCCESS",
            message: "Compte enregistré avec succès !",
            User: user,
            Password: Pass
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'enregistrement du compte utilisateur"
        })
    }
}

// Add Ville 
exports.addVille = async (req, res) => {
    const {
        villeName
    } = req.body
    const VilleUpper = villeName.toUpperCase()

    const checkVille = await Ville.find({
        villeName: VilleUpper
    })
    
    if(checkVille.length > 0){
        return res.json({
            status: "FAILED",
            message: "Ville name has been aded before!"
        })
    }
        

    try {
        const ville = new Ville({
            villeName: VilleUpper
        })
        ville.save()
        res.json({
            status: "SUCCESS",
            message: "Ville a été enregistrée avec succès!",
            ville: ville
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'enregistrement de ville!"
        })
    }
}

exports.deleteVille = async (req, res) => {
    const {
        id
    } = req.body

    try {
        await Ville.deleteOne({
            _id: id
        }).then(async () => {
            await Stade.deleteMany({
                    Ville: id
                })
        })
        res.json({
            status: "SUCCESS",
            message: "Ville supprimée avec succès !"
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la suppression de ville !"
        })
    }
}

exports.contactMessageView = async (req, res) => {
    try {
        const messages = await ContactMessage.find({})
        res.json({
            status: "SUCCESS",
            message: "Message de contact trouvé avec succès ",
            messages: messages
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche du message de contact !!"
        })
    }
}

exports.deleteMessage = async (req, res) => {
    const {
        MESSAGE_ID
    } = req.body

    try {
        await ContactMessage.deleteOne({
            _id: MESSAGE_ID
        })
        res.json({
            status: "SUCCESS",
            message: "Message supprimé avec succès !!"
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la suppression du message !!"
        })
    }
}