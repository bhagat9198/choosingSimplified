const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  instituteName : {
    type: String
  },
  phone: {
    type: Number
  },
  location: {
    type: String
  },
  teachingSince: {
    type: Number,
    required: true
  },
  stars: {
    type: String,
    required: true
  },
  subjects: {
    type: Array,
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

module.exports = mongoose.model('Teachers', teacherSchema);