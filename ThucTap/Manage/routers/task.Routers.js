import express from 'express'
import taskController from '../controllers/task.Controllers'

export const taskRouter = express.Router();

taskRouter.post('/', taskController.create)
.get('/', taskController.getAll);

taskRouter.put('/:id', taskController.update)
.get('/:id', taskController.getOne)
.delete('/:id', taskController.delete)