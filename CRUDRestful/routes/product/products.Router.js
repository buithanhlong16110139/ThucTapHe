var express = require('express');
var productRouter = express.Router();
const mongoose = require('mongoose')
const Product = require('./products.Model')
const productController = require('./products.Controller');

productRouter.post('/', productController.create)              //Create a item
             .get('/', productController.getAll)               //Get all items
             .get('/search', productController.search)         //Search items      
productRouter.get('/:id', productController.getOne)            //Get a item
             .put('/:id', productController.update)            //Update a item
             .delete('/:id', productController.delete);        //Delete a item
//         Product.find().exec(function (err, doc) {
//             if (!err) {
//                 res.send(doc);
//             }
//             else {
//                 res.send(err);
//             }
//         })
//     })
//     .get('/search', function (req, res) {
//         var Pro = [];
//         Product.find().exec(function (err, doc) {
//             if (!err) {
//                 for (var i = 0; i < doc.length; i++) {
//                     for (var j = 0; j < doc[i].keyword.length; j++) {
//                         var str = doc[i].keyword[j];
//                         //xóa dấu str
//                         str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//                         str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//                         str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//                         str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//                         str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//                         str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//                         str = str.replace(/đ/g, "d");
//                         str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
//                         str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
//                         str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
//                         str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
//                         str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
//                         str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
//                         str = str.replace(/Đ/g, "D");
//                         //xóa dấu keyword từ req
//                         req.body.keyword = req.body.keyword.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//                         req.body.keyword = req.body.keyword.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//                         req.body.keyword = req.body.keyword.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//                         req.body.keyword = req.body.keyword.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//                         req.body.keyword = req.body.keyword.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//                         req.body.keyword = req.body.keyword.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//                         req.body.keyword = req.body.keyword.replace(/đ/g, "d");
//                         req.body.keyword = req.body.keyword.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
//                         req.body.keyword = req.body.keyword.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
//                         req.body.keyword = req.body.keyword.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
//                         req.body.keyword = req.body.keyword.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
//                         req.body.keyword = req.body.keyword.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
//                         req.body.keyword = req.body.keyword.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
//                         req.body.keyword = req.body.keyword.replace(/Đ/g, "D");
//                         if((str == req.body.keyword)||(str.indexOf(req.body.keyword)!=-1))
//                         {
//                             Pro.push(doc[i]);
//                             break;
//                         }
//                     }
//                 }
//                 res.send(Pro);
//             }
//             else {
//                 res.send(err);
//             }
//         })
//     })
// productRouter.put('/:id', function (req, res) {   //Update a item with id
//     Product.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//             $set: {
//                 name: req.body.name,
//                 masp: req.body.masp,
//                 gia: req.body.gia,
//                 p_loai: req.body.p_loai,
//                 keyword: req.body.keyword
//             }
//         }
//     ).exec(function (err, doc) {
//         if (!err) {
//             Product.findOne({ _id: req.params.id }).exec(function (err1, doc1) {
//                 if (!err1) {
//                     res.send(doc1);
//                 }
//                 else {
//                     res.send(err1);
//                 }
//             })
//         }
//         else {
//             res.send(err)
//         }
//     })
// })
//     .delete('/:id', function (req, res) {             //Delete a item with id
//         Product.findOne({ _id: req.params.id }).exec(function (err, doc) {
//             if (!err) {
//                 Product.collection.remove(doc);
//                 res.send('xoa thanh cong');
//             }
//             else {
//                 res.send(err);
//             }
//         })
//     })
//     .get('/:id', function (req, res) {                //Get a item with id
//         Product.findOne({ _id: req.params.id }).exec(function (err, doc) {
//             if (!err) {
//                 res.send(doc);
//             }
//             else {
//                 res.send(err);
//             }
//         })
//     })

module.exports = productRouter;