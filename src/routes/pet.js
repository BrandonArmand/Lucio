const express = require("express");
const router = express.Router();
const auth = require("../auth/helpers.js")
const petController = require("../controllers/petController")

router.get("/api/pets", auth.ensureAPIKey, auth.ensureToken, petController.index); //User's Pets
router.put("/api/pet/:tag/update", auth.ensureAPIKey, auth.ensureToken, auth.ensurePet, petController.update); //Delete User's Pet

router.get("/api/pets/invites", auth.ensureAPIKey, auth.ensureToken, petController.pendingInvites); //User's Pets
router.put("/api/pets/invite/:tag/accept", auth.ensureAPIKey, auth.ensureToken, petController.acceptPetInvite) //Accept Ownership
router.delete("/api/pets/invite/:tag/decline", auth.ensureAPIKey, auth.ensureToken, petController.declinePetInvite) //Decline Ownership

router.post("/api/pet/new", auth.ensureAPIKey, auth.ensureToken, petController.new); //Create User Pet
router.get("/api/pet/:tag", auth.ensureAPIKey, petController.show); //View Pet
router.delete("/api/pet/:tag/delete", auth.ensureAPIKey, auth.ensureToken, auth.ensurePet, petController.destroy); //Delete User's Pet
router.post("/api/pet/:tag/invite/:user", auth.ensureAPIKey, auth.ensureToken, auth.ensurePet, petController.newOwner); //Add owner

router.post("/api/pet/:tag/message", auth.ensureAPIKey, auth.ensureToken, petController.startChat); //View Pet

module.exports = router;