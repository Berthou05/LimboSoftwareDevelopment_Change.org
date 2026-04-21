const MANUAL_LIBRARY = require('../manuals');

module.exports = class HelpEntry {
    static fetchManualLibrary() {
        return MANUAL_LIBRARY;
    }
};
