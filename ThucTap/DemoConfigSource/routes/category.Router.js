import express from 'express'
import categoryController from '../controllers/category.Controller'

export const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.create)
.get('/', categoryController.getAll)

categoryRouter.put('/:id', categoryController.update)
.get('/:id', categoryController.getOne)
.delete('/:id', categoryController.delete)
.get('/companies/:id', categoryController.getAllCompanyOfCategory)