var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');
// Tạo
router.post('/create', function(req, res){
    //res.send(req.body);
    var product = new Product(req.body)
    Product.collection.insertOne(product, function(err, doc){
        if(!err)
        {
            res.send(product);
        }
        else
        {
            res.send(err);
        }
    })
})
// Đọc
router.get('/', function(req, res){
    Product.find().exec(function(err, doc){
        if(!err)
        {
            res.send(doc);
        }
        else
        {
            res.send(err);
        }
    })
})
// Sửa
router.put('/update', function(req, res){
    Product.findOneAndUpdate(
        {_id: req.body.id},
        {
            $set: {
                name: req.body.name,
                masp: req.body.masp,
                gia: req.body.gia,
                p_loai: req.body.p_loai,
                keyword: req.body.keyword
            }
        }
    ).exec(function(err, doc){
        if(!err)
        {
            Product.findOne({_id: req.body.id}).exec(function(err1, doc1){
                if(!err1)
                {
                    res.send(doc1);
                }
                else
                {
                    res.send(err1);
                }
            })
        }
        else
        {
            res.send(err)
        }
    })
})
// Xóa
router.delete('/delete/:id', function(req, res){
    Product.findOne({_id: req.params.id}).exec(function(err, doc){
        if(!err)
        {
            Product.collection.remove(doc);
            res.send('xoa thanh cong');
        }
        else
        {
            res.send(err);
        }
    })
})

module.exports = router;