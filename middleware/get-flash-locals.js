module.exports = function(request, response, next)
{
	response.locals.message = request.flash("message");
	next();
}