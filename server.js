var express = require("express");
var server = express();

//////////////////////////////////////////////
//////////////////TEMPLATING/////////////////
////////////////////////////////////////////

var handlebars = require("express3-handlebars");
handlebars = handlebars(require("./handlebars.config"));

server.engine("handlebars", handlebars);
server.set("view engine", "handlebars");
server.set("views", "content_directory/");

//////////////////////////////////////////////
///////////////////ROUTING///////////////////
////////////////////////////////////////////

var router = require("./router.js");

server.get("/", router.home);
server.get("/*", router.content);
server.get("/*", router.resource);
server.get("/*", router.error);

//////////////////////////////////////////////
//////////////////LISTENING//////////////////
////////////////////////////////////////////

var port = 21483;
server.listen(port);
console.log("127.0.0.1:" + port);