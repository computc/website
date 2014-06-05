var LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport, mongo)
{
	passport.serializeUser(function(user, done) {done(null, user)});
	passport.deserializeUser(function(user, done) {done(null, user)});
	
	var configuration = {usernameField: "email", passwordField: "password", passReqToCallback: true};
	
    var login = function(request, email, password, done)
	{
		mongo.users.findOne({email: email}, function(error, user)
		{
			if(error)
			{
				return done(error);
			}
			
			if(user)
			{
				if(user.password == password)
				{
					return done(null, user);
				}
				else
				{
					return done(null, false, request.flash("loginMessage", 'Oops! Wrong password.'));
				}
			}
			else
			{
				return done(null, false, request.flash("loginMessage", "No user found."));
			}
		});
    }
	
	var signup = function(request, email, password, done)
	{
		mongo.users.findOne({email: email}, function(error, user)
		{
			if(error)
			{
				return done(error);
			}
			
			if(user)
			{
				return done(null, false, request.flash("signupMessage", "That email is already taken."));
			}
			else
			{
				var user = {email: email, password: password};
				mongo.users.insert(user);
				
				return done(null, user);
			}
		});
	}
	
	passport.use("local-login", new LocalStrategy(configuration, login));
	passport.use("local-signup", new LocalStrategy(configuration, signup));
}