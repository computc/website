module.exports = function(database)
{
	var bcrypt = require("bcrypt-nodejs");
	
	return function(request, utc_id, password, done)
	{
		database.users.findOne({utc_id: utc_id}, function(error, user)
		{
			if(error)
			{
				return done(error);
			}
			
			if(user)
			{
				if(bcrypt.compareSync(password, user.password))
				{
					return done(null, {utc_id: user.utc_id});
				}
				else
				{
					return done(null, false, request.flash("message", "Incorrect password."));
				}
			}
			else
			{
				return done(null, false, request.flash("message", "Unavailable utcid."));
			}
		});
	}
}