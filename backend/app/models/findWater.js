//I USE THIS CODE TO TEST IF THE WATERLOG IS FETCHING FROM THE DB USING ID; SINCE I WAS ENCOUNTERING PROBLEMS WITH IT IN POSTMAN
const mongoose = require('mongoose');

// Replace the following with your MongoDB connection string
const mongoURI = 'mongodb+srv://dbuser:fA3hb7Dd68yBhC0s@cluster0.hqx4l9d.mongodb.net/HydrationTrackerDB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the WaterLog schema and model (ensure this matches your actual model)
const waterLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dailyAmount: Number,
  totalAmount: Number,
  therapyDuration: Number,
  sleepTime: Number,
  date: { type: Date, default: Date.now },
});

const WaterLog = mongoose.model('WaterLog', waterLogSchema);

// Replace '65d189432ac4d6923022db5b' with the actual userId you want to query
const userIdToFind = '65d189432ac4d6923022db5b';

WaterLog.find({ userId: new mongoose.Types.ObjectId(userIdToFind) })
  .then(logs => {
    console.log('Water log entries found:', logs);
    mongoose.connection.close(); // Close the connection after the query
  })
  .catch(err => {
    console.error('Error fetching water log entries:', err);
    mongoose.connection.close(); // Ensure connection is closed even if there's an error
  });