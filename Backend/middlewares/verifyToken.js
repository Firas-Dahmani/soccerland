require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith("Bearer ")) {
        return res.json({
            status: "FAILED",
            message: "Not authorized, no token!"
        })
    }
    
    try {
        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = await User.findById(decoded.id).select("-password")
        req.role = req.user.role

        next()
    } catch (error) {
        return res.json({
            status: "FAILED",
            message: "Not authorized, token failed!"
        })
    }

    
}