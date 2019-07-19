import User from '../models/user.Model';
import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs'

export default {
    async createNewUser(fullName, email, phone, address, username, password, age) {
        const newUser = await User.create({fullName, email, phone, address, username, password, age});
        return newUser;
    }
    // async updateUser(fullName, email, phone, address, username, password, age){
    //     const user = await User.findOneAndUpdate(
    //         {_id: req.params.id},
    //         {
    //             $set:{
    //                 fullName: fullName,
    //                 email: email,
    //                 phone: phone,
    //                 address: address,
    //                 username: username,
    //                 password: password,
    //                 age: age
    //             }
    //         });
    //     return user;
    // }
}