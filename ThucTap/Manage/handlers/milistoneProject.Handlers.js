import Milistone from '../models/milistone.Models'
import Project from '../models/project.Models'
import MilistoneHandler from '../handlers/milistone.Handlers'
import ProjectHandler from '../handlers/project.Handlers'
import mongoose from 'mongoose'
import moment from 'moment'




const updateMilistoneProject = async(projectId)=>{
    try {
        let process = 0;
        const allMilistone = await Milistone.find({projectId: projectId})
        const promise = allMilistone.map(async milistone=>{
            process = process + ((milistone.processMilistone*milistone.maxProcessMilistone)/100)
        })
        const result1 = await Promise.all(promise)
        const project = await ProjectHandler.getOneProject(projectId)
        //console.log(project);
        if(process == 100){
            const result2 = await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        projectName: project.projectName,
                        isDone: true,
                        processProject: process
                    }
                }
            )
        }
        else{
            const result2 = await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        projectName: project.projectName,
                        isDone: false,
                        processProject: process
                    }
                }
            )
        }
        return true
    } catch (error) {
        return error;
    }
}
export default {
    updateMilistoneProject
}