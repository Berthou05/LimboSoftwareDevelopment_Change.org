USE `unitas_system`;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (
  `account_id`, `employee_id`, `email`, `password_hash`,
  `slack_username`, `status`, `first_login`, `last_login`,
  `image`, `reset_token_hash`, `reset_token_expires_at`, `created_at`
) VALUES
('a1b2c3d4-0001-4000-8000-000000000001', '3200033b-e165-4c8f-a0a7-f479aa673983', 'A01713854@tec.mx', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@ahurtadoRodrigo', 'ACTIVE', 1, '2026-02-20 09:15:22', NULL, NULL, NULL, '2026-01-01 08:00:00'),
('a1b2c3d4-0002-4000-8000-000000000002', '2c44bb41-f809-45f4-a05c-11a9147e2217', 'A01713458@tec.mx', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@alexisberthou', 'ACTIVE', 1, '2026-02-18 10:05:12',NULL, NULL, NULL, '2026-01-01 08:05:00'),
('a1b2c3d4-0003-4000-8000-000000000003', '2b249c47-ddc5-4873-acdd-8c984da33e1c', 'camypowerr@gmail.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@slack_cami', 'ACTIVE', 1, '2026-02-19 11:20:44', NULL, NULL, NULL, '2026-01-01 08:10:00'),
('a1b2c3d4-0004-4000-8000-000000000004', 'd7bc8d1a-7df7-419f-a652-4e42dcab2ded', '@4lex.c0nt11@gmail.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@slack_alex', 'ACTIVE', 1, '2026-02-19 11:20:44', NULL, NULL, NULL, '2026-01-01 08:10:00');
-- --------------------------------------------------------

--
-- Dumping data for table `accountrole`
--

INSERT INTO `accountrole` (`account_id`, `role_id`) VALUES
('a1b2c3d4-0001-4000-8000-000000000001', '5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9'),
('a1b2c3d4-0002-4000-8000-000000000002', '5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9'),
('a1b2c3d4-0003-4000-8000-000000000003', 'd9b1c34c-7960-47ac-b8af-3a827f5091c8'),
('a1b2c3d4-0004-4000-8000-000000000004', 'bb021eaa-55ba-4d5e-8cca-be1fa49eeec2');

-- --------------------------------------------------------
--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `full_name`, `names`, `lastnames`) VALUES
('3200033b-e165-4c8f-a0a7-f479aa673983', 'Rodrigo Alejandro Hurtado Cortes', 'Rodrigo Alejandro', 'Hurtado Cortes'),
('2c44bb41-f809-45f4-a05c-11a9147e2217', 'Alexis Yaocalli Berthou Haas', 'Alexis Yaocalli', 'Berthou Haas'),
('2b249c47-ddc5-4873-acdd-8c984da33e1c', 'Ana Camila Cuevas Rios', 'Ana Camila', 'Cuevas Rios'),
('d7bc8d1a-7df7-419f-a652-4e42dcab2ded', 'Alejandro Contreras', 'Alejandro', 'Contreras');

-- --------------------------------------------------------
--
-- Dumping data for table `privilege`
--


INSERT INTO `privilege` (`privilege_id`, `name`, `description`) VALUES
('ADMIN-01', 'Views roles', NULL),
('ADMIN-02', 'Register roles', NULL),
('ADMIN-03', 'Delete roles', NULL),
('ADMIN-04', 'Assign privileges to roles', NULL),
('ADMIN-05', 'Assign roles to accounts', NULL),
('ADMIN-06', 'Register accounts', NULL),
('PROJ-01', 'Register Project', NULL),
('PROJ-02', 'Edit Project', NULL),
('PROJ-03', 'Delete Project', NULL),
('PROJ-05-01', 'Add Themselve to Project', NULL),
('PROJ-05-02', 'Add Others to Project', NULL),
('PROJ-06', 'Remove themselve from Project', NULL),
('PROJ-06-02', 'Remove others from Project', NULL),
('PROJ-09', 'Register Project Goal', NULL),
('PROJ-10', 'Edit Project Goal', NULL),
('PROJ-11', 'Delete Project Goal', NULL),
('PROJ-13', 'Register Project Achievement', NULL),
('PROJ-14', 'Edit Project Achievement', NULL),
('PROJ-15', 'Delete Project Achievement', NULL),
('REP-01', 'Generate reports', NULL),
('TEAM-01', 'Register Team', NULL),
('TEAM-02', 'Edit Team', NULL),
('TEAM-03', 'Delete Team', NULL),
('TEAM-06-01', 'Add Themselve to Team', NULL),
('TEAM-06-02', 'Add Others to Team', NULL),
('TEAM-07-01', 'Remove themselve from Team', NULL),
('TEAM-07-02', 'Remove others from Team', NULL);
-- --------------------------------------------------------
--
-- Dumping data for table `prompt`
--

INSERT INTO `prompt` (`prompt_id`, `name`, `description`,`schema`,`type`) VALUES
('b3cceb1b-507e-4989-8729-5e16e9bf314a', 'BeBetter', '
Analyze employee performance per project and identify impactful positive contributions.
Guidelines:
- Focus on actions with clear positive impact on project outcomes
- Prioritize meaningful contributions (avoid trivial tasks)
- Highlight efficiency, consistency, ownership, or initiative when evident
- Compare with peers when useful to emphasize strengths
- Detect cross-project collaboration and explicitly note when the employee contributed without being officially assigned
Requirements:
- Be specific and evidence-based
- Each insight must link action → impact
- Avoid vague or generic praise
- Clearly indicate collaborator role when applicable
Output:
- Strictly follow the schema
- No extra text
', 'whatWentWellEmployee', 'EMPLOYEE'),

('b9c2a462-9955-43a5-bc24-b650cc426599', 'BeBetter', '
Analyze team-level project data and identify impactful positive contributions per employee.
Guidelines:
- Focus only on the specified team
- For each employee, extract 5 meaningful contributions with clear impact on team outcomes
- Prioritize collaboration, reliability, initiative, and support to team efficiency or coordination
- Consider how contributions complemented others when relevant
Requirements:
- Be specific and evidence-based
- Each point must link action → team impact
- Avoid vague or generic praise
Output:
- Group by employee
- Exactly 5 bullet points per employee
- Strictly follow the schema
- No extra text
', 'whatWentWellTeam', 'TEAM'),

('585ce299-218f-4fcf-a47a-b6ae14db0e93','BeBetter', '
Analyze the provided project data and identify what went well within the project, focusing on each employee’s contribution.
Evaluate how each employee’s activities, goals, and achievements positively impacted the overall success, progress, or quality of the project.
Guidelines:
- For each employee, identify 5 key positive contributions
- Focus on how the employee’s work influenced project outcomes (delivery, quality, progress, efficiency)
- Highlight contributions that solved problems, accelerated progress, or improved results
- Emphasize how employees complemented each other through their roles, coordination, or sequencing of work
- Consider dependencies and how individual efforts contributed to broader project success
Requirements:
- Be specific and evidence-based
- Avoid generic praise or vague statements
- Each bullet point must include:
  (1) what the employee did
  (2) how it positively impacted the project
Output format:
- Group results by employee
- Each employee must have exactly 5 bullet points
- Focus strictly on project-level impact (not just individual or team-level benefits)
- Follow strictly the provided schema
- Do not include any extra text'
, 'whatWentWellTeam', 'PROJECT'),

('19b70127-c179-46c7-a754-6e4f7391187b', 'TeamImpact','
Analyze the team’s performance across projects and identify their most impactful contributions.
Guidelines:
- Focus on high-impact contributions affecting delivery, quality, timelines, or coordination
- Identify cross-project patterns (consistency, reliability, scalability, adaptability)
- Include both direct (deliverables) and indirect (support, unblocking) impact
- Highlight how team members’ efforts complement each other
- Compare with other teams when useful to emphasize relative impact
Requirements:
- Be specific and evidence-based
- Each insight must link team action → observable impact
- Avoid vague or generic statements
- Reflect cross-project contributions or justify project-specific focus
Output:
- Exactly 8 bullet points
- Each tied to a project or clear cross-project contribution
- Strictly follow the schema
- No extra text
','teamImpact','TEAM'),

('b2b9d1dc-0294-4cc6-a7bc-7ccc7631ef05','Improve','
Evaluate the employee’s “what went well” contributions against company values.
Guidelines:
- For each value, identify evidence of alignment based on actions and impact
- Include strong or partial alignment where applicable
- Base insights only on observed behavior (no assumptions)
- Reflect how actions demonstrate the intent of each value
Requirements:
- Use values exactly as defined
- Be specific and evidence-based (reference prior contributions)
- Each insight must link action → value → alignment explanation
- Avoid vague or generic statements
- Ensure balanced evaluation based on available evidence
Output:
- Exactly 5 bullet points (one per value)
- Each must name the value and include its short label
- Strictly follow the schema
- No extra text
','whatCanBeImproved','EMPLOYEE'),

('3a055d5f-b6c7-4f14-9645-b4922d971ff2','Improve','
Evaluate the team’s “what went well” contributions against company values to identify gaps and improvement areas.
Guidelines:
- For each value, detect partial, inconsistent, or missing alignment based on team-level patterns
- Focus on collective behavior across projects (not isolated actions)
- Identify opportunities to improve impact through better alignment
- Keep insights constructive and improvement-oriented
Requirements:
- Use values exactly as defined
- Be specific and evidence-based (reference prior contributions)
- Each insight must link gap → value → improvement direction
- Avoid vague or generic statements
- Ensure balanced evaluation based on evidence
Output:
- Exactly 5 bullet points (one per value)
- Each must name the value and include its short label
- Strictly follow the schema
- No extra text
','whatCanBeImproved','TEAM'),

('831c0fc3-dac9-4264-975c-98f880766052','Improve','
Evaluate the project’s “what went well” outcomes against company values.
Guidelines:
- For each value, identify alignment based on project outcomes, team interactions, and delivery patterns
- Focus on project-level impact across teams (not isolated actions)
- Highlight alignment driven by collaboration, coordination, and execution quality
- Base insights only on observed outcomes (no assumptions)
Requirements:
- Use values exactly as defined
- Be specific and evidence-based (reference prior outcomes)
- Each insight must link outcome → value → alignment explanation
- Avoid vague or generic statements
- Ensure balanced evaluation based on evidence
Output:
- Exactly 5 bullet points (one per value)
- Each must name the value and include its short label
- Strictly follow the schema
- No extra text
','whatCanBeImproved','PROJECT');

-- --------------------------------------------------------
--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'EMPLOYEE'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'LEAD'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN');

-- --------------------------------------------------------
--
-- Dumping data for table `roleprivilege`
--

INSERT INTO `roleprivilege` (`role_id`, `privilege_id`) VALUES
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-05-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-06'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'REP-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'TEAM-06-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'TEAM-07-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-05-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-05-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-06'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-06-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-09'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-10'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-13'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-14'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'REP-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-06-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-06-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-07-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-07-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-04'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-05'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-06'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-05-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-05-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-06'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-06-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-09'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-10'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-11'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-13'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-14'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-15'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'REP-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-06-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-06-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-07-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-07-02');
-- --------------------------------------------------------
