const Order =  require('../models/order')

const salesInterface = require('../interfaces/sales')


exports.getOrders = async (req, res, next)=>{


    
    const orders = await salesInterface.getOrders(req.body.status)


    res.json({
        success:true,
        orders
    })
    

    
        return res.json({
            success:true,
            totalSales,
            pending:pending.length,
            confirmed:confirmed.length,
            delivered:Delivered.length,
            cancelled:cancelled.length

        });
}
