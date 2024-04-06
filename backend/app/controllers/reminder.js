const Reminder = require("../models/reminder");

// Create a new reminder
module.exports.createReminder = async function (req, res, next) {
  try {
    console.log(req.body);
    const newReminder = new Reminder(req.body);
    const result = await newReminder.save();

    res.json({
      success: true,
      message: "Reminder created successfully.",
      reminder: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update a reminder
exports.updateReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;
    const updatedData = req.body;

    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      updatedData,
      { new: true }
    );

    if (updatedReminder) {
      res.status(200).json({
        message: "Reminder updated successfully",
        reminder: updatedReminder,
      });
    } else {
      res.status(404).json({ message: "Reminder not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating reminder",
      error: error.message,
    });
  }
};

// Delete a reminder
module.exports.removeReminder = async (req, res, next) => {
  try {
    let reminderId = req.params.reminderId;
    let result = await Reminder.deleteOne({ _id: reminderId });

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "Reminder deleted successfully.",
      });
    } else {
      throw new Error("Reminder not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};