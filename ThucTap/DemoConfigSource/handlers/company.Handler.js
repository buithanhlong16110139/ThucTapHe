import Company from '../models/company.Model'
import CategoryCompany from '../models/categoryCompany.Models'

export default {
    async createNewCompany(companyName, companyCode) {
        return await Company.create({
            companyName,
            companyCode
        });
    },
    async createCategoryCompany(categoryId, companyId) {
        try {
            const promises = categoryId.map(async index => {
                await CategoryCompany.create({
                    categoryId: index,
                    companyId
                });
            })
            await Promise.all(promises);
            return true
        } catch (error) {
            throw error
        }
    },
    async getCompany() {
        return await Company.find();
    },
    async getOneCompany(companyId) {
        return await Company.findOne({
            _id: companyId
        });
    },
    async updateCompany(companyId, companyName, companyCode) {
        try {
             const result = await Company.updateOne({
                _id: companyId
            }, {
                $set: {
                    companyName,
                    companyCode
                }
            })
            return result;
        } catch (error) {
            throw error;
        }
    },
    async deleteCompany(companyId) {
        await Company.deleteOne({
            _id: companyId
        });
        await CategoryCompany.deleteMany({
            companyId: companyId
        })
        return true
    }
}