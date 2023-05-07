const { Router } = require("express");
const router = Router();

const { createAd, getAllAds, deactivateAd, acceptRequest, cancelRequest, getUserAds } = require("../controllers/ads.controller");
const upload = require("../middleware/upload");

router.post("/create", upload.single('image') ,createAd);
router.get("/allads", getAllAds);
router.put("/deactivate/:id", deactivateAd);
router.put("/accept/:id", acceptRequest)
router.put("/cancel/:id", cancelRequest)
router.get("/userads/:id", getUserAds);


module.exports = router;