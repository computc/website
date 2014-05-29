var fs = require("fs");

module.exports = function(server)
{
	server.get("/", function(request, response)
	{
		response.render("home");
	});

	server.get("/*", function(request, response, next)
	{
		var route = request.params[0];
		var CONTENT_DIRECTORY = "content_directory/";
		var path = CONTENT_DIRECTORY + route + ".handlebars";
		
		fs.exists(path, function(exists)
		{
			if(exists)
			{
				response.render(route);
			}
			else
			{
				next();
			}
		});
	});

	server.get("/*", function(request, response, next)
	{
		var RESOURCE_DIRECTORY = "resource_directory/";
		var path = RESOURCE_DIRECTORY + request.params[0];
		
		fs.exists(path, function(exists)
		{
			if(exists)
			{
				response.sendfile(path);
			}
			else
			{
				next();
			}
		});
	});

	server.get("/*", function(request, response)
	{
		response.render("error");
	});
}