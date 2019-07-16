const User = require('./user.Models');
const mongoose = require('mongoose');
const userService = require('./user.Services');

exports.signup = function (req, res) {
    const { value, error } = userService.validateSignup(req.body);
    if (error) {
        return res.send(error);
    }
    // else{
    //     res.send(value);
    // }
    //res.send(value);
    //res.send(userService.validateSignup(req.body));
    // if(userService.validatePassword(req.body.password) == false){
    //     return res.send("Mật khẩu quá ngắn");
    // }else if(userService.validateAge(req.body.age) == false){
    //     return res.send("Vui lòng nhập số tuổi hợp lệ");
    if (userService.validateConfirmPassword(req.body.password, req.body.confirmPassword) == false) {
        return res.send("Mật khẩu xác nhận không chính xác")
    }
    var hashedPassword = userService.hashPassword(req.body.password);
    var user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        username: req.body.username,
        password: hashedPassword,
        age: req.body.age
    });
    User.collection.insertOne(user, function (err, doc) {
        if (!err) {
            return res.send(doc);
        } else {
            return res.send(err);
        }
    })
    // else {
    //     res.send("email không hợp lệ");
    // }
}
exports.login = function (req, res) {
    User.findOne({ username: req.body.username }).exec(function (err, doc) {
        if (!err) {
            if (doc != null) {
                if (userService.comparePassword(req.body.password, doc.password)) {
                    res.send("Đăng nhập thành công");
                }
                else {
                    res.send("Sai tài khoản hoặc mật khẩu");
                }
            }
            else {
                res.send("Sai tài khoản hoặc mật khẩu");
            }
        }
        else {
            res.send(err);
        }
    })
}