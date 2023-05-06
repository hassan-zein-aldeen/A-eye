const { Router } = require("express");
const router = Router();

const { createAd } = require("../controllers/ads.controller");
const upload = require("../middleware/upload");

router.post("/", upload.single('image') ,createAd);

module.exports = router;