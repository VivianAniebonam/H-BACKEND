const ProgressReport = require("../models/progressReport");

// Create a new progress report
module.exports.createProgressReport = async function (req, res, next) {
  try {
    console.log(req.body);
    const newProgressReport = new ProgressReport(req.body);
    const result = await newProgressReport.save();

    res.json({
      success: true,
      message: "Progress report created successfully.",
      progressReport: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update a progress report
exports.updateProgressReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const updatedData = req.body;

    const updatedProgressReport = await ProgressReport.findByIdAndUpdate(
      reportId,
      updatedData,
      { new: true }
    );

    if (updatedProgressReport) {
      res.status(200).json({
        message: "Progress report updated successfully",
        progressReport: updatedProgressReport,
      });
    } else {
      res.status(404).json({ message: "Progress report not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating progress report",
      error: error.message,
    });
  }
};

// Delete a progress report
module.exports.removeProgressReport = async (req, res, next) => {
  try {
    let reportId = req.params.reportId;
    let result = await ProgressReport.deleteOne({ _id: reportId });

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "Progress report deleted successfully.",
      });
    } else {
      throw new Error("Progress report not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};