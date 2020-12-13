const db = require('../../../services/dal/database');
const jwt = require('jsonwebtoken');

// makes user jwt and returns with username
function generateUserToken(user) {
    if(user) {
        const {id, username} = user;
        return {id, token: jwt.sign({id, username}, process.env.JWT)};
    }

    return null;
}

// calls into db to store the token with the users ID
function login(id, token, username) {
    return new Promise((resolve, reject) => {
        db.execute('login(?,?)', id, token)
        .then(resolve({token, id, username}))
        .catch(reject)
    });
}

// logs a user in
// creates JWT for user
// stores JWT in database
module.exports.login = function(user, pass) {
    return db.execute('get_user(?,?)', user, pass)
    .then(users => users[0][0])
    .then(generateUserToken)
    .then(userToken => login(userToken.id, userToken.token, user))
}

// logs the user ID out
module.exports.logout = function(id) {
    return db.execute('logout(?)', id)
    .then(res => !!res.affectedRows);
}
