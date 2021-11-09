const { body, validationResult } = require('express-validator');


const productInterface = require('../interfaces/product') 


exports.addProduct =  async(req, res, next)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

   
    const product = await productInterface.addProduct( 
        req.body.name,
        req.body.product_code,
        req.body.price,
        req.body.offer_price,
        req.body.thumbnail,
        req.body.image,
        req.body.description
        ) 
    
    

    res.json({
        success:true,
        product
    });

    

 
};

exports.getProduct = async (req, res, next)=>{

    const products = await productInterface.getProdut()
    
    res.json({success: true,
    products})
    };


    exports.getProductItems = async(req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const product = await productInterface.getProductItems(req.params.id)
        
    
        
    
        res.json({success:true,
            product
        })
    };

    exports.updateProduct = async(req, res , next)=>{


        const product = await productInterface.updateProduct(
            req.params.id,
            req.body.name,
            req.body.product_code,
            req.body.price,
            req.body.offer_price,
            req.body.thumbnail,
            req.body.image,
            req.body.description)
        
            if (product == null){
                return res.json({
                    success:false,
                    message:"product not updated"
                })
            }
            
        
        
      
        
        res.json({
            success:true,
            product
        })
        
    }


    exports.deleteProduct = async(req, res, next)=>{


        const product = await productInterface.deleteProduct(req.params.id)
    
        res.json({
            success:true,
            message:product
        })
    }

