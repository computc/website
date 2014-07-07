module.exports = function(database)
{
	return function(request, email, password, done)
	{
		database.users.findOne({email: email}, function(error, user)
		{
			if(error)
			{
				return done(error);
			}
			
			if(user)
			{
				return done(null, false, request.flash("message", "That email is already taken."));
			}
			else
			{
				var user = {email: email, password: password};
				database.users.insert(user);
				
				return done(null, user);
			}
		});
	}
}