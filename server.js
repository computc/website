var express = require("express");
express = express();

//////////////////////////////////////////////
//////////////////TEMPLATING/////////////////
////////////////////////////////////////////

var handlebars = require("express3-handlebars");
handlebars = handlebars(require("./handlebars.options.js"));

express.engine("handlebars", handlebars);
express.set("view engine", "handlebars");
express.set("views", "content_directory/");

//////////////////////////////////////////////
//////////////////DATABASING/////////////////
////////////////////////////////////////////

var mongo = require("mongojs");
mongo = mongo("computc", ["users"]);

mongo.users.drop();

//////////////////////////////////////////////
////////////////AUTHENTICATING///////////////
////////////////////////////////////////////

var passport = require("passport");
require("./passport.config.js")(passport, mongo);

var connect = require("connect");
express.use(connect.cookieParser());
express.use(connect.session({secret: "thing"}));

express.use(passport.initialize());
express.use(passport.session());

//////////////////////////////////////////////
///////////////////ROUTING///////////////////
////////////////////////////////////////////

express.use("/", require("express").static("resource_directory/"));

require("./router.config.js")(express, passport, mongo);

//////////////////////////////////////////////
//////////////////LISTENING//////////////////
////////////////////////////////////////////

var port = process.env.PORT || 21483;
console.log("127.0.0.1:" + port);
express.listen(port);