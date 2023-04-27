const Ville = require('../models/Ville')
const Stade = require('../models/stade')
const User = require('../models/user')
const cloudinary = require("../Utlis/cloudinary")
const bcrypt = require('bcrypt');
const Reservation = require('../models/Reservation')
const mongoose = require('mongoose')

exports.profileUserView = async (req, res) => {
    const { _id } = req.user

    try {
        const user = await User.find({_id}).select('-password')
        res.json({
            status: "SUCCESS",
            message: "Utilisateur trouvé avec succès!!",
            User : user
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche du profil de l'utilisateur !!"
        })
    }
}

exports.changePhoto = async (req, res) => {
    const { _id } = req.user
    try {
        const uploadPic = await cloudinary.uploader.upload(req.body.pic , {
            public_id: _id + Date.now(),
            folder:"photoProfile"
        })
        
        await User.findByIdAndUpdate(_id , {
            pic: uploadPic.secure_url
        })

        res.json({
            status: "SUCCESS",
            message: "Mettre à jour la photo avec succès !!"
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la mise à jour de l'image!!"
        })
    }
}

exports.editProfile = async (req, res) => {
    const {
        firstName,
        lastName,
        email, 
        tel,
        date,
        genre,
        adress,
        ville,
        password
    } = req.body
    const { _id } = req.user
    const saltRounds = 10

    let objForUpdate = {}

    if(firstName) objForUpdate.firstName = firstName
    if(lastName) objForUpdate.lastName = lastName
    if(email) objForUpdate.email = email
    if(tel) objForUpdate.tel = tel
    if(date) objForUpdate.birthDay = date
    if(genre) objForUpdate.Genre = genre
    if(adress) objForUpdate.adress = adress
    if(ville) objForUpdate.VilleID = ville
    if(password) objForUpdate.password = password

    try {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            await User.updateOne({_id}, {password:hashedPassword})
            res.json({
                status: "SUCCESS",
                message: "Le mot de passe a été réinitialisé avec succès"
            })
        } else {
            await User.updateOne({ _id}, {$set : objForUpdate}, { omitUndefined: 1})
            res.json({
                status: "SUCCESS",
                message: "Utilisateur mis à jour avec succès !!"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la mise à jour de l'utilisateur !!"
        })
    }
}

exports.showVille = async (req, res) => {
    try {
        const villes = await Ville.find({})
        res.json({
            status: "SUCCESS",
            message: "Ville trouver avec succès!",
            ville: villes
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche de ville !"
        })
    }
}

exports.createStade = async (req, res) => {
    const {
        VilleID,
        Nom,
        Photo,
        OpenTime,
        Description,
        Tel,
    } = req.body
     const {_id} = req.user 
     const StadeExiste = await Stade.find({Nom: Nom})


    if(StadeExiste.length > 0){
        return res.json({
            status: "FAILED",
            message: "Stade Exist!"
        })
    } 

        try {
             const uploadPic = await cloudinary.uploader.upload(Photo, {
                public_id: _id+Nom,
                folder:"Stade"
            })

            let StadeData = new Stade({
                User:_id,
                Ville:VilleID,
                Nom:Nom,
                Photo:uploadPic.secure_url,
                Open:OpenTime,
                Description:Description,
                Tel:Tel
            })
    
            await StadeData.save()
            res.json({
                status: "SUCCESS",
                message: "Stade sauvé avec succès!"
            })
        } catch (error) {
            res.json({
                status: "FAILED",
                message: "Une erreur s'est produite lors de l'enregistrement du stade!"
            })
        }
}

exports.getAllStadeByVille = async (req, res) => {
    const {Ville} = req.body
    const {_id} = req.user

    try {
        let stade = await Stade.find({User : _id, Ville: Ville})
        res.json({
            status: "SUCCESS",
            message: "Stade trouvé avec succès!",
            stade : stade
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche du stade !"
        })
    }

}

exports.getMyStadeName = async (req, res)=> {
    const { _id } = req.user
    try {
        const Stads = await Stade
        .find({User:_id})
        .populate("Nom")

        res.json({
            status: "SUCCESS",
            message: "Stade trouvé avec succès!",
            stade : Stads
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche du stade !"
        })      
    }
}

exports.deleteStade =  async (req, res) => {
    const { id } = req.body
    try {
        await Stade.deleteOne({ _id: id })
        res.json({
            status: "SUCCESS",
            message: "Stade supprimé avec succès !"
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la suppression de Stade !"
        })
    }   
}

exports.createReservation = async (req, res)=> {
    const { 
        StadeId,
        Prix,
        Start,
        End,
        NbjMax,
    } = req.body
    const {_id} = req.user

    try {
        let ReservationData = new Reservation({
            UserId:_id,
            StadeId: mongoose.Types.ObjectId(StadeId),
            Prix,
            Start,
            End,
            NbjMax
        })
        const stade = await ReservationData.save()
        
        await Stade.findByIdAndUpdate(
            StadeId,
            {
              $push: { Reservations: stade._id },
            }
          )
        
        res.json({
            status: "SUCCESS",
            message: " Réservation enregistrée "
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'enregistrement de la réservation !"
        })
    }
}

exports.getAllReservation = async (req, res) => {
    const { _id } = req.user
    try {
        const Reservations = await Reservation.find({UserId: _id})
        .populate('StadeId')
        .populate('User','firstName email tel')

        res.json({
            status: "SUCCESS",
            message: "Réservation trouvée avec succès!",
            Reservations : Reservations
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche de la réservation !"
        })
    }
}

exports.deleteReservation =  async (req, res) => {
    const { id } = req.body

    Reservation.deleteOne({ _id: id })
    .then(() =>{
        res.json({
            status: "SUCCESS",
            message: "Réservation supprimée avec succès !"
        })
    })
    .catch(()=> {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la suppression de la réservation !"
        })
    })  
}

exports.searchUsers = async (req, res) => {
 
    const { Poste , playerName , ville} = req.body
    const {_id} = req.user
    
    let query = User.find({
        '$and':[
            { _id: { $ne: _id } },
            {
                "$expr": {
                  "$regexMatch": {
                    "input": { "$concat": ["$firstName", " ", "$lastName"] },
                    "regex": playerName,  //Your text search here
                    "options": "i"
                  }
                }
              }
        ]
    })


    if (Poste !== null && Poste !== ""){
        query = query.regex('Poste', new RegExp(Poste,'i'))
    }

    if (ville !== null && ville !== ""){
        query = query.regex('VilleID', new RegExp(ville, 'i'))
    }

    
    await query
        .then((result)=> {
            res.json({
                status: "SUCCESS",
                message: "Les utilisateurs trouvent avec succès",
                Users : result
            })
        })
        .catch((err)=> {
            res.json({
                status: "FAILED",
                message: "Une erreur s'est produite lors de la recherche d'utilisateurs !!!"
            })
        })
      

}