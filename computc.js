///////////////////////////////////////////////////
/////////////////////importing////////////////////
/////////////////////////////////////////////////

var express = require("express");
var mongo = require("mongojs");
var passport = require("passport");
var handlebars = require("express3-handlebars");

///////////////////////////////////////////////////
///////////////////instantiating//////////////////
/////////////////////////////////////////////////

var application = express();
var database = mongo("computc", ["users"]);

///////////////////////////////////////////////////
////////////////////configuring///////////////////
/////////////////////////////////////////////////

application.use(require("cookie-parser")());
application.use(require("body-parser").json());
application.use(require("body-parser").urlencoded({extended: true}));
application.use(require("express-session")({secret: "exieeecs", saveUninitialized: true, resave: true}));
application.use(require("connect-flash")());

///////////////////////////////////////////////////
////////////////////databasing////////////////////
/////////////////////////////////////////////////

require("./placeholders.js")(database);

///////////////////////////////////////////////////
////////////////////templating////////////////////
/////////////////////////////////////////////////

var options = require("./configs/handlebars.options.js");

application.engine("handlebars", handlebars(options));
application.set("view engine", "handlebars");
application.set("views", "./content");

///////////////////////////////////////////////////
//////////////////authenticating//////////////////
/////////////////////////////////////////////////

passport.serializeUser(function(user, done) {done(null, user)});
passport.deserializeUser(function(user, done) {done(null, user)});

var LocalStrategy = require("passport-local").Strategy;

var configuration = require("./configs/passport.configuration.js");
var login_callback = require("./configs/passport.login.callback.js")(database);
var signup_callback = require("./configs/passport.signup.callback.js")(database);

passport.use("local-login", new LocalStrategy(configuration, login_callback));
passport.use("local-signup", new LocalStrategy(configuration, signup_callback));

application.use(passport.initialize());
application.use(passport.session());

///////////////////////////////////////////////////
/////////////////////routing//////////////////////
/////////////////////////////////////////////////

application.use(require("express").static("./resources"));
application.use(require("./middleware/get-flash-locals.js"));
application.use(require("./middleware/get-user-locals.js"));

application.use("/", require("./routes/home.route.js")());
application.use("/", require("./routes/login.route.js")(passport, database));
application.use("/profile", require("./routes/profile.route.js")(database));
application.get("*", function(request, response) {response.render("error");});

///////////////////////////////////////////////////
////////////////////listening/////////////////////
/////////////////////////////////////////////////

var port = process.env.PORT || 1271;
console.log("127.0.0.1:" + port);
application.listen(port);