const { Router } = require("express");
const router = Router();

const { sendMessage, getMessage, showSentMessages } = require("../controllers/message.controllers");
router.post("/", sendMessage);

router.get("/:id", getMessage);
router.get("/sentMessages/:id", showSentMessages);

module.exports = router;