const CartItem = require('../models/cart-item')


const Order =  require('../models/order')




exports.item = async (req, res, next)=>{

    //Fetch cart

    
    const items = await CartItem.find({userId: req.user.id}).populate('productId');
    


    let itemTotal = 0;
    let discountTotal = 0;
    let netTotal = 0;

    let orderItems = [];

    for (let cartItem of items) {
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

    userId:req.user.id,

        modeOfPayment : req.body.modeOfPayment,

         
    deliveryAddress: req.body.deliveryAddress,


   
    })

    await newOrder.save()

    await CartItem.deleteMany({userId: req.user.id})


    res.json({
        success:true,
        message:"order added"
    })



}


exports.getOrder =  async (req, res, next)=>{

  

    const orders = await Order.find({userId: req.user.id })

    console.log(req.query.filters.status);


    order.status = req.body.status;

    

    res.json({
        success:true,
        orders
    })

   
}

exports.getStatus = async (req, res, next)=>{

    const order = await Order.findById(req.params.id);


   order.status = req.body.status
  


    await order.save()

    res.json({
        success:true,
       order
    })

}
