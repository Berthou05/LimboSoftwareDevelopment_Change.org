/*
Title: aiWrapper.js
Last modification: April 12,2026
Modified by: Alexis Berthou
*/

/*extractActivities(payload)
Function responsible for extracting normalized activities from a standup
payload. This wrapper can later be replaced with an external AI provider.*/

exports.extractActivities = function extractActivities(payload = {}) {
    const activities = [];
    const sections = [
        { label: 'Done', value: payload.done, workedOnProject: true },
        { label: 'To Do', value: payload.toDo, workedOnProject: true },
        { label: 'Blockers', value: payload.blockers, workedOnProject: false },
    ];

    sections.forEach((section) => {
        String(section.value || '')
            .split('\n')
            .map((line) => String(line || '').replace(/^\s*[-*]\s*/, '').trim())
            .filter(Boolean)
            .forEach((line) => {
                const normalizedTitle = line.slice(0, 150);
                const normalizedDescription = `${section.label}: ${line}`.slice(0, 1000);
                const projectHint = line.slice(0, 120);

                activities.push({
                    title: normalizedTitle || `${section.label} activity`,
                    description: normalizedDescription,
                    project_hint: projectHint,
                    worked_on_project: section.workedOnProject,
                });
            });
    });

    return Promise.resolve(activities.slice(0, 40));
};
