import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const taskSchema = new Schema({
    taskName: {
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
    maxProcessTask: {
        type: Number
    },
    processTask: {
        type: Number
    },
    storyId: {
        type: Schema.Types.ObjectId,
        ref: "stories"
    },
    milistoneId: {
        type: Schema.Types.ObjectId,
        ref: "milistones"
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "projects"
    }
})
export default mongoose.model('tasks', taskSchema);