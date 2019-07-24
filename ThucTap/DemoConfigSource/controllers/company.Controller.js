import companyHandler from '../handlers/company.Handler'

export default {
    async create(req, res) {
        try {
            const {
                companyName,
                companyCode,
                categoryId
            } = req.body
            const newComapany = await companyHandler.createNewCompany(companyName, companyCode);
            const newCategoryCompany = await companyHandler.createCategoryCompany(categoryId, newComapany._id);
            if(newCategoryCompany==true){
                return res.send({
                    data: newCompany,
                    error: null,
                    success: 'ok'
                })
            }else{
                return res.send({
                    data: newCompany,
                    error: null,
                    success: 'ok'
                })
            }
        } catch (error) {
            res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async getAll(req, res) {
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
    async getOne(req, res) {
        try {
            const companyId = req.params.id;
            const company = await companyHandler.getOneCompany(companyId);
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
    async update(req, res) {
        try {
            const {
                companyId,
                companyName,
                companyCode
            } = req.body;
            const result = await companyHandler.updateCompany(companyId, companyName, companyCode);
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
    async delete(req, res) {
        try {
            const companyId = req.params.id;
            const company = await companyHandler.deleteCompany(companyId);
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