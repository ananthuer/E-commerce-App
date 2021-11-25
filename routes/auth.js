const router = require('express').Router();
const passport = require('passport');

const { body } = require('express-validator');




const authController = require('../controllers/auth');



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


router.post('/verify-email',authController.verifyEmail);




//  passport.authenticate('local',));
 
 
 
 

 


    module.exports = router;
