const LessonsModel = require('../models/school.model');

// Get all lessons
// GET /api/v1/lessons

exports.getLessons = async (req, res) => {
  try {
    const querystring = req.query.teacherName;
    let data = {};
    // if we past in query /api/v1/lessons?teacherName=true we see teacher name
    if (querystring === 'true') {
      data = await LessonsModel.find().populate({ model: 'teachers', path: 'teacher' }).exec();
    } else {
      data = await LessonsModel.find();
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

// Get single lesson by ID
// GET /api/v1/lessons/:id

exports.getLesson = async (req, res) => {
  try {
    const lesson = await LessonsModel.findById(req.params.id);

    if (!lesson) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

// Post new lesson - /api/v1/lessons
// POST /api/v1/lessons/

exports.postLesson = async (req, res) => {
  try {
    const lesson = new LessonsModel(req.body);
    const result = await lesson.save();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

// Update lesson data by ID
// PUT /api/v1/lessons/:id

exports.updateLesson = async (req, res) => {
  try {
    const lesson = await LessonsModel.findById(req.params.id);
    lesson.set(req.body);
    const result = await lesson.save();
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

// Delete lesson by ID
// DEL /api/v1/lessons/:id

exports.deleteLesson = async (req, res) => {
  try {
    await LessonsModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
