// var express = require('express');
// var categoryRouter = express.Router();
// const mongoose = require('mongoose')
// const categoryController = require('./categories.Controller');

import express from 'express';
import categoryController from './categories.Controller';

export const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.create)              //Create a item
     .get('/', categoryController.getAll);               //Get all items

categoryRouter.get('/:id', categoryController.getOne)            //Get a item
    .put('/:id', categoryController.update)            //Update a item
    .delete('/:id', categoryController.delete);        //Delete a item