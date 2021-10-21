const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const User = require('../models/user');
var jwt = require('jsonwebtoken');


exports.updateUser =  async (req, res, next) =>{
    const existingUser = await User.findOne({ username: req.user.username });
     
    if (existingUser == null) {
        return res.json({
            success: false,
            message: "User not found"
        })
    }
     existingUser.name = req.body.name || existingUser.name;
     existingUser.location = req.body.location || existingUser.location;
     existingUser.role = req.body.role || existingUser.role;

   await existingUser.save()
    

    res.json({
        success: true,
        user: existingUser
    })
}

exports.getUser =   async(req, res, next) =>{
    const existingUser = await User.findOne({ username: req.user.username });
     

    res.json({
        success: true,
        user: existingUser
    })
}
