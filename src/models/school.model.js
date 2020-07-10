const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const teacher = require('./teachers.model');

const LessonsSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      reqired: [true, 'Add Lecture Title'],
      unique: true,
      maxlength: [30, 'Title must be < 30 characters'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teachers',
    },
    students: {
      type: [String],
      reqired: [true, 'Add Students'],
    },
    room: {
      type: String,
      reqired: [true, 'Add Room Number'],
    },
    sequenceNumber: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('lessons', LessonsSchema);
