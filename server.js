const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const mongoose = require('./db/mongodb');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


require("dotenv").config();

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', require('./routes/user_routes'));
app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to IDEA Lab."});
});

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/public/upload/images'));

// Swagger Options
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "Task API",
        version: "1.0.0",
        description: "API for managing tasks with user assignments",
        },
        servers: [{ url: `${HOST}:${PORT}` }],
    },
    apis: ["./routes/user_routes.js"], // Points to API route files
};
  
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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