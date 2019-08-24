module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const petRoutes = require("../routes/pet");
      
      app.use(staticRoutes);
      app.use(petRoutes);
    }
  }