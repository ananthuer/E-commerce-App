/**
 * 
 * 
 * 
 * 
 * 1. GET /product => Get all products
 * 
 * 2. GET /product/:id  => Get a product by id
 * 
 * 3. POST /product => Create a product
 * 
 * 4. PUT /product/:id  => Update a product
 * 
 * 5. DELETE /product/:id  => Delete a product
 */


const router = require('express').Router()

const { body, check, validationResult } = require('express-validator');
const Product = require('../models/product');


const productController = require('../controllers/product')





router.get('/', productController.getProduct);

router.get('/:id', [
    check('id')
    .isMongoId()
], productController.getProductItems);

router.post('/', [
    body('name')
    .isString()
    .withMessage('please enter a valid name '),

    body('product_code')
    .isLength({min:5}),

    body('price')
    .isLength({min:2}),

    body('offer_price')
    .isLength({min:2}),

    body('thumbnail')
    .isString()
    .withMessage('not a valid link'),

    body('image')
    .isArray()
    .withMessage('not a valid image link'),

    body('description')
    .isString()

],
productController.addProduct
);

router.put('/:id' , productController.updateProdut);




router.delete('/:id', productController.deleteProdut);
module.exports = router;