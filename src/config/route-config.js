module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const petRoutes = require("../routes/pet");
      const userRoutes = require("../routes/user");
      const chatRoutes = require("../routes/chat");


      app.use(staticRoutes);
      app.use(petRoutes);
      app.use(userRoutes);
      app.use(chatRoutes);

    }
  }