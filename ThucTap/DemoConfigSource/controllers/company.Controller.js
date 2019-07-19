import companyHandler from '../handlers/company.Handler'
import { getEnabledCategories } from 'trace_events';

export default{
    async create(req, res){
        try {
            const company = await companyHandler.createNewCompany(req.body.companyName, req.body.companyCode);
            //console.log(company);
            const categoryCompany = await companyHandler.createCategoryCompany(req.body.categoryId, company._id);
            return res.send({
                data: company,
                data1: categoryCompany,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async getAll(req, res){
        try {
            const company = await companyHandler.getCompany();
            return res.send({
                data: company,
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
            const company = await companyHandler.getOneCompany(req.params.id);
            return res.send({
                data: company,
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
            const company = await companyHandler.updateCompany(req.params.id, req.body.companyName, req.body.companyCode);
            return res.send({
                data: company,
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
            const company = await companyHandler.deleteCompany(req.params.id);
            return res.send({
                data: company,
                error: null,
                success: 'ok'
            });
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    }
}