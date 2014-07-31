var Users = require("../schemas/user.schema.js");

module.exports = function(request, utcid, password, done)
{
	var utcid = request.body.utcid;
	var password = request.body.password;
	var repassword = request.body.repassword;
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;
	
	if(!utcid || !password || !repassword || !firstname || !lastname)
	{
		request.flash("message", "Not enough information.");
		return done(null);
	}
	
	if(!new RegExp(/^[a-z]{3}[0-9]{3}$/).test(utcid))
	{
		request.flash("message", "UTCID is invalid.");
		return done(null);
	}
	
	if(password != repassword)
	{
		request.flash("message", "Passwords do not match.");
		return done(null);
	}
	
	Users.findOne({utcid: utcid}, function(error, user)
	{
		if(error)
		{
			console.log(error);
			return done(null);
		}
		
		if(user)
		{
			request.flash("message", utcid + " already been registered.");
			return done(null);
		}
		
		Users.create({
			utcid: utcid,
			firstname: firstname,
			lastname: lastname,
			password: password
		})
		
		return done(null, {utcid: utcid, firstname: firstname});
	});
}