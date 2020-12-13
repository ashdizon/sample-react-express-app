const db = require('../../../services/dal/database');

/**
 * Messages Service Class, handles logic around messages
 */

module.exports.getAllMessages = function(base, num) {
    return db.execute('get_all_messages(?,?)', base, num)
    .then(res => res[0]);
}

module.exports.getUserMessages = function (id, base, num) {
    return db.execute('get_user_messages(?,?,?)', id, base, num)
    .then(res => res[0]);
}

module.exports.createMessage = function (id, msg) {
    return db.execute('create_message(?,?)', id, msg)
    .then(res => !!res.affectedRows);
}

module.exports.editMessage = function (msgId, userId, msg) {
    return db.execute('edit_message(?,?,?)', msgId, userId, msg)
    .then(res => !!res.affectedRows);
}

module.exports.deleteMessage = function(msgId, userId) {
    return db.execute('delete_message(?,?)', msgId, userId)
    .then(res => !!res.affectedRows);
}