const express = require('express');

const homeController = require('../controller/home');

const route = express.Router();

route.use('/', homeController.getHome);

module.exports = route;