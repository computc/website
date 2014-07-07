module.exports = function(database)
{
	var bcrypt = require("bcrypt-nodejs");
	
	database.users.drop();
	database.users.insert({utc_id: "psn719", email: "andrewmcp333@gmail.com", password: bcrypt.hashSync("random", bcrypt.genSaltSync(8), null)});
}