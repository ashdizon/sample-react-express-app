const logger = require('../../logging');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

module.exports.execute = function (query, ...params) {

    return new Promise((resolve, reject) => {
        db.query(`call ${query}`, params, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}