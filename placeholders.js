var bcrypt = require("bcrypt-nodejs");

module.exports = function(database)
{
	var placeholders = [
		{
			utc_id: "psn719",
			first_name: "Andrew",
			last_name: "McPherson"
		},
		{
			utc_id: "vln357",
			first_name: "Matthew",
			last_name: "Jallouk"
		},
		{
			utc_id: "jgg529",
			first_name: "Sarah",
			last_name: "Hall"
		},
		{
			utc_id: "dlv286",
			first_name: "Jonathon",
			last_name: "Hutchins"
		},
		{
			utc_id: "xhd423",
			first_name: "Rachel",
			last_name: "Frye"
		}
	];
	
	var default_password = bcrypt.hashSync("random", bcrypt.genSaltSync(8), null);
	
	database.users.drop();
	
	for(var i in placeholders)
	{
		var user = placeholders[i];
		user.password = default_password;
		database.users.insert(user);
	}
}