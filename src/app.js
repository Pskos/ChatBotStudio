const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./db/db');
const app = express();

// Load env vars
dotenv.config({
  path: './src/config/config.env'
});
const PORT = process.env.PORT;

//Connect to DB
connectDB();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our app"
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});