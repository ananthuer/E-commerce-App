const CartItem = require('../models/cart-item')

const { body, validationResult } = require('express-validator');


exports.addItemToCart = async (req, res, next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }


        const cart = new CartItem({
            userId: req.user.id,
            productId: req.body.productId,

            quantity:req.body.quantity
        });
    
       await cart.save()

       res.json({
           message:"cart added"
       })
    };


exports.getCart = async (req, res, next)=>{

    const items = await CartItem.find({userId: req.user.id}).populate('productId');
    

   

    if(items == null){
    
        return res.json({
            success:false,
            message:"cart doesnot exist"
        })
    }

     //Total amount
     //Total discount
     //Net Total

     let itemTotal = 0;
     let discountTotal = 0;
     let netTotal = 0;

     let orderItems = [];

     for (let cartItem of items) {

       
         itemTotal += cartItem.productId.price * cartItem.quantity;

         discountTotal += (cartItem.productId.price - cartItem.productId.offer_price ) * cartItem.quantity;

     }

     netTotal = itemTotal - discountTotal;

     
    
    res.json({
        success:true,
        data: {
            items,
            itemTotal,
            discount: discountTotal,
            netTotal
        }
    })
    }    


    exports.updateCart =  async (req, res, next)=>{

        const cart = await CartItem.findById(req.params.id);
    
        if (cart == null){
            return res.json({
                success:false,
                message:"not updated"
            })
        }
    
        cart.quantity = req.body.quantity;
    
        await cart.save();
    
        res.json({
            success:true,
            cart
        })
    
     }


     exports.deleteCart = async(req, res, next)=>{

        const cart = await CartItem.findByIdAndDelete(req.params.id)
    
        res.json({
            success:true,
            message:cart
        })
     }
