import MilistoneHandler from '../handlers/milistone.Handlers'
import ProjectHandler from '../handlers/project.Handlers'
import MilistoneService from '../services/milistone.Services'

export default{
    async create(req,res){
        try {
            const {milistoneName, startDate, endDate, projectId} = req.body;
            if(MilistoneService.isMilistoneName(milistoneName)){
                throw "Milistone name is not empty"
            }
            if(MilistoneService.isDate(startDate, endDate))
            {
                throw "Start day and End day is not empty"
            }
            const isDone = false;
            const numberMilistone = await ProjectHandler.countMilistone(projectId);
            const maxProcessMilistone = (100)/(numberMilistone+1);
            const updateOtherMilistone = await MilistoneHandler.updateAllMilistone(maxProcessMilistone, projectId);
            const processMilistone = 0;
            const result = await MilistoneHandler.createNewMilistone(milistoneName, startDate, endDate, isDone, maxProcessMilistone, processMilistone, projectId);
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
            const result = await MilistoneHandler.getAllMilistone();
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
            const milistoneId = req.params.id;
            const result = await MilistoneHandler.getOneMilistone(milistoneId);
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
            const milistoneId = req.params.id;
            const {milistoneName, startDate, endDate, isDone, maxProcessMilistone, processMilistone, projectId} = req.body;
            const result = await MilistoneHandler.updateMilistone(milistoneId, milistoneName, startDate, endDate, isDone, maxProcessMilistone, processMilistone, projectId)
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
            const milistoneId = req.params.id
            await MilistoneHandler.deleteMilistone(milistoneId)
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