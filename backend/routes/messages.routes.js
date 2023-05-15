const { Router } = require("express");
const router = Router();

const { sendMessage, getMessage, showSentMessages } = require("../controllers/message.controllers");
const { authMiddleware } = require("../middleware/auth.middleware");
const { adminMiddleware } = require("../middleware/admin.middleware");
router.post("/", sendMessage);
router.get("/:id", getMessage);
router.get("/sentMessages/:id", showSentMessages);

module.exports = router;