import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const milistoneSchema = new Schema({
    milistoneName: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    }, 
    isDone: {
        type: Boolean
    },
    maxProcessMilistone:{
        type: Number
    },
    processMilistone: {
        type: Number
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "projects"
    }
})
export default mongoose.model('milistones', milistoneSchema);