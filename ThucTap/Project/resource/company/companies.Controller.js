// var Company = require('./companies.Models');
// var CategoryCompany = require('./cate_cpn.Models');
// var mongoose = require('mongoose');

import Company from './companies.Models';
import CategoryCompany from './cate_cpn.Models';

export default{
    create(req, res) {//Create a company
        var company = new Company({
            companyName: req.body.companyName,
            companyCode: req.body.companyCode
        });
        Company.collection.insertOne(company, function (err, doc) {
            if (!err) {
                for (var i = 0; i < req.body.categoryID.length; i++) {
                    var categoryCompany = new CategoryCompany({ categoryID: req.body.categoryID[i], companyId: doc.ops[0]._id });
                    CategoryCompany.collection.insertOne(categoryCompany, function (err1, doc1) {
                        if (!err1) {
                            //res.send(doc1);
                            //console.log("da them" + i + 1);
                        }
                        else {
                            return res.send(err1);
                        }
                    })
                }
                return res.send("đã thêm thành công");
            }
            else {
                console.log(err);
            }
        })
    },
    getAll(req, res) { //Get all company
        Company.find().exec(function (err, doc) {
            if (!err) {
                return res.send(doc);
            }
            else {
                return res.send(err);
            }
        })
    },
    async getOne(req, res) {
        try {
            const data = await Company.findOne({ _id: req.body.id })
            return res.send(doc);
        } catch (error) {
            return res.send(err);
        }

    },
    update(req, res) {
        Company.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    companyName: req.body.companyName,
                    companyCode: req.body.companyCode
                }
            }
        ).exec( (err, doc)=> {
            if (!err) {
                Company.findOne({ _id: req.params.id }).exec(function (err1, doc1) {
                    if (!err1) {
                        //console.log(doc1);
                        return res.send(doc1);
                    } else {
                        return res.send(err1);
                    }
                })
            }
            else {
                return res.send(err);
            }
        })
    },
    delete(req, res) {
        CategoryCompany.find({ companyId: req.params.id }).exec(function (err, doc) {
            if (!err) {
                for (var i = 0; i < doc.length; i++) {
                    CategoryCompany.collection.remove(doc[i]);
                    //Cate_Cpn.collection.remove(doc);
                    //res.send("đã xóa thành công");
                }
                Company.findOne({_id: req.params.id}).exec(function(err1, doc1){
                    Company.collection.remove(doc1);
                })
                return res.send("xóa thành công");
            }
            else {
                return res.send(err);
            }
        })
    }
}