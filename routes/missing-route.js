const config = require('../config/env');

module.exports = function(app) {

    app.all("/", function(req, res) {
        res.json({ code: config.returncode.success.code, msg: "Welcome to service-api" }); //
    });

    app.all("*", function(req, res) {
        res.json({ code: config.returncode.service_not_available.code, msg: config.returncode.service_not_available.msg }); //
    });
}