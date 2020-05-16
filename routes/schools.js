const exprsee = require('express');

const schoolsController = require('../controller/schools');

const route = exprsee.Router();

route.get('/add-school', schoolsController.getAddSchool);
route.post('/add-school', schoolsController.postAddSchool);

route.get('/school-details', schoolsController.getSchoolDetails);

route.get('/schools-list', schoolsController.getSchoolsList);

module.exports = route;