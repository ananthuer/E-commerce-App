const mongoose = require('mongoose');

// const CartItem = require('./cart-item')


/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 



// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    name: String,
    location: String,
    role: Number,
    isVerified: {type: Boolean, default: false}
}, {
    toJSON: {
        transform: function (doc, ret) {
          delete ret.hash;
          delete ret.salt;
          delete ret.__v;
        }
      }
});



const User = mongoose.model('User', UserSchema);

// Expose the connection
module.exports = User;