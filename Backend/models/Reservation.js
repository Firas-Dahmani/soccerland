const mongoose = require("mongoose")

const reservSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    User: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    StadeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Stade",
    },
    Prix: String,
    Start : String,
    End: String,
    Reserved : {
        type:Boolean,
        default:'false'
    },
    NbjMax: String
})

module.exports = mongoose.model('Reservation', reservSchema)