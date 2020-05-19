const bcrypt = require('bcrypt');
const Users = require('../model/user');

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(!err) {
      res.redirect('/');
    }
  })
}

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({email: email})
  .then(user => {
    if(user) {
      // console.log(req.session.isLoggedIn);
      
      bcrypt.compare(password, user.password)
      .then(comparedPassword => {
        if(comparedPassword) {
          // console.log(req.session);
          req.session.user = user;
          console.log(req.session.user);
          req.session.isLoggedIn = true;
          req.session.save(err => {
            if(!err) {
              return res.redirect('/auth/dashbord');
            }
          })
        } else {
          console.log('password didnt match');
          return res.redirect('/auth/login');
        }
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      console.log('No user with that email');
      return res.redirect('/auth/login');
    }
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Signup'
  });
};

exports.postSignup = (req, res, next) => {
  console.log('post signup method!!!!');
  
  const fname = req.body.fname;
  const lname = req.body.lname; 
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  const institute = req.body.institute;
  const userType = req.body.userType;

  Users.findOne({email:email})
  .then(user => {
    if(!user) {
      if(password == cpassword) {
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new Users({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPassword,
            institute: institute,
            userType: userType,
            imagePath:''
          });
          user.save()
        })
        .then(data => {
          console.log('Data Saved');
          return res.redirect('/auth/login');
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log('Passwords doesnt match');
        return res.redirect('/auth/signup');
      }
    } else {
      console.log('email already present');
      return res.redirect('/auth/signup');
    }
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getDashbord = (req, res, next) => {
  // console.log(req.session.user);
  
  let resetMessage = req.flash('error');
  // console.log(message);
  
  if(resetMessage.length > 0) {
    resetMessage = resetMessage[0];
    // console.log(resetMessage);
  } else {
    resetMessage = null;
  }

  let imgMessage = req.flash('image');
  // console.log(imgMessage);
  
  if(imgMessage.length > 0) {
    imgMessage = imgMessage[0];
    // console.log(imgMessage);
  } else {
    imgMessage = null;
  }

  res.render('auth/dashbord', {
    pageTitle: 'Dashbord',
    user : req.session.user,
    errorMessage: resetMessage,
    imageMsg: imgMessage
  });
}; 

exports.postPasswordReset = (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const cPassword = req.body.cPassword;

  if(newPassword === cPassword) {
    bcrypt.compare(oldPassword, req.session.user.password)
    .then(paswordMatchStatus => {
      if(paswordMatchStatus) {
        const user_id = req.session.user._id;
        // console.log(user_id);
        
        Users.findById(user_id)
        .then(user => {
          // user.password = newPassword;
          return bcrypt.hash(newPassword, 12)
          .then(hashedPassword => {
            user.password = hashedPassword;
            return user.save();
          })
        })
        .then(data => {
          // console.log('Password reseted!!');
          req.flash('error','Password reseted!!');
          return res.redirect('/auth/dashbord')
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        req.flash('error','Old password didnt matched');
        return res.redirect('/auth/dashbord')
        // console.log('Old password didnt matched');
      }
    })
  } else {
    req.flash('error','New password and confirm password didnt match didnt match');
    return res.redirect('/auth/dashbord')
    // console.log('New password and confirm password didnt match didnt match');
  }
}

exports.postImg = (req, res, next) => {
  const image = req.file;
  const imagePath = image.path;
  console.log(imagePath);

  Users.findById(req.session.user._id)
  .then(user => {
    user.imagePath = imagePath;
    req.session.user = user;
    
    return user.save();
  })
  .then(data => {
    req.session.save(err => {
      if(!err) {
        req.flash('image','Image Upladed Successfully!!!');
        return res.redirect('/auth/dashbord');
      }
    })
  })
  .catch(err => {
    console.log(err);
  });
}
