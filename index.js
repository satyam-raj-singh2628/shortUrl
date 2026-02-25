const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const {
  restricTOLoggedinUsersOnly,
  checkUserAuth,
} = require("./middlewares/auth");
const shortUrlRoute = require("./routes/short_urlRoutes");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/userRoutes");
const ShortUrlModel = require("./models/short_urlModel");
const { getshortIDUrl } = require("./controllers/short_urlController");

mongoose
  .connect("mongodb://localhost:27017/shortUrlDB")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error connecting to db", err));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse the form data coming from the frontend
app.set("view engine", "ejs"); // telling express which view engine i want to use
app.set("views", path.resolve("./views")); // now i will give the folder and path

app.use("/url", restricTOLoggedinUsersOnly, shortUrlRoute); //restricTOLoggedinUsersOnly
app.use("/user", userRoute);
app.use("/", checkUserAuth, staticRoute);

app.get("/url/:shortId", getshortIDUrl);

app.listen(8000, () => console.log("server started at port: 8000"));
