import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const projectSchema = new Schema({
    projectName: {
        type: String
    },
    isDone: {
        type: Boolean
    },
    processProject: {
        type: Number
    }
})
export default mongoose.model('projects', projectSchema);