const express = require('express');
const router = express.Router();
const TrackWaterDrankController = require('../controllers/TrackWaterDrankController');

// Route to create a new track water drank record
router.post('/trackWaterDrank', TrackWaterDrankController.createRecord);

// Route to fetch all water drank records for a specific user
router.get('/trackWaterDrank/user/:userId', TrackWaterDrankController.getRecordsByUser);

// Route to update a specific track water drank record
router.put('/trackWaterDrank/:recordId', TrackWaterDrankController.updateRecord);

// Route to delete a specific track water drank record
router.delete('/trackWaterDrank/:recordId', TrackWaterDrankController.deleteRecord);

module.exports = router;