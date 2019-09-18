const express = require("express");
const router = express.Router();
const auth = require("../auth/helpers.js")
const petController = require("../controllers/petController")

router.get("/api/pets", auth.ensureAPIKey, auth.ensureToken, petController.index); //User's Pets
router.post("/api/pet/new", auth.ensureAPIKey, auth.ensureToken, petController.new); //Create User Pet

router.get("/api/pet/:tag", auth.ensureAPIKey, petController.show); //View Pet
router.post("/api/pet/:tag/delete", auth.ensureAPIKey, auth.ensureToken, auth.ensurePet, petController.destroy); //Delete User's Pet
router.post("/api/pet/:tag/add/:user", auth.ensureAPIKey, auth.ensureToken, auth.ensurePet, petController.newOwner); //Delete User's Pet


module.exports = router;