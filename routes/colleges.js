const exprsee = require('express');
const multer = require('multer');
const uniqid = require('uniqid');

const collegesController = require('../controller/colleges');
const isLoggedIn = require('../middleware/isLoggedIn').isLoggedIn;

const route = exprsee.Router();

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {  
    console.log('saved at preffered location');
    cb(null, 'data/colleges');
  },
  filename: function(req, file, cb) {
    cb(null, uniqid()+'-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/img' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/web') 
  {
    console.log('file type match');
    cb(null, true);
  } else {
    cb(null, false)
  }
}

const collegeImg = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');

route.get('/add-college', isLoggedIn, collegesController.getAddCollege);
route.post('/add-college', isLoggedIn, collegeImg, collegesController.postAddCollege);

route.get('/college-details/:college_id', collegesController.getCollegeDetails);

route.get('/colleges-list', collegesController.getCollegesList);

module.exports = route;