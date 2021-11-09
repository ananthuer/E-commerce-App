

const { body, validationResult } = require('express-validator');

const cartInterface = require('../interfaces/cart')

exports.addItemToCart = async (req, res, next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const item = await cartInterface.addItemToCart(
        req.user.id,
        req.body.productId,
        req.body.quantity
        )

       res.json({
           item
       })
    };



exports.getCart = async (req, res, next)=>{


    const cart = await cartInterface.getCart(req.user.id)
   


    if(cart == null){
    
        return res.json({
            success:false,
            message:"cart doesnot exist"
        })
    }

     //Total amount
     //Total discount
     //Net Total
     

    
    res.json({
        success:true,
        data: cart})
    }    


    exports.updateCart =  async (req, res )=>{

        const cart = await cartInterface.updateCart(req.params.id, req.body.quantity)
    
        if (cart == null){
            return res.json({
                success:false,
                message:"not updated"
            })
        }
       
    
        res.json({
            success:true,
            cart
        })
    
     }


     exports.deleteCart = async(req, res, next)=>{
         
        const cart = await cartInterface.deleteCart(req.params.id)
    
        
        res.json({
            success:true,
            message:cart
        })
     }
