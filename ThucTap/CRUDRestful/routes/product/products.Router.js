var express = require('express');
var productRouter = express.Router();
const mongoose = require('mongoose')
const productController = require('./products.Controller');

productRouter.post('/', productController.create)              //Create a item
             .get('/', productController.getAll)               //Get all items
             .get('/search', productController.search);        //Search items  
    
productRouter.get('/:id', productController.getOne)            //Get a item
             .put('/:id', productController.update)            //Update a item
             .delete('/:id', productController.delete);        //Delete a item
module.exports = productRouter;