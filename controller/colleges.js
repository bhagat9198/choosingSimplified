const Colleges = require('../model/college');

exports.getAddCollege = (req, res, next) => {
  res.render('colleges/add-college', {
    pageTitle: 'Add College'
  })
};

exports.postAddCollege = (req, res, next) => {
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

  if(req.file != undefined) {
    const college = new Colleges({
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
    college.save()
    .then(data => {
      console.log('Data saved');
      res.redirect('/colleges/colleges-list');
    })
    .catch(err => {
      // res.redirect('/schools/add-school');
      console.log(err);
    });
  } else {
    console.log('Data not saved');
    res.redirect('/colleges/add-college');
  }
};

exports.getCollegeDetails = (req, res, next) => {
  const college_id = req.params.college_id;
  console.log(college_id);
  
  Colleges.findById(college_id)
  .then(college => {
    res.render('colleges/college-details', {
      pageTitle: 'College Details',
      college: college
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCollegesList = (req, res, next) => {
  Colleges.find()
  .then(colleges => {
    res.render('colleges/colleges-list', {
      pageTitle: 'Colleges List',
      colleges: colleges
    });
  })
  .catch(err => {
    console.log(err);
  });
};