const initializeEndpoints = (app) => {
    app.use('/channel',require('../controller/channelController'));
    app.use('/user',require('../controller/userController'));
    app.use('/message',require('../controller/messageController'));
    app.use('/chat',require('../controller/chatController'));
    app.use('/categories',require('../controller/categoryController'));
}
module.exports = initializeEndpoints;