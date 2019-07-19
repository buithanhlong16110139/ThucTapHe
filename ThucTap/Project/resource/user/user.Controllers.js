// const User = require('./user.Models');
// const mongoose = require('mongoose');
// const userService = require('./user.Services');
import User from './user.Models';
import userService from './user.Services';
import mongoose from 'mongoose';

export default {
    signup(req, res) {
        //console.log(req.body);
        const {value, error} = userService.validateSignup(req.body);
        if(error){
            return res.send(error);
        }
        if(userService.validateConfirmPassword(req.body.password, req.body.confirmPassword) == false)
        {
            return res.send("Xác nhận mật khẩu không chính xác");
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
        User.collection.insertOne(user, (err, doc)=>{
            if(!err){
                return res.send(doc);
            }
            return res.send(err);
        })
    },
    login(req, res){
        const { error, value } = userService.validateLogin(req.body);
        if(error){
            return res.send(error);
        }
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
}