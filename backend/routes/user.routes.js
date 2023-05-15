const { Router } = require("express");
const router = Router();

const { getAllUsers, getActiveUsers, getInactiveUsers, updateUserStatus } = require("../controllers/user.controllers");
const { authMiddleware } = require("../middleware/auth.middleware");
const { adminMiddleware } = require("../middleware/admin.middleware");

router.get("/", getAllUsers);
router.get("/activeusers", getActiveUsers);
router.get("/inactiveusers", getInactiveUsers);
router.put("/update/:id", updateUserStatus)

module.exports = router;