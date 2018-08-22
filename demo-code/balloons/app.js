
var express = require("express");
var indexRouter = require("./routes/index");
var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
module.exports = app;
