const express = require("express");
const router = express.Router();
const {
  generateNewShortUrl,
  getshortIDUrl,
  getAnalytics,
} = require("../controllers/short_urlController");

router.post("/", generateNewShortUrl);
router.get("/:shortId", getshortIDUrl).get("/analytics/:shortId", getAnalytics);

module.exports = router;
