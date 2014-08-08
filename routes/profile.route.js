var Users = require("../schemas/user.schema.js");

module.exports = function(database)
{
	var route = require("express").Router();
	
	route.get("/", require("../middleware/has-been-authed.js"), function(request, response)
	{
		response.redirect("/profile/" + request.user.utcid);
	});
	
	route.get("/:utcid", function(request, response, next)
	{
		Users.findOne({utcid: request.params.utcid}, {password: 0}, function(error, profile)
		{
			if(profile)
			{
				response.render("profile", {profile: profile});
			}
			else
			{
				next();
			}
		});
	});
	
	route.get("/:utcid/verify/:token", function(request, response, next)
	{
		Users.findOne({utcid: request.params.utcid}, "verification", function(error, profile)
		{
			if(profile)
			{
				console.log(profile);
			}
			else
			{
				next();
			}
		});
	});
	
	return route;
}