module.exports = function(express, passport, mongo)
{
	/*express.use(function(request, response, next)
	{
		console.log("/" + request.params[0]);
		next();
	});*/
	
	express.use(function(request, response, next)
	{
		if(request.isAuthenticated())
		{
			response.locals.user = request.user;
		}
		
		next();
	});
	
	express.get("/", function(request, response)
	{
		response.render("home");
	});
	
	express.get("/*", function(request, response, next)
	{
		var RESOURCE_DIRECTORY = __dirname + "/resource_directory/";
		var path = RESOURCE_DIRECTORY + request.params[0];
		
		require("fs").exists(path, function(exists)
		{
			if(exists)
			{
				response.sendfile(path);
			}
			else
			{
				next();
			}
		});
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
	
	express.get("/profile", ensureUserAuthentication, function(request, response, next)
	{
		response.render("profile");
	});
	
	express.get("/*", function(request, response)
	{
		response.render("error");
	});
}

function ensureUserAuthentication(request, response, next)
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