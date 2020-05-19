const express = require('express');

const homeController = require('../controller/home');

const route = express.Router();

route.get('/', homeController.getHome);

route.post('/', homeController.postHome);

route.use(homeController.get404);

module.exports = route;