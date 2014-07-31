module.exports = function(request, response, next)
{
	if(request.isAuthenticated())
	{
		return next();
	}
	else
	{
		return response.redirect("/login");
	}
}