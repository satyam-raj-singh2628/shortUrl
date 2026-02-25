const express = require("express");
const ShortUrlModel = require("../models/short_urlModel");
const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("logged_in_useridfromstaticRoutes", req.user?.id);
  if (!req.user) {
    return res.redirect("/login");
  }
  const allUrls = await ShortUrlModel.find({ createdBy: req.user?.id });
  // console.log("allurlsfromstaticRoutes",allUrls);
  return res.render("home", { urls: allUrls });
});

router.post("/:id/delete", async (req, res) => {
  // console.log( "idddfromstaticRoutes",req.params.id);
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
