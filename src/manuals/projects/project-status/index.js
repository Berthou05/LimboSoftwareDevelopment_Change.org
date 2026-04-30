const goals = require('./goals');
const achievements = require('./achievements');
const highlights = require('./highlights');

module.exports = {
    key: 'projects.project-status',
    title: 'Project status',
    summary: 'Track project goals, achievements, and highlights from the project detail page.',
    appliesTo: ['Projects'],
    helpKey: 'projects.project-status',
    children: [
        goals,
        achievements,
        highlights,
    ],
};
