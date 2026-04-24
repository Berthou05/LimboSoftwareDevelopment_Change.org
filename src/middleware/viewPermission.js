// middleware/viewPermissions.js

module.exports = (request, response, next) => {
    const privilegeMap = request.session?.user?.privilege || {};

    response.locals.privilegeMap = privilegeMap;

    response.locals.hasPermission = (required) => {
        if (!required) return false;

        const key = String(required).trim().toUpperCase();
        return Boolean(privilegeMap[key]);
    };

    next();
};