// var express = require('express');
// var companyRouter = express.Router();
// const mongoose = require('mongoose')
// const companyController = require('./companies.Controller');

import express from 'express';
import companyController from './companies.Controller';

export const companyRouter = express.Router();

companyRouter.post('/', companyController.create) //Create a item
    .get('/', companyController.getAll); //Get all items
//     .get('/search', companyController.search);        //Search items  

companyRouter.get('/:id', companyController.getOne) //Get a item
    .put('/:id', companyController.update) //Update a item
    .delete('/:id', companyController.delete); //Delete a item