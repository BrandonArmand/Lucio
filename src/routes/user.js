const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/api/user", userController.new);
router.get("/api/user", userController.show);

router.get("/api/user/all", userController.index);


module.exports = router;