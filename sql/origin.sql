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
CREATE DATABASE IF NOT EXISTS `unitas_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
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

-- --------------------------------------------------------
--
-- Table structure for table `accountrole`
--

CREATE TABLE `accountrole` (
  `account_id` char(36) NOT NULL,
  `role_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `due_date` date DEFAULT NULL,
  `status` enum('PLANNED','IN PROGRESS','ON HOLD','COMPLETED','CANCELLED') NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `roleprivilege`
--

CREATE TABLE `roleprivilege` (
  `role_id` char(36) NOT NULL,
  `privilege_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

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
