// const express = require('express');
// const userRouter = express.Router();
// const userController = require('./user.Controllers');
import express from 'express';
import userController from './user.Controllers';
export const userRouter = express.Router();

userRouter.post('/signup', userController.signup)
.post('/login', userController.login);
