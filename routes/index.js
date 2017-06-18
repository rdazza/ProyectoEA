/* ruta index */
var express = require('express');
var router = express.Router();
var passport = require('passport');
require('./passport')(passport);
var app = express();
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(passport.initialize());
app.use(passport.session());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/facebook', passport.authenticate('facebook'));
module.exports = router;
