import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateAccountErrors,
    AccountLoginErrors,
    // MeAccountErrors,
    LoginWithFacebookErrors,
    LoginWithGoogleErrors,
} from '../error-codes/account.error-codes';

const createAccountInput = (req, res, next) => {
    const { email, password, name } = req.body;
    try {
        if (!req.body) throw CreateAccountErrors.NO_DATA;
        if (!email) throw CreateAccountErrors.NO_EMAIL;
        if (!Validator.isEmail(email)) throw CreateAccountErrors.INVALID_EMAIL;
        if (!password) throw CreateAccountErrors.NO_PASSWORD;
        if (!name) throw CreateAccountErrors.NO_NAME;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const logInAccountInput = (req, res, next) => {
    const { email, password, } = req.body;
    try {
        if (!req.body) throw AccountLoginErrors.NO_DATA;
        if (!email) throw AccountLoginErrors.NO_EMAIL;
        if (!Validator.isEmail(email)) throw AccountLoginErrors.INVALID_EMAIL;
        if (!password) throw AccountLoginErrors.NO_PASSWORD;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

// const meInput = (req, res, next) => {
//     const { jwt } = req.headers;
//     try {
//         if (!jwt) throw MeAccountErrors.NO_DATA;
//         return next();
//     } catch (error) {
//         return res.onError(new ValidationError(error));
//     }
// };

const loginWithFacebookInput = (req, res, next) => {
    const {
        facebook,
    } = req.body;
    try {
        if (!req.body) throw LoginWithFacebookErrors.NO_DATA;
        if (!facebook) throw LoginWithFacebookErrors.NO_FACEBOOK;
        if(!facebook.facebookPhone && !facebook.facebookEmail) throw LoginWithFacebookErrors.NO_EMAIL_AND_PHONE;
        if (facebook.facebookPhone){
            if(!Validator.isNumeric(facebook.facebookPhone)) throw LoginWithFacebookErrors.INVALID_FACEBOOK_PHONE;
        };
        if(facebook.facebookEmail){
            if(!Validator.isEmail(facebook.facebookEmail)) throw LoginWithFacebookErrors.INVALID_FACEBOOK_EMAIL;
        }
        if (!facebook.facebookId) throw LoginWithFacebookErrors.NO_FACEBOOK_ID;
        if (!facebook.facebookToken) throw LoginWithFacebookErrors.NO_FACEBOOK_TOKEN;
        if (!facebook.facebookName) throw LoginWithFacebookErrors.NO_FACEBOOK_NAME;
        req.body = {
            facebook
        };
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

// const reduceLoginWithFacebookInput = (req, res, next) => {
//     const data = req.body;
//     const inputData = Object.keys(data.facebook).reduce((result, key) => {
//         if (data.facebook[key]) {
//             result[key] = data.facebook[key];
//         }
//         return result;
//     }, {});
//     req.body = { email: data.email, facebook: inputData};
//     return next();
// };

const logInWithGoogleInput = (req, res, next) => {
    const {
        email,
        google,
    } = req.body;
    try {
        if (!req.body) throw LoginWithGoogleErrors.NO_DATA;
        if (!email) throw LoginWithGoogleErrors.NO_EMAIL;
        if (!Validator.isEmail(email)) throw LoginWithGoogleErrors.INVALID_EMAIL;
        if (!google) throw LoginWithGoogleErrors.NO_GOOGLE;
        if (!google.googleId) throw LoginWithGoogleErrors.NO_GOOGLE_ID;
        if (!google.googleToken) throw LoginWithGoogleErrors.NO_GOOGLE_TOKEN;
        if (!google.googleName) throw LoginWithGoogleErrors.NO_GOOGLE_NAME;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createAccountInput,
    logInAccountInput,
    // meInput,
    loginWithFacebookInput,
    // reduceLoginWithFacebookInput,
    logInWithGoogleInput,
};