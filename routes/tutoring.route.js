//var database = require("../database.js");

module.exports = function()
{
	var route = require("express").Router();
	
	route.get("/", function(request, response)
	{
		response.render("tutoring");
	});
	
	//route.use(require("../middleware/has-been-authed.js"));
	
	route.get("/requestion", function(request, response)
	{
		response.render("requestion/first");
	});
	
	return route;
}