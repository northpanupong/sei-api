const general = require('../middlewares/general.middleware');

module.exports = function(app) {
    var auth = require('../controllers/auth_service.controller');
    app.post('/dev22-sei/service-api/auth', auth.auth);
}