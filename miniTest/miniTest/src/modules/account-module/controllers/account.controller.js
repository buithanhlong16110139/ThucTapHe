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
import { isBuffer } from 'util';

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



const logInWithGoogle = async (req, res) => {
    const { email, google } = req.body;
    try {
        let result;
        const isExistedEmail = await AccountRepository.isExistedAccountWithEmail(email);
        if (!isExistedEmail) {
            result = await AccountRepository.create({
                name: google.googleName,
                email,
                google
            });
            if (!result) throw new NotImplementErrors(LoginWithGoogleErrors.CREATE_FAIL);
        }
        else {
            if (isExistedEmail.google.googleId) {
                const updateAccount = await AccountRepository.updateGoogleToken(email, google.googleToken);
                if (!updateAccount) throw new NotImplementErrors(LoginWithGoogleErrors.UPDATE_FAIL);
                result = await AccountRepository.getAccountByEmail(email);
                if (!result) throw new NotFoundError(LoginWithGoogleErrors.GET_FAIL);
            }
            else {
                const updateAccount = await AccountRepository.updateAccount(email, {
                    google
                });
                if (!updateAccount) throw new NotImplementErrors(LoginWithGoogleErrors.UPDATE_FAIL);
                result = await AccountRepository.getAccountByEmail(email);
                if (!result) throw new NotFoundError(LoginWithGoogleErrors.GET_FAIL)
            }
        }
        const jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(result));
        if (!jwt) throw new NotImplementErrors(LoginWithGoogleErrors.LOGIN_FAIL);
        return res.onSuccess({ jwt });
    } catch (error) {
        return res.onError(error);
    }
};

const logInWithFacebook = async (req, res) => {
    const { facebook } = req.body;
    try {
        let result;
        const isExistedAccount = await AccountRepository.isExistedAccountWithFacebookId(facebook.facebookId);
        if (isExistedAccount) {
            const updateAccount = await AccountRepository.updateFacebookToken(facebook.facebookId, facebook.facebookToken);
            if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.UPDATE_FAIL);
            result = await AccountRepository.getAccountByFacebookId(facebook.facebookId);
            if (!result) throw new NotFoundError(LoginWithGoogleErrors.GET_FAIL);
        }
        else {
            if (facebook.facebookEmail) {
                const isExistedEmail = await AccountRepository.isExistedAccountWithEmail(facebook.facebookEmail);
                if (!isExistedEmail) {
                    result = await AccountRepository.create({
                        name: facebook.facebookName,
                        email: facebook.facebookEmail,
                        facebook
                    });
                    if (!result) throw new NotImplementErrors(LoginWithFacebookErrors.CREATE_FAIL);
                }
                else {
                    const updateAccount = await AccountRepository.updateAccount(facebook.facebookEmail, {
                        facebook
                    });
                    if (!updateAccount) throw new NotImplementErrors(LoginWithFacebookErrors.UPDATE_FAIL);
                    result = await AccountRepository.getAccountByEmail(email);
                    if (!result) throw new NotFoundError(LoginWithGoogleErrors.GET_FAIL)
                }
            }
            else {
                result = await AccountRepository.create({
                    name: facebook.facebookName,
                    facebook
                })
            }
        }
        const jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(result));
        if (!jwt) throw new NotImplementErrors(LoginWithFacebookErrors.LOGIN_FAIL);
        return res.onSuccess({ jwt });
    } catch (error) {
        return res.onError(error);
    }
}
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