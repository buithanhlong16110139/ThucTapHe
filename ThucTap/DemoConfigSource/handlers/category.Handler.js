import Category from '../models/category.Model'
import CategoryCompany from '../models/categoryCompany.Models'
import Company from '../models/company.Model'
import mongoose from 'mongoose'
import {
    getEnabledCategories
} from 'trace_events';

export default {
    async createNewCategory(categoryName) {
        const category = await Category.create({
            categoryName
        });
        return category;
    },
    async getAllCategory() {
        const allResult = await Category.find();
        return allResult;
    },
    async updateOneCategory(categoryName, categoryId) {
        await Category.findOneAndUpdate({
            _id: categoryId
        }, {
            $set: {
                categoryName: categoryName
            }
        })
        const categoryUpdate = Category.findOne({
            _id: categoryId
        });
        return categoryUpdate;
    },
    async deleteOne(categoryId) {
        await Category.remove({
            _id: categoryId
        });
        return {
            message: "đã xóa"
        }
    },
    async getOne(categoryId) {
        const result = await Category.findOne({
            _id: categoryId
        });
        return result;
    },
    async getAllCompanyOfCategory(categoryId) {  //chạy chậm hơn getAllCompanyInCategory
        const arrayCompany = [];
        const arrayCompanyId = await CategoryCompany.find({
            categoryId: categoryId
        });
        const promises = arrayCompanyId.map(async index => {
            const company = await Company.findOne({
                _id: index.companyId
            })
            await arrayCompany.push(company);
        })
        await Promise.all(promises);
        return arrayCompany;
    },
    async getAllCompanyInCategory(categoryId) { //chạy nhanh hơn getAllCompanyOfCategory
        var categoryID = new mongoose.Types.ObjectId(categoryId);
        const result = await CategoryCompany.aggregate([{
                $lookup: {
                    from: "companies",
                    localField: "companyId",
                    foreignField: "_id",
                    as: "company"
                }
            },
            {
                $match: {
                    categoryId: categoryID
                }
            }
        ])
        return result;
    },
    async getCompanyOfCategory(categoryId){ //nhanh hơn getAllCompanyOfCategory và chậm hơn getAllCompanyInCategory
        const arrayCompanyCategoryId = await CategoryCompany.find({
            categoryId: categoryId
        });
        var arrayCompanyId = []
        arrayCompanyCategoryId.forEach(async element => {
            await arrayCompanyId.push(element.companyId);
        });
        const arrayCompany = await Company.find({_id: {$in : arrayCompanyId}});
        return arrayCompany;
    }
}