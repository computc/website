var database = require("../database.js");

var handlebars = require("express-handlebars").create(require("../configs/handlebars.options.js"));
var nodemailer = require("nodemailer").createTransport(require("../configs/nodemailer.configuration.js"));

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
			handlebars.render("./emails/report_new_requestion.email.handlebars",
			{
				firstname: "Andrew",
				lastname: "McPherson",
				reqid: requestion.reqid
			})
			.then(function(rendering)
			{
				return nodemailer.sendMail(
				{
					from: "CompUTC",
					to: "psn719@mocs.utc.edu",
					subject: "Requestion Report",
					html: rendering
				});
			});
			
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