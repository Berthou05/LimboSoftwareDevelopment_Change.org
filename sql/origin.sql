-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2026 at 03:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


-- Database: `unitas_system`
--
USE `unitas_system`;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` char(36) NOT NULL,
  `employee_id` char(36) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `slack_username` varchar(80) NOT NULL,
  `status` enum('ACTIVE','DISABLED') NOT NULL,
  `first_login` tinyint(1) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `image` varchar(1024) DEFAULT NULL,
  `reset_token_hash` varchar(64) DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `accountrole`
--

CREATE TABLE `accountrole` (
  `account_id` char(36) NOT NULL,
  `role_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `achievement`
--

CREATE TABLE `achievement` (
  `achievement_id` char(36) NOT NULL,
  `project_id` char(36) NOT NULL,
  `employee_responsible_id` char(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `achievement_date` date NOT NULL,
  `evidence_link` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` char(36) NOT NULL,
  `project_id` char(36) DEFAULT NULL,
  `employee_id` char(36) NOT NULL,
  `entry_id` char(36) NOT NULL,
  `team_id` char(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `completed_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `collaboration`
--

CREATE TABLE `collaboration` (
  `collaboration_id` char(36) NOT NULL,
  `project_id` char(36) NOT NULL,
  `employee_id` char(36) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `started_at` datetime NOT NULL,
  `ended_at` datetime DEFAULT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `dailyentry`
--

CREATE TABLE `dailyentry` (
  `entry_id` char(36) NOT NULL,
  `employee_id` char(36) NOT NULL,
  `team_id` char(36) NOT NULL,
  `entry_date` date NOT NULL,
  `to_do` varchar(500) NOT NULL,
  `done` varchar(500) NOT NULL,
  `blockers` varchar(500) NOT NULL,
  `slack_standup_URL` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` char(36) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `names` varchar(75) NOT NULL,
  `lastnames` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `employeeteam`
--

CREATE TABLE `employeeteam` (
  `employee_id` char(36) NOT NULL,
  `team_id` char(36) NOT NULL,
  `joined_at` datetime NOT NULL,
  `left_at` datetime DEFAULT NULL,
  `role` enum('EMPLOYEE','LEAD') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `goal`
--

CREATE TABLE `goal` (
  `goal_id` char(36) NOT NULL,
  `project_id` char(36) NOT NULL,
  `employee_responsible_id` char(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `due_date` date DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `highlight`
--

CREATE TABLE `highlight` (
  `highlight_id` char(36) NOT NULL,
  `employee_id` char(36) NOT NULL,
  `project_id` char(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `privilege`
--

CREATE TABLE `privilege` (
  `privilege_id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privilege`
--

INSERT INTO `privilege` (`privilege_id`, `name`, `description`) VALUES
('ACC-01', 'View account information', NULL),
('ACC-02', 'Edit account information', NULL),
('ADMIN-01', 'Views roles', NULL),
('ADMIN-02', 'Register roles', NULL),
('ADMIN-03', 'Delete roles', NULL),
('ADMIN-04', 'Assign privileges to roles', NULL),
('ADMIN-05', 'Assign roles to accounts', NULL),
('ADMIN-06', 'Register accounts', NULL),
('AL-01', 'Submit Daily Entry through Slack', NULL),
('AL-02', 'Edit today Daily Entry', NULL),
('AL-03', 'View Activity Log entries', NULL),
('EMP-01', 'View Employee profile', NULL),
('EMP-02', 'View filtered team memberships', NULL),
('EMP-03', 'Edit Employee profile', NULL),
('EMP-04', 'Edit own profile', NULL),
('EMP-05', 'View Project participation', NULL),
('HS-01', 'Global Cross-Entity Search', NULL),
('PROJ-01', 'Register Project', NULL),
('PROJ-02', 'Edit Project', NULL),
('PROJ-03', 'Delete Project', NULL),
('PROJ-04', 'View Project information', NULL),
('PROJ-05-01', 'Add Themselve to Project', NULL),
('PROJ-05-02', 'Add Others to Project', NULL),
('PROJ-06', 'Remove themselve from Project', NULL),
('PROJ-06-02', 'Remove others from Project', NULL),
('PROJ-07', 'View Project participants', NULL),
('PROJ-08', 'View Project Goals', NULL),
('PROJ-09', 'Register Project Goal', NULL),
('PROJ-10', 'Edit Project Goal', NULL),
('PROJ-11', 'Delete Project Goal', NULL),
('PROJ-12', 'View Project Achievements', NULL),
('PROJ-13', 'Register Project Achievement', NULL),
('PROJ-14', 'Edit Project Achievement', NULL),
('PROJ-15', 'Delete Project Achievement', NULL),
('REP-01', 'Generate reports', NULL),
('TEAM-01', 'Register Team', NULL),
('TEAM-02', 'Edit Team', NULL),
('TEAM-03', 'Delete Team', NULL),
('TEAM-04', 'View Team information', NULL),
('TEAM-05', 'View active Team members', NULL),
('TEAM-06-01', 'Add Themselve to Team', NULL),
('TEAM-06-02', 'Add Others to Team', NULL),
('TEAM-07-01', 'Remove themselve from Team', NULL),
('TEAM-07-02', 'Remove others from Team', NULL),
('TEAM-08', 'View Team projects', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` char(36) NOT NULL,
  `employee_responsible_id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `status` enum('PLANNED','IN PROGRESS','ON HOLD','COMPLETED','CANCELLED','DISABLED') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projectteam`
--

CREATE TABLE `projectteam` (
  `team_id` char(36) NOT NULL,
  `project_id` char(36) NOT NULL,
  `team_role` varchar(50) NOT NULL,
  `joined_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `prompt`
--

CREATE TABLE `prompt` (
  `prompt_id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `schema` longtext NOT NULL,
  `type` enum('EMPLOYEE','TEAM','PROJECT') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` char(36) NOT NULL,
  `generated_by_employee_id` char(36) NOT NULL,
  `content_id` varchar(36) NOT NULL,
  `content_type` enum('EMPLOYEE','TEAM','PROJECT') NOT NULL,
  `period_start` date NOT NULL,
  `period_end` date NOT NULL,
  `created_at` datetime NOT NULL,
  `content_json` longtext NOT NULL,
  `filters_json` longtext NOT NULL,
  `model_name` varchar(100) NOT NULL,
  `model_version` varchar(50) NOT NULL,
  `ai_output_text` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'EMPLOYEE'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'LEAD'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `roleprivilege`
--

CREATE TABLE `roleprivilege` (
  `role_id` char(36) NOT NULL,
  `privilege_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roleprivilege`
--

INSERT INTO `roleprivilege` (`role_id`, `privilege_id`) VALUES
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'ACC-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'ACC-02'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'AL-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'AL-02'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'AL-03'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'EMP-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'EMP-02'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'EMP-04'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'EMP-05'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'HS-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-04'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-05-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-06'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-07'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-08'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'PROJ-12'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'REP-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'TEAM-04'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'TEAM-05'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'TEAM-06-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'TEAM-07-01'),
('bb021eaa-55ba-4d5e-8cca-be1fa49eeec2', 'TEAM-08'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'ACC-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'ACC-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'AL-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'AL-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'AL-03'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'EMP-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'EMP-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'EMP-03'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'EMP-04'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'EMP-05'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'HS-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-04'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-05-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-05-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-06'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-06-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-07'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-08'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-09'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-10'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-12'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-13'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'PROJ-14'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'REP-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-04'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-05'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-06-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-06-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-07-01'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-07-02'),
('d9b1c34c-7960-47ac-b8af-3a827f5091c8', 'TEAM-08'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ACC-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ACC-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-04'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-05'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'ADMIN-06'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'AL-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'AL-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'AL-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'EMP-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'EMP-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'EMP-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'EMP-04'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'EMP-05'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'HS-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-04'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-05-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-05-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-06'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-06-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-07'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-08'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-09'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-10'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-11'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-12'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-13'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-14'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'PROJ-15'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'REP-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-03'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-04'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-05'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-06-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-06-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-07-01'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-07-02'),
('5b9d8d0d-32fc-4a02-aca9-b03a9b8b14d9', 'TEAM-08');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `team_id` char(36) NOT NULL,
  `employee_responsible_id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `image` varchar(1024) DEFAULT NULL,
  `status` enum('ACTIVE','DISABLED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `accountrole`
--
ALTER TABLE `accountrole`
  ADD PRIMARY KEY (`account_id`,`role_id`),
  ADD KEY `fk_ar_role` (`role_id`),
  ADD KEY `fk_acc_id` (`account_id`) USING BTREE;

--
-- Indexes for table `achievement`
--
ALTER TABLE `achievement`
  ADD PRIMARY KEY (`achievement_id`),
  ADD KEY `fk_ach_proj` (`project_id`),
  ADD KEY `fk_ach_emp` (`employee_responsible_id`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `fk_act_proj` (`project_id`),
  ADD KEY `fk_act_emp` (`employee_id`),
  ADD KEY `fk_act_entry` (`entry_id`),
  ADD KEY `fk_act_team` (`team_id`);

--
-- Indexes for table `collaboration`
--
ALTER TABLE `collaboration`
  ADD PRIMARY KEY (`collaboration_id`),
  ADD KEY `fk_col_proj` (`project_id`),
  ADD KEY `fk_col_emp` (`employee_id`);

--
-- Indexes for table `dailyentry`
--
ALTER TABLE `dailyentry`
  ADD PRIMARY KEY (`entry_id`),
  ADD KEY `fk_de_emp` (`employee_id`),
  ADD KEY `fk_de_team` (`team_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `employeeteam`
--
ALTER TABLE `employeeteam`
  ADD PRIMARY KEY (`employee_id`,`team_id`),
  ADD KEY `fk_et_team` (`team_id`),
  ADD KEY `fk_employee_id` (`employee_id`);

--
-- Indexes for table `goal`
--
ALTER TABLE `goal`
  ADD PRIMARY KEY (`goal_id`),
  ADD KEY `fk_goal_proj` (`project_id`),
  ADD KEY `fk_goal_emp` (`employee_responsible_id`);

--
-- Indexes for table `highlight`
--
ALTER TABLE `highlight`
  ADD PRIMARY KEY (`highlight_id`),
  ADD KEY `fk_hi_emp` (`employee_id`),
  ADD KEY `fk_hi_proj` (`project_id`);

--
-- Indexes for table `privilege`
--
ALTER TABLE `privilege`
  ADD PRIMARY KEY (`privilege_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `fk_proj_emp` (`employee_responsible_id`);

--
-- Indexes for table `projectteam`
--
ALTER TABLE `projectteam`
  ADD PRIMARY KEY (`team_id`,`project_id`),
  ADD KEY `fk_pt_proj` (`project_id`),
  ADD KEY `fk_team_id` (`team_id`);

--
-- Indexes for table `prompt`
--
ALTER TABLE `prompt`
  ADD PRIMARY KEY (`prompt_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `fk_generated_employee` (`generated_by_employee_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `roleprivilege`
--
ALTER TABLE `roleprivilege`
  ADD PRIMARY KEY (`role_id`,`privilege_id`),
  ADD KEY `fk_rp_priv` (`privilege_id`),
  ADD KEY `fk_role_id` (`role_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `fk_team_emp` (`employee_responsible_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `fk_acc_emp` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `accountrole`
--
ALTER TABLE `accountrole`
  ADD CONSTRAINT `fk_ar_acc` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `fk_ar_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

--
-- Constraints for table `achievement`
--
ALTER TABLE `achievement`
  ADD CONSTRAINT `fk_ach_emp` FOREIGN KEY (`employee_responsible_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_ach_proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `fk_act_emp` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_act_entry` FOREIGN KEY (`entry_id`) REFERENCES `dailyentry` (`entry_id`),
  ADD CONSTRAINT `fk_act_proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `fk_act_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`);
--
-- Constraints for table `collaboration`
--
ALTER TABLE `collaboration`
  ADD CONSTRAINT `fk_col_emp` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_col_proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Constraints for table `dailyentry`
--
ALTER TABLE `dailyentry`
  ADD CONSTRAINT `fk_de_emp` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_de_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`);

--
-- Constraints for table `employeeteam`
--
ALTER TABLE `employeeteam`
  ADD CONSTRAINT `fk_et_emp` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_et_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`);

--
-- Constraints for table `goal`
--
ALTER TABLE `goal`
  ADD CONSTRAINT `fk_goal_emp` FOREIGN KEY (`employee_responsible_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_goal_proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Constraints for table `highlight`
--
ALTER TABLE `highlight`
  ADD CONSTRAINT `fk_hi_emp` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_hi_proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `fk_proj_emp` FOREIGN KEY (`employee_responsible_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `projectteam`
--
ALTER TABLE `projectteam`
  ADD CONSTRAINT `fk_pt_proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `fk_pt_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `fk_rep_employee` FOREIGN KEY (`generated_by_employee_id`) REFERENCES `employee` (`employee_id`);
--
-- Constraints for table `roleprivilege`
--
ALTER TABLE `roleprivilege`
  ADD CONSTRAINT `fk_rp_priv` FOREIGN KEY (`privilege_id`) REFERENCES `privilege` (`privilege_id`),
  ADD CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `fk_team_emp` FOREIGN KEY (`employee_responsible_id`) REFERENCES `employee` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
