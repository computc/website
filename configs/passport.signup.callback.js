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
				return done(null, false, request.flash("message", utc_id + " already been registerd."));
			}
			else
			{
				password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
				
				database.users.insert({utc_id: utc_id, password: password});
				return done(null, {utc_id: utc_id});
			}
		});
	}
}