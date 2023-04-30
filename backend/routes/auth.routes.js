const { Router } = require("express");
const router = Router();

const { createUser, login } = require("../controllers/auth.controllers");

router.post("/login",login);
router.post("/createUser",createUser);

module.exports = router;