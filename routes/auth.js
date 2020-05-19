const exprsee = require('express');
const multer = require('multer');
const uniqid = require('uniqid');

const authController = require('../controller/auth');
const isLoggedIn = require('../middleware/isLoggedIn').isLoggedIn;

const route = exprsee.Router();

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {  
    console.log('saved at preffered location');
    cb(null, 'data/users');
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

const userImg = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');

route.get('/login', authController.getLogin);
route.post('/login', authController.postLogin);

route.get('/signup', authController.getSignup);
route.post('/signup', authController.postSignup);

route.get('/logout', isLoggedIn, authController.getLogout)

route.get('/dashbord', isLoggedIn, authController.getDashbord);

route.post('/password-reset', isLoggedIn, authController.postPasswordReset);
route.post('/post-img', isLoggedIn, userImg, authController.postImg)

module.exports = route;