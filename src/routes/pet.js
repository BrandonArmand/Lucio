const express = require("express");
const router = express.Router();

const petController = require("../controllers/petController")

router.get("/api/pet", petController.index);
router.post("/api/pet", petController.new);

router.get("/api/pet/:id", petController.show);
router.post("/api/pet/:id", petController.destroy);

module.exports = router;