module.exports = function(request, response, next)
{
	response.locals.user = request.user;
	next();
}