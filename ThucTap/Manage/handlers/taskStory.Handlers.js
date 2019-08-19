import Task from '../models/task.Models'
import Story from '../models/story.Models'
import StoryHandler from '../handlers/story.Handlers'
import storyMilistoneHandler from '../handlers/storyMilistone.Handlers'
import mongoose from 'mongoose'
import moment from 'moment'



const updateTaskStory = async(storyId)=>{
    try {
        let process = 0;
        const allTask = await Task.find({storyId: storyId})
        const promise = allTask.map(async task=>{
            process = process + ((task.processTask*task.maxProcessTask)/100);
        })
        const result = await Promise.all(promise);

        const story = await StoryHandler.getOneStory(storyId);
        if(process == 100){
            const result = await Story.updateOne(
                {_id: storyId},
                {
                    $set: {
                        storyName: story.storyName,
                        dateStart: story.dateStart,
                        dateEnd: story.dateEnd,
                        isDone: true,
                        maxProcessStory: story.maxProcessStory,
                        processStory: process,
                        milistoneId: story.milistoneId,
                        projectId: story.projectId
                    }
                }
            )
            storyMilistoneHandler.updateStoryMilistone(story.milistoneId);
        }
        else{
            const result = await Story.updateOne(
                {_id: storyId},
                {
                    $set: {
                        storyName: story.storyName,
                        dateStart: story.dateStart,
                        dateEnd: story.dateEnd,
                        isDone: false,
                        maxProcessStory: story.maxProcessStory,
                        processStory: process,
                        milistoneId: story.milistoneId,
                        projectId: story.projectId
                    }
                }
            )
            storyMilistoneHandler.updateStoryMilistone(story.milistoneId);
        }
        return true
    } catch (error) {
        return error;
    }
}
export default {
    updateTaskStory
}