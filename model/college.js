const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegesSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  website : {
    type: String,
    required: true
  },
  phone : {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  buildYear: {
    type: Number
  },
  stars: {
    type: String,
    required: true
  },
  instituteType: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
});
// data-rule="minlen:4" data-msg="Please enter at least 4 chars of subject"
module.exports = mongoose.model('Colleges', collegesSchema);