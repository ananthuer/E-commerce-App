const mongoose = require('mongoose');
const User = require('./user');


const orderStatus = [
    "Pending", // 1
    'Confirmed', // 2
    "Delivered", //3
    "Cancelled" // 4
]


const orderSchema = new mongoose.Schema({

    userId : {
        ref: User,
        type: mongoose.Schema.Types.ObjectId
    },

    items : [{
        name : String,
        description : String,
        price : Number,
        quantity : Number
    }],
    
    total : Number,

    discount : Number,
    itemTotal : Number,
    status : {type:Number, default:1},
    modeOfPayment : Number,
    deliveryAddress: String

}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
          ret.status = {
              id: doc.status,
            value: orderStatus[doc.status - 1]
          }
          delete ret.__v;
        }
    }
} 
  )


const Order = mongoose.model('order', orderSchema);

module.exports = Order;