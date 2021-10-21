/**
 * 
 * 
 * name => string
 * product_code => string
 * price => Number
 * offer_price
 * description
 * thumbnail => string
 * images => Array of Sstrings
 */



 const mongoose = require('mongoose');

 const productSchema = new mongoose.Schema({
     name: String,
     product_code: String,
     price: Number,
     offer_price: Number,
     description: String,
     thumbnail: String,
     image: [{
        type: String
    }]
 });
 
 
 
 const Product = mongoose.model('Product', productSchema);
 
 // Expose the connection
 module.exports = Product;