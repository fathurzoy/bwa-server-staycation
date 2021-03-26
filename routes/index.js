var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect("/admin/signin");
  //jadi ketika orang pertamakali masuk ke http://localhost:3000/ akan diarahkan ke http://localhost:3000/admin/signin
});

module.exports = router;
