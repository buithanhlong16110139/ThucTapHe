// Errors
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import NotImplementErrors from '../../../errors-handle/not-implemented.errors';
import AccountRepository from '../repositories/account.repository';
// Util
import {
    GenerateToken,
    // VerifyToken
} from '../../../utils/jwt.util';

// Commom - Code
import {
    CreateAccountErrors,
    LoginWithFacebookErrors,
    LoginWithGoogleErrors,
    AccountLoginErrors,
    // MeAccountErrors,
} from '../error-codes/account.error-codes';

const create = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existed = await AccountRepository.isExistedEmail(email);
        if (existed) throw new AlreadyExistError(CreateAccountErrors.EMAIL_ALREADY_EXIST);
        const account = await AccountRepository.create({
            name,
            email,
            local: {
                password
            }
        });
        return res.onSuccess(account);
    } catch (error) {
        return res.onError(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await AccountRepository.getAccountByEmail(email);
        if (!account) throw new NotFoundError(AccountLoginErrors.EMAIL_NEVER_EXIST);
        // compare password
        const isMatchPassword = await account.comparePassword(password);
        if (!isMatchPassword) throw new ValidationError(AccountLoginErrors.WRONG_PASSWORD);
        const jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
        return res.onSuccess({ jwt });
    } catch (error) {
        return res.onError(error);
    }
};


const logInWithFacebook = async (req, res) => {
    const { email, facebook } = req.body;
    try {
        let jwt;
        const isExistedEmail = await AccountRepository.getAccountByEmail(email);
        if (!isExistedEmail) { // /// account facebook chưa đăng nhập hệ thống
            if (!facebook.facebookName) { // / profile facebook ko có phone
                const account = await AccountRepository.create({
                    name: facebook.facebookName,
                    email,
                    facebook
                });
                if (!account) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
                if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
            } else { // / profile facebook có phone
                const account = await AccountRepository.create({
                    name: facebook.facebookName,
                    email,
                    phone: facebook.facebookPhone,
                    facebook
                });
                if (!account) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
                if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
            }
        } else if (!(isExistedEmail.facebook.facebookId) && isExistedEmail) { // / account facebook chưa đăng nhập nhưng có email giống với hệ thống
            if (!isExistedEmail.phone) { // ///// chưa có phone trong hệ thống
                if (!facebook.facebookPhone) { // ///// profile của facebook ko có phone
                    const updateAccount = await AccountRepository.updateAccount(email, {
                        facebook,
                    });
                    if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                    jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                    if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
                } else { // //////// profile của facebook có phone
                    const updateAccount = await AccountRepository.updateAccount(email, {
                        phone: facebook.facebookPhone,
                        facebook,
                    });
                    if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                    jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                    if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
                }
            } else { // đã có phone trong hệ thống
                const updateAccount = await AccountRepository.updateAccount(email, {
                    facebook
                });
                if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
            }
        } else { // /// account facebook đã đăng nhập vào hệ thống
            if (!isExistedEmail.phone) { // //// chưa có phone trong hệ thống
                if (!facebook.facebookPhone) { // /// profile của facebook ko có phone
                    const updateAccount = await AccountRepository.updateAccount(email, {
                        facebook
                    });
                    if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                    jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                    if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
                } else { // ///// profile của facebook có phone
                    const updateAccount = await AccountRepository.updateAccount(email, {
                        phone: facebook.facebookPhone,
                        facebook
                    });
                    if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                    jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                    if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
                }
            }
            else { // ///// đã có phone trong hệ thống
                const updateAccount = await AccountRepository.updateAccount(email, {
                    facebook
                });
                if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
            }
        }
        //console.log(await AccountRepository.getAccountByEmail(email));
        return res.onSuccess({ jwt });
    } catch (error) {
        return res.onError(error);
    }
};

const logInWithGoogle = async (req, res) => {
    const { email, google } = req.body;
    try {
        let jwt;
        const isExistedEmail = await AccountRepository.getAccountByEmail(email);
        if (!isExistedEmail) { // ////// account goolge chưa đăng nhập hệ thống
            const account = await AccountRepository.create({
                name: google.googleName,
                email,
                phone: google.googlePhone,
                google,
            });
            if (!account) throw new NotImplementErrors(LoginWithGoogleErrors.CREATE_FAIL);
            jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
            if (!jwt) throw new NotImplementErrors(LoginWithGoogleErrors.LOGIN_FAIL);
        } else if (!(isExistedEmail.google.googleId) && isExistedEmail) { // / account google chưa đăng nhập nhưng có email trùng với email trong hệ thống
            if (!isExistedEmail.phone) { // / chưa có phone trong hệ thống
                const updateAccount = await AccountRepository.updateAccount(email, {
                    phone: google.googlePhone,
                    google
                });
                if (!updateAccount) throw new NotImplementErrors(LoginWithGoogleErrors.UPDATE_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                if (!jwt) throw new NotImplementErrors(LoginWithGoogleErrors.LOGIN_FAIL);
            } else { // // đã có phone
                const updateAccount = await AccountRepository.updateAccount(email, {
                    google
                });
                if (!updateAccount) throw new NotImplementErrors(LoginWithGoogleErrors.UPDATE_FAIL);
                jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
                if (!jwt) throw new NotImplementErrors(LoginWithGoogleErrors.LOGIN_FAIL);
            }
        } else { // // account google đã từng đăng nhập vào hệ thống
            const updateAccount = await AccountRepository.updateAccount(email, {
                google
            });
            if (!updateAccount) throw new NotImplementErrors(LoginWithGoogleErrors.UPDATE_FAIL);
            jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(updateAccount));
            if (!jwt) throw new NotImplementErrors(LoginWithGoogleErrors.LOGIN_FAIL);
        }
        //console.log(await AccountRepository.getAccountByEmail(email));
        return res.onSuccess({ jwt });
    } catch (error) {
        return res.onError(error);
    }
};
// const me = async (req, res) => {
//     const { jwt } = req.headers;
//     try {
//         const authenData = VerifyToken(jwt);
//         const account = await AccountRepository.getAccountById(authenData.accountId);
//         if (!account) throw new NotFoundError(MeAccountErrors.INVALID_ACCOUNT);
//         return res.onSuccess(account);
//     } catch (error) {
//         return res.onError(error);
//     }
// };

export default {
    create,
    login,
    logInWithFacebook,
    logInWithGoogle,
    // me,
};