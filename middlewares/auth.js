const { getUser } = require("../service/authService");

async function restricTOLoggedinUsersOnly(req, res, next) {
  const sessionID = req.cookies?.uiD;

  if (!sessionID) {
    return res.redirect("/login");
  }
  const user = getUser(sessionID);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;

  next();
}

function checkUserAuth(req, res, next) {
  const sessionID = req.cookies?.uiD;

  const user = getUser(sessionID);
  if (user) req.user = user; // set user if found, otherwise continue

  next();
}

module.exports = { restricTOLoggedinUsersOnly, checkUserAuth };
