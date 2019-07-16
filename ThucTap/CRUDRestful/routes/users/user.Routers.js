var express = require('express');
var userRouter = express.Router();
const mongoose = require('mongoose')
const userController = require('./user.Controllers');

userRouter.post('/signup', userController.signup)              //Create a item
    .post('/login', userController.login);
//     .get('/', userController.getAll)               //Get all items
//     .get('/search', userController.search);        //Search items  

//userRouter.get('/:id', userController.getOne)            //Get a item
//     .put('/:id', userController.update)            //Update a item
//     .delete('/:id', userController.delete);        //Delete a item
module.exports = userRouter;
