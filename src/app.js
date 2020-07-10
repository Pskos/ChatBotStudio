const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./db/db');

const app = express();

// Import routes
const lessonsRoutes = require('./routes/lessons');
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

app.use('/api/v1/lessons', lessonsRoutes);

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
