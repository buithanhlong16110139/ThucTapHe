import categoryHandler from '../handlers/category.Handler'

export default{
    async create(req,res){
        try {
            const result = await categoryHandler.createNewCategory(req.body.categoryName);
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                date: null,
                error: error,
                success: null
            })
        }
    },
    async getAll(req, res){
        try {
            const result = await categoryHandler.getAllCategory();
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
            const result = await categoryHandler.updateOneCategory(req.body.categoryName, req.params.id);
            return res.send({
                date: result,
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
            const result = await categoryHandler.deleteOne(req.params.id)
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
            const result = await categoryHandler.getOne(req.params.id)
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
    async getAllCompanyOfCategory(req, res){
        try {
            const result = await categoryHandler.getCompanyOfCategory(req.params.id);
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
    }
}