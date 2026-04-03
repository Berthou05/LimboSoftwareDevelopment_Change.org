/*
Title: flashMessage.js
Last modification: April 02,2026
Modified by: Alexis Berthou
*/

module.exports = (request, response, next) => {
    const flashEntries = [
        ['success', request.session.success],
        ['warning', request.session.warning],
        ['error', request.session.error],
    ];

    const flashEntry = flashEntries.find(([, message]) => {
        return typeof message === 'string' && message.trim() !== '';
    });

    response.locals.flash = flashEntry
        ? {
            type: flashEntry[0],
            message: flashEntry[1].trim(),
        }
        : null;

    request.session.success = '';
    request.session.warning = '';
    request.session.error = '';

    next();
};
