var database = require("../database.js");
var messager = require("../messager.js");
			
module.exports = function()
{
	var route = require("express").Router();
	
	route.get("/", function(request, response)
	{
		response.render("tutoring");
	});
	
	route.use(require("../middleware/has-been-authed.js"));
	
	route.get("/requestion", function(request, response)
	{
		response.render("requestion/submit");
	});
	
	route.post("/requestion", function(request, response)
	{
		database.requestions.create({
			utcid: request.user.utcid,
			data: request.body.data
		})
		.then(function(requestion)
		{
			messager.send("[CompUTC] A requestion has been submitted.",
			{
				template: "report_new_requestion",
				context:
				{
					firstname: request.user.firstname,
					reqid: requestion.reqid
				}
			},
			"andrewmcp333@gmail.com");
			
			messager.send("[CompUTC] Your requestion has been submitted!",
			{
				template: "confirm_new_requestion",
				context:
				{
					firstname: request.user.firstname,
					reqid: requestion.reqid
				}
			},
			request.user.utcid + "@mocs.utc.edu");
			
			response.redirect("/tutoring/requestion/" + requestion.reqid);
		},
		function(error)
		{
			console.log(error)
		})
	});
	
	route.get("/requestion/:reqid", function(request, response)
	{
		var query = database.requestions.findOne({
			"reqid": request.params.reqid
		});
		
		query.exec().then(function(requestion)
		{
			if(requestion)
			{
				response.render("requestion/review", {
					stuff: requestion. data
				});
			}
			else
			{
				console.log("not here");
				next();
			}
		});
	});
	
	return route;
}