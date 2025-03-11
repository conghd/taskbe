const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const mongoose = require('./db/mongodb');

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to IDEA Lab."});
});

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/public/upload/images'));

const server = app.listen(PORT, (error) => {
    logger.info(`Server is running on port: ${PORT}`);
    if (error) {
        logger.error(error);
        return;
    }

    // MongoDB
    var db = mongoose.connection;
    db.on('error', () => {
        logger.error("MongoDB connection error.");
    })

    db.once("open", function() {
        logger.info("Connected to MongoDB successfully.");
    });

});