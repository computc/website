module.exports = function(database)
{
	var route = require("express").Router();
	
	route.use(require("../middleware/has-been-authed.js"));
	
	route.get("/", function(request, response)
	{
		response.redirect("/profile/" + request.user.utc_id);
	});
	
	route.get("/:utc_id", function(request, response, next)
	{
		database.users.findOne({utc_id: request.params.utc_id}, {password: 0}, function(error, profile)
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
	
	return route;
}