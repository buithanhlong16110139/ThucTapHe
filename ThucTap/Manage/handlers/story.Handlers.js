import Story from '../models/story.Models'
import Task from '../models/task.Models'
import mongoose from 'mongoose'



const createNewStory = async (storyName, startDate, endDate, isDone, maxProcessStory, processStory, milistoneId, projectId)=>{
    const newStory = await Story.create({storyName, startDate, endDate, isDone, maxProcessStory, processStory, milistoneId, projectId});
        return newStory
}
const getAllStory = async()=>{
    const allStory = await Story.find();
        return allStory
}
const getOneStory = async(storyId)=>{
    const story = await Story.findOne({_id: storyId})
    return story
}
const updateStory = async(storyId, storyName, startDate, endDate, isDone, maxProcessStory, processStory, milistoneId, projectId)=>{
    try {
        const result = await Story.updateOne(
            {_id: storyId}, 
            {
                $set: {
                    storyName,
                    startDate,
                    endDate,
                    isDone,
                    maxProcessStory,
                    processStory,
                    milistoneId,
                    projectId
            }
    })
        return result;
    } catch (error) {
        throw error;
    }
}
const deleteStory = async(storyId)=>{
    await Story.deleteOne({_id: storyId});
        return true
}
const countTask = async(storyId)=>{
    const count = await Task.find({storyId})
    return count.length
}
const updateAllStory = async(maxProcessStory, milistoneId)=>{
    const allStory = await Story.find({milistoneId: milistoneId});
    if(allStory == null){
        return true
    }
    else{
        const promise = allStory.map(async story=>{
        await Story.updateOne(
            {_id: story._id},
            {
                $set: {
                    storyName: story.storyName,
                    startDate: story.startDate,
                    endDate: story.endDate,
                    isDone: story.isDone,
                    maxProcessStory: maxProcessStory,
                    processStory: story.processStory,
                    milistoneId: story.milistoneId,
                    projectId: story.projectId
                }
            }
        )
        })
        const result = await Promise.all(promise);
        return true
    }
    
    
}
export default {
    createNewStory,
    getAllStory,
    getOneStory,
    updateStory,
    deleteStory,
    countTask,
    updateAllStory
}

