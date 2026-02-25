const { getUserUsingToken } = require("../service/authService");

async function restricTOLoggedinUsersOnly(req, res, next) {
  // console.log("restricTOLoggedinUsersOnlyfromAuth.jsmiddleware", req.cookies?.uiD);
  const token = req.cookies?.uiD;

  if (!token) {
    return res.redirect("/login");
  }
  const user = getUserUsingToken(token);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;

  next();
}

function checkUserAuth(req, res, next) {
  // console.log("checkUserAuthfromAuth.jsmiddleware", req.cookies?.uiD);
  const token = req.cookies?.uiD;

  const user = getUserUsingToken(token);
  console.log("user_fromcheckUserAuthfromAuth.jsmiddleware", user);
  if (user) req.user = user; // set user if found, otherwise continue

  next();
}

module.exports = { restricTOLoggedinUsersOnly, checkUserAuth };
