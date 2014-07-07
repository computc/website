module.exports = function(request, response, next)
{
	if(request.isAuthenticated())
	{
		response.locals.user = request.user;
	}
	
	next();
}