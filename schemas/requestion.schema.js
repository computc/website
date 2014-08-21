var mongoose = require("mongoose");

var shortid = require("shortid");

var requestion = mongoose.Schema({
	
	reqid:
	{
		type: String,
		required: true,
		default: shortid.generate
	},
	submitdate:
	{
		type: Date,
		required: true,
		default: Date.now
	},
	utcid:
	{
		type: String,
		required: true
	},
	data:
	{
		type: String,
		required: true
	}
});

module.exports = requestion;