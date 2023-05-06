const { Router } = require("express");
const router = Router();

const { createAd, getAllAds, changeAdStatus } = require("../controllers/ads.controller");
const upload = require("../middleware/upload");

router.post("/", upload.single('image'), createAd);
router.get("/", getAllAds);
router.put("/update/:id", changeAdStatus);

module.exports = router;