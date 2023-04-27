const Contact = require("../models/Contact")

exports.SendContact = async (req, res) => {
    const {
        name,
        email, 
        phone,
        messageContact
    } = req.body

    const contact = await new Contact({
        name : name, 
        email: email, 
        phone: phone,
        message : messageContact
    })
    
    await contact.save()
    .then(()=> {
        res.json({
            status: "SUCCESS",
            message: "Your message has been send successfuly"
        })
    })
    .catch((err)=> {
        console.log(err);
        res.json({
            status: "FAILED",
            message: "An error occured while saving message !"
        })
    })
}