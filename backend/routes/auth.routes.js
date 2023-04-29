const { Router } = require("express");
const router = Router();

const { createUser, login } = require("../controllers/auth.controllers");

router.get("/login",login);
router.post("/createUser",createUser);

module.exports = router;