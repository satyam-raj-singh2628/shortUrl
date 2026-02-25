const UserModel = require("../models/usersModel");
const { v4: uuidv4 } = require("uuid");
const { setToken } = require("../service/authService");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    await UserModel.create({ name, email, password: password });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error from handleUserSignup" });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }
    const token = setToken(user);
    res.cookie("uiD", token);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error from handleUserLogin" });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
