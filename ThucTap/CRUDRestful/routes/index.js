var express = require('express');
const productRouter = require('./product/products.Router');
const companyRouter = require('./company/companies.Router');
const categoryRouter = require('./category/categories.Router');
const userRouter = require('./users/user.Routers');
const router = express.Router();

router.use('/products', productRouter);
router.use('/companies', companyRouter);
router.use('/categories', categoryRouter);
router.use('/users', userRouter);

module.exports = router;
