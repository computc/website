module.exports = function(passport, handlebars)
{
	var route = require("express").Router();
	
	route.get("/login", function(request, response, next)
	{
		response.render("login");
	});
	
	route.post("/login", passport.authenticate("local-login",
	{
		successRedirect: "/profile",
		failureRedirect: "/login"
	}));
	
	route.get("/signup", function(request, response, next)
	{
		response.render("signup");
	});
	
	route.post("/signup", passport.authenticate("local-signup",
	{
		successRedirect: "/profile",
		failureRedirect: "/signup"
	}));
	
	route.get("/logout", function(request, response, next)
	{
		request.logout();
		response.redirect("/");
	});
	
	return route;
}