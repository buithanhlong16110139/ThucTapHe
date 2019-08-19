import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const storySchema = new Schema({
    storyName: {
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
    maxProcessStory: {
        type: Number
    },
    processStory: {
        type: Number
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
export default mongoose.model('stories', storySchema);