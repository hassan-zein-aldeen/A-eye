const { Router } = require("express");
const router = Router();

const { createAd, getAllAds, deactivateAd, acceptRequest, cancelRequest } = require("../controllers/ads.controller");
const upload = require("../middleware/upload");

router.post("/", upload.single('image'), createAd);
router.get("/", getAllAds);
router.put("/deactivate/:id", deactivateAd);
router.put("/accept/:id", acceptRequest)
router.put("/cancel/:id", cancelRequest)

module.exports = router;