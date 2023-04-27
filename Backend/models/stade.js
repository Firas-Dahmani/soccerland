const mongoose = require('mongoose')

const stadeSchema = new mongoose.Schema({
    User : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    Ville: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Ville",
        required:true
    },
    Nom: String,
    Photo: String,
    Open:String,
    Description: String,
    Tel:String,
    Reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Reservation",
    }]
})

module.exports = mongoose.model('Stade',stadeSchema)