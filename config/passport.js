const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = require ('../models/user')
const validPassword = require('../lib/passwordUtils').validPassword;

const customfields = {
    usernamefield: 'username',
    passportfield: 'pw'
};

const verifyCallback = (username, password, done, res,)=>{
  
          User.findOne({ username: username })
          .then((user)=>{

            console.log(user);
    
            if(!user){ return done (null, false)}
    
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid){
                return done (null, user);     
              } else{
                  return done (null, "You are not authorized user")
              }

              })
              .catch((err)=>{
                  console.log("error", err);
                  done(err);
              }); 
         
}
const Strategy = new LocalStrategy(customfields, verifyCallback);

passport.use(Strategy);
passport.serializeUser((userId, done)=>{
    done(null, userId);
});

passport.deserializeUser((userId, done)=>{
    if (userId != "You are not authorized user") {
        User.findById(userId)
        .then((user)=>{
            done(null, user);
    
        })
        .catch(err => done(err))
    } else {
        done(null, null)
    }
    
})


