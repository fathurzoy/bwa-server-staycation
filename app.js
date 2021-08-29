var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//cors untuk perizinan oke network
var cors = require("cors");
// method overide //ketika kita ingin menggunakan method put, kita harus install satulagi method override
const methodOverride = require("method-override");
// https://www.npmjs.com/package/express-session
const session = require("express-session");
// https://github.com/jaredhanson/connect-flash
const flash = require("connect-flash");
//import mongoose
const mongoose = require("mongoose");
//https://mongoosejs.com/docs/connections.html#connections
// mongoose.connect("mongodb://localhost:27017/db_bwamern", {
// mongoose.connect("mongodb://127.0.0.1:27017/db_staycation", {
mongoose.connect(
  // "mongodb+srv://codeathome:bwamern@cluster0-40j6e.mongodb.net/db_staycation?retryWrites=true&w=majority",
  "mongodb+srv://fathur123:fathur123@cluster0.hhvx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// router admin
const adminRouter = require("./routes/admin");
// router api
const apiRouter = require("./routes/api");

var app = express();
app.use(cors()); // Use this after the variable declaration

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// gunakan method overide
app.use(methodOverride("_method"));
// gunakan method express session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
// gunakan connect-flash
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
); //mengambil bootstrap module sb admin

app.use("/", indexRouter);
app.use("/users", usersRouter);
//admin
app.use("/admin", adminRouter);
//api
app.use("/api/v1/member", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
