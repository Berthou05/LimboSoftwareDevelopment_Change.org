const HelpEntry = require('../../models/helpEntry');

exports.getManuals = (request, response) => {
    const manualLibrary = HelpEntry.fetchManualLibrary();
    const selectedSectionKey = typeof request.query.section === 'string' ? request.query.section : '';
    const fallbackSection = manualLibrary[0] || { entries: [] };
    const selectedSection = manualLibrary.find((section) => section.key === selectedSectionKey) || fallbackSection;
    const selectedEntryKey = typeof request.query.entry === 'string' ? request.query.entry : '';
    const fallbackEntry = selectedSection.entries[0] || null;
    const selectedEntry = selectedSection.entries.find((entry) => entry.key === selectedEntryKey) || fallbackEntry;
    const entries = manualLibrary.flatMap((section) => section.entries.map((entry) => ({
        sectionKey: section.key,
        key: entry.key,
        title: entry.title,
    })));
    const currentIndex = entries.findIndex((entry) => entry.key === selectedEntry?.key);
    const previousEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
    const nextEntry = currentIndex >= 0 && currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null;

    response.render('pages/manuals', {
        pageTitle: 'User Manuals',
        pageSubtitle: 'Browse reusable guides by module and workflow instead of maintaining one manual per screen.',
        manualLibrary,
        selectedSection,
        selectedEntry,
        previousEntry,
        nextEntry,
    });
};
