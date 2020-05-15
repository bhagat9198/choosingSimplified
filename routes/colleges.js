const exprsee = require('express');

const collegesController = require('../controller/colleges');

const route = exprsee.Router();

route.get('add-college', collegesController.getAddCollege);
route.post('add-college', collegesController.postAddCollege);

route.get('college-details', collegesController.getCollegeDetails);

route.get('colleges-list', collegesController.getCollegesList);

module.exports = route;