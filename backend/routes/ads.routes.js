const { Router } = require("express");
const router = Router();

const { createAd, getAllAds, deactivateAd, acceptRequest, rejectRequest, getUserAds, requestInactive, adminDeactivateAd } = require("../controllers/ads.controller");
const upload = require("../middleware/upload");

router.post("/create", upload.single('image'), createAd);
router.get("/allads", getAllAds);
router.put("/deactivate/:id", deactivateAd);
router.put("/adminDeactivate/:id", adminDeactivateAd);
router.put("/accept/:id", acceptRequest);
router.put("/reject/:id", rejectRequest);
router.put("/request/:id", requestInactive);
router.get("/userads/:id", getUserAds);


module.exports = router;