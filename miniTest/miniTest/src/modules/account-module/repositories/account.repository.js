import AccountSchema from '../models/account.model';
import { AccountStatus } from '../commons/account-status.common';

const isExistedEmail = async (email) => {
    const result = await AccountSchema.findOne({ email });
    return result;
};

const create = async (data) => {
    const result = await AccountSchema.create(data);
    return result;
};

const getAccountByEmail = async (email) => {
    const result = await AccountSchema.findOne({ email });
    return result;
};

const getAccountByFacebookId = async (facebookId) =>{
    const result = await AccountSchema.findOne({
        'facebook.facebookId': facebookId
    });
    return result;
};

const getPayloadJwtSchema = (account) => {
    return {
        accountId: account._id,
    };
};

const getAccountById = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, status: AccountStatus.ACTIVE });
    return result;
};

const updateAccount = async (email, data) => {
    const result = await AccountSchema.updateOne({
        email
    }, { ...data });
    if (result.n !== 0) return true;
    return false;
};

const updateGoogleToken = async (email, token) =>{
    const result = await AccountSchema.updateOne({
        email
    }, {
        'google.googleToken': token
    });
    if(result.n !== 0) return true;
    return false;
};

const updateFacebookToken = async (facebookId, token) =>{
    const result = await AccountSchema.updateOne({
        'facebook.facebookId': facebookId
    }, {
        'facebook.facebookToken': token
    });
    if(result.n !== 0) return true;
    return false;
};

const isExistedAccountWithEmail = async (email) =>{
    const result = await AccountSchema.findOne({ email });
    return result;
};

const isExistedAccountWithFacebookId = async (facebookId) =>{
    const result = await AccountSchema.findOne({
        'facebook.facebookId': facebookId
    });
    return result;
}
export default {
    create,
    isExistedEmail,
    getAccountByEmail,
    getPayloadJwtSchema,
    getAccountById,
    updateAccount,
    isExistedAccountWithEmail,
    updateGoogleToken,
    isExistedAccountWithFacebookId,
    updateFacebookToken,
    getAccountByFacebookId,
};