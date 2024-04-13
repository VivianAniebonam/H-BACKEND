const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimony');

router.post('/create', testimonyController.createTestimony);
router.get("/get/:testimonyId", testimonyController.getTestimonyById); // Get a testimony by testimonyId
router.put("/update/:testimonyId", testimonyController.updateTestimony); // Update a testimony by testimonyId
router.delete("/delete/:testimonyId", testimonyController.removeTestimony); // Delete a testimony by testimonyId
router.get('/', testimonyController.listTestimonies); // Fetch all testimonies

// Simple test route
router.get('/test', (req, res) => res.send('Test route is working'));

module.exports = router;
