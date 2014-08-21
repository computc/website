var database = require("../database.js");

var handlebars = require("express-handlebars").create(require("../configs/handlebars.options.js"));

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
		response.render("requestion/submit");
	});
	
	route.post("/requestion", function(request, response)
	{
		console.log(request.body);
		
		database.requestions.create({
			utcid: "psn719", //request.user.utcid,
			data: request.body.data
		})
		.then(function(requestion)
		{
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
	
	route.get("/email", function(request, response)
	{
		handlebars.render("./emails/verify_new_utcid.email.handlebars",
		{
			firstname: "Andrew",
			lastname: "McPherson",
			token: "123",
			utcid: "psn719",
			reqid: "1234567890"
		})
		.then(function(rendering)
		{
			response.send(rendering);
		},
		function(error)
		{
			console.log(error);
		});
	});
	
	return route;
}