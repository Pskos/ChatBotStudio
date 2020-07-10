const express = require('express');
const { getLesson, getLessons, postLesson, updateLesson, deleteLesson } = require('../controllers/lessons');

const router = express.Router();

router.route('/').get(getLessons).post(postLesson);
router.route('/:id').get(getLesson).put(updateLesson).delete(deleteLesson);
module.exports = router;
