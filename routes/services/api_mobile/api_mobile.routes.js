const axios = require('axios');
const general = require('../../../middlewares/general.middleware');

var serviceName = "api_mobile";
var api_mobile = require('../../../controllers/api_mobile.controller');

module.exports = function (app) {
    app.all('/dev22-sei/service-api/home/' + serviceName, general.verifyToken, api_mobile.init, function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", ["X-Requested-With",'Content-Type']);
        next();
    });
}