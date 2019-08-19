import express from 'express'
import milistoneController from '../controllers/milistone.Controllers'

export const milistoneRouter = express.Router();

milistoneRouter.post('/', milistoneController.create)
.get('/', milistoneController.getAll);

milistoneRouter.put('/:id', milistoneController.update)
.get('/:id', milistoneController.getOne)
.delete('/:id', milistoneController.delete)