var express = require("express");
var router = express.Router();

let waterLogController = require("../controllers/waterlog");

// Define WaterLog routes
router.post("/create", waterLogController.createWaterLog); // Create a new water log entry
router.get("/get/:userId", waterLogController.getWaterLogByUserId); // Get water log entries by userId
router.put("/update/:waterLogId", waterLogController.updateWaterLog); // Update a water log entry by waterLogId
router.delete("/delete/:waterLogId", waterLogController.removeWaterLog); // Delete a water log entry by waterLogId

module.exports = router;