import mongoose, {
    Schema
} from 'mongoose';
import { HashText, CompareTextAndHash } from '../../../utils/bcrypt.util';

const AccountSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    local: {
        password: {
            type: String
        }
    },
    facebook: {
        facebookId: String,
        facebookToken: String,
        facebookName: String,
        facebookPhone: String,
    },
    google: {
        googleId: String,
        googleToken: String,
        googleName: String,
        googlePhone: String,
    },
});

async function preSaveUserModel(cb) {
    const user = this;
    if (!user.isModified('local.password')) return cb();
    try {
        const hash = await HashText(user.local.password);
        user.local.password = hash;
        return cb();
    } catch (error) {
        return cb(error);
    }
}

async function comparePasswordMethod(candidatePassword) {
    const isMatch = await CompareTextAndHash(candidatePassword, this.local.password);
    return isMatch;
}

AccountSchema.pre('save', preSaveUserModel);
AccountSchema.methods.comparePassword = comparePasswordMethod;

export default mongoose.model('Account', AccountSchema);