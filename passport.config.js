var LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport, mongo)
{
	passport.serializeUser(function(user, done) {done(null, user)});
	passport.deserializeUser(function(user, done) {done(null, user)});
	
	var configuration = {usernameField: "email", passwordField: "password"};
	var callback = function(email, password, done)
	{
		console.log("callback");
		mongo.users.findOne({email: email}, function(error, user)
		{
			//if(error) {return done(error);}
			
			if(user)
			{
				console.log("already exists");
				return done(null, false/*, req.flash("signupMessage", "That email is already taken.")*/);
			}
			else
			{
				console.log("making user!");
				var user = {email: email, password: password};
				mongo.users.insert(user);
				return done(null, user);
				//bcrypt?!
			}
		});
	}
	
	passport.use("local-signup", new LocalStrategy(configuration, callback));
}