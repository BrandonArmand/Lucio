const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){

    app.use(passport.initialize());

    passport.use(new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {
      let decodeEmail = decodeURIComponent(email)
      User.findOne({
        where: { email: decodeEmail }
      })
      .then((user) => {
        if (!user || !authHelper.comparePass(decodeURIComponent(password), user.password)) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      })
    }));
  }
}