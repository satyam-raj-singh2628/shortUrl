const express = require("express");
const ShortUrlModel = require("../models/short_urlModel");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("logged in user id:", req.user?._id);
  if (!req.user) {
    return res.redirect("/login");
  }
  const allUrls = await ShortUrlModel.find({ createdBy: req.user?._id });
  console.log(allUrls, "allurls");
  return res.render("home", { urls: allUrls });
});

router.post("/:id/delete", async (req, res) => {
  console.log(req.params.id, "iddd");
  await ShortUrlModel.findByIdAndDelete(req.params.id);
  return res.redirect("/");
});

// users  signup page code
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
