exports.getAddTeacher = (req, res, next) => {
  res.render('/teachers/add-teacher', {
    pageTitle: 'Add Teacher'
  });
};

exports.postAddTeacher= (req, res, next) => {

};

exports.getTeacherDetails = (req, res, next) => {
  res.render('/teachers/teachers-details', {
    pageTitle: 'Teacher Details'
  });
};

exports.getTeachersList = (req, res, next) => {
  res.render('/teachers/teachers-list', {
    pageTitle: 'Teachers List'
  });
};
