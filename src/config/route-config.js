module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const petRoutes = require("../routes/pet");
      const userRoutes = require("../routes/user");

      app.use(staticRoutes);
      app.use(petRoutes);
      app.use(userRoutes);
    }
  }