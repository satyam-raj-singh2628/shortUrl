const { nanoid } = require("nanoid");
const ShortUrlModel = require("../models/short_urlModel");

async function generateNewShortUrl(req, res) {
  const body = req.body;

  if (!body || !body.url)
    return res.status(400).json({ error: "url is required" });

  const shortID = nanoid(8);
  await ShortUrlModel.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user.id,
  });

  return res.render("home", { id: shortID });
}

async function getshortIDUrl(req, res) {
  const resultUrl = await ShortUrlModel.findOneAndUpdate(
    {
      shortId: req.params.shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  if (!resultUrl) return res.status(404).json({ error: "shortId not found" });
  return res.redirect(resultUrl.redirectUrl);
}

async function getAnalytics(req, res) {
  const totalClicks = await ShortUrlModel.findOne({
    shortId: req.params.shortId,
  });
  if (!totalClicks) return res.status(404).json({ error: "shortId not found" });
  return res.status(200).json({
    totalClicks: totalClicks.visitHistory.length,
    analytics: totalClicks.visitHistory,
  });
}

module.exports = { generateNewShortUrl, getshortIDUrl, getAnalytics };
