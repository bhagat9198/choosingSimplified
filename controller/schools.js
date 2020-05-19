const Schools = require('../model/school');

exports.getAddSchool = (req, res, next) => {
  res.render('schools/add-school', {
    pageTitle: 'Add School'
  });
};


exports.postAddSchool= (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const website = req.body.website;
  const phone = req.body.phone;
  const location = req.body.location;
  const buildYear = req.body.buildYear;
  const stars = req.body.stars;
  const instituteType = req.body.instituteType;
  const message = req.body.message;
  const user_id = req.session.user._id;
  // let image = req.file;
  // const imagePath = image.path;
  // console.log(imagePath);

  if(req.file != undefined) {
    const school = new Schools({
      name: name,
      email: email,
      website: website,
      phone: phone,
      location: location,  
      buildYear: buildYear,
      stars: stars,
      instituteType: instituteType,
      message: message,
      imagePath: req.file.path,
      user_id: user_id
    });
    school.save()
    .then(data => {
      res.redirect('/schools/schools-list');
    })
    .catch(err => {
      // res.redirect('/schools/add-school');
      console.log(err);
      
    });
  } else {
    res.redirect('/schools/add-school');
  }

  
};

exports.getSchoolDetails = (req, res, next) => {
  const school_id = req.params.school_id;
  console.log(school_id);
  
  Schools.findById(school_id)
  .then(school => {
    res.render('schools/school-details', {
      pageTitle: 'School Details',
      school: school
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getSchoolsList = (req, res, next) => {
  Schools.find()
  .then(schools => {
    res.render('schools/schools-list', {
      pageTitle: 'Schools List',
      schools: schools
    });
  })
  .catch(err => {
    console.log(err);
  });
};
