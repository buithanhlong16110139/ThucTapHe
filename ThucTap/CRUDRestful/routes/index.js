var express = require('express');
const productRouter = require('./product/products.Router');
const companyRouter = require('./company/companies.Router');
const categoryRouter = require('./category/categories.Router');
const router = express.Router();

router.use('/products', productRouter);
router.use('/companies', companyRouter);
router.use('/categories', categoryRouter);

module.exports = router;
