const MANUAL_LIBRARY = require('../manuals');

const validateManualLibrary = function validateManualLibrary(library) {
    library.forEach((section) => {
        (section.entries || []).forEach((entry) => {
            (entry.steps || []).forEach((step, index) => {
                if (!step.image || !step.image.src) {
                    throw new Error(`Manual step is missing a required image: ${entry.key} step ${index + 1}`);
                }
            });
        });
    });

    return library;
};

module.exports = class HelpEntry {
    static fetchManualLibrary() {
        return validateManualLibrary(MANUAL_LIBRARY);
    }
};
