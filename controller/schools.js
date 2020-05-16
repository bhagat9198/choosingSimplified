exports.getAddSchool = (req, res, next) => {
  res.render('schools/add-school', {
    pageTitle: 'Add School'
  });
};

exports.postAddSchool= (req, res, next) => {

};

exports.getSchoolDetails = (req, res, next) => {
  res.render('schools/school-details', {
    pageTitle: 'School Details'
  });
};

exports.getSchoolsList = (req, res, next) => {
  res.render('schools/schools-list', {
    pageTitle: 'Schools List'
  });
};
