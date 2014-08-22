var handlebars = require("express-handlebars").create(require("./configs/handlebars.options.js"));
var nodemailer = require("nodemailer").createTransport(require("./configs/nodemailer.configuration.js"));

var MESSAGE_TEMPLATE_DIRECTORY = "./emails/";

module.exports.send = function(subject, message, address)
{	
	message.template = MESSAGE_TEMPLATE_DIRECTORY + message.template + ".email.html";
	handlebars.render(message.template, message.context).then(function(html)
	{
		return nodemailer.sendMail({
			to: address,
			from: "CompUTC <computc@gmail.com>",
			subject: subject,
			html: html
		});
	});
}