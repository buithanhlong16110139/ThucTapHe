var Joi = require('joi');
var Bcrypt = require('bcryptjs');

exports.hashPassword = function (password) {
    const salt = Bcrypt.genSaltSync(10);
    return Bcrypt.hashSync(password, salt);
}
exports.comparePassword = function (password, hashedPassword) {
    return Bcrypt.compareSync(password, hashedPassword);
}
exports.validateSignup = function (body) {
    const schema = Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),
        phone: Joi.string().min(8).max(11).required(),
        address: Joi.string().max(60).required(),
        username: Joi.string().max(15).required(),
        password: Joi.string().min(5).max(10).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        confirmPassword: Joi.string().min(5).max(10).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        age: Joi.number().integer()
    });
    const { error, value } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
}
// exports.validateEmail = function (email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
// exports.validatePassword = function (password) {
//     if (password.trim() == "" || password.length <5) {
//         return false;
//     }
// }
exports.validateConfirmPassword = function (password, confirmPassword) {
    if (password != confirmPassword) {
        return false;
    }
    return true;
}
// exports.validateAge = function (age) {
//     if (age <= 0) {
//         return false;
//     }
//     return true;
// }