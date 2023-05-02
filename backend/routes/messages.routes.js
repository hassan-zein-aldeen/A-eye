const { Router } = require("express");
const router = Router();

const { sendMessage, getMessage } = require("../controllers/message.controllers");
router.post("/", sendMessage);

router.get("/:id", getMessage);

module.exports = router;