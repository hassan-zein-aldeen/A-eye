const { Router } = require("express");
const router = Router();

const { getAllUsers } = require("../controllers/user.controllers");
router.get("/", getAllUsers);

const { getActiveUsers } = require("../controllers/user.controllers");
router.get("/activeusers", getActiveUsers);

const { getInactiveUsers } = require("../controllers/user.controllers");
router.get("/inactiveusers", getInactiveUsers);

module.exports = router;