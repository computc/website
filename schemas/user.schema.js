var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var user = mongoose.Schema({
	
	utcid:
	{
		type: String,
		required: true
	},
	password:
	{
		type: String,
		required: true
	},
	firstname:
	{
		type: String,
		required: true
	},
	lastname:
	{
		type: String,
		required: true
	},
	joindate:
	{
		type: Date,
		required: true,
		default: Date.now
	}
	
});

user.methods.encryptPassword = function(password)
{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

user.pre("save", function(next)
{
	if(this.isModified("password"))
	{
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
	}
	
	next();
});

user.methods.isValidPassword = function(password)
{
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("users", user);