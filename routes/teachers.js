const exprsee = require('express');

const teachersController = require('../controller/teachers');

const route = exprsee.Router();

route.get('/add-teacher', teachersController.getAddTeacher);
route.post('/add-teacher', teachersController.postAddTeacher);

route.get('/teacher-details', teachersController.getTeacherDetails);

route.get('/teachers-list', teachersController.getTeachersList);

module.exports = route;