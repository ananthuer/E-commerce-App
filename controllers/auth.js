const { body, validationResult } = require('express-validator');
const genPassword = require('../lib/passwordUtils').genPassword;

const authInterface = require ('../interfaces/auth')

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

    const newUser = await authInterface.register(req.body.username, req.body.password)

    res.json({
        success: true,
    user: newUser  
  })

 

   
    
   
}


exports.verifyEmail = async (req, res, next)=>{

    const verification = await authInterface.verifyEmail(req.body.otp, req.body.userId)
    

    return verification;
}