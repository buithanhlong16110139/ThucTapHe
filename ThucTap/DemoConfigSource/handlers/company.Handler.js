import Company from '../models/company.Model'
import CategoryCompany from '../models/categoryCompany.Models'

export default{
    async createNewCompany(companyName, companyCode){
        const company = await Company.create({companyName: companyName, companyCode: companyCode});
        return company;
    },
    async createCategoryCompany(categoryId, companyId){
        const promises = categoryId.map(async index =>{
            await CategoryCompany.create({categoryId: index, companyId: companyId});
        })
        await Promise.all(promises);
        return {message: 'thành công'};
    },
    async getCompany(){
        const company = await Company.find();
        return company;
    },
    async getOneCompany(companyId){
        const company = await Company.findOne({_id: companyId});
        return company;
    },
    async updateCompany(companyId, companyName, companyCode){
        await Company.findOneAndUpdate(
            {_id: companyId},
            {
                $set: {
                    companyName: companyName,
                    companyCode: companyCode
                }
            }
        )
        const companyUpdate = await Company.findOne({_id: companyId});
        return companyUpdate;
    },
    async deleteCompany(companyId){
        await Company.remove({_id: companyId});
        return {message: 'xóa thành công'}
    }
}