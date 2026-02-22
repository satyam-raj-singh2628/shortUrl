const express = require("express");
const ShortUrlModel = require("../models/short_urlModel");
const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await ShortUrlModel.find({});

  return res.render("home", { allUrls: allUrls });
});

router.post("/:id/delete", async (req, res) => {
  await ShortUrlModel.findByIdAndDelete(req.params.id);
  return res.redirect("/homeURL");
});
module.exports = router;
