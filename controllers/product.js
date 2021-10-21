const { body, validationResult } = require('express-validator');
const Product = require('../models/product');




exports.addProduct = ( async(req, res, next)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { 
        name, 
        product_code, 
        price, 
        offer_price, 
        thumbnail,
        image,
        description
    } = req.body;


    const product = new Product({
        name, 
        product_code, 
        price, 
        offer_price, 
        thumbnail,
        image,
        description
    });

    await product.save()
    

    res.json({
        success:true,
        product
    });

    

 
});

exports.getProduct = async (req, res, next)=>{

    const products = await Product.find({})
    
    res.json({success: true,
    products})
    };


    exports.getProductItems = async(req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const { id }  = req.params;
    
        const product = await Product.findById(id)
        console.log(id);
    
        if (product == null){
    
            return res.json({
                success:false,
                message:'product not found'})
        }
    
        res.json({success:true,
            product
        })
    };

    exports.updateProdut = async(req, res , next)=>{


        const product = await Product.findById(req.params.id)
        
        
        
        if (product == null){
            return res.json({
                success:false,
                message:"product not updated"
            })
        }
        
        product.name = req.body.name;
        product.product_code = req.body.product_code;
        product.price = req.body.price;
        product.offer_price = req.body.offer_price;
        product.thumbnail  = req.body.thumbnail;
        product.image = req.body.image;
        product.description = req.body.description
        
        await product.save();
        
        res.json({
            success:true,
            product
        })
        
    }


    exports.deleteProdut = async(req, res, next)=>{


        const product = await Product.findByIdAndDelete(req.params.id)
    
        res.json({
            success:true,
            message:product
        })
    }

