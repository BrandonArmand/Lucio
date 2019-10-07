const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const auth = require("../auth/helpers.js")

router.post("/api/user/new", auth.ensureAPIKey, userController.new);
router.get("/api/user", auth.ensureAPIKey, auth.ensureToken, userController.show);
router.put("/api/user/update", auth.ensureAPIKey, auth.ensureToken, userController.update);

router.get("/api/users", auth.ensureAPIKey, userController.index);
router.post("/api/signin", auth.ensureAPIKey, passport.authenticate('local', {session: false}), userController.signIn)

module.exports = router;