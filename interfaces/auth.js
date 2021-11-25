const User = require('../models/user');
const genPassword = require('../lib/passwordUtils').genPassword;

const EmailVerification = require('../models/email');

exports.register = async(username, password) =>{
    const user = await User.findOne({username})



    if (user == null) { const saltHash = genPassword(password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;
    
        const newUser = new User({
            username: username,
            hash: hash,
            salt: salt
        });

        let otp = Math.floor(100000 + Math.random() * 900000);

        

        await EmailVerification.create({userId: newUser.id, emailOtp: otp})


        const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(require('../config/sendgrid').KEY)
        const msg = {
          to: newUser.username, // Change to your recipient
          from: 'anandhuraina003@gmail.com', // Change to your verified sender
          subject: 'verify your email',
          text:`your otp is ${otp} `
        }
        const result = await sgMail
          .send(msg);

          console.log(result)


        await newUser.save()

        return newUser;

        
        
    
        }
        return null;
        
} 

exports.verifyEmail =  async(emailOtp, userId)=>{

    const verification = await EmailVerification.findOne({emailOtp: emailOtp, userId: userId})

   verification.emailOtp = null;
   verification.isVerified = true;
    await verification.save()


}
