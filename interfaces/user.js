const User = require('../models/user')

exports.getUser = async (userId) => {
    return await User.findById(userId);
}

exports.updateUser = async (userId, name, location, role) => {
    const existingUser = await User.findById(userId);
     
    if (existingUser != null) {
        existingUser.name = req.body.name || existingUser.name;
        existingUser.location = req.body.location || existingUser.location;
        existingUser.role = req.body.role || existingUser.role;
   
      await existingUser.save()

      return existingUser;
    }
   

   return null;
}