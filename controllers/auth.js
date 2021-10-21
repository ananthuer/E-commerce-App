const { body, validationResult } = require('express-validator');
const genPassword = require('../lib/passwordUtils').genPassword;

const User = require('../models/user');
var jwt = require('jsonwebtoken');


exports.login
 = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    var token;

    console.log(req.user);

    if (req.user != "You are not authorized user") {
         token = jwt.sign( { id: req.user._id, username: req.user.username }, 'qwertyy');
         return res.json({success:true,message: req.user, token})
    }

    return res.json({success:false,message: "you are not authorised"})
}

exports.register = async (req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //User.findOne => user => not null => User already exists

    const user = await User.findOne({username:req.body.username});

  

   

    if (user == null) { const saltHash = genPassword(req.body.password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;
    
        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt
        });
        await newUser.save()
        
        res.json({
            success: true,
        user: newUser  
      })
    
        }else{
            return res.status(400).json({message:"User already exists"})
        }
 

   
    
   
}