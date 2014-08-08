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
		var query = Users.findOne({
			"utcid": request.params.utcid,
			"verified.token": request.params.token
		});
		
		query.exec().then(function(user)
		{
			if(user)
			{
				user.verified.status = true;
				user.verified.token = undefined;
				user.save();
				
				response.redirect("/profile");
			}
			else
			{
				next();
			}
		});
	});
	
	return route;
}