const Order =  require('../models/order')


exports.getOrders = async (from_date, to_date, delivered)=>{

    const orders = await Order.find()
    
    let condition = {
        
    }


    
    // const { from_date, to_date } = req.query;

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









    

    let pending = orders.filter((e) => e.status === 1)

    let confirmed = orders.filter((e) => e.status ===2)

    let Delivered = orders.filter((e) => e.status === 3) || []

  

    let cancelled = orders .filter((e) => e.status === 4)

  

    let totalSales = 0;

        for (let order of Delivered)

    
        {

            console.log(order)
            totalSales += order.total;

        }
        return totalSales,
        pending,
        confirmed,
        delivered,
        cancelled

}