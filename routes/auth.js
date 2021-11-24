const router = require('express').Router();
const passport = require('passport');

const { body } = require('express-validator');




const authController = require('../controllers/auth');
const EmailVerification = require('../models/email');


// TODO
router.post('/register',
[
    body('username')
        .isEmail()
        .withMessage('Please enter a valid email.'),

        body('password')
        .isLength({min:5})
],
authController.register

);

router.post('/registerUser', (req, res) => {
    res.json({
        message: "Hello world"
    })
})

router.post('/login',
 [
    body('username')
        .isEmail()
        .withMessage('Please enter a valid email.'),

        body('password')
        .isLength({min:5})
],
passport.authenticate('local'),
authController.login
);


router.post('/verify-email', async (req, res, next)=>{

const user = await EmailVerification.findOne({emailOtp: req.body.otp, userId: req.body.id})

if (user == undefined){
    return res.json({
        message:"invalid otp"
    })
}
user.emailOtp = null;
user.isVerified = true;
await user.save()


})

//  passport.authenticate('local',));
 
 
 
 

 


    module.exports = router;
