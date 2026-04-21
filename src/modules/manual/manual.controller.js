const HelpEntry = require('../../models/helpEntry');

exports.getManuals = (request, response) => {
    const manualLibrary = HelpEntry.fetchManualLibrary();
    const selectedSectionKey = typeof request.query.section === 'string' ? request.query.section : '';
    const fallbackSection = manualLibrary[0] || { entries: [] };
    const selectedSection = manualLibrary.find((section) => section.key === selectedSectionKey) || fallbackSection;
    const selectedEntryKey = typeof request.query.entry === 'string' ? request.query.entry : '';
    const fallbackEntry = selectedSection.entries[0] || null;
    const selectedEntry = selectedSection.entries.find((entry) => entry.key === selectedEntryKey) || fallbackEntry;
    const selectedChildKey = typeof request.query.child === 'string' ? request.query.child : '';
    const selectedChild = selectedEntry && Array.isArray(selectedEntry.children) && selectedEntry.children.length > 0
        ? selectedEntry.children.find((child) => child.key === selectedChildKey) || selectedEntry.children[0]
        : null;
    const selectedGuide = selectedChild || selectedEntry;
    const guides = manualLibrary.flatMap((section) => section.entries.flatMap((entry) => {
        if (Array.isArray(entry.children) && entry.children.length > 0) {
            return entry.children.map((child) => ({
                sectionKey: section.key,
                entryKey: entry.key,
                key: child.key,
                title: child.title,
            }));
        }

        return [{
            sectionKey: section.key,
            entryKey: entry.key,
            key: entry.key,
            title: entry.title,
        }];
    }));
    const currentIndex = guides.findIndex((entry) => entry.key === selectedGuide?.key);
    const previousEntry = currentIndex > 0 ? guides[currentIndex - 1] : null;
    const nextEntry = currentIndex >= 0 && currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null;

    response.render('pages/manuals', {
        csrfToken: request.csrfToken(),
        pageTitle: 'User Manuals',
        pageSubtitle: 'Browse reusable guides by module and workflow instead of maintaining one manual per screen.',
        manualLibrary,
        selectedSection,
        selectedEntry,
        selectedChild,
        selectedGuide,
        previousEntry,
        nextEntry,
    });
};
