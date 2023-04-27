var mongoose = require('mongoose')
var PasswordResetSchema = mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    resetString: {
        type: String,
        required:true
    },
    createAt: {
        type: Date,
        required:true
    },
    expiredAt: {
        type: Date,
        required:true
    }})
module.exports = mongoose.model('PasswordReset', PasswordResetSchema)