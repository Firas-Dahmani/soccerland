let mongoose = require('mongoose')
let bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    firstName: {type: String },
    lastName: {type: String },
    email: {type: String, unique: true},
    tel: {type: String },
    birthDay: {type: Date, default: Date.now},
    Genre: {type: String },
    adress: { type: String },
    VilleID: { type: String },
    Poste: { type: String},
    password: { type: String, required: true},
    role: { type: String, required: true},
    pic: { type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    isAvail: {type: Boolean, default: false},
    verified: { type: Boolean, default: false},
    Groups:[{
        id:{ type: mongoose.Schema.Types.ObjectId, 
            ref:"User" 
        },
        status:String
    }], 
    notification : [{
        content: Object,
        __Notification:String
    }]
}, 
{ timestamp: true }
)

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

module.exports = mongoose.model('User',userSchema)
