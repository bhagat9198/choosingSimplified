const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: {
    required: true,
    type: String
  },
  lname: {
    required: true,
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  imagePath: {
    type: String
  }
});

module.exports = mongoose.model('Users', userSchema);