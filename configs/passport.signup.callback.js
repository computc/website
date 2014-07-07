module.exports = function(database)
{
	var bcrypt = require("bcrypt-nodejs");
	
	return function(request, utc_id, password, done)
	{
		var first_name = request.body.first_name;
		var last_name = request.body.last_name;
		
		/*if(request.body.utc_id //|| request.body.confirmation
		|| request.body.password || request.body.password_again
		|| request.body.first_name || request.body.last_name);
		{
			request.flash("message", "Not enough information.");
			return done(null);
		}*/
		
		if(!new RegExp(/^[a-z]{3}[0-9]{3}$/).test(request.body.utc_id))
		{
			request.flash("message", "UTC ID is invalid.");
			return done(null);
		}
		
		if(request.body.password != request.body.password_again)
		{
			request.flash("message", "Passwords do not match.");
			return done(null);
		}
		
		database.users.findOne({utc_id: utc_id}, function(error, user)
		{
			if(error)
			{
				console.log(error);
				return done(null);
			}
			
			if(user)
			{
				request.flash("message", utc_id + " already been registered.");
				return done(null);
			}
			
			database.users.insert({
				utc_id: utc_id, first_name: first_name, last_name: last_name,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
			});
			
			return done(null, {utc_id: utc_id, first_name: first_name});
		});
	}
}