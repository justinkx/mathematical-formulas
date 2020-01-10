const Topics = require('../models/Topics');
const Categories = require('../models/Categories');


async function getTopics(categoryId) {
    return await Topics.find({categoryId: categoryId})
}

async function createTopic(topicParams) {
    const category = await Categories.findById(topicParams.categoryId)
    if (!category) {
        throw `Category for the topic does not exist`;
    }
    if(await Topics.findOne({name: topicParams.name})) {
        throw `Topic ${topicParams.name} already used !`
    }
    const topic = new Topics(topicParams);
    const savedTopic = await topic.save();
    return {
        message: `Topic ${topicParams.name} saved successfully`,
        topic: savedTopic
    }
}
async function updateTopic(id, topicParams) {
    const topic = await Topics.findById(id);
    if(!topic) throw `Topic not found.`;
    if (topicParams.categoryId) {
        const category = await Categories.findById(topicParams.categoryId)
        if (!category) {
            throw `Category for the topic does not exist`;
        }
    }
    Object.assign(topic,topicParams);
    const editedTopic = await topic.save();
    return {
        message: 'Topic edited Successfully',
        topic: editedTopic
    }
}

async function deleteTopic(id) {
    return await Topics.deleteOne({_id: id});
}
module.exports = {
    getTopics,
    createTopic,
    updateTopic,
    deleteTopic
}