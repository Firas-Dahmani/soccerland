require('dotenv').config()
const mongoose = require('mongoose')
function connectDb() 
{

    mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true})
    const con = mongoose.connection
    con.on('open', () => {
        console.log("database connected in mongo atlas (#cloud)");
    })
}

module.exports = connectDb