const Product = require('../models/product');


exports.addProduct = async ( 
     name, 
    product_code, 
    price, 
    offer_price, 
    thumbnail,
    image,
    description)=> {

       
    
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

        return product;
    }


    exports.getProduts = async(productId)=>{

        
    const products = await Product.find(productId)

    return products;


    
    }

    exports.getProductItems = async(productId)=>{
       
        const product = await Product.findById(productId)
        console.log(id);

        const { id }  = req.params;
    
        if (product == null){
    
            return res.json({
                success:false,
                message:'product not found'})
        }

        return product;
    }

    exports.updateProduct = async (productId, name, 
        product_code, 
        price, 
        offer_price, 
        thumbnail,
        image,
        description) =>{

            console.log(name);

        const product = await Product.findById(
            productId)

           if (product== null) return null;

           
            product.name = name;
            product.product_code = product_code;
            product.price = price;
            product.offer_price = offer_price;
            product.thumbnail  = thumbnail;
            product.image = image; 
            product.description = description
            
            await product.save();

            return product;


    }

    exports.deleteProduct = async (productId)=>{

        const product = await Product.findByIdAndDelete(productId)

        return product;
    

    }