var express = require("express");
var router = express.Router();

let progressReportController = require("../controllers/progressReport");

// Define ProgressReport routes
router.post("/create", progressReportController.createProgressReport);
router.put("/update/:reportId", progressReportController.updateProgressReport);
router.delete("/delete/:reportId", progressReportController.removeProgressReport);

module.exports = router;