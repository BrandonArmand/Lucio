require("dotenv").config();
const passportConfig = require("./passport-config");

module.exports = {
  init(app){
    passportConfig.init(app);
  }
};