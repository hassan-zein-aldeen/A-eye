const { Router } = require("express");
const router = Router();

const { getAllUsers, getActiveUsers, getInactiveUsers } = require("../controllers/user.controllers");

router.get("/", getAllUsers);
router.get("/activeusers", getActiveUsers);
router.get("/inactiveusers", getInactiveUsers);

module.exports = router;