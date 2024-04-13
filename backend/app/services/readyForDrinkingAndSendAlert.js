const TrackWaterDrank = require('../models/trackWaterDrank'); 
const WaterLog = require('../models/waterlog'); 


async function checkUserReadyForDrinkingAndSendAlert() {
    const users = await TrackWaterDrank.find({
        nextWaterTime: { $lte: new Date() } // Finds users whose next water time is now or in the past
    });
    
    users.forEach(async (user) => {
        // Send an alert to the user
        await sendAlertToUser(user.userId); //waterlogcollection.remindermode (email or phone)
        
        // Optionally, update the record to reflect that an alert has been sent
        // For example, adjusting nextWaterTime or setting a flag indicating an alert was sent
        user.lastAlertSent = new Date(); // Assuming there's a field to track when the last alert was sent
        await user.save();
    });
}

// Placeholder function for sending an alert to the user
async function sendAlertToUser(userId) {
    console.log(`Sending alert to user ${userId}`);
    // Implementation depends on how you're handling notifications (email, SMS, app notification, etc.)
}