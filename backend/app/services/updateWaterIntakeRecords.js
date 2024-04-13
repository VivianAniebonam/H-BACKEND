const TrackWaterDrank = require('../models/trackWaterDrank'); 
const WaterLog = require('../models/waterlog'); 

async function updateWaterIntakeRecords() {
    const users = await TrackWaterDrank.find({}).populate('waterLogId'); // waterLogId references the WaterLog

    for (let user of users) {
        // Skip if no associated WaterLog or reminderInterval is undefined
        if (!user.waterLogId || user.waterLogId.reminderInterval === undefined) continue;

        // Convert reminderInterval from minutes to milliseconds
        const reminderIntervalMs = user.waterLogId.reminderInterval * 60 * 1000;
        const nextWaterTime = new Date(user.lastWaterTime.getTime() + reminderIntervalMs); //also if the user clicks on done

        // Update the TrackWaterDrank document with the new nextWaterTime
        user.nextWaterTime = nextWaterTime;
        await user.save();
    }
}

/**
 * I also want to update lastWaterTime which will be determined by the following:
 
 * Updates the lastWaterTime for a given user.
 * 1. This function should be called when a user manually logs water intake (waterlogmodel.js where lastwatertime = default date.now)
 * 2. Acknowledges a hydration reminder. (eg: by clicking "done" via a given uri in the email or phone) = think it might be on schedulerCron.js
 * 3. Based on the last time notification was sent (readyForDrinkingAndSendAlert.js)
 *
 */