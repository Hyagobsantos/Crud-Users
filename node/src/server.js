const express = require("express");
const router = require('./routes/routes');
require("express-async-errors");

const cors = require("cors");

//Cors
router.use(cors());
router.options("*", cors())

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();
app.use(express.json());
app.use(router);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


module.exports = app;


