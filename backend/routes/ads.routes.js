const { Router } = require("express");
const router = Router();

const { createAd, getAllAds } = require("../controllers/ads.controller");
const upload = require("../middleware/upload");

router.post("/", upload.single('image') ,createAd);
router.get("/", getAllAds);

module.exports = router;