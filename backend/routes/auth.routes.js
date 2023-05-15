const { Router } = require("express");
const router = Router();

const { createUser, login } = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middleware/auth.middleware");
const {adminMiddleware} = require("../middleware/admin.middleware");

router.post("/login",login);
router.post("/createUser", createUser);

module.exports = router;