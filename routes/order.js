const router = require('express').Router()

const { body, check, validationResult } = require('express-validator');

const Order =  require('../models/order')


const verifyToken = require('../middlewares/authMiddleware');

const CartItem = require('../models/cart-item')

const orderController = require('../controllers/order')

router.post('/', verifyToken, orderController.item);



router.get('/', verifyToken, orderController.getOrder);


router.put('/:id', verifyToken, orderController.getStatus);





module.exports = router;