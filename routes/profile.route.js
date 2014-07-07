module.exports = function(database)
{
	var route = require("express").Router();
	
	route.use(require("../middleware/has-been-authed.js"));
	
	route.get("/", function(request, response)
	{
		response.render("profile");
	});
	
	return route;
}