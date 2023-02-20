var mysql = require('mysql');
var util = require('util');

exports.connectDB = function () {
    return mysql.createConnection({
        host: "183.88.224.221",
        user: "root",
        password: "IySY?Pk7!!mH",
        database: "2022_sei",
    });
}