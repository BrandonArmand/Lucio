const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
app.disable('etok')
app.use(bodyParser.text());

appConfig.init(app);
routeConfig.init(app);

module.exports = app;