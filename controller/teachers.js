const Teachers = require('../model/teacher');

exports.getAddTeacher = (req, res, next) => {
  res.render('teachers/add-teacher', {
    pageTitle: 'Add Teacher'
  });
};

exports.postAddTeacher= (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const website = req.body.website;
  const instituteName = req.body.instituteName;
  const phone = req.body.phone;
  const location = req.body.location;
  const teachingSince = req.body.teachingSince;
  const stars = req.body.stars;
  const message = req.body.message;
  const subjects = req.body.subject;
  const user_id = req.session.user._id;
  // console.log(subjects);

  if(req.file != undefined) {
    // console.log(req.file);
    // console.log(req.file.path);
    
    const teacher = new Teachers({
      name: name,
      email: email,
      website: website,
      instituteName: instituteName,
      phone: phone,
      location: location,
      teachingSince: teachingSince,
      stars: stars,
      message: message,
      imagePath: req.file.path,
      subjects: subjects,
      user_id: user_id
    });

    teacher.save()
    .then(data => {
      console.log('Data Saved');
      res.redirect('/teachers/teachers-list');
    })
    .catch(err => {
      console.log(err);
    })
  } else {
    console.log('Data not saved');
    // console.log(req.file);
  }
};

exports.getTeacherDetails = (req, res, next) => {
  const teacher_id = req.params.teacher_id;
  console.log(teacher_id);
  
  Teachers.findById(teacher_id)
  .then(teacher => {
    res.render('teachers/teacher-details', {
      pageTitle: 'Teacher Details',
      teacher:  teacher
    }); 
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getTeachersList = (req, res, next) => {
  Teachers.find()
  .then(teachers => {
    res.render('teachers/teachers-list', {
      pageTitle: 'Teachers List',
      teachers:  teachers
    });
  })
  .catch(err => {
    console.log(err);
  });
};
