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
				if(user.password == password)
				{
					return done(null, user);
				}
				else
				{
					return done(null, false, request.flash("message", "Oops! Wrong password."));
				}
			}
			else
			{
				return done(null, false, request.flash("message", "No user found."));
			}
		});
	}
}