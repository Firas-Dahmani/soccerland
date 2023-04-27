require('dotenv').config()
const generateToken = require("../Utlis/generateToken");
const User = require('../models/user')
const UserVerification = require('../models/userVerification')
const PasswordReset = require('../models/PasswordReset')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');


 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.AUTH_EMAil, // generated ethereal user
      pass: process.env.AUTH_PASS, // generated ethereal password
    },
  });

  transporter.verify((err, success)=> {
      if(err){
          console.log(err);
      } else {
          console.log("Ready for message");
      }
  })

exports.registerUser = async (req, res) =>{
    // Checking if user already existe
    await User.find({email : req.body.email})
    .then( async (result) => {
        // A user aleady existe
        if(result.length){
            res.json({
                status: "FAILED",
                message: "User with the provided email already existes"
            })
        }else{
            const user = new User({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                tel: req.body.tel,
                birthDay: new Date(req.body.date),
                Genre: req.body.genre,
                adress: req.body.adress,
                VilleID: req.body.ville,
                Poste: req.body.poste,
                password: req.body.password,
                role: 'User',
                pic: req.body.pic,
            })

            await user.save()
            .then(userResult => {
                sendVerificationEmail(userResult, res)
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occured while saving user account!"
                })
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: "FAILED",
            message: "An error occured while checking for existing user!"
        })
    })
}

//Verif Email
const sendVerificationEmail = ({_id, email, firstName, lastName}, res) => {
    const uniqueString = uuidv4() + _id

     // send mail with defined transport object
    const mailOptions =  {
        from: process.env.AUTH_EMAil, // sender address
        to: email, // list of receivers
        subject: "Email Verification ✔", // Subject line
        text: "Hey" + firstName + lastName, // plain text body
        html: `    <p>Verifier your email adress to complete the signup and 
        and login into your account.</p><p>This link <strong>expires in 6 hours</strong></p>
        <p>Presse <a href=${"http://localhost:5000/api/verify/" + _id + "/" + uniqueString}>here</a> to proceed</p>`, // html body
    };
    //hash unique String
    const saltRounds = 10
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hasheduUniqueString)=> {
            //set values in userVerification collection
            const newVerification = new UserVerification({
                userId:_id ,
                uniqueString:hasheduUniqueString,
                createAt:Date.now(),
                expiredAt:new Date(Date.now() + 6 * (60 * 60 * 1000) ),
            })

            newVerification
                .save()
                .then(()=> {
                    transporter
                        .sendMail(mailOptions)
                        .then(()=> {
                            // email sent and verification record saved
                            res.json({
                                status: "PENDING",
                                message: "Verification email sent !"
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                status: "FAILED",
                                message: "Verification email failed!"
                            })
                        })
                })
                .catch((error) => {
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "Couldn't save verification email!"
                    })
                })
        })
        .catch(() => {
            res.json({
                status: "FAILED",
                message: "An error occured while hashing email data!"
            })
        })
}

// Verify email
exports.verifyEmail = (req, res) => {
    let {userId, uniqueString} = req.params;

    UserVerification
    .find({userId})
    .then((result) => {
        if(result.length > 0){
            // user verification record existe so we proceed
            const {expiredAt} = result[0]
            const hasheduUniqueString = result[0].uniqueString

            // checking for expired unique string
            if (expiredAt < Date.now()){
                // record has expired so we delete it 
                UserVerification.deleteOne({userId})
                .then(result => {
                    User.deleteOne({_id: userId})
                    .then(()=> {
                        let message = "Link has been expired. Please sign up again"
                        res.redirect(`/api/verified/h&error=true&message=${message}`)
                    })
                    .catch(() =>{
                        let message = "clearing user with expired unique string failed "
                        res.redirect(`/api/verified/h&error=true&message=${message}`)
                    })
                })
                .catch(() => {
                    let message = "An error occured while clearing expired user verification record "
                    res.redirect(`/api/verified/h&error=true&message=${message}`)
                })

            } else {
                // valid record existe so we validate the user string
                // first compare the hashed unique string 
                bcrypt.compare(uniqueString, hasheduUniqueString)
                .then((result) => {
                    if(result){
                        // string match  
                        User
                        .updateOne({_id: userId},{verified: true})
                        .then(() => {
                            UserVerification
                                .deleteOne({userId})
                                .then(()=> {
                                    res.sendFile(path.join(__dirname, "./../Views/Verrfied.html"))
                                })
                                .catch(error => {
                                    console.log(error);
                                    let message = "An error occured while finalizing successful verification"
                                    res.redirect(`/api/verified/h&error=true&message=${message}`)
                                })
                        })
                        .catch(error => {
                            console.log(error);
                            let message = "An error occured while user record to show verified"
                            res.redirect(`/api/verified/h&error=true&message=${message}`)
                        })   
                    } else {
                        // existing record but incorrect verification
                        let message = "Invalid verification details passed. Check you email."
                        res.redirect(`/api/verified/h&error=true&message=${message}`)
                    }
                })
                .catch(err => {
                    let message = "An error occured while comparing unique string. "
                    res.redirect(`/api/verified/h&error=true&message=${message}`)
                })
            }
        } else {
            // user verification record doesn't exist
            let message = "Account record doesin't exist or has been verified already. Please sign up or login "
            res.redirect(`/api/verified/h&error=true&message=${message}`)
        }
    })
    .catch((error) => {
        console.log(error);
        let message = "An error occured while checking for existing user verification record"
        res.redirect(`/api/verified/h&error=true&message=${message}`)
    })
}

exports.EmailVerified = (req, res) => {
    res.sendFile(path.join(__dirname, "./../Views/Verrfied.html"))
}


exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    
    await User.find({ email })
    .then(data => {
        if(data.length){
            // User existe 
            // checks if user verified
            if(!data[0].verified) {
                res.json({
                    status: "FAILED",
                    message: "Email has'nt been verified yet. Check you email!"
                })
            } else {
                const hashedPassword = data[0].password
                bcrypt.compare(password, hashedPassword)
                .then(result => {
                    if(result){
                        res.json({
                            status: "SUCCESS",
                            message: "Login successful",
                            data: data,
                            token: generateToken(data[0]._id)
                        })
                    }else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid Password entred!"
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "An error occured while comparing Password!"
                    })
                })
            }            
        }else{
            res.json({
                status: "FAILED",
                message: "Invalid Email entred!"
            })
        }
    })
    .catch(() => {
        res.json({
            status: "FAILED",
            message: "An error occured while checking for existing user!"
        })
    })
}

// Password reset stuff
exports.PasswordResetReq = (req, res) => {
    const {email, redirectUrl} = req.body

    //check if email existe 
    User.find({email})
        .then((data) => {
             if(data.length){
                // user existe
                

                // check if user verified
                if(!data[0].verified){
                    res.json({
                        status: "FAILED",
                        message: "Email hasn't been verified yet. Check your email"
                    })
                }else {
                    sendResetEmail(data[0], redirectUrl, res)
                }
             } else {
                res.json({
                    status: "FAILED",
                    message: "No account with the supplied email exists"
                })
             }
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user!"
            })
        })
}

// send password reset email 
const sendResetEmail = ({_id, email, firstName, lastName}, redirectUrl, res) => {
    const resetString = uuidv4() + _id

     // First, we clear all existing reset records
     PasswordReset
        .deleteMany({ userId : _id})
        .then(result => {
            // Reset record deleted successfuly
            // Now we send th email
            const mailOptions =  {
                from: process.env.AUTH_EMAil, // sender address
                to: email, // list of receivers
                subject: "Password Reset ✔", // Subject line
                text: "Hey" + firstName + lastName, // plain text body
                html: `<p>We heared that you lost the password.</p><p>Don't worry, use the link below to reset it </p><p>This link <strong>expires in 60 minutes</strong></p>
                <p>Presse <a href=${redirectUrl + "/" + _id + "/" + resetString}>here</a> to proceed</p>`, // html body
            };

            // hash the reset string 
            const saltRounds = 10 
            bcrypt.hash(resetString, saltRounds)
                .then((hasheResetString => {
                    // set value in password reset collection 
                    const newPasswordReset = new PasswordReset({
                        userId:_id ,
                        resetString:hasheResetString,
                        createAt:Date.now(),
                        expiredAt:new Date(Date.now() + 1 * (60 * 60 * 1000) ),
                    })

                    newPasswordReset
                        .save()
                        .then(()=>{
                            transporter
                                .sendMail(mailOptions)
                                .then(()=> {
                                    // reset email sent and password reset record saved
                                    res.json({
                                        status: "PENDING",
                                        message: "Password reset email sent!"
                                    })
                                })
                                .catch((err)=> {
                                    console.log(err);
                                    res.json({
                                        status: "FAILED",
                                        message: "Password reset email failed!"
                                    })
                                })
                        })
                        .catch((err)=> {
                            console.log(err);
                            res.json({
                                status: "FAILED",
                                message: "Couldin't save password reset data!"
                            })
                        })
                }))
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while hashing the password reset data!"
                    })
                })

        })
        .catch((error)=> {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "An error occured while deleting existing password reset record!"
            })
        })
}

exports.resetPassword = (req, res) => {
    const {userId, resetString, newPassword} = req.body 

    PasswordReset
        .find({userId})
        .then(result => {
            if(result.length > 0){
                // password reset record exist so we proceed

                const {expiredAt} = result[0]
                const hashedResetPassword = result[0].resetString
                if(expiredAt < Date.now()){
                    PasswordReset.deleteOne({userId})
                    .then(()=> {
                        // Reset record deleted successfuly
                        res.json({
                            status: "FAILED",
                            message: "Password reset link has expired!"
                        })
                    })
                    .catch((error)=> {
                        // deliting failed
                        console.log(error);
                        res.json({
                            status: "FAILED",
                            message: "Clearing password reset record failed !"
                        })
                    })
                } else {
                    // valid reset record exists so we validate the reset string
                    
                    // First compare the hashed reset string 
                    bcrypt.compare(resetString, hashedResetPassword)
                        .then((results) => {
                            if(results){
                                // string match 
                                // hash password again
                                const saltRounds = 10
                                bcrypt.hash(newPassword, saltRounds)
                                    .then((hashedPassword)=> {
                                        User.updateOne({_id: userId}, {password:hashedPassword})
                                            .then(()=> {
                                            // Update complete, Delete reset record
                                            PasswordReset.deleteOne({userId})
                                                .then(()=> {
                                                    // both user record and reset record updated

                                                    res.json({
                                                        status: "SUCCESS",
                                                        message: "Password has been reset successufly"
                                                    })
                                                })
                                                .catch(()=> {
                                                    res.json({
                                                        status: "FAILED",
                                                        message: "An error occured while finalizing password reset!"
                                                    })
                                                }) 
                                        })
                                        .catch(()=> {
                                            res.json({
                                                status: "FAILED",
                                                message: "Updating User Password Failed!"
                                            })
                                        })
                                    })
                                    .catch((err)=> {
                                        console.log(err);
                                        res.json({
                                            status: "FAILED",
                                            message: "An error occured while hashing password !"
                                        })
                                    })
                            } else {
                                // Existing record but incorrect reset string passed
                                res.json({
                                    status: "FAILED",
                                    message: "Invalid password reset details passed!"
                                }) 
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "Comparing password reset string failed!"
                            }) 
                        })
                }
            } else {
                // Password reset record doesn't existe
                res.json({
                    status: "FAILED",
                    message: "Password reset request not found!"
                }) 
            }
        })
        .catch((error)=> {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "Checking for existing password reset record failed!"
            })
        })
}
