exports.getAddCollege = (req, res, next) => {
  res.render('colleges/add-college', {
    pageTitle: 'Add College'
  });
};

exports.postAddCollege = (req, res, next) => {

};

exports.getCollegeDetails = (req, res, next) => {
  res.render('colleges/college-details', {
    pageTitle: 'College Details'
  });
};

exports.getCollegesList = (req, res, next) => {
  res.render('colleges/colleges-list', {
    pageTitle: 'Colleges List'
  });
};