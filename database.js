var mongoose = require("mongoose");

module.exports = new function()
{
	this.users = mongoose.model("users", require("./schemas/user.schema.js"));
}