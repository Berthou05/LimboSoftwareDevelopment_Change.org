/*
Title: help.service.js
Last modification: April 20,2026
Modified by: OpenAI Codex
*/

const helpEntries = require('../../help/helpEntries.json');

/*getHelpEntry(helpKey)
Function responsible for returning one help entry and its related
entries from the local help catalog.*/

const getHelpEntry = function getHelpEntry(helpKey = '') {
    const normalizedKey = String(helpKey || '').trim();

    if (!normalizedKey || !helpEntries[normalizedKey]) {
        return null;
    }

    const entry = helpEntries[normalizedKey];
    const relatedEntries = (entry.related || [])
        .map((relatedKey) => helpEntries[relatedKey])
        .filter(Boolean);

    return {
        entry,
        relatedEntries,
    };
};

module.exports = {
    getHelpEntry,
};
