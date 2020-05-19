const Teachers = require('../model/teacher');
const Schools = require('../model/school');
const Colleges = require('../model/college');
const Users = require('../model/user');
const Feedbacks = require('../model/feedback');

exports.getHome = (req, res, next) => {
  Teachers.find()
  .then(teachers => {
    let totalTeachers;
    let counts = new Object;
    // console.log(teachers.length);
    totalTeachers = teachers.length;
    // console.log(typeof(counts));
    counts.totalTeachers = totalTeachers
    return counts;
    // return totalTeachers;
  })
  .then(data => {
    // console.log(data);
    let totalColleges

    return Colleges.find()
    .then(colleges => {
      // console.log(colleges.length);
      totalColleges = colleges.length;
      data.totalColleges = totalColleges
      return data;
    });
  })
  .then(data =>{
    // console.log(data);
    let totalSchools;

    return Schools.find()
    .then(schools => {
      totalSchools = schools.length;
      data.totalSchools = totalSchools;
      return data;
    })    
  })
  .then(data => {
    // console.log(data);
    let totalUsers;

    return Users.find()
    .then(users => {
      totalUsers = users.length;
      data.totalUsers = totalUsers;
      return data;
    });
  })
  .then(data => {
    // console.log(data);
    
    res.render('index', {
      pageTitle: 'Home|Choosing Simplifid',
      data: data
    });
  }) 
}

exports.postHome = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const feeback = new Feedbacks({
    name: name,
    email: email,
    subject: subject,
    message: message
  });

  feeback.save()
  .then(data => {
    console.log('Data Saved');
    res.redirect('/');
  })
}

exports.get404 = (req, res, next) => {
  res.render('404', {
    pageTitle: '404|Choosing Simplifid'
  });
}

