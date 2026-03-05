const DAY_LABEL_FORMAT_OPTIONS = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
};

const TIME_LABEL_FORMAT_OPTIONS = {
    hour: 'numeric',
    minute: '2-digit',
};

const SHORT_DATE_FORMAT_OPTIONS = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
};

const findItemDateValue = function findItemDateValue(item) {
    return item.completedAt || item.createdAt || null;
};

const formatDayLabel = function formatDayLabel(dayKey) {
    return new Date(dayKey).toLocaleDateString('en-US', DAY_LABEL_FORMAT_OPTIONS);
};

const formatActivityTimeLabel = function formatActivityTimeLabel(item) {
    const dateValue = findItemDateValue(item);

    if (!dateValue) {
        return '';
    }

    return new Date(dateValue).toLocaleTimeString('en-US', TIME_LABEL_FORMAT_OPTIONS);
};

/*
 * Converts a flat activity array into grouped timeline sections used by templates.
 */
const groupActivitiesByDay = function groupActivitiesByDay(items) {
    const dayToItemsMap = new Map();

    for (const item of items || []) {
        const dateValue = findItemDateValue(item);

        if (!dateValue) {
            continue;
        }

        const dayKey = new Date(dateValue).toISOString().slice(0, 10);

        if (!dayToItemsMap.has(dayKey)) {
            dayToItemsMap.set(dayKey, []);
        }

        dayToItemsMap.get(dayKey).push({
            ...item,
            activityTimeLabel: formatActivityTimeLabel(item),
        });
    }

    const sortedDayKeys = Array.from(dayToItemsMap.keys()).sort((leftDayKey, rightDayKey) => {
        return new Date(rightDayKey) - new Date(leftDayKey);
    });

    return sortedDayKeys.map((dayKey) => {
        return {
            dayKey,
            dayLabel: formatDayLabel(dayKey),
            items: dayToItemsMap.get(dayKey),
        };
    });
};

/*
 * Prototype projects do not have a dedicated `createdAt`.
 * This derives one from known date-like fields.
 */
const deriveProjectCreationDate = function deriveProjectCreationDate(project) {
    const creationCandidates = [
        ...(project.highlights || []).map((highlight) => highlight.createdAt),
        project.startDate,
        project.endDate,
    ].filter(Boolean);

    if (!creationCandidates.length) {
        return null;
    }

    creationCandidates.sort((leftDateValue, rightDateValue) => {
        return new Date(leftDateValue) - new Date(rightDateValue);
    });

    return creationCandidates[0];
};

const formatShortDate = function formatShortDate(dateValue) {
    if (!dateValue) {
        return 'Date unavailable';
    }

    return new Date(dateValue).toLocaleDateString('en-US', SHORT_DATE_FORMAT_OPTIONS);
};

const buildProjectParticipantRows = function buildProjectParticipantRows(project) {
    const participantRows = [];

    for (const participant of project.participants || []) {
        const participantTeam = (project.teamsDetailed || []).find((team) => {
            return (team.members || []).some((member) => member.employeeId === participant.id);
        });

        const participantTeamMember = (participantTeam?.members || []).find((member) => {
            return member.employeeId === participant.id;
        });

        participantRows.push({
            participant,
            teamName: participantTeam?.name || 'No Team',
            roleName: participantTeamMember?.role || 'Participant',
            startDateLabel: formatShortDate(participantTeamMember?.startDate),
        });
    }

    return participantRows;
};

const buildEmployeeTeamRows = function buildEmployeeTeamRows(employee) {
    const teamRows = [];

    for (const team of employee.teamObjects || []) {
        const teamMembership = (team.members || []).find((member) => {
            return member.employeeId === employee.id;
        });

        teamRows.push({
            team,
            roleName: teamMembership?.role || 'Member',
            startDateLabel: formatShortDate(teamMembership?.startDate),
        });
    }

    return teamRows;
};

const buildEmployeeProjectRows = function buildEmployeeProjectRows(employee) {
    const projectRows = [];

    for (const project of employee.projectObjects || []) {
        projectRows.push({
            project,
            roleName: 'Participant',
            startDateLabel: formatShortDate(project.startDate),
        });
    }

    return projectRows;
};

module.exports = {
    groupActivitiesByDay,
    deriveProjectCreationDate,
    buildProjectParticipantRows,
    buildEmployeeTeamRows,
    buildEmployeeProjectRows,
    formatDayLabel,
    formatShortDate,
};
