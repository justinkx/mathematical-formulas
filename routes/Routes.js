const initializeEndpoints = (app) => {
    app.use('/user',require('../controller/userController'));
    app.use('/get',require('../controller/getController'));
    app.use('/post',require('../controller/postController'));
}
module.exports = initializeEndpoints;