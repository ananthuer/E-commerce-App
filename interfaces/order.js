const Order =  require('../models/order')

const CartItem = require('../models/cart-item')

exports.item = async (userId, modeOfPayment, deliveryAddress)=>{

    const items = await CartItem.find({userId: userId}).populate('productId');

    
    let itemTotal = 0;
    let discountTotal = 0;
    let netTotal = 0;

    let orderItems = [];

    

    for (let cartItem of items) {
        console.log(cartItem);
        orderItems.push({
            name: cartItem.productId.name,
            price: cartItem.productId.price,
            description: cartItem.productId.description,
            quantity: cartItem.quantity
        })
        
       
        itemTotal += cartItem.productId.price * cartItem.quantity;

        discountTotal += (cartItem.productId.price - cartItem.productId.offer_price ) * cartItem.quantity;

    }

    netTotal = itemTotal - discountTotal;

    



    const newOrder = new Order ({

        items:orderItems,

    total:netTotal,
    
    discount:discountTotal,
    
    itemTotal,

    userId:userId,

     modeOfPayment : modeOfPayment,

         
    deliveryAddress: deliveryAddress,


   
    })

    await newOrder.save()

    await CartItem.deleteMany({userId})

    return newOrder;
}

exports.getOrder =  async ( userId, status, from_date, to_date)=>{

    const orders = await Order.find({userId})
    
    let condition = {
        userId
    }

    

    // const { status, from_date, to_date } = req.query;

    if (status != undefined) {
        condition["status"] = status;
    }

    if (from_date != undefined) {
        condition["createdAt"] = {
            $gte: new Date(from_date)
        };
    }

    if (to_date !=undefined){
        let toDate = new Date (to_date);
        
        condition["createdAt"]["$lte"]= new Date (to_date)
    }
  
    console.log(condition);

    

    return orders;


}

exports.getStatus = async(orderId, status)=>{

    const order = await Order.findById(orderId);


   order.status = status
  


    await order.save()

    return order;


}

