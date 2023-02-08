const config = require('../config/env');
const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.checkParam = function(param) {
    var code = config.returncode;
    var result = { code: code.success.code, msg: code.success.msg };

    for (var i = 0; i < param.length; i++) {
        if (param[i] === undefined) {
            result.code = code.missing_param.code;
            result.msg = code.missing_param.msg;
            break;
        }
    }

    return result;
}

exports.verifyToken = function(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined

    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;

        jwt.verify(req.token, config.dmcr_jwtSecret, (err, authData) => {
            if (err) {
                res.json(config.returncode.tokenid_not_exist);
            } else {
                req.body.authData = authData;
                next();
            }
        });

    } else {
        // Forbidden
        //res.sendStatus(403);
        res.json(config.returncode.not_allow);
    }
}

/* exports.callService = function(options) {
    return new Promise(function(resolve, reject) {

        var methodToCall;

        if (options.method == "get") {
            methodToCall = axios.get(config.services.smarthotel.host + options.service, { params: options.req.query });
        } else if (options.method == "post") {
            methodToCall = axios.post(config.services.smarthotel.host + options.service, options.req.body);
        } else if (options.method == "put") {
            methodToCall = axios.put(config.services.smarthotel.host + options.service, options.req.body);
        } else if (options.method == "delete") {
            methodToCall = axios.delete(config.services.smarthotel.host + options.service, { data: options.req.body });
        }

        methodToCall.then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve({ "code": config.returncode.service_not_available.code, msg: config.returncode.service_not_available.msg });
            });
    });
} */