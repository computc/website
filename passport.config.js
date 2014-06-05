var LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport, mongo)
{
	passport.serializeUser(function(user, done) {done(null, user)});
	passport.deserializeUser(function(user, done) {done(null, user)});
	
	var configuration = {usernameField: "email", passwordField: "password", passReqToCallback: true};
	
    var login_callback = function(request, email, password, done)
	{
		mongo.users.findOne({email: email}, function(error, user)
		{
			if(error)
			{
				return done(error);
			}
			
			if(user)
			{
				if(user.password == password) //bcrypt?
				{
					return done(null, user);
				}
				else
				{
					return done(null, false, request.flash('loginMessage', 'Oops! Wrong password.'));
				}
			}
			else
			{
				return done(null, false, request.flash("loginMessage", "No user found."));
			}
		});
    }
	
	var signup_callback = function(request, email, password, done)
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
				//bcrypt?!
			}
		});
	}
	
	passport.use('local-login', new LocalStrategy(configuration, login_callback));
	passport.use("local-signup", new LocalStrategy(configuration, signup_callback));
}