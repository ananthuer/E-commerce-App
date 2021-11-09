

const orderInterface = require ('../interfaces/order')




exports.item = async (req, res, next)=>{

    //Fetch cart

    
    const items = await orderInterface.item(
        req.user.id,
        // req.body.name,
        // req.body.price,
        // req.body.description,
        // req.body.quantity,
        req.body.modeOfPayment,
        req.body.deliveryAddress
    )
    




    res.json({
        success:true,
       items
    })



}



exports.getOrder =  async (req, res, next)=>{



    const orders = await orderInterface.getOrder(req.user.id)



    

    res.json({
        success:true,
        orders
    })

   
}

exports.getStatus = async (req, res, next)=>{

    const order = await orderInterface.getStatus(req.params.id, req.body.status)

    
    res.json({
        success:true,
       order
    })

}
