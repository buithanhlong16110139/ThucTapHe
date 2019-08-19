import ProjectHandler from '../handlers/project.Handlers'
import ProjectService from '../services/project.Services'
import { resolveSoa } from 'dns';

export default{
    async create(req,res){
        try {
            const {projectName} = req.body;
            if(ProjectService.isProjectName(projectName)){
                throw "project name is not empty"
            }
            const isDone = false;
            const processProject = 0;
            const result = await ProjectHandler.createNewProject(projectName, isDone, processProject);
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
            const result = await ProjectHandler.getAllProject();
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
            const projectId = req.params.id;
            const result = await ProjectHandler.getOneProject(projectId);
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
            const projectId = req.params.id;
            const {projectName, isDone, processProject} = req.body;
            const result = await ProjectHandler.updateProject(projectId, projectName, isDone, processProject)
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
            const projectId = req.params.id
            await ProjectHandler.deleteProject(projectId)
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