const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
app.disable('etok')
app.use(bodyParser.text());
app.use(cors({
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey",
    "Access-Control-Expose-Headers": "apikey"
}))

appConfig.init(app);
routeConfig.init(app);

module.exports = app;