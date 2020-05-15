exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login'
  });
};

exports.postLogin = (req, res, next) => {

};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Signup'
  });
};

exports.postSignup = (req, res, next) => {
  
};

exports.useDashbord = (req, res, next) => {
  res.render('auth/dashbord', {
    pageTitle: 'Dashbord'
  });
};

