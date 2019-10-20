const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
app.disable('etok')
app.use(bodyParser.text());
app.use(cors({
    "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey",
    "exposedHeaders": "apikey"
}))

appConfig.init(app);
routeConfig.init(app);

module.exports = app;