const TrackWaterDrank = require('../models/trackWaterDrank');
//const WaterLog = require('../models/waterlog'); 

const TrackWaterDrankController = {
  // Create a new track water drank record
  createRecord: async (req, res) => {
    try {
      const newRecord = new TrackWaterDrank(req.body);
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Fetch all water drank records for a specific user
  getRecordsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const records = await TrackWaterDrank.find({ userId }).populate('waterLogId');
      res.status(200).json(records);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Update a specific track water drank record
  updateRecord: async (req, res) => {
    try {
      const { recordId } = req.params;
      const updatedRecord = await TrackWaterDrank.findByIdAndUpdate(recordId, req.body, { new: true });
      res.status(200).json(updatedRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a specific track water drank record
  deleteRecord: async (req, res) => {
    try {
      const { recordId } = req.params;
      await TrackWaterDrank.findByIdAndDelete(recordId);
      res.status(204).send(); // No content to send back
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

};

module.exports = TrackWaterDrankController;