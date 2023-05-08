const { Router } = require("express");
const router = Router();

const { sendMessage, getMessage, showSentMessages } = require("../controllers/message.controllers");
const { authMiddleware } = require("../middleware/auth.middleware");
const { adminMiddleware } = require("../middleware/admin.middleware");
router.post("/", authMiddleware, adminMiddleware, sendMessage);
router.get("/:id", authMiddleware, getMessage);
router.get("/sentMessages/:id", authMiddleware, adminMiddleware, showSentMessages);

module.exports = router;