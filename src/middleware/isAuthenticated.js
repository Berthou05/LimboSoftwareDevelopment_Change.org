// src/middleware/isAuthenticated.js
/*
isAuthenticated(request, response, next)
Used to block unauthenticated access to protected routes.
*/
function isAuthenticated(request, response, next) {
  if (request.session.isAuth) {
    response.locals.isAuth = true;
    return next();
  }
  else{
    response.locals.isAuth = false;
    return response.redirect('/');
  }
}

/*
requirePermission(requiredPrivilegeId)
Used on protected routes after authentication to validate a specific privilege.
Privileges are read from request.session.user.privilege where keys are privilege IDs.
*/
isAuthenticated.requirePermission = function requirePermission(requiredPrivilegeId) {
  return function permissionMiddleware(request, response, next) {
    const required = String(requiredPrivilegeId || '').trim().toUpperCase();
    const privilegeMap = request.session?.user?.privilege || {};
    const hasPermission = Boolean(privilegeMap[required]);

    if (hasPermission) {
      return next();
    }

    const message = 'You do not have permission to perform this action.';
    const acceptHeader = request.get('Accept') || '';

    if (acceptHeader.includes('application/json')) {
      return response.status(403).json({ error: message });
    }

    request.session.error = message;
    return response.redirect('/home');
  };
};

module.exports = isAuthenticated;
