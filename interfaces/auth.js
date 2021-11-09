const User = require('../models/user');
const genPassword = require('../lib/passwordUtils').genPassword;

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
        await newUser.save()

        return newUser;
        
        
    
        }
        return null;
        
} 