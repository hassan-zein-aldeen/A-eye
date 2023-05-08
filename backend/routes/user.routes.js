const { Router } = require("express");
const router = Router();

const { getAllUsers, getActiveUsers, getInactiveUsers, updateUserStatus } = require("../controllers/user.controllers");
const { authMiddleware } = require("../middleware/auth.middleware");
const { adminMiddleware } = require("../middleware/admin.middleware");

router.get("/",authMiddleware,adminMiddleware, getAllUsers);
router.get("/activeusers",authMiddleware,adminMiddleware, getActiveUsers);
router.get("/inactiveusers",authMiddleware,adminMiddleware, getInactiveUsers);
router.put("/update/:id",authMiddleware,adminMiddleware, updateUserStatus)

module.exports = router;