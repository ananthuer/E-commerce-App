const router = require('express').Router()

const { body, check, validationResult } = require('express-validator');



const salesController = require('../controllers/sales')




router.get('/', salesController.getOrders)

    



        






       

  


    


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

    








module.exports = router;