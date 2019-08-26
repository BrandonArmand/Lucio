const express = require("express");
const app = express();
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
const passport = require('./config/passport-config.js');

appConfig.init();
routeConfig.init(app);

module.exports = app;