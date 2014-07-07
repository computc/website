module.exports = function(passport, database)
{
	var route = require("express").Router();
	
	route.get("/login", function(request, response, next)
	{
		response.render("login");
	});
	
	route.post("/login", passport.authenticate("local-login",
	{
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true
	}));
	
	route.get("/signup", function(request, response, next)
	{
		response.render("signup");
	});
	
	route.post("/signup", passport.authenticate("local-signup",
	{
		successRedirect: "/profile",
		failureRedirect: "/signup",
		failureFlash: true
	}));
	
	route.get("/logout", function(request, response, next)
	{
		request.logout();
		response.redirect("/");
	});
	
	return route;
}