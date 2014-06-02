module.exports = function(express, passport, mongo)
{
	express.get("/", function(request, response)
	{
		response.render("home");
	});
	
	express.get("/profile", ensureAuthentication, function(request, response, next)
	{
		//...
	});
	
	/*express.get("/login/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]}));
	express.get("/login/google/again", passport.authenticate("google", {successRedirect: "/profile", failureRedirect: "/"}));
	express.get("/logout", function(request, response) {request.logout(); response.redirect("/");});*/

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
	}
	else
	{
		response.redirect("/");
	}
}