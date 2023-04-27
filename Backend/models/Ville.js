const mongoose = require('mongoose')
const villeSchema = mongoose.Schema({
    villeName: {
        type: String,
        uppercase: true,
        required:true
    }})
module.exports = mongoose.model('Ville', villeSchema)