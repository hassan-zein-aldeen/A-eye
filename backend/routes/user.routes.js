const { Router } = require("express");
const router = Router();

const { getAllUsers, getActiveUsers, getInactiveUsers, updateUserStatus } = require("../controllers/user.controllers");

router.get("/", getAllUsers);
router.get("/activeusers", getActiveUsers);
router.get("/inactiveusers", getInactiveUsers);
router.put("/update/:id", updateUserStatus)

module.exports = router;