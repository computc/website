var database = require("../database.js");

module.exports = function(request, utcid, password, done)
{
	database.users.findOne({utcid: utcid}, function(error, user)
	{
		if(error)
		{
			console.log(error);
			return done(null);
		}
		
		if(!user)
		{
			request.flash("message", LOGIN_ERROR_MESSAGE);
			return done(null);
		}
		
		if(!user.isValidPassword(password))
		{
			request.flash("message", LOGIN_ERROR_MESSAGE);
			return done(null);
		}
		
		return done(null, {utcid: user.utcid, firstname: user.firstname});
	});
}

var LOGIN_ERROR_MESSAGE = "The utcid and password do not match.";