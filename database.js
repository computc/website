var mongoose = require("mongoose");

module.exports.initiate = function()
{
	mongoose.connect(process.env.DATABASE || "localhost/computc");
}

module.exports.users = mongoose.model("users", require("./schemas/user.schema.js"));
module.exports.requestions = mongoose.model("requestions", require("./schemas/requestion.schema.js"));