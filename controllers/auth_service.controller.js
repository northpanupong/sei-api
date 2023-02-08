const jwt = require('jsonwebtoken');
const config = require('../config/env');
const util = require('util');
const general = require('../middlewares/general.middleware');

exports.auth = async function(req, res) {

    const apptoken = req.body.apptoken;
    var result = general.checkParam([apptoken]);

    const code = config.returncode;
    if (result.code == code.success.code) {

        var timeStampNow = Date.now() / 1000 | 0;
        var timeStampExpire = timeStampNow + (((60 * 60) * 24) * parseInt(config.jwtTokenExpireIn.split("d")[0]));

        if (apptoken == 'sei-2023-weweb') {

            const appInfo = {
                app_token: apptoken,
            }

            var tokenid = await generateToken(appInfo);
            result.tokenid = tokenid;

            result.create_at = timeStampNow;
            result.expire_at = timeStampExpire;
        } else {
            result.code = code.unsuccess.code;
            result.msg = "Invalid App Token.";
        }


    }

    res.json(result);
}

function generateToken(appInfo) {
    return new Promise(function(resolve, reject) {
        jwt.sign({ appInfo: appInfo }, config.dmcr_jwtSecret, { expiresIn: config.jwtTokenExpireIn }, (err, token) => {
            resolve(token);
        });
    });
}