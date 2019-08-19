import express from 'express'
import {projectRouter} from './project.Routers'
import {milistoneRouter} from './milistone.Routers'
import {storyRouter} from './story.Routers'
import {taskRouter} from './task.Routers'
export const router = express.Router();

router.use('/project', projectRouter);
router.use('/milistone', milistoneRouter);
router.use('/story', storyRouter);
router.use('/task', taskRouter);