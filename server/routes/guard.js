const logger = require('../services/logging');
const db = require('../services/dal/database');
const jwt = require('jsonwebtoken');

function reject(res) {
    res.status(401);
    res.end();
}

module.exports = function (req, res, next) {
    const auth = req.headers.authorization;

    if(auth) {
        try {
            // tries to verify the JWT
            const token = jwt.verify(auth, process.env.JWT);

            if(token) {

                // the JWT can be signed by the server
                // but it could not be the most recent token
                // we need to make sure this is the most recent token
                // this call checks if it is the most recent token
                db.execute('is_logged_in(?)', auth)
                .then(users => users[0][0])
                .then(user => {

                    if(user) {
                        // is most recent token, add the user creds to the incoming request
                        // so we can use them in the controllers if needed
                        req.user = {id: token.id, username: token.username};
                        next();
                    }else {

                        // not most recent token
                        reject(res);
                    }
                })
            } else {
                // jwt verify returns empty object
                reject(res);
            }
        } catch (e) {
            // jwt verify failed, due to bad signature or other reason
            logger.log(e);
            reject(res);
        }
    } else {
        // user didnt supply auth header
        reject(res);
    }
}