const expressJwt = require('express-jwt');
const config = require('./config.json');
const userService = require('../services/userService');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/docs/',
            // public routes that don't require authentication
            '/user/authenticate',
            '/user/register',
            {
                url: /^\/get\/.*/,
                methods: ['GET']
            }
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};