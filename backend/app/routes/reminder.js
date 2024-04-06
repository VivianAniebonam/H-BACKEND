var express = require("express");
var router = express.Router();

let reminderController = require("../controllers/reminder");

// Define Reminder routes
router.post("/create", reminderController.createReminder);
router.put("/update/:reminderId", reminderController.updateReminder);
router.delete("/delete/:reminderId", reminderController.removeReminder);

module.exports = router;