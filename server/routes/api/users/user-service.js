
const db = require('../../../services/dal/database');



module.exports.createUser = function(username, password) {
    return db.execute('add_user(?,?)', username, password)
    .then(res => console.log(res))
}

module.exports.updateUser = function(id, username, password) {
    return db.execute('update_user(?,?,?)', id, username, password)
    .then(res => console.log(res));
}

module.exports.deleteUser = function(id) {
    return db.execute('delete_user(?)', id)
    .then(res => console.log(res));
}
