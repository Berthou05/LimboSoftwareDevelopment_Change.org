const fs = require('fs');
const path = require('path');

const SECTION_CONFIG = [
    {
        key: 'quick-start',
        title: 'Quick Start',
        description: 'First-use guides for the most common actions.',
    },
    {
        key: 'concepts',
        title: 'Concepts',
        description: 'System explanations and shared behavior across modules.',
    },
    {
        key: 'projects',
        title: 'Projects',
        description: 'Guides for creating, editing, joining, and organizing projects.',
    },
    {
        key: 'teams',
        title: 'Teams',
        description: 'Guides for creating teams and managing team participation.',
    },
    {
        key: 'employees',
        title: 'Employees',
        description: 'Guides for employee profiles, activity, teams, and projects.',
    },
    {
        key: 'reports',
        title: 'Reports',
        description: 'Guides for generating and reading system reports.',
    },
    {
        key: 'admin',
        title: 'Admin',
        description: 'Administration guides for accounts, roles, and privileges.',
    },
    {
        key: 'auth',
        title: 'Auth',
        description: 'Guides for signing in and resetting passwords.',
    },
];

const loadGuidesFromSection = function loadGuidesFromSection(sectionKey) {
    const sectionDirectory = path.join(__dirname, sectionKey);

    if (!fs.existsSync(sectionDirectory)) {
        return [];
    }

    return fs.readdirSync(sectionDirectory)
        .filter((fileName) => fileName.endsWith('.js') && fileName !== 'index.js')
        .map((fileName) => {
            const guide = require(path.join(sectionDirectory, fileName));
            return {
                ...guide,
                sectionKey,
            };
        })
        .filter((guide) => guide && guide.key && guide.title && guide.type && guide.status)
        .sort((leftGuide, rightGuide) => {
            const leftOrder = Number.isFinite(leftGuide.order) ? leftGuide.order : 999;
            const rightOrder = Number.isFinite(rightGuide.order) ? rightGuide.order : 999;

            if (leftOrder !== rightOrder) {
                return leftOrder - rightOrder;
            }

            return leftGuide.title.localeCompare(rightGuide.title);
        });
};

module.exports = SECTION_CONFIG.map((section) => ({
    ...section,
    entries: loadGuidesFromSection(section.key),
})).filter((section) => section.entries.length > 0);
