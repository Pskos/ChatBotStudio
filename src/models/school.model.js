const mongoose = require('mongoose');

const LessonsSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      reqired: [true, 'Add Lecture Title'],
      unique: true,
      maxlength: [30, 'Title must be < 30 characters'],
    },
    teacher: {
      type: String,
      reqired: [true, 'Add Teacher ID'],
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
