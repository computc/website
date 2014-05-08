var express = require("express");

var HOME_PAGE = "home.html";
var ERROR_PAGE = "error.html";
var SRC_DIR = "source_directory/";

var server = express();

server.get("/*", function(request, response)
{
	//get the details of the request.
	var path = request.params[0];
	
	if(path == new String())
	{
		//if the homepage (as "/") was
		//requested, then return the page.
		response.sendfile(SRC_DIR + HOME_PAGE);
	}
	else if(require("fs").existsSync(SRC_DIR + path + ".html"))
	{
		//if a route (such as "/about" or "/contact") was
		//requested, then return the appropriate route.
		response.sendfile(SRC_DIR + path + ".html");
	}
	else if(require("fs").existsSync(SRC_DIR + path))
	{
		//if a resource (such as "/script.js") was
		//requested, then return the resource.
		response.sendfile(SRC_DIR + path);
	}
	else
	{
		//if a file that isn't at all available (such
		//as "/coontact") was requested, then return
		//a file to redirect back to the homepage.
		response.sendfile(SRC_DIR + ERROR_PAGE);
	}
});

var port = 21483;
server.listen(port);