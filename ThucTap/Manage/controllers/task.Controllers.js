import TaskHandler from '../handlers/task.Handlers'
import StoryHandler from '../handlers/story.Handlers'
import moment from 'moment'

export default{
    async create(req,res){
        try {
            const {taskName, startDate, endDate, isDone, storyId, milistoneId, projectId} = req.body;
            const countTask = await StoryHandler.countTask(storyId);
            const maxProcessTask = (100)/(countTask+1);
            const updateOtherTask = TaskHandler.updateAllTask(maxProcessTask, storyId);
            const processTask = 0;
            const result = await TaskHandler.createNewTask(taskName, startDate, endDate, isDone, maxProcessTask, processTask, storyId, milistoneId, projectId);
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async getAll(req, res){
        try {
            const result = await TaskHandler.getAllTask();
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async getOne(req, res){
        try {
            const taskId = req.params.id;
            const result = await TaskHandler.getOneTask(taskId);
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async update(req, res){
        try {
            const taskId = req.params.id;
            const {taskName, startDate, endDate, isDone, maxProcessTask, processTask, storyId, milistoneId, projectId} = req.body;
            const result = await TaskHandler.updateTask(taskId, taskName, startDate, endDate, isDone, maxProcessTask, processTask, storyId, milistoneId, projectId)
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async delete(req, res){
        try {
            const taskId = req.params.id
            await TaskHandler.deleteTask(taskId)
            const countTask = await StoryHandler.countTask(storyId);
            if(countTask == 0){
                return res.send({
                    data: "can't delete",
                    error: null,
                    success: null
                })
            }
            const maxProcessTask = (100)/(countTask);
            const updateOtherTask = TaskHandler.updateAllTask(maxProcessTask, storyId);
            return res.send({
                data: null,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    }
}