var config = require('./config/env');
const util = require('util');
var express = require('./config/express');
var app = express();
var db = require('./config/databases/sei_db');
var cors = require('cors');

const corsOptions = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
    ],
    allowedHeaders: [
        'Content-Type',
        'X-Requested-With',
    ],
};
app.use(cors(corsOptions));

app.listen(config.listenPort, function () {
    console.log('Running on Port ' + config.listenPort);
});

module.exports = app;