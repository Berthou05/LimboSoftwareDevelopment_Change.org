/*
Title: help.controller.js
Last modification: April 20,2026
Modified by: OpenAI Codex
*/

const helpService = require('./help.service');

/*getHelpEntry(request, response)
Function responsible for returning one normalized help entry for the
current page or section.*/

exports.getHelpEntry = (request, response) => {
    const helpEntry = helpService.getHelpEntry(request.params.key);

    if (!helpEntry) {
        return response.status(404).json({
            success: false,
            message: 'Help entry not found.',
        });
    }

    return response.status(200).json({
        success: true,
        entry: helpEntry.entry,
        relatedEntries: helpEntry.relatedEntries,
    });
};
