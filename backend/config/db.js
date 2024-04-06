const mongoose = require("mongoose");
const config = require("./config");

function connectToDatabase() {
 
  mongoose.connect(config.ATLASDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  });

 
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection Error: "));
  db.once("open", () => {
    console.log("=> Hi Hydra Admin, you're connected to MongoDB");
  });

  return db;
}

module.exports = connectToDatabase;