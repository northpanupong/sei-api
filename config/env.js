//process.env.NODE_ENV = 'production';
var seiAPIDB = require('./databases/sei_db');
var returncode = require('./returncode');
var fieldDB = require('./databases/field_db');
var arrColor = require('./arrColor')

module.exports = {
    listenPort: 3500,
    //redisPort: 6379,
    //redisPassword: 'uSGHR9Gkg<Q56!6',
    dmcr_jwtSecret: 'B[r)ZV6a%GP5R#F3urYL',
    jwtTokenExpireIn: '7d',
    tokenAlgorithms: 'HS256',
    seiAPIDB: seiAPIDB,
    returncode: returncode,
    fieldDB: fieldDB,
    arrColor: arrColor,
    hostForImage: "http://php8.wewebcloud.com/dev22-sei/upload"
};