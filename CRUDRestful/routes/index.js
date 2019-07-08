var express = require('express');
const productRouter = require('./product/products.Router');
const router = express.Router();

router.use('/products', productRouter);

module.exports = router;
