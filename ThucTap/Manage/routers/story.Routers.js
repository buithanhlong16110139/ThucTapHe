import express from 'express'
import storyController from '../controllers/story.Controllers'

export const storyRouter = express.Router();

storyRouter.post('/', storyController.create)
.get('/', storyController.getAll);

storyRouter.put('/:id', storyController.update)
.get('/:id', storyController.getOne)
.delete('/:id', storyController.delete)