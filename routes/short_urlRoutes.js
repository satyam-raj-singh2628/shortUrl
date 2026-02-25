const express = require("express");
const router = express.Router();
const {
  generateNewShortUrl,
  getAnalytics,
} = require("../controllers/short_urlController");

router.post("/", generateNewShortUrl);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
