import Project from '../models/project.Models'
import Story from '../models/story.Models'
import Milistone from '../models/milistone.Models'
import Task from '../models/task.Models'
import mongoose from 'mongoose'


const createNewProject = async (projectName, isDone, processProject)=>{
    const newProject = await Project.create({projectName, isDone, processProject});
        return newProject;
}
const getAllProject = async ()=>{
    const allProject = await Project.find();
    return allProject;
}
const getOneProject = async (projectId)=>{
    const project = await Project.findOne({_id: projectId});
    return project
}
const deleteProject = async (projectId)=>{
    const result = await Project.deleteOne({_id: projectId});
    return result
}
const countMilistone = async (projectId)=>{
    const count = await Milistone.find({projectId: projectId});
    return count.length;
}
const updateProject = async (projectId, projectName, isDone, processProject)=>{
    const result = await Project.updateOne(
        {_id: projectId},
        {
            $set: {
                projectName,
                isDone,
                processProject
            }
        }
    )
    return result;
}
// const showProject = async()=>{
//     const 
// }
export default {
    createNewProject,
    getAllProject,
    getOneProject,
    deleteProject,
    updateProject,
    countMilistone
}