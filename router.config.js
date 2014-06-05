module.exports = function(express, passport, mongo)
{
	express.get("/", function(request, response)
	{
		response.render("home");
	});
	
	express.get("/login", function(request, response, next)
	{
		response.render("login", {message: request.flash("loginMessage")});
	});
	
	express.post('/login', passport.authenticate('local-login',
	{
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));
	
	express.get("/signup", function(request, response, next)
	{
		response.render("signup", {message: request.flash("signupMessage")});
	});
	
	express.post("/signup", passport.authenticate("local-signup",
	{
		successRedirect: "/profile",
		failureRedirect: "/signup",
		failureFlash: true
	}));
	
	express.get("/logout", function(request, response, next)
	{
		request.logout();
		response.redirect("/");
	});
	
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
		
		response.locals.user = request.user; //express.use() this!
	}
	else
	{
		response.redirect("/");
	}
}