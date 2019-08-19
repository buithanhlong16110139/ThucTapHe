import StoryHandler from '../handlers/story.Handlers'
import MilistoneHandler from '../handlers/milistone.Handlers'
export default{
    async create(req,res){
        try {
            const {storyName, startDate, endDate, isDone, milistoneId, projectId} = req.body;
            const countStory = await MilistoneHandler.countStory(milistoneId);
            const maxProcessStory = (100)/(countStory+1);
            const updateOtherStory = StoryHandler.updateAllStory(maxProcessStory, milistoneId);
            //console.log(updateOtherStory);
            const processStory = 0;
            const result = await StoryHandler.createNewStory(storyName, startDate, endDate, isDone, maxProcessStory, processStory, milistoneId, projectId);
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async getAll(req, res){
        try {
            const result = await StoryHandler.getAllStory();
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async getOne(req, res){
        try {
            const storyId = req.params.id;
            const result = await StoryHandler.getOneStory(storyId);
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async update(req, res){
        try {
            const storyId = req.params.id;
            const {storyName, startDate, endDate, isDone, maxProcessStory, processStory, milistoneId, projectId} = req.body;
            const result = await StoryHandler.updateStory(storyId, storyName, startDate, endDate, isDone, maxProcessStory, processStory, milistoneId, projectId)
            return res.send({
                data: result,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    },
    async delete(req, res){
        try {
            const storyId = req.params.id
            await StoryHandler.deleteStory(storyId)
            return res.send({
                data: null,
                error: null,
                success: 'ok'
            })
        } catch (error) {
            return res.send({
                data: null,
                error: error,
                success: null
            })
        }
    }
}