const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');


const cartItemSchema = new mongoose.Schema({
    userId : {
        ref: User,
        type: mongoose.Schema.Types.ObjectId
    },

    
    productId : {
        ref: Product,
        type:  mongoose.Schema.Types.ObjectId
    },
    quantity:{type:Number, default:1}
    

   
    

})

const cartItem = mongoose.model('cartItem', cartItemSchema);

module.exports = cartItem;