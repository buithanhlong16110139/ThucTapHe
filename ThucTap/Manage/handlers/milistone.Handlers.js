import Milistone from '../models/milistone.Models'
import Story from '../models/story.Models'
import mongoose from 'mongoose'

const createNewMilistone = async(milistoneName, startDate, endDate, isDone, maxProcessMilistone, processMilistone, projectId)=>{
    const newMilistone = await Milistone.create({milistoneName, startDate, endDate, isDone, maxProcessMilistone, processMilistone, projectId});
        return newMilistone;
}
const getAllMilistone = async()=>{
    const allMilistone = await Milistone.find();
        return allMilistone
}
const getOneMilistone = async(milistoneId)=>{
    const milistone = await Milistone.findOne({_id: milistoneId})
    return milistone
}
const deleteMilistone = async(milistoneId)=>{
    await Milistone.deleteOne({_id: milistoneId})
}
const countStory = async(milistoneId)=>{
    const count = await Story.find({milistoneId: milistoneId})
    
    return count.length
}
const updateMilistone = async(milistoneId, milistoneName, startDate, endDate, isDone, maxProcessMilistone, processMilistone, projectId)=>{
        try {
            const result = await Milistone.updateOne(
                {_id: milistoneId}, 
                {
                    $set: {
                        milistoneName,
                        startDate, 
                        endDate,
                        isDone,
                        maxProcessMilistone,
                        processMilistone,
                        projectId
                }
        })
        return result;
    } catch (error) {
        throw error;
    }
}
const updateAllMilistone = async(maxProcessMilistone, projectId)=>{
    const allMilistone = await Milistone.find({_id: projectId});
    const promise = allMilistone.map(async milistone=>{
        await Milistone.updateOne(
            {_id: milistone._id},
            {
                $set: {
                    milistoneName: milistone.milistoneName,
                    startDate: milistone.startDate,
                    endDate: milistone.endDate,
                    isDone: milistone.isDone,
                    maxProcessMilistone: maxProcessMilistone,
                    processMilistone: milistone.processMilistone,
                    projectId: milistone.projectId
                }
            }
        )
    })
    const result = await Promise.all(promise);
    return true
}
export default {
    createNewMilistone,
    getAllMilistone,
    getOneMilistone,
    deleteMilistone,
    countStory,
    updateMilistone,
    updateAllMilistone
}