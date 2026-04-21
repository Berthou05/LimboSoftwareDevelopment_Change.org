const MANUAL_LIBRARY = require('../manuals');

const validateGuide = function validateGuide(guide) {
    if (Array.isArray(guide.children) && guide.children.length > 0) {
        guide.children.forEach(validateGuide);
        return;
    }

    (guide.steps || []).forEach((step, index) => {
        if (!step.image || !step.image.src) {
            throw new Error(`Manual step is missing a required image: ${guide.key} step ${index + 1}`);
        }
    });
};

const validateManualLibrary = function validateManualLibrary(library) {
    library.forEach((section) => {
        (section.entries || []).forEach((entry) => {
            validateGuide(entry);
        });
    });

    return library;
};

module.exports = class HelpEntry {
    static fetchManualLibrary() {
        return validateManualLibrary(MANUAL_LIBRARY);
    }
};
