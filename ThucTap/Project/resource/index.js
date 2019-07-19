// const express = require('express');
// const userRouter = require('./user/user.Routers');
// const companyRouter = require('./company/companies.Routers');
// const categoriesRouter = require('./category/categories.Routers');
// const router = express.Router();

import express from 'express';
import {userRouter} from './user/user.Routers';
import {companyRouter} from './company/companies.Routers';

export const router = express.Router(); 

router.use('/users', userRouter);
router.use('/companies', companyRouter);
// router.use('/categories', categoriesRouter);