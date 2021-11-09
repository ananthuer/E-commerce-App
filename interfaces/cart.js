const CartItem = require('../models/cart-item')

exports.addItemToCart = async(userId, productId, quantity)=> {

    
    const cart = new CartItem({
        userId: userId,
        productId: productId,

        quantity: quantity
    });

   await cart.save()

   return cart;
}


exports.getCart = async (userId )=>{

    const items = await CartItem.find({userId: userId}).populate('productId userId');

    
    let itemTotal = 0;
    let discountTotal = 0;
    let netTotal = 0;

    let orderItems = [];

    
    

    for (let cartItem of items) {

      
        itemTotal += cartItem.productId.price * cartItem.quantity;

        discountTotal += (cartItem.productId.price - cartItem.productId.offer_price ) * cartItem.quantity;

    }

    
    netTotal = itemTotal - discountTotal;

    return items;
    
}

exports.updateCart = async(cartId, quantity)=>{

    const cart = await CartItem.findById(cartId);

    cart.quantity = quantity;
    
    await cart.save();

    return cart;
}

exports.deleteCart = async(userId)=>{
    const cart = await CartItem.findByIdAndDelete(userId);

    return cart;


    
}
