const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// Import your route files
const indexRouter = require("../app/routes/index");
const userRouter = require("../app/routes/user"); // User routes
const waterLogRouter = require("../app/routes/waterlog"); // WaterLog routes
const reminderRouter = require("../app/routes/reminder"); // Reminder routes
const progressReportRouter = require("../app/routes/progressReport"); // ProgressReport routes
const testimonyRouter = require("../app/routes/testimony"); // Testimony routes
//const testimoniesRouter = require('./routes/testimonies'); // The path to your router file

const app = express();

// Enables CORS
app.use(cors());
app.options("*", cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the imported route files
app.use("/", indexRouter);
app.use("/users", userRouter); // Use User routes
app.use("/waterLogs", waterLogRouter); // Use WaterLog routes
app.use("/reminders", reminderRouter); // Use Reminder routes
app.use("/progressReports", progressReportRouter); // Use ProgressReport routes
app.use("/testimonies", testimonyRouter); // Use Testimony routes


// Simple test route to verify the server is working
app.get('/test', (req, res) => {
  res.send('Test route is working');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);

  // Send the error response
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
  });
});

module.exports = app;