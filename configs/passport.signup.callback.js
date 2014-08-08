var Users = require("../schemas/user.schema.js");

var handlebars = require("express-handlebars").create();

module.exports = function(request, utcid, password, done)
{
	var utcid = request.body.utcid;
	var password = request.body.password;
	var repassword = request.body.repassword;
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;
	
	Users.findOne({utcid: utcid}).exec().then(function(user)
	{
		if(user)
		{
			throw utcid + " already been registered.";
		}
	})
	.then(function()
	{
		if(!utcid || !password || !repassword || !firstname || !lastname)
		{
			throw "Not enough information."
		}
	})
	.then(function()
	{
		if(!new RegExp(/^[a-z]{3}[0-9]{3}$/).test(utcid))
		{
			throw "UTCID is invalid.";
		}
	})
	.then(function()
	{
		if(password != repassword)
		{
			throw "Passwords do not match.";
		}
	})
	.then(function()
	{
		Users.create({utcid: utcid, password: password, firstname: firstname, lastname: lastname});
		
		handlebars.render("./emails/confirm.handlebars", {firstname: firstname}).then(function(rendering)
		{
			console.log(rendering);
		});
		
		return done(null, {utcid: utcid, firstname: firstname});
	},
	function(error)
	{
		request.flash("message", error);
		return done(null);
	});
}