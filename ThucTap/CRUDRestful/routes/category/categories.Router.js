var express = require('express');
var categoryRouter = express.Router();
const mongoose = require('mongoose')
const categoryController = require('./categories.Controller');

categoryRouter.post('/', categoryController.create)              //Create a item
     .get('/', categoryController.getAll);               //Get all items
//     .get('/search', companyController.search);        //Search items  

categoryRouter.get('/:id', categoryController.getOne)            //Get a item
    .put('/:id', categoryController.update)            //Update a item
    .delete('/:id', categoryController.delete);        //Delete a item
module.exports = categoryRouter;