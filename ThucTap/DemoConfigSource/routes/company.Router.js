import express from 'express'
import companyController from '../controllers/company.Controller'

export const companyRouter = express.Router();

companyRouter.post('/', companyController.create)
.get('/', companyController.getAll)

companyRouter.get('/:id', companyController.getOne)
.put('/:id', companyController.update)
.delete('/:id', companyController.delete)