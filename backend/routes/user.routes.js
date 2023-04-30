const { Router } = require("express");
const router = Router();

const { getAllUsers } = require("../controllers/user.controllers");
router.get("/", getAllUsers);

module.exports = router;