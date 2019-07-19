import Category from '../models/category.Model'
import mongoose from 'mongoose'
import { getEnabledCategories } from 'trace_events';

export default{
    async createNewCategory(categoryName){
        const category = await Category.create({categoryName});
        return category;
    },
    async getAllCategory(){
        const allResult = await Category.find();
        return allResult;
    },
    async updateOneCategory(categoryName, categoryId){
        await Category.findOneAndUpdate(
            {_id: categoryId},
            {
                $set: {
                    categoryName: categoryName
                }
            }
        )
        const categoryUpdate = Category.findOne({_id: categoryId});
        return categoryUpdate;
    },
    async deleteOne(categoryId){
        await Category.remove({_id: categoryId});
        return {
            message: "đã xóa"
        }
    },
    async getOne(categoryId){
        const result = await Category.findOne({_id: categoryId});
        return result;
    }
}