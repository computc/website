var fs = require("fs");

var CONTENT_DIRECTORY = "content_directory/";
var RESOURCE_DIRECTORY = "resource_directory/";

module.exports.home = function(request, response, next)
{
	response.render("home");
}

module.exports.content = function(request, response, next)
{
	var route = request.params[0];
	var path = CONTENT_DIRECTORY + route + ".handlebars";
	if(fs.existsSync(path)) {return response.render(route);}
	
	next();
}

module.exports.resource = function(request, response, next)
{
	var route = request.params[0];
	var path = RESOURCE_DIRECTORY + route;
	if(fs.existsSync(path)) {return response.sendfile(path);}
	
	next();
}

module.exports.error = function(request, response)
{
	response.render("error");
}