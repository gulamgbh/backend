const express = require('express');
const router = express.Router();
const { requireSignin, userMiddleware } = require('../../middlewares/commonMiddlewares');
const { addToCart } = require('../../controllers/adminAPI/cartController');

router.post('/cart/addToCart', requireSignin, userMiddleware, addToCart)

module.exports = router 