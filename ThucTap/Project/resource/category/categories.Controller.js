// var Category = require('./categories.Models');
// var CategoryCompany = require('./cate_cpn.Models');
// var mongoose = require('mongoose');

import Category from './categories.Models';
import CategoryCompany from './cate_cpn.Models';

export default{
    create(req, res) {//Create a category
        var category = new Category(req.body);
        Category.collection.insertOne(category, function (err, doc) {
            if (!err) {
                res.send(doc);
            }
            else {
                res.send(err);
            }
        })
    },
    getAll(req, res) {
        Category.find().exec(function (err, doc) {
            if (!err) {
                res.send(doc);
            }
            else {
                res.send(err);
            }
        })
    },
    getOne(req, res) {
        Category.findOne({ _id: req.params.id }).exec(function (err, doc) {
            if (!err) {
                res.send(doc);
            }
            else {
                res.send(err);
            }
        })
    },
    update(req, res) {
        Category.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    categoryName: req.body.categoryName
                }
            }
        ).exec(function (err, doc) {
            if (!err) {
                Category.findOne({_id: req.params.id}).exec(function(err1, doc1){
                    if(!err)
                    {
                        res.send(doc1);
                    }
                    else
                    {
                        res.send(err1);
                    }
                })
            }
            else {
                res.send(err);
            }
        })
    },
    delete(req, res) {//
        CategoryCompany.find({ categoryId: req.params.id }).exec(function (err, doc) {
            if (!err) {
                for (var i = 0; i < doc.length; i++) {
                    CategoryCompany.collection.remove(doc[i]);
                }
                Category.findOne({_id: req.params.id}).exec(function(err1, doc1){
                    Category.collection.remove(doc1);
                })
                res.send("xóa thành công");
            }
            else {
                return res.send(err);
            }
        })
    }
}