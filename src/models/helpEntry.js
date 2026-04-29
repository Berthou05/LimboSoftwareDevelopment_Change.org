const MANUAL_LIBRARY = require('../manuals');

const SUPPORTED_GUIDE_TYPES = ['tutorial', 'concept', 'workflow', 'reference'];
const SUPPORTED_GUIDE_STATUSES = ['complete', 'draft'];

const validateGuide = function validateGuide(guide) {
    if (Array.isArray(guide.children) && guide.children.length > 0) {
        guide.children.forEach(validateGuide);
        return;
    }

    // Older manual entries were created before type/status became required.
    // Infer only from the existing content shape so those files keep working.
    guide.type = guide.type || (Array.isArray(guide.steps) ? 'tutorial' : 'reference');
    guide.status = guide.status || 'draft';

    if (!SUPPORTED_GUIDE_TYPES.includes(guide.type)) {
        throw new Error(`Manual guide has an unsupported type: ${guide.key}`);
    }

    if (!SUPPORTED_GUIDE_STATUSES.includes(guide.status)) {
        throw new Error(`Manual guide has an unsupported status: ${guide.key}`);
    }

    if (!guide.helpKey) {
        throw new Error(`Manual guide is missing a helpKey: ${guide.key}`);
    }

    if (guide.type === 'tutorial' && !Array.isArray(guide.steps)) {
        throw new Error(`Tutorial manual guide is missing steps: ${guide.key}`);
    }

    if (['concept', 'workflow', 'reference'].includes(guide.type) && !Array.isArray(guide.sections)) {
        throw new Error(`${guide.type} manual guide is missing sections: ${guide.key}`);
    }

    (guide.steps || []).forEach((step, index) => {
        if (step.image && !step.image.src) {
            throw new Error(`Manual step image is missing a src: ${guide.key} step ${index + 1}`);
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
