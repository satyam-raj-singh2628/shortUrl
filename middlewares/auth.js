const { getUserUsingToken } = require("../service/authService");

async function checkForAuthentication(req, res, next) {
  console.log(
    "restricTOLoggedinUsersOnlyfromAuth.jsmiddleware",
    req.cookies?.uiD,
  );
  const token = req.cookies?.uiD;
  req.user = null; // Initialize req.user to null before checking the token

  const user = getUserUsingToken(token);

  req.user = user;

  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user?.role)) {
      return res.end(
        "Access denied: You do not have permission to access this resource.",
      );
    }
    next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
