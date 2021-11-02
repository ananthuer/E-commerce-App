const router = require('express').Router()

const { body, check, validationResult } = require('express-validator');

const Order =  require('../models/order')




router.get('/', async (req, res, next)=>{

    // Fetch all orders


    const orders = await Order.find()

    let condition = {
        
    }


    
    const { from_date, to_date } = req.query;

    if(from_date!= undefined){
        condition["createdAt"] = {
            $gte: new Date(from_date)
        };
    }
    if (to_date !=undefined){
        let toDate = new Date (to_date);
        
        condition["createdAt"]["$lte"]= new Date (to_date)
    }
    console.log(condition);

// const orders = await Order.find(condition)



res.json({
    success:true,
    orders
})



    // console.log(orders);

    let pending = orders.filter((e) => e.status === 1)

    let confirmed = orders.filter((e) => e.status ===2)

    let Delivered = orders.filter((e) => e.status === 3) || []

   // console.log(Delivered)

    let cancelled = orders .filter((e) => e.status === 4)

  

    let totalSales = 0;

        for (let order of Delivered)

    
        {

            console.log(order)
            totalSales += order.total;

        }
        return res.json({
            success:true,
            totalSales,
            pending:pending.length,
            confirmed:confirmed.length,
            delivered:Delivered.length,
            cancelled:cancelled.length

        });

        






       

  


    


    //Sorting
    //1. Pending orders => count
    //2. Confirmed
    //3. Delivered
    //4. Cancelled

    //Total sales => Total amount of delivered orders

    //Response

    /**
     * 
     * {
     *  confirmed: 5,
     * pending: 4,
     * delivered: 6,
     * cancelled: 2,
     * totalsales: $1500
     * }
     */

    



})




module.exports = router;