const mongoose = require('mongoose');
const User = require('./user');


const emailSchema = new mongoose.Schema({
    userId: {
        ref: User,
        type: mongoose.Schema.Types.ObjectId
    },
    emailOtp: String,
    
});


const EmailVerification = mongoose.model("email",emailSchema);

module.exports = EmailVerification;