var Users = require("./schemas/user.schema.js");

Users.count({}, function(error, count)
{
	if(count === 0)
	{
		Users.create({utcid: "psn719", firstname: "Andrew", lastname: "McPherson", password: "random", verified: {status: true}});
		Users.create({utcid: "vln357", firstname: "Matthew", lastname: "Jallouk", password: "random", verified: {status: true}});
		Users.create({utcid: "jgg529", firstname: "Sarah", lastname: "Hall", password: "random", verified: {status: true}});
		Users.create({utcid: "dlv286", firstname: "Jonathon", lastname: "Hutchins", password: "random", verified: {status: true}});
		Users.create({utcid: "xhd423", firstname: "Rachel", lastname: "Frye", password: "random", verified: {status: true}});
	}
});