
const router = require('express').Router();

const { body, validationResult } = require('express-validator');

const usercontroller = require('../controllers/user');


const verifyToken = require('../middlewares/authMiddleware');



router.post('/', verifyToken, usercontroller.updateUser);

router.get('/',verifyToken, usercontroller.getUser);

module.exports = router;