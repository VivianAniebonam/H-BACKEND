var express = require("express");
var router = express.Router();

// GET home page
router.get("/", function(req, res, next) {
  res.json({
    success: true,
    message: "Welcome to the Hydra Hydration Tracking Application! Navigate to /users, /waterLogs, /reminders, /progressReports, or /testimonies for specific functionalities.",
  });
});

module.exports = router;