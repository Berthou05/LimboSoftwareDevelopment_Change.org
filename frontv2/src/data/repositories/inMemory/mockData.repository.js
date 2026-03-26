/*
 * In-memory data repository for the prototype.
 *
 * Why this file exists:
 * - It simulates a database without adding backend infrastructure complexity.
 * - Services/controllers call these functions as if they were regular data access methods.
 *
 * Important:
 * - All collections are mutable in memory.
 * - Data resets every time the Node process restarts.
 */

const privilegesCatalog = [
    { code: 'AUTH-01', name: 'Sign in' },
    { code: 'HS-01', name: 'Search home entities' },
    { code: 'AL-04', name: 'Consult activity log' },
    { code: 'REP-01', name: 'Generate reports' },
    { code: 'TEAM-04', name: 'Consult team information' },
    { code: 'PROJ-04', name: 'Consult project information' },
    { code: 'ADMIN-05', name: 'Assign roles to accounts' },
    { code: 'ADMIN-03', name: 'Assign privileges to roles' },
];

const roles = [
    {
        id: 'role-user',
        name: 'Employee',
        privilegeCodes: ['AUTH-01', 'HS-01', 'AL-04', 'TEAM-04', 'PROJ-04', 'REP-01'],
    },
    {
        id: 'role-lead',
        name: 'Lead',
        privilegeCodes: [
            'AUTH-01',
            'HS-01',
            'AL-04',
            'TEAM-04',
            'PROJ-04',
            'REP-01',
            'ADMIN-05',
        ],
    },
    {
        id: 'role-admin',
        name: 'Admin',
        privilegeCodes: privilegesCatalog.map((privilege) => privilege.code),
    },
];

const employees = [
    {
        id: 'emp-1',
        fullName: 'Rodrigo Hurtado',
        timezone: 'America/Mexico_City',
        title: 'Software Engineer',
        bio: 'Builds reporting workflows and keeps team delivery healthy.',
        teams: ['team-1', 'team-3', 'team-5'],
        projects: ['proj-1', 'proj-2', 'proj-3', 'proj-6', 'proj-7', 'proj-9', 'proj-10'],
        avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Rodrigo',
    },
    {
        id: 'emp-2',
        fullName: 'Camila Cuevas',
        timezone: 'America/Mexico_City',
        title: 'Frontend Lead',
        bio: 'Owns UI consistency and accessibility across modules.',
        teams: ['team-2', 'team-3', 'team-4'],
        projects: ['proj-1', 'proj-3', 'proj-5', 'proj-8', 'proj-9', 'proj-10'],
        avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Camila',
    },
    {
        id: 'emp-3',
        fullName: 'Alexis Berthou',
        timezone: 'America/Mexico_City',
        title: 'Data Engineer',
        bio: 'Designs data pipelines for report generation.',
        teams: ['team-1', 'team-5', 'team-6'],
        projects: ['proj-2', 'proj-4', 'proj-6', 'proj-7'],
        avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alexis',
    },
    {
        id: 'emp-4',
        fullName: 'Alejandro Contreras',
        timezone: 'America/Mexico_City',
        title: 'Product Engineer',
        bio: 'Connects employee workflows and business goals.',
        teams: ['team-2', 'team-4', 'team-6'],
        projects: ['proj-2', 'proj-4', 'proj-5', 'proj-7', 'proj-8', 'proj-10'],
        avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alejandro_BlackHair',
    },
];

const teams = [
    {
        id: 'team-1',
        name: 'Team Penguin',
        description: 'Maintains core modules and authentication workflows.',
        image: '/images/penguin_avatar.png',
        responsibleEmployeeId: 'emp-3',
        members: [
            { employeeId: 'emp-1', role: 'Employee', startDate: '2025-08-12' },
            { employeeId: 'emp-3', role: 'Lead', startDate: '2025-06-01' },
        ],
        projectIds: ['proj-1', 'proj-3', 'proj-6', 'proj-7', 'proj-9', 'proj-10'],
    },
    {
        id: 'team-2',
        name: 'Team Seal',
        description: 'Creates analytics, summaries, and operational dashboards.',
        image: '/images/seal_avatar.jpg',
        responsibleEmployeeId: 'emp-2',
        members: [
            { employeeId: 'emp-2', role: 'Lead', startDate: '2025-07-10' },
            { employeeId: 'emp-4', role: 'Employee', startDate: '2025-07-12' },
        ],
        projectIds: ['proj-2', 'proj-4', 'proj-5', 'proj-7', 'proj-8'],
    },
    {
        id: 'team-3',
        name: 'Team Fox',
        description: 'Drives product polish, responsiveness, and release-readiness work.',
        image: '/images/fox.jpg',
        responsibleEmployeeId: 'emp-1',
        members: [
            { employeeId: 'emp-1', role: 'Lead', startDate: '2025-09-02' },
            { employeeId: 'emp-2', role: 'Employee', startDate: '2025-09-09' },
        ],
        projectIds: ['proj-1', 'proj-3', 'proj-9'],
    },
    {
        id: 'team-4',
        name: 'Team Panda',
        description: 'Focuses on onboarding experiences, feedback loops, and localization.',
        image: '/images/panda.webp',
        responsibleEmployeeId: 'emp-2',
        members: [
            { employeeId: 'emp-2', role: 'Lead', startDate: '2025-10-01' },
            { employeeId: 'emp-4', role: 'Employee', startDate: '2025-10-05' },
        ],
        projectIds: ['proj-5', 'proj-8', 'proj-10'],
    },
    {
        id: 'team-5',
        name: 'Team Dinosaur',
        description: 'Owns infrastructure hardening, automation, and backend reliability.',
        image: '/images/dinosaur.webp',
        responsibleEmployeeId: 'emp-3',
        members: [
            { employeeId: 'emp-3', role: 'Lead', startDate: '2025-11-03' },
            { employeeId: 'emp-1', role: 'Employee', startDate: '2025-11-07' },
        ],
        projectIds: ['proj-2', 'proj-6'],
    },
    {
        id: 'team-6',
        name: 'Team Sheep',
        description: 'Supports analytics delivery, dashboards, and gateway readiness.',
        image: '/images/sheep.jpg',
        responsibleEmployeeId: 'emp-4',
        members: [
            { employeeId: 'emp-4', role: 'Lead', startDate: '2025-12-01' },
            { employeeId: 'emp-3', role: 'Employee', startDate: '2025-12-04' },
        ],
        projectIds: ['proj-4', 'proj-7'],
    },
];

const projects = [
    {
        id: 'proj-1',
        name: 'Unitas Core Web',
        description: 'Main workspace for daily entries, activity logs, and reporting.',
        status: 'ACTIVE',
        startDate: '2025-11-01',
        endDate: '2026-06-30',
        responsibleEmployeeId: 'emp-2',
        teamIds: ['team-1', 'team-3'],
        participantIds: ['emp-1', 'emp-2'],
        goals: [
            {
                id: 'goal-1',
                title: 'Stabilize authentication module',
                description: 'Complete login, recover, and reset user flows.',
                dueDate: '2026-03-15',
                status: 'IN_PROGRESS',
            },
        ],
        achievements: [
            {
                id: 'ach-1',
                title: 'Role-based navigation',
                description: 'Sidebar now adapts to role permissions.',
                achievementDate: '2026-02-10',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-1',
                title: 'Sprint 7 quality uplift',
                content: 'Reduced UI bugs in reports by 32%.',
                createdAt: '2026-02-18',
            },
        ],
    },
    {
        id: 'proj-2',
        name: 'AI Report Pipeline',
        description: 'Builds AI-generated summaries and PDF export automation.',
        status: 'ACTIVE',
        startDate: '2025-10-15',
        endDate: '2026-08-01',
        responsibleEmployeeId: 'emp-3',
        teamIds: ['team-2', 'team-5'],
        participantIds: ['emp-1', 'emp-3', 'emp-4'],
        goals: [
            {
                id: 'goal-2',
                title: 'Prompt routing by report type',
                description: 'Select prompts by Employee, Team, and Project content.',
                dueDate: '2026-04-01',
                status: 'IN_PROGRESS',
            },
        ],
        achievements: [
            {
                id: 'ach-2',
                title: 'Daily snapshots ready',
                description: 'Report snapshots now include filters_json metadata.',
                achievementDate: '2026-02-12',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-2',
                title: 'Slack report command tested',
                content: 'Internal test validates report generation from Slack trigger.',
                createdAt: '2026-02-20',
            },
        ],
    },
    {
        id: 'proj-3',
        name: 'Mobile Companion App',
        description: 'Native mobile application for activity logging on the go.',
        status: 'ACTIVE',
        startDate: '2026-01-10',
        endDate: '2026-09-30',
        responsibleEmployeeId: 'emp-2',
        teamIds: ['team-1', 'team-3'],
        participantIds: ['emp-1', 'emp-2'],
        goals: [
            {
                id: 'goal-3',
                title: 'Offline sync capability',
                description: 'Allow users to log activities without network and sync later.',
                dueDate: '2026-05-01',
                status: 'IN_PROGRESS',
            },
        ],
        achievements: [
            {
                id: 'ach-3',
                title: 'Push notifications working',
                description: 'Users receive daily reminders to log activities.',
                achievementDate: '2026-02-25',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-3',
                title: 'Beta testers onboarded',
                content: '15 internal users now testing the mobile app daily.',
                createdAt: '2026-02-28',
            },
        ],
    },
    {
        id: 'proj-4',
        name: 'Analytics Dashboard',
        description: 'Real-time visualization of team productivity and project metrics.',
        status: 'ACTIVE',
        startDate: '2025-12-01',
        endDate: '2026-07-15',
        responsibleEmployeeId: 'emp-3',
        teamIds: ['team-2', 'team-6'],
        participantIds: ['emp-3', 'emp-4'],
        goals: [
            {
                id: 'goal-4',
                title: 'Interactive chart components',
                description: 'Build reusable D3.js chart library for dashboards.',
                dueDate: '2026-04-15',
                status: 'IN_PROGRESS',
            },
        ],
        achievements: [
            {
                id: 'ach-4',
                title: 'KPI cards deployed',
                description: 'Dashboard now shows team velocity and burn-down metrics.',
                achievementDate: '2026-02-15',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-4',
                title: 'Executive preview session',
                content: 'Leadership approved dashboard design in sprint review.',
                createdAt: '2026-02-22',
            },
        ],
    },
    {
        id: 'proj-5',
        name: 'Employee Onboarding Portal',
        description: 'Self-service portal for new hire documentation and training.',
        status: 'COMPLETED',
        startDate: '2025-08-01',
        endDate: '2026-01-31',
        responsibleEmployeeId: 'emp-4',
        teamIds: ['team-2', 'team-4'],
        participantIds: ['emp-2', 'emp-4'],
        goals: [
            {
                id: 'goal-5',
                title: 'Document upload system',
                description: 'Enable HR to upload onboarding materials.',
                dueDate: '2025-12-15',
                status: 'COMPLETED',
            },
        ],
        achievements: [
            {
                id: 'ach-5',
                title: 'Portal launched',
                description: 'Successfully onboarded 12 new employees using the portal.',
                achievementDate: '2026-01-25',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-5',
                title: 'HR integration complete',
                content: 'Portal now syncs with HR systems for automatic user creation.',
                createdAt: '2026-01-20',
            },
        ],
    },
    {
        id: 'proj-6',
        name: 'Security Audit Automation',
        description: 'Automated vulnerability scanning and compliance reporting.',
        status: 'ACTIVE',
        startDate: '2026-02-01',
        endDate: '2026-12-31',
        responsibleEmployeeId: 'emp-1',
        teamIds: ['team-1', 'team-5'],
        participantIds: ['emp-1', 'emp-3'],
        goals: [
            {
                id: 'goal-6',
                title: 'OWASP compliance checks',
                description: 'Implement automated OWASP Top 10 vulnerability scanning.',
                dueDate: '2026-06-01',
                status: 'NOT_STARTED',
            },
        ],
        achievements: [
            {
                id: 'ach-6',
                title: 'Dependency scanner deployed',
                description: 'npm audit runs automatically on every PR.',
                achievementDate: '2026-02-28',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-6',
                title: 'Zero critical vulnerabilities',
                content: 'First month closed with no critical security issues.',
                createdAt: '2026-03-01',
            },
        ],
    },
    {
        id: 'proj-7',
        name: 'API Gateway Redesign',
        description: 'Modernize API architecture with rate limiting and caching.',
        status: 'PLANNING',
        startDate: '2026-04-01',
        endDate: '2026-10-31',
        responsibleEmployeeId: 'emp-3',
        teamIds: ['team-1', 'team-2', 'team-6'],
        participantIds: ['emp-1', 'emp-3', 'emp-4'],
        goals: [
            {
                id: 'goal-7',
                title: 'Rate limiting implementation',
                description: 'Add configurable rate limits per API endpoint.',
                dueDate: '2026-06-15',
                status: 'NOT_STARTED',
            },
        ],
        achievements: [],
        highlights: [
            {
                id: 'hl-7',
                title: 'Architecture RFC approved',
                content: 'Team agreed on Kong-based gateway solution.',
                createdAt: '2026-03-02',
            },
        ],
    },
    {
        id: 'proj-8',
        name: 'Customer Feedback System',
        description: 'In-app feedback collection and sentiment analysis.',
        status: 'ACTIVE',
        startDate: '2025-11-15',
        endDate: '2026-05-31',
        responsibleEmployeeId: 'emp-4',
        teamIds: ['team-2', 'team-4'],
        participantIds: ['emp-2', 'emp-4'],
        goals: [
            {
                id: 'goal-8',
                title: 'Sentiment dashboard',
                description: 'Visualize feedback trends with NLP-based sentiment scores.',
                dueDate: '2026-04-30',
                status: 'IN_PROGRESS',
            },
        ],
        achievements: [
            {
                id: 'ach-8',
                title: 'Feedback widget launched',
                description: 'Users can now submit feedback from any page.',
                achievementDate: '2026-01-10',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-8',
                title: '500+ feedback entries',
                content: 'Reached milestone of 500 customer feedback submissions.',
                createdAt: '2026-02-15',
            },
        ],
    },
    {
        id: 'proj-9',
        name: 'Performance Optimization Sprint',
        description: 'Dedicated effort to improve application load times and responsiveness.',
        status: 'COMPLETED',
        startDate: '2025-09-01',
        endDate: '2025-11-30',
        responsibleEmployeeId: 'emp-2',
        teamIds: ['team-1', 'team-3'],
        participantIds: ['emp-1', 'emp-2'],
        goals: [
            {
                id: 'goal-9',
                title: 'Sub-2s page loads',
                description: 'Achieve under 2 second load time for all main pages.',
                dueDate: '2025-11-15',
                status: 'COMPLETED',
            },
        ],
        achievements: [
            {
                id: 'ach-9',
                title: '40% load time reduction',
                description: 'Average page load decreased from 3.2s to 1.9s.',
                achievementDate: '2025-11-20',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-9',
                title: 'Lighthouse score 95+',
                content: 'All pages now score above 95 on Google Lighthouse.',
                createdAt: '2025-11-25',
            },
        ],
    },
    {
        id: 'proj-10',
        name: 'Internationalization (i18n)',
        description: 'Multi-language support for global team deployment.',
        status: 'ACTIVE',
        startDate: '2026-01-15',
        endDate: '2026-08-31',
        responsibleEmployeeId: 'emp-1',
        teamIds: ['team-1', 'team-4'],
        participantIds: ['emp-1', 'emp-2', 'emp-4'],
        goals: [
            {
                id: 'goal-10',
                title: 'Spanish localization',
                description: 'Complete Spanish translation for all UI strings.',
                dueDate: '2026-04-01',
                status: 'IN_PROGRESS',
            },
        ],
        achievements: [
            {
                id: 'ach-10',
                title: 'i18n framework integrated',
                description: 'All static strings now use translation keys.',
                achievementDate: '2026-02-05',
                evidenceLink: '#',
            },
        ],
        highlights: [
            {
                id: 'hl-10',
                title: 'French beta available',
                content: 'French localization ready for internal testing.',
                createdAt: '2026-03-01',
            },
        ],
    },
];

const activities = [
    {
        id: 'act-1',
        employeeId: 'emp-1',
        teamId: 'team-1',
        projectId: 'proj-1',
        title: 'Updated report filters',
        description: 'Added validation for start_date <= end_date.',
        completedAt: '2026-02-24T16:20:00.000Z',
    },
    {
        id: 'act-2',
        employeeId: 'emp-2',
        teamId: 'team-1',
        projectId: 'proj-1',
        title: 'Reviewed account settings',
        description: 'Prepared editable account profile fields.',
        completedAt: '2026-02-24T18:10:00.000Z',
    },
    {
        id: 'act-3',
        employeeId: 'emp-3',
        teamId: 'team-2',
        projectId: 'proj-2',
        title: 'Integrated report prompt table',
        description: 'Linked prompt templates to content type.',
        completedAt: '2026-02-25T15:00:00.000Z',
    },
    {
        id: 'act-4',
        employeeId: 'emp-4',
        teamId: 'team-2',
        projectId: 'proj-2',
        title: 'Published highlight card',
        description: 'Shared current sprint highlight in project module.',
        completedAt: '2026-02-25T17:20:00.000Z',
    },
];

const reports = [
    {
        id: 'rep-1',
        contentType: 'PROJECT',
        subjectId: 'proj-1',
        subjectLabel: 'Unitas Core Web',
        periodStart: '2026-02-01',
        periodEnd: '2026-02-21',
        createdAt: '2026-02-21T19:00:00.000Z',
        requestedBy: 'emp-1',
        fileUrl: '#',
    },
];

const accounts = [
    {
        id: 'acc-1',
        employeeId: 'emp-1',
        email: 'rodrigo@unitas.dev',
        password: '123456',
        slackUsername: '@rodrigo',
        status: 'ACTIVE',
        image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Rodrigo',
        roleId: 'role-admin',
    },
    {
        id: 'acc-2',
        employeeId: 'emp-2',
        email: 'ana@unitas.dev',
        password: '123456',
        slackUsername: '@ana',
        status: 'ACTIVE',
        image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ana',
        roleId: 'role-lead',
    },
    {
        id: 'acc-3',
        employeeId: 'emp-3',
        email: 'alexis@unitas.dev',
        password: '123456',
        slackUsername: '@alexis',
        status: 'ACTIVE',
        image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alexis',
        roleId: 'role-user',
    },
    {
        id: 'acc-4',
        employeeId: 'emp-4',
        email: 'alejandro@unitas.dev',
        password: '123456',
        slackUsername: '@alejandro',
        status: 'ACTIVE',
        image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alejandro_BlackHair',
        roleId: 'role-user',
    },
];

const sortByDateDesc = function sortByDateDesc(leftItem, rightItem, fieldName) {
    return new Date(rightItem[fieldName]).getTime() - new Date(leftItem[fieldName]).getTime();
};

const getRoleById = function getRoleById(roleId) {
    for (const role of roles) {
        if (role.id === roleId) {
            return role;
        }
    }

    return null;
};

const getEmployeeById = function getEmployeeById(employeeId) {
    for (const employee of employees) {
        if (employee.id === employeeId) {
            return employee;
        }
    }

    return null;
};

const getTeamById = function getTeamById(teamId) {
    for (const team of teams) {
        if (team.id === teamId) {
            return team;
        }
    }

    return null;
};

const getProjectById = function getProjectById(projectId) {
    for (const project of projects) {
        if (project.id === projectId) {
            return project;
        }
    }

    return null;
};

const getAccountById = function getAccountById(accountId) {
    for (const account of accounts) {
        if (account.id === accountId) {
            return account;
        }
    }

    return null;
};

const getAccountByIdentity = function getAccountByIdentity(identity) {
    const normalizedIdentity = String(identity || '').toLowerCase();

    for (const account of accounts) {
        const byEmail = account.email.toLowerCase() === normalizedIdentity;
        const bySlack = account.slackUsername.toLowerCase() === normalizedIdentity;

        if (byEmail || bySlack) {
            return account;
        }
    }

    return null;
};

/*
 * Auth shape is intentionally tiny because it is stored in session.
 */
const authenticate = function authenticate(identity, password) {
    const account = getAccountByIdentity(identity);

    if (!account || account.password !== password) {
        return null;
    }

    const employee = getEmployeeById(account.employeeId);
    const role = getRoleById(account.roleId);

    return {
        accountId: account.id,
        employeeId: employee?.id,
        name: employee?.fullName || account.email,
        roleName: role?.name || 'Employee',
    };
};

/*
 * Builds all employee relations used by profile/home pages.
 */
const buildEmployeeContext = function buildEmployeeContext(employee) {
    const teamObjects = [];
    const projectObjects = [];
    const activityLog = [];

    for (const teamId of employee.teams) {
        const team = getTeamById(teamId);

        if (team) {
            teamObjects.push(team);
        }
    }

    for (const projectId of employee.projects) {
        const project = getProjectById(projectId);

        if (project) {
            projectObjects.push(project);
        }
    }

    for (const activity of activities) {
        if (activity.employeeId === employee.id) {
            activityLog.push(activity);
        }
    }

    activityLog.sort((leftActivity, rightActivity) => {
        return sortByDateDesc(leftActivity, rightActivity, 'completedAt');
    });
    
    return {
        ...employee,
        teamObjects,
        projectObjects,
        activityLog,
    };
};

const getHomeData = function getHomeData(employeeId) {
    const employee = getEmployeeById(employeeId);

    if (!employee) {
        return null;
    }

    const personalActivities = [];
    const teamActivities = [];
    const projectPanels = [];

    for (const activity of activities) {
        if (activity.employeeId === employeeId) {
            personalActivities.push(activity);
        }

        if (employee.teams.includes(activity.teamId)) {
            // Enrich with author info for team activity feed
            const author = getEmployeeById(activity.employeeId);
            teamActivities.push({
                ...activity,
                authorName: author ? author.fullName : 'Unknown',
                authorInitials: author ? author.fullName.split(' ').map(n => n[0]).join('') : '?',
            });
        }
    }

    personalActivities.sort((leftActivity, rightActivity) => {
        return sortByDateDesc(leftActivity, rightActivity, 'completedAt');
    });

    teamActivities.sort((leftActivity, rightActivity) => {
        return sortByDateDesc(leftActivity, rightActivity, 'completedAt');
    });

    for (const projectId of employee.projects) {
        const project = getProjectById(projectId);

        if (project) {
            projectPanels.push(project);
        }
    }

    return {
        employee: buildEmployeeContext(employee),
        latestActivity: personalActivities.slice(0, 5),
        teamActivity: teamActivities.slice(0, 8),
        projectPanels,
    };
};

const getEmployees = function getEmployees() {
    const employeeList = [];

    for (const employee of employees) {
        employeeList.push(buildEmployeeContext(employee));
    }

    return employeeList;
};

const getTeams = function getTeams() {
    const teamsWithContext = [];

    for (const team of teams) {
        const membersDetailed = [];
        const projectsDetailed = [];
        const activityLog = [];

        for (const member of team.members) {
            membersDetailed.push({
                ...member,
                employee: getEmployeeById(member.employeeId),
            });
        }

        for (const projectId of team.projectIds) {
            const project = getProjectById(projectId);

            if (project) {
                projectsDetailed.push(project);
            }
        }

        for (const activity of activities) {
            if (activity.teamId === team.id) {
                const author = getEmployeeById(activity.employeeId);
                activityLog.push({
                    ...activity,
                    authorName: author ? author.fullName : 'Unknown',
                    authorInitials: author ? author.fullName.split(' ').map(n => n[0]).join('') : '?',
                });
            }
        }

        activityLog.sort((leftActivity, rightActivity) => {
            return sortByDateDesc(leftActivity, rightActivity, 'completedAt');
        });

        teamsWithContext.push({
            ...team,
            lead: getEmployeeById(team.responsibleEmployeeId),
            membersDetailed,
            projectsDetailed,
            activityLog,
        });
    }

    return teamsWithContext;
};

const getProjects = function getProjects() {
    const projectsWithContext = [];

    for (const project of projects) {
        const participants = [];
        const teamsDetailed = [];
        const activityLog = [];

        for (const participantId of project.participantIds) {
            const participant = getEmployeeById(participantId);

            if (participant) {
                participants.push(participant);
            }
        }

        for (const teamId of project.teamIds) {
            const team = getTeamById(teamId);

            if (team) {
                teamsDetailed.push(team);
            }
        }

        for (const activity of activities) {
            if (activity.projectId === project.id) {
                activityLog.push(activity);
            }
        }

        activityLog.sort((leftActivity, rightActivity) => {
            return sortByDateDesc(leftActivity, rightActivity, 'completedAt');
        });

        projectsWithContext.push({
            ...project,
            responsible: getEmployeeById(project.responsibleEmployeeId),
            participants,
            teamsDetailed,
            activityLog,
        });
    }

    return projectsWithContext;
};

const generateReport = function generateReport(reportInput) {
    const { contentType, subjectId, periodStart, periodEnd, requestedBy } = reportInput;

    const subjectMap = {
        EMPLOYEE: getEmployeeById(subjectId)?.fullName,
        TEAM: getTeamById(subjectId)?.name,
        PROJECT: getProjectById(subjectId)?.name,
    };

    const report = {
        id: `rep-${reports.length + 1}`,
        contentType,
        subjectId,
        subjectLabel: subjectMap[contentType] || 'Unknown',
        periodStart,
        periodEnd,
        createdAt: new Date().toISOString(),
        requestedBy,
        fileUrl: '#',
    };

    // Newest first for reports page.
    reports.unshift(report);

    return report;
};

const getReports = function getReports() {
    const reportList = [...reports];

    reportList.sort((leftReport, rightReport) => {
        return sortByDateDesc(leftReport, rightReport, 'createdAt');
    });

    return reportList;
};

const getAccounts = function getAccounts() {
    const accountsWithContext = [];

    for (const account of accounts) {
        accountsWithContext.push({
            ...account,
            role: getRoleById(account.roleId),
            employee: getEmployeeById(account.employeeId),
        });
    }

    return accountsWithContext;
};

const updateAccountRole = function updateAccountRole(accountId, roleId) {
    const account = getAccountById(accountId);

    if (!account) {
        return false;
    }

    account.roleId = roleId;

    return true;
};

const updateAccountStatus = function updateAccountStatus(accountId, status) {
    const account = getAccountById(accountId);

    if (!account) {
        return false;
    }

    account.status = status;

    return true;
};

const toggleRolePrivilege = function toggleRolePrivilege(roleId, privilegeCode) {
    const role = getRoleById(roleId);

    if (!role) {
        return false;
    }

    if (role.privilegeCodes.includes(privilegeCode)) {
        role.privilegeCodes = role.privilegeCodes.filter((code) => code !== privilegeCode);
    } else {
        role.privilegeCodes.push(privilegeCode);
    }

    return true;
};

const toggleTeamMembership = function toggleTeamMembership(teamId, employeeId) {
    const team = getTeamById(teamId);
    const employee = getEmployeeById(employeeId);

    if (!team || !employee) {
        return false;
    }

    const memberIndex = team.members.findIndex((member) => member.employeeId === employeeId);

    if (memberIndex >= 0) {
        team.members.splice(memberIndex, 1);
        employee.teams = employee.teams.filter((currentTeamId) => currentTeamId !== teamId);
    } else {
        team.members.push({
            employeeId,
            role: 'Employee',
            startDate: new Date().toISOString().slice(0, 10),
        });

        employee.teams.push(teamId);
    }

    return true;
};

const toggleProjectMembership = function toggleProjectMembership(projectId, employeeId) {
    const project = getProjectById(projectId);
    const employee = getEmployeeById(employeeId);

    if (!project || !employee) {
        return false;
    }

    if (project.participantIds.includes(employeeId)) {
        project.participantIds = project.participantIds.filter((id) => id !== employeeId);
        employee.projects = employee.projects.filter((id) => id !== projectId);
    } else {
        project.participantIds.push(employeeId);
        employee.projects.push(projectId);
    }

    return true;
};

const getRoles = function getRoles() {
    const rolesWithPrivileges = [];

    for (const role of roles) {
        const privileges = [];

        for (const privilegeCode of role.privilegeCodes) {
            const matchedPrivilege = privilegesCatalog.find(
                (privilege) => privilege.code === privilegeCode,
            );

            if (matchedPrivilege) {
                privileges.push(matchedPrivilege);
            }
        }

        rolesWithPrivileges.push({
            ...role,
            privileges,
        });
    }

    return rolesWithPrivileges;
};

const updateOwnAccount = function updateOwnAccount(accountId, payload) {
    const account = getAccountById(accountId);

    if (!account) {
        return false;
    }

    account.email = payload.email || account.email;
    account.slackUsername = payload.slackUsername || account.slackUsername;
    account.image = payload.image || account.image;

    // Password updates are intentionally excluded from this prototype flow.
    return true;
};

module.exports = {
    privilegesCatalog,
    getEmployees,
    getEmployeeById,
    getTeams,
    getTeamById,
    getProjects,
    getProjectById,
    getRoles,
    getReports,
    getAccounts,
    authenticate,
    getHomeData,
    generateReport,
    updateAccountRole,
    updateAccountStatus,
    toggleRolePrivilege,
    toggleTeamMembership,
    toggleProjectMembership,
    getAccountById,
    getRoleById,
    updateOwnAccount,
};
