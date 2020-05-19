
exports.isLoggedIn = (req, res, next) => {
  if(req.session.isLoggedIn) {
    // console.log('Logged In');
    next();
  } else {
    // console.log('Not logged In');
    res.render('auth/restriction', {
      pageTitle: 'Restriction'
    });
  }
};