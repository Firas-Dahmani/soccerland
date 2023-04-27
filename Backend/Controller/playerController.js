const User = require('../models/user')
const Stade = require('../models/stade')
const asyncHandler = require('express-async-handler');
const Reservation = require('../models/Reservation')
const Chat = require("../models/chatModel");

exports.allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

exports.SearchStade = async (req, res) => {
    const {stadename, villeID} = req.body
    let query = {}

    if(stadename) query.Nom = new RegExp(stadename, 'i')
    if(villeID) query.Ville = villeID

    try {
        const stades = await Stade.find(query)
        .populate('Ville')
        res.json({
            status: "SUCCESS",
            message: "Satde a été trouvé avec succès",
            stade: stades
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche de stade!!"
        })
    }
}

exports.getStadeByID = async (req, res) => {
    const { id } = req.params
    const {_id} = req.user

    try {
        let stadeData = await Stade.findById({_id:id})
        .populate({
            path:"Reservations",
            match: {
                $or : [
                    {User: {$eq: _id}},
                    {User: []}
                ]
            }
        })
        .populate("Ville")
        .populate("User")
        res.json({
            status: "SUCCESS",
            message: "Stade trouvé avec succès !",
            Stade: stadeData
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche de Stade!!"
        })
    }
}

exports.Reserver = async (req, res) => {
    const {id} = req.body
    const {_id} = req.user

    try {
        const reservation = await Reservation.findByIdAndUpdate(
            id,
            {$push: { User: _id },Reserved : true},
        )
        .populate("UserId", "_id")
        .populate("StadeId", 'Nom User')
        
        res.json({
            status: "SUCCESS",
            message: "Réservé !",
            reservation:reservation
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la réservation!!"
        })
    }
}

exports.CancelReserv = async (req, res) => {
    const {id} = req.body
    const {_id} = req.user

    try {
        await Reservation.findByIdAndUpdate(
            id,
            {$pull: { User: _id }, Reserved : false},
        )

        res.json({
            status: "SUCCESS",
            message: "la réservation est annulée !"
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'annulation de la réservation!!"
        })
    }
}

exports.SearchGroupe = async (req, res) => {
    const {Nom} = req.body
    const {_id} = req.user
    let group_Status = ''
    let groupe = []

    try {
        const chats = await Chat.find({
            "$and":[
                {groupAdmin: {$ne : _id}},
                {isGroupChat: true},
                {chatName :new RegExp(Nom, 'i')}
            ]
         })
        .populate("groupAdmin", "firstName")
        .populate("users","firstName lastName pic Groups")

        chats.map((chat)=> {
            if((chat.users).some(element => (element._id).equals(req.user._id))){
                chat.users.map((u)=> {
                    if((u._id).equals(req.user._id)){
                        u.Groups.map(async(group)=> {
                            if((group.id).equals(chat._id)){
                                if(group.status === 'demandeUser'){
                                    group_Status = 'User'
                                }else if(group.status === 'demandeAdmin'){
                                    group_Status = 'Group'
                                }else if(group.status === 'member'){
                                    group_Status = 'Member'
                                }
                            }
                        })
                    }
                })
            }else{
                group_Status = 'OUT'
            }
            groupe.push({
                chat,
                group_Status
            })
        })
        
        res.json({
            status: "SUCCESS",
            message: "Recherche de groupe réussie!!",
            groups: groupe,
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de la recherche du groupe!!"
        })
    }
}

exports.SendRequestGroup = async (req, res) => {
    const {chatId} = req.body
    const {_id} = req.user

    try {
        //Update in chat model 
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            {$push: { users: _id }},
        )

        await User.findByIdAndUpdate(
            _id,
            {$push: { Groups: {id: chatId, status: "demandeUser"}}},
        )
        res.json({
            status: "SUCCESS",
            message: "Demande envoyée!!",
            chat:chat
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'envoi de la demande!!"
        })
    }
}

exports.AcceptGroup = async (req, res) => {
    const { chatId} = req.body;
    try {
        await User.findOneAndUpdate({
            "_id": req.user._id,
            "Groups.id": chatId
        }, {
            "$set": {
                "Groups.$.status": "member"
            }
        }, {
            new: true
        });

        res.json({
            status: "SUCCESS",
            message: "Accepter!!"
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors de l'acceptation du groupe!!"
        })
    }
}

exports.LeaveGroupe = async (req, res) => {
    const {chatId} = req.body;
    const {_id} = req.user

    try {
        await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: _id} })

        await User.findByIdAndUpdate(
            _id,
            { $pull: { Groups: {id: chatId} } })

            res.json({
                status: "SUCCESS",
                message: "Rejeter!!"
            })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Une erreur s'est produite lors du rejet du groupe!!"
        })
    }
}