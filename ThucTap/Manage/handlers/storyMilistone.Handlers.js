import Milistone from '../models/milistone.Models'
import Story from '../models/story.Models'
import MilistoneHandler from '../handlers/milistone.Handlers'
import MilistoneProjectHandler from '../handlers/milistoneProject.Handlers'
import mongoose from 'mongoose'
import moment from 'moment'



const updateStoryMilistone = async(milistoneId)=>{
    try {
        let process = 0;
        const allStory = await Story.find({milistoneId: milistoneId})
        const promise = allStory.map(async story=>{
            process = process + ((story.processStory*story.maxProcessStory)/100)
            console.log(story)
        })
        const result1 = await Promise.all(promise)

        const milistone = await MilistoneHandler.getOneMilistone(milistoneId)
        if(process == 100){
            const result2 = await Milistone.updateOne(
                {_id: milistoneId},
                {
                    $set:{
                        milistoneName: milistone.milistoneName,
                        dateStart: milistone.dateStart,
                        dateEnd: milistone.dateEnd,
                        isDone: true,
                        maxProcessMilistone: milistone.maxProcessMilistone,
                        processMilistone: process,
                        projectId: milistone.projectId
                    }
                }
            )
            MilistoneProjectHandler.updateMilistoneProject(milistone.projectId);
        }
        else{
            const result2 = await Milistone.updateOne(
                {_id: milistoneId},
                {
                    $set:{
                        milistoneName: milistone.milistoneName,
                        dateStart: milistone.dateStart,
                        dateEnd: milistone.dateEnd,
                        isDone: false,
                        maxProcessMilistone: milistone.maxProcessMilistone,
                        processMilistone: process,
                        projectId: milistone.projectId
                    }
                }
            )
            MilistoneProjectHandler.updateMilistoneProject(milistone.projectId)
        }
        return true
    } catch (error) {
        return error;
    }
}
export default {
    updateStoryMilistone,
}