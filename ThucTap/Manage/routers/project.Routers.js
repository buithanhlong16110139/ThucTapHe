import express from 'express'
import projectController from '../controllers/project.Controllers'

export const projectRouter = express.Router();

projectRouter.post('/', projectController.create)
.get('/', projectController.getAll);

projectRouter.put('/:id', projectController.update)
.get('/:id', projectController.getOne)
.delete('/:id', projectController.delete)
// .get('/companies/:id', projectController.getAllCompanyOfCategory)