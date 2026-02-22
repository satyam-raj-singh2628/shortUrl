const express = require("express");
const shortUrlRoute = require("./routes/short_urlRoutes");
const mongoose = require("mongoose");
const ShortUrlModel = require("./models/short_urlModel");
const path = require("path");
const staticRoute = require("./routes/staticRotes");

mongoose
  .connect("mongodb://localhost:27017/shortUrlDB")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error connecting to db", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse the form data coming from the frontend
app.set("view engine", "ejs"); // telling express which view engine i want to use
app.set("views", path.resolve("./views")); // now i will give the folder and path
app.use("/homeURL", staticRoute);
app.use("/url", shortUrlRoute);
app.use("/", shortUrlRoute);

app.listen(8000, () => console.log("server started at port: 8000"));
