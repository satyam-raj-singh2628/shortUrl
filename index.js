const express = require("express");
const shortUrlRoutes = require("./routes/short_urlRoutes");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shortUrlDB")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error connecting to db", err));

const app = express();

app.use(express.json());
app.use("/url", shortUrlRoutes);
app.use("/", shortUrlRoutes);

app.listen(8000, () => console.log("server started at port: 8000"));
