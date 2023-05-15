const { Router } = require("express");
const router = Router();

const { createAd, getAllAds, deactivateAd, acceptRequest, rejectRequest, getUserAds, requestInactive, adminDeactivateAd, getCondAds } = require("../controllers/ads.controller");
const upload = require("../middleware/upload");
const { authMiddleware } = require("../middleware/auth.middleware");
const { adminMiddleware } = require("../middleware/admin.middleware");

router.post("/create",authMiddleware, upload.single('image'), createAd); 
router.get("/allads",authMiddleware,adminMiddleware, getAllAds); 
router.put("/deactivate/:id",authMiddleware, deactivateAd); 
router.put("/adminDeactivate/:id",authMiddleware, adminMiddleware, adminDeactivateAd); 
router.put("/accept/:id", authMiddleware, adminMiddleware, acceptRequest); 
router.put("/reject/:id",authMiddleware, adminMiddleware, rejectRequest);
router.put("/request/:id",authMiddleware, requestInactive);
router.get("/userads/:id",authMiddleware, getUserAds); 
router.post("/getCondAds", getCondAds); 


module.exports = router;