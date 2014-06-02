module.exports = function(express, passport, mongo)
{
	express.get("/", function(request, response)
	{
		response.render("home");
	});
	
	express.get("/login", function(request, response, next)
	{
		response.render("login");
	});
	
	express.get("/logout", function(request, response, next)
	{
		request.logout();
		response.redirect("/");
	});
	
	express.get("/signup", function(request, response, next)
	{
		response.render("signup");
	});
	
	express.post("/signup", passport.authenticate("local-signup", {
		successRedirect : "/profile",
		failureRedirect : "/signup"
		/*failureFlash : true*/
	}));
	
	express.get("/profile", ensureAuthentication, function(request, response, next)
	{
		response.render("profile");
	});
	
	express.get("/*", function(request, response)
	{
		response.render("error");
	});
}

function ensureAuthentication(request, response, next)
{
	if(request.isAuthenticated())
	{
		next();
		response.locals.user = request.user; //.use this!
	}
	else
	{
		response.redirect("/");
	}
}