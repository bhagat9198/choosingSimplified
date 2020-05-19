const exprsee = require('express');
const multer = require('multer');
const uniqid = require('uniqid');

const teachersController = require('../controller/teachers');
const isLoggedIn = require('../middleware/isLoggedIn').isLoggedIn;

const route = exprsee.Router();

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {  
    console.log('saved at preffered location');
    cb(null, 'data/teachers');
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

const teacherImg = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');

route.get('/add-teacher', isLoggedIn, teachersController.getAddTeacher);
route.post('/add-teacher', isLoggedIn, teacherImg, teachersController.postAddTeacher);

route.get('/teacher-details/:teacher_id', isLoggedIn, teachersController.getTeacherDetails);

route.get('/teachers-list', teachersController.getTeachersList);

module.exports = route;