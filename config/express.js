process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var fs = require('fs');

module.exports = function() {
    var app = express();
    const servicesRoute = './routes/services';

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(compression());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    require('../routes/auth_service.routes')(app);

    fs.readdirSync(servicesRoute).forEach(file => {
        if (file.includes(".routes.js")) {
            if (fs.lstatSync(servicesRoute + "/" + file).isFile()) {
                require('../routes/services/' + file)(app);
            }
        } else {
            if (fs.lstatSync(servicesRoute + "/" + file).isDirectory()) {
                fs.readdirSync(servicesRoute + "/" + file).forEach(file2 => {
                    if (file2.includes(".routes.js")) {
                        require('../routes/services/' + file + '/' + file2)(app);
                    }
                });
            }
        }
    });
    require('../routes/missing-route')(app);
    app.use(express.static('./public'));

    //require('../controllers/init/websocket.controller')();

    return app;
}