var database = require("./database.js");

database.users.count({}, function(error, count)
{
	if(count === 0)
	{
		database.users.create({utcid: "psn719", firstname: "Andrew", lastname: "McPherson", password: "random", verified: {status: false}});
		database.users.create({utcid: "vln357", firstname: "Matthew", lastname: "Jallouk", password: "random", verified: {status: true}});
		database.users.create({utcid: "jgg529", firstname: "Sarah", lastname: "Hall", password: "random", verified: {status: true}});
		database.users.create({utcid: "dlv286", firstname: "Jonathon", lastname: "Hutchins", password: "random", verified: {status: true}});
		database.users.create({utcid: "xhd423", firstname: "Rachel", lastname: "Frye", password: "random", verified: {status: true}});
	}
});