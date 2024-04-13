const WaterLog = require("../models/waterlog");

// Create a new water log entry
module.exports.createWaterLog = async function (req, res, next) {
  try {
    console.log(req.body);
    // Create a new water log entry based on the incoming JSON data
    const newWaterLog = new WaterLog(req.body);

    // Save the new water log entry to the database
    const result = await newWaterLog.save();

    res.json({
      success: true,
      message: "Water log entry created successfully.",
      waterLog: result, // Optionally send back the created water log entry details
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get water log entry by User ID
exports.getWaterLogByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("Received userId:", userId);

    const waterLogs = await WaterLog.find({ userId: userId });
    if (!waterLogs.length) {
      console.log("No water log entries found for userId:", userId);
      return res.status(404).json({ message: "No water log entries found" });
    }

    // Log the fetched water log entries
    console.log("Fetched water log entries:", waterLogs);

    res.status(200).json(waterLogs);
  } catch (error) {
    console.error("Error fetching water log entries:", error);
    next(error);
  }
};

// Update a water log entry
exports.updateWaterLog = async (req, res) => {
  try {
    const { waterLogId } = req.params;
    const updatedData = req.body;

    const updatedWaterLog = await WaterLog.findByIdAndUpdate(
      waterLogId,
      updatedData,
      { new: true }
    );

    if (updatedWaterLog) {
      res.status(200).json({
        message: "Water log entry updated successfully",
        waterLog: updatedWaterLog,
      });
    } else {
      res.status(404).json({ message: "Water log entry not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating water log entry",
      error: error.message,
    });
  }
};

// Delete a water log entry
module.exports.removeWaterLog = async (req, res, next) => {
  try {
    let waterLogId = req.params.waterLogId;
    let result = await WaterLog.deleteOne({ _id: waterLogId });
    console.log("====> Result: ", result);
    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "Water log entry deleted successfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("Water log entry not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};