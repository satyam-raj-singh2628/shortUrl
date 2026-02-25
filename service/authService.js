const jwt = require("jsonwebtoken");
const secretKey = "my_secret_key@26"; // In production, use environment variables

// In-memory session store (for demonstration purposes)
// const sessionIDToUserMap = new Map();

function setToken(user) {
  // here user._id is correct
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  // sessionIDToUserMap.set(id, user);

  return jwt.sign(payload, secretKey); // creates a token with the user payload that expires in 1 hour
}

function getToken(token) {
  // return sessionIDToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey); // returns the user payload if valid, otherwise throws an error
  } catch (error) {
    console.log("Invalid token:", error);
    return null;
  }
}

module.exports = { setToken, getToken };
