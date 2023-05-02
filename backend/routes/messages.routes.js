const { Router } = require("express");
const router = Router();

const { sendMessage } = require("../controllers/message.controllers");
router.post("/", sendMessage);

module.exports = router;