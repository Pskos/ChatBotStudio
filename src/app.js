const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./db/db');

const app = express();

const LessonsModel = require('./models/school.model');

// Load env vars
dotenv.config({
  path: './src/config/config.env',
});
// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT;

// Connect to DB
connectDB();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/api/v1/lessons', async (req, res, next) => {
  try {
    const data = await LessonsModel.find().exec();
    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

app.get('/api/v1/lessons/:id', async (req, res, next) => {
  try {
    const lesson = await LessonsModel.findById(req.params.id).exec();
    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

app.post('/api/v1/lessons', async (req, res, next) => {
  try {
    const lesson = new LessonsModel(req.body);
    const result = await lesson.save();
    res.send(result);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.put('/api/v1/lessons/:id', async (req, res, next) => {
  try {
    const lesson = await LessonsModel.findById(req.params.id).exec();
    lesson.set(req.body);
    const result = await lesson.save();
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

app.delete('/api/v1/lessons/:id', async (req, res, next) => {
  try {
    const result = await LessonsModel.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
