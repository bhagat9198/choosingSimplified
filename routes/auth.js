const exprsee = require('express');

const authController = require('../controller/auth');

const route = exprsee.Router();

route.get('/login', authController.getLogin);
route.post('/login', authController.postLogin);

route.get('/signup', authController.getSignup);
route.post('/signup', authController.postSignup);

route.use('/dashbord', authController.useDashbord);

module.exports = route;