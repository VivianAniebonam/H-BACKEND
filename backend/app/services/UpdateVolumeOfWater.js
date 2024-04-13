// I am planning to make a fucntion that will determine the volume of water consumed.

/*
This function will target the object in the waterlog called totalAmount (which is the goal).
And the  amountPerHour (this is amount the patient drinks per alert).

The amountPerHour will be ++ and will be updating in the datebase, 
when totalAmount has reached sent a message to the reminderMode (email or phone) that "GOAL HAS BEEN ACHEIVED"

*/

const WaterLog = require('../models/waterlog'); // Ensure this path is correct

/**
 * Increment the volume of water consumed and check if the goal has been achieved.
 * @param {String} waterLogId - The ID of the WaterLog document to update.
 */

//THIS FUNCTION WILL BE CALLED WHEN THE "DONE" IS CLICKED
async function incrementWaterConsumptionVolumeAndCheckGoal(waterLogId) {
  try {
    const waterLog = await WaterLog.findById(waterLogId);
    if (!waterLog) {
      console.error('WaterLog not found');
      return;
    }

    // Increment the currentAmountConsumed by amountPerHour
    waterLog.currentAmountConsumed += waterLog.amountPerHour;

    // Check if the totalAmount (goal) has been reached or exceeded
    if (waterLog.currentAmountConsumed >= waterLog.totalAmount) {
      // Goal achieved, send message based on reminderMode
      const message = 'GOAL HAS BEEN ACHIEVED';
      sendMessage(waterLog.reminderMode, message);
}

    // Save the updated document
    await waterLog.save();

  } catch (error) {
    console.error('Error incrementing water consumption:', error);
  }
}


/**
 * NOTE: This page currentAmountConsumed will be usefull in ProgressReport
 */