const general = require('../middlewares/general.middleware');

module.exports = function(app) {
    var auth = require('../controllers/auth_service.controller');
    app.post('/service-api/auth', auth.auth);
}