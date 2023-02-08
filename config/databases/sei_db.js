var mysql = require('mysql');
var util = require('util');

exports.connectDB = function () {
    return mysql.createConnection({
        host: "192.168.1.129",
        user: "root",
        password: "IySY?Pk7!!mH",
        database: "2022_sei",
    });
}