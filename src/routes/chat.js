const express = require("express");
const router = express.Router();
const auth = require("../auth/helpers.js")
const chatController = require("../controllers/chatController");

router.get("/api/chats", auth.ensureAPIKey, auth.ensureToken, chatController.index);
router.get("/api/chat/:id", auth.ensureAPIKey, auth.ensureToken, chatController.show);
router.post("/api/chat/:id/send", auth.ensureAPIKey, auth.ensureToken, chatController.new);
router.delete("/api/chat/:id/leave", auth.ensureAPIKey, auth.ensureToken, chatController.destroy);


module.exports = router;