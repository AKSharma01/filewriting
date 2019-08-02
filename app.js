'use strict';

global.rootDir = __dirname;
require("dotenv").config();
const express = require("express");
const app = express();
const multer = require('multer');
const bodyParser = require("body-parser");
const utils = require(rootDir + "/utils/");
// const expressValidator = require('express-validator');
const apis = require("./apis");

const response = utils.response;

const constants = utils.constants;

// app.use(expressValidator());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

var upload = multer();
var storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.use("/api", apis);



app.use(function (err, req, res, next) {
    if (!err.statusCode)
        err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    // if (err.statusCode === 500)
    //     console.error(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ": " + err); // Log error message in our server's console
    res.status(err.statusCode).json({status: 'fail', statusCode: err.statusCode, message: err.message}); // All HTTP requests must have a response, so let's send back an error with its status code and message
})

app.listen(5000, () => {
    console.log("server is running!!!!");
});

