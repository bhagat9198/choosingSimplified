const exprsee = require('express');
const multer = require('multer');
const uniqid = require('uniqid');

const schoolsController = require('../controller/schools');
const isLoggedIn = require('../middleware/isLoggedIn').isLoggedIn;

const route = exprsee.Router();

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {  
    cb(null, 'data/schools');
  },
  filename: function(req, file, cb) {
    cb(null, uniqid()+'-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/img' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/web') 
  {
    cb(null, true);
  } else {
    cb(null, false)
  }
}

const schoolImg = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');

route.get('/add-school', isLoggedIn, schoolsController.getAddSchool);
route.post('/add-school', isLoggedIn, schoolImg, schoolsController.postAddSchool);

route.get('/school-details/:school_id', isLoggedIn, schoolsController.getSchoolDetails);

route.get('/schools-list', schoolsController.getSchoolsList);

module.exports = route;