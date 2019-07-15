var Company = require('./companies.Models');
var CategoryCompany = require('./cate_cpn.Models');
var mongoose = require('mongoose');

exports.create = function (req, res) {//Create a company
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
                        res.send(err1);
                    }
                })
            }
            res.send("đã thêm thành công");
        }
        else {
            console.log(err);
        }
    })
}
exports.getAll = function (req, res) { //Get all company
    Company.find().exec(function (err, doc) {
        if (!err) {
            res.send(doc);
        }
        else {
            res.send(err);
        }
    })
}
exports.getOne = function (req, res) {
    Company.findOne({ _id: req.body.id }).exec(function (err, doc) {
        if (!err) {
            res.send(doc);
        }
        else {
            res.send(err);
        }
    })
}
exports.update = function (req, res) {
    Company.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                companyName: req.body.companyName,
                companyCode: req.body.companyCode
            }
        }
    ).exec(function (err, doc) {
        if (!err) {
            Company.findOne({ _id: req.params.id }).exec(function (err1, doc1) {
                if (!err1) {
                    //console.log(doc1);
                    res.send(doc1);
                } else {
                    res.send(err1);
                }
            })
        }
        else {
            res.send(err);
        }
    })
}
exports.delete = function (req, res) {
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
            res.send("xóa thành công");
        }
        else {
            return res.send(err);
        }
    })
}