const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, 'Add Teacher Name'],
    maxlength: [30, 'Name must be less than 30 characters'],
  },
});

module.exports = mongoose.model('teachers', TeacherSchema);
