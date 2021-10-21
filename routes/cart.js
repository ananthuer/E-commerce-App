const router = require('express').Router()

const { body, check, validationResult } = require('express-validator');

const CartItem = require('../models/cart-item')

const verifyToken = require('../middlewares/authMiddleware');
const { route } = require('./auth');




const cartController = require('../controllers/cart')



router.post('/', verifyToken ,[

body('productId')
.isMongoId(),

body('quantity')
.isLength({min:1})


] ,cartController.addItemToCart);





router.get('/', verifyToken, cartController.getCart);


 router.put('/:id', verifyToken, cartController.updateCart);

 router.delete('/:id', verifyToken, cartController.deleteCart );



module.exports = router;