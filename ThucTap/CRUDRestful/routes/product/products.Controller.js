var Product = require('./products.Model');
var mongoose = require('mongoose');
var productService = require('./products.Service');

exports.create = function (req, res) {//Create a item
    // if(productService.validateAddProduct )
    // console.log(productService.validateAddProduct(req.body.name));
    var product = new Product(req.body)
    Product.collection.insertOne(product, function (err, doc) {
        if (!err) {
            return res.send(product);
        }
        else {
            return res.send(err);
        }
    })
}
exports.getAll = function (req, res) {//Get all items
    Product.find().exec(function (err, doc) {
        if (!err) {
            return res.send(doc);
        }
        else {
            return res.send(err);
        }
    })
}
exports.getOne = function (req, res) {//Get a item with id
    Product.findOne({ _id: req.params.id }).exec(function (err, doc) {
        if (!err) {
            return res.send(doc);
        }
        else {
            return res.send(err);
        }
    })
}
exports.update = function (req, res) {//Update a item with id
    Product.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                masp: req.body.masp,
                gia: req.body.gia,
                p_loai: req.body.p_loai,
                keyword: req.body.keyword
            }
        }
    ).exec(function (err, doc) {
        if (!err) {
            Product.findOne({ _id: req.params.id }).exec(function (err1, doc1) {
                if (!err1) {
                    return res.send(doc1);
                }
                else {
                    return res.send(err1);
                }
            })
        }
        else {
            return res.send(err)
        }
    })
}
exports.delete = function (req, res) {//Delete a item with id
    Product.findOne({ _id: req.params.id }).exec(function (err, doc) {
        if (!err) {
            Product.collection.remove(doc);
            return res.send('xoa thanh cong');
        }
        else {
            return res.send(err);
        }
    })
}
function xoadau( str)
{
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}
exports.search = function (req, res) {//Search items with keyword
    req.body.keyword = xoadau(req.body.keyword);
    req.body.keyword = req.body.keyword.toLowerCase();
    var str1 = req.body.keyword;
    var Pro = [];
    var vitri_cu = [];
    var max = 5;
    var limit_req = req.body.keyword.split(' ').length;
    Product.find().exec(function (err, doc) {
        if (!err) {
            for (var m = limit_req - 1; m >= 0; m--) {
                for (var i = 0; i < doc.length; i++) {
                    for (var j = 0; j < doc[i].keyword.length; j++) {
                        var str = doc[i].keyword[j];
                        str = xoadau(str);
                        str.toLowerCase();
                        if (Pro.length > max) {
                            return res.send(Pro);
                        } else {
                            if (str == str1) {
                                var tong = 0;
                                for (var vitri = 0; vitri < vitri_cu.length; vitri++) {
                                    if (i == parseInt(vitri_cu[vitri])) {
                                        tong++;
                                    }
                                }
                                if (tong == 0) {
                                    Pro.push(doc[i]);
                                    vitri_cu.push(i);
                                }

                            }
                        }
                    }
                    if (Pro.length > max) {
                        return res.send(Pro);
                    }
                }
                if (Pro.length > max) {
                    return res.send(Pro);
                }
                var dem = -1;
                for (var chay = str1.length - 1; chay >= 0; chay--) {
                    if (str1[chay] == ' ') {
                        dem = chay;
                        break;
                    }
                }
                str1 = str1.slice(0, dem).trim();
            }
            if (Pro.length < max) {
                str1 = req.body.keyword;
                for (var i = 0; i < doc.length; i++) {
                    for (var j = 0; j < doc[i].keyword.length; j++) {
                        var str = doc[i].keyword[j];
                        str = xoadau(str);
                        str.toLowerCase();
                        if (str1.indexOf(str) != -1 || (str.indexOf(str1)) != -1) {
                            var tong = 0;
                            for (var vitri = 0; vitri < vitri_cu.length; vitri++) {
                                if (i == parseInt(vitri_cu[vitri])) {
                                    tong++;
                                }
                            }
                            if (tong == 0) {
                                Pro.push(doc[i]);
                                vitri_cu.push(i);
                            }
                        }
                    }
                    if (Pro.length > max) {
                        return res.send(Pro);
                    }
                }

            }
            return res.send(Pro);
        }
        else {
            return res.send(err);
        }
    })
}