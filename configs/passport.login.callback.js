module.exports = function(database)
{
	var bcrypt = require("bcrypt-nodejs");
	
	return function(request, utc_id, password, done)
	{
		database.users.findOne({utc_id: utc_id}, function(error, user)
		{
			if(error)
			{
				console.log(error);
				return done(null);
			}
			
			if(!user)
			{
				request.flash("message", "Unavailable utcid.");
				return done(null);
			}
			
			if(!bcrypt.compareSync(password, user.password))
			{
				request.flash("message", "Incorrect password.");
				return done(null);
			}
			
			return done(null, {utc_id: user.utc_id, first_name: user.first_name});
		});
	}
}