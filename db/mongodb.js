const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
  });

  module.exports = mongoose;

  /*
  var db = mongoose.connection;
  //db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('error', () => {
    logger.error("MongoDB connection error.");
    //console.log("MongoDB connection error.");
  })

  db.once("open", function() {
    logger.info("Connected to MongoDB successfully.");
    //console.log("Connected to MongoDB successfully.");
  });
*/