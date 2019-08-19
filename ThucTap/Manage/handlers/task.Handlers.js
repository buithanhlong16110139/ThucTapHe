import Task from '../models/task.Models'
import TaskStoryHandler from '../handlers/taskStory.Handlers'
import mongoose from 'mongoose'
import moment from 'moment'



const createNewTask = async(taskName, startDate, endDate, isDone, maxProcessTask, processTask, storyId, milistoneId, projectId)=>{
    const newTask = await Task.create({taskName, startDate, endDate, isDone, maxProcessTask, processTask, storyId, milistoneId, projectId});
        return newTask
}
const getAllTask = async()=>{
    const allTask = await Task.find();
        return allTask
}
const getOneTask = async(taskId)=>{
    const task = Task.findOne({_id: taskId});
        return task
}
const updateTask = async(taskId, taskName, startDate, endDate, isDone, maxProcessTask, processTask, storyId, milistoneId, projectId)=>{
    try {
        if(processTask == 100){
            const result = await Task.updateOne(
                {_id: taskId}, 
                {
                    $set: {
                        taskName,
                        startDate,
                        endDate,
                        isDone: true,
                        maxProcessTask,
                        processTask,
                        storyId,
                        milistoneId,
                        projectId
                }
            })
            TaskStoryHandler.updateTaskStory(storyId);
            return result;
        }
        else{
            const result = await Task.updateOne(
                {_id: taskId}, 
                {
                    $set: {
                        taskName,
                        startDate,
                        endDate,
                        isDone: false,
                        maxProcessTask,
                        processTask,
                        storyId,
                        milistoneId,
                        projectId
                }
            })
            TaskStoryHandler.updateTaskStory(storyId);
            return result;
        }
    } catch (error) {
       throw error;
    }
}
const deleteTask = async (taskId)=>{
    await Task.deleteOne({_id: taskId});
        return true
}
const updateAllTask = async(maxProcessTask, storyId)=>{
    const allTask = await Task.find({storyId: storyId});
    if(allTask == null){
        return true
    }
    else{
        const promise = allTask.map(async task=>{
            await Task.updateOne(
                {_id: task._id},
                {
                    $set: {
                        taskName: task.taskName,
                        dateStart: task.dateStart,
                        dateEnd: task.dateEnd,
                        isDone: task.isDone,
                        maxProcessTask: maxProcessTask,
                        processTask: task.processTask,
                        storyId: task.storyId,
                        milistoneId: task.milistoneId,
                        projectId: task.projectId
                    }
                }
            )
        })
        const result = await Promise.all(promise)
        return true
    }
}
export default {
    createNewTask,
    getAllTask,
    getOneTask,
    updateTask,
    deleteTask,
    updateAllTask
}