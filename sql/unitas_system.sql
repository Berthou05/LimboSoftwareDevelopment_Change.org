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


--
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

--
-- Dumping data for table `account`
--

INSERT INTO `account` (
  `account_id`, `employee_id`, `email`, `password_hash`,
  `slack_username`, `status`, `first_login`, `last_login`,
  `image`, `reset_token_hash`, `reset_token_expires_at`, `created_at`
) VALUES
('a1b2c3d4-0001-4000-8000-000000000001', 'emp-001', 'emp001@unitas.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@axolotl.lead', 'ACTIVE', 1, '2026-02-20 09:15:22', 'https://cdn.unitas-platform.com/profiles/emp-001.png', NULL, NULL, '2026-01-01 08:00:00'),
('a1b2c3d4-0002-4000-8000-000000000002', 'emp-002', 'emp002@unitas.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@vaquita.dev', 'ACTIVE', 1, '2026-02-18 10:05:12', 'https://cdn.unitas-platform.com/profiles/emp-002.png', NULL, NULL, '2026-01-01 08:05:00'),
('a1b2c3d4-0003-4000-8000-000000000003', 'emp-003', 'emp003@unitas.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@jaguar.dev', 'ACTIVE', 1, '2026-02-19 11:20:44', 'https://cdn.unitas-platform.com/profiles/emp-003.png', NULL, NULL, '2026-01-01 08:10:00'),
('a1b2c3d4-0004-4000-8000-000000000004', 'emp-004', 'emp004@unitas.com', '$2b$12$L8sdfg8sdfg8sdfg8sdFWEweYxZp4', '@colibri.design', 'ACTIVE', 1, '2026-02-17 08:44:11', 'https://cdn.unitas-platform.com/profiles/emp-004.png', NULL, NULL, '2026-01-01 08:15:00'),
('a1b2c3d4-0005-4000-8000-000000000005', 'emp-005', 'emp005@unitas.com', '$2b$12$Z7sdfg8sdfg8sdfg8sdQAZweYxZp5', '@tortuga.backend', 'ACTIVE', 0, NULL, 'https://cdn.unitas-platform.com/profiles/emp-005.png', NULL, NULL, '2026-01-01 08:20:00'),
('a1b2c3d4-0006-4000-8000-000000000006', 'emp-006', 'emp006@unitas.com', '$2b$12$X9sdfg8sdfg8sdfg8sdRTYweYxZp6', '@aguila.growth', 'ACTIVE', 1, '2026-02-20 13:55:09', 'https://cdn.unitas-platform.com/profiles/emp-006.png', NULL, NULL, '2026-01-01 08:25:00'),
('a1b2c3d4-0007-4000-8000-000000000007', 'emp-007', 'emp007@unitas.com', '$2b$12$V1sdfg8sdfg8sdfg8sdUIOweYxZp7', '@lobo.devops', 'ACTIVE', 1, '2026-02-16 07:55:10', 'https://cdn.unitas-platform.com/profiles/emp-007.png', NULL, NULL, '2026-01-01 08:30:00'),
('a1b2c3d4-0008-4000-8000-000000000008', 'emp-008', 'emp008@unitas.com', '$2b$12$B2sdfg8sdfg8sdfg8sdPASweYxZp8', '@pantera.sec', 'ACTIVE', 1, '2026-02-22 09:02:33', 'https://cdn.unitas-platform.com/profiles/emp-008.png', NULL, NULL, '2026-01-01 08:35:00'),
('a1b2c3d4-0009-4000-8000-000000000009', 'emp-009', 'emp009@unitas.com', '$2b$12$N3sdfg8sdfg8sdfg8sdLKJweYxZp9', '@delfin.mobile', 'ACTIVE', 1, '2026-02-21 14:12:01', 'https://cdn.unitas-platform.com/profiles/emp-009.png', NULL, NULL, '2026-01-01 08:40:00'),
('a1b2c3d4-0010-4000-8000-000000000010', 'emp-010', 'emp010@unitas.com', '$2b$12$M4sdfg8sdfg8sdfg8sdPOIweYxZp0', '@buho.analytics', 'ACTIVE', 1, '2026-02-19 16:33:45', 'https://cdn.unitas-platform.com/profiles/emp-010.png', NULL, NULL, '2026-01-01 08:45:00'),
('a1b2c3d4-0011-4000-8000-000000000011', 'emp-011', 'emp011@unitas.com', '$2b$12$Q5sdfg8sdfg8sdfg8sdZXCweYxZp1', '@ocelote.crm', 'ACTIVE', 1, '2026-02-18 12:22:22', 'https://cdn.unitas-platform.com/profiles/emp-011.png', NULL, NULL, '2026-01-01 08:50:00'),
('a1b2c3d4-0012-4000-8000-000000000012', 'emp-012', 'emp012@unitas.com', '$2b$12$R6sdfg8sdfg8sdfg8sdVBNweYxZp2', '@halcon.payments', 'ACTIVE', 1, '2026-02-24 11:11:11', 'https://cdn.unitas-platform.com/profiles/emp-012.png', NULL, NULL, '2026-01-01 08:55:00'),
('a1b2c3d4-0013-4000-8000-000000000013', 'emp-013', 'emp013@unitas.com', '$2b$12$T7sdfg8sdfg8sdfg8sdGHJweYxZp3', '@coyote.internal', 'ACTIVE', 1, '2026-02-23 10:09:09', 'https://cdn.unitas-platform.com/profiles/emp-013.png', NULL, NULL, '2026-01-01 09:00:00'),
('a1b2c3d4-0014-4000-8000-000000000014', 'emp-014', 'emp014@unitas.com', '$2b$12$Y8sdfg8sdfg8sdfg8sdWERweYxZp4', '@mariposa.community', 'ACTIVE', 1, '2026-02-20 17:17:17', 'https://cdn.unitas-platform.com/profiles/emp-014.png', NULL, NULL, '2026-01-01 09:05:00'),
('a1b2c3d4-0015-4000-8000-000000000015', 'emp-015', 'emp015@unitas.com', '$2b$12$U9sdfg8sdfg8sdfg8sdTYUweYxZp5', '@tiburon.growth', 'ACTIVE', 1, '2026-02-27 15:30:30', 'https://cdn.unitas-platform.com/profiles/emp-015.png', NULL, NULL, '2026-01-01 09:10:00'),
('a1b2c3d4-0016-4000-8000-000000000016', 'emp-016', 'emp016@unitas.com', '$2b$12$I0sdfg8sdfg8sdfg8sdQWEweYxZp6', '@armadillo.validation', 'ACTIVE', 1, '2026-03-01 09:45:00', 'https://cdn.unitas-platform.com/profiles/emp-016.png', NULL, NULL, '2026-01-01 09:15:00'),
('a1b2c3d4-0017-4000-8000-000000000017', 'emp-017', 'emp017@unitas.com', '$2b$12$O1sdfg8sdfg8sdfg8sdASDweYxZp7', '@mapache.ai', 'ACTIVE', 1, '2026-03-02 13:13:13', 'https://cdn.unitas-platform.com/profiles/emp-017.png', NULL, NULL, '2026-01-01 09:20:00'),
('a1b2c3d4-0018-4000-8000-000000000018', 'emp-018', 'emp018@unitas.com', '$2b$12$P2sdfg8sdfg8sdfg8sdFGHweYxZp8', '@venado.recruit', 'ACTIVE', 0, NULL, 'https://cdn.unitas-platform.com/profiles/emp-018.png', NULL, NULL, '2026-01-01 09:25:00'),
('a1b2c3d4-0019-4000-8000-000000000019', 'emp-019', 'emp019@unitas.com', '$2b$12$A3sdfg8sdfg8sdfg8sdJKLweYxZp9', '@camaleon.content', 'DISABLED', 1, '2026-02-22 08:08:08', 'https://cdn.unitas-platform.com/profiles/emp-019.png', NULL, NULL, '2026-01-01 09:30:00'),
('a1b2c3d4-0020-4000-8000-000000000020', 'emp-020', 'emp020@unitas.com', '$2b$12$S4sdfg8sdfg8sdfg8sdZXCweYxZp0', '@hormiga.support', 'ACTIVE', 1, '2026-02-28 18:18:18', 'https://cdn.unitas-platform.com/profiles/emp-020.png', NULL, NULL, '2026-01-01 09:35:00');
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
('a1b2c3d4-0001-4000-8000-000000000001', 'role-003'),
('a1b2c3d4-0002-4000-8000-000000000002', 'role-002'),
('a1b2c3d4-0003-4000-8000-000000000003', 'role-001'),
('a1b2c3d4-0004-4000-8000-000000000004', 'role-001'),
('a1b2c3d4-0005-4000-8000-000000000005', 'role-001'),
('a1b2c3d4-0006-4000-8000-000000000006', 'role-002'),
('a1b2c3d4-0007-4000-8000-000000000007', 'role-001'),
('a1b2c3d4-0008-4000-8000-000000000008', 'role-001'),
('a1b2c3d4-0009-4000-8000-000000000009', 'role-001'),
('a1b2c3d4-0010-4000-8000-000000000010', 'role-002'),
('a1b2c3d4-0011-4000-8000-000000000011', 'role-001'),
('a1b2c3d4-0012-4000-8000-000000000012', 'role-001'),
('a1b2c3d4-0013-4000-8000-000000000013', 'role-001'),
('a1b2c3d4-0014-4000-8000-000000000014', 'role-001'),
('a1b2c3d4-0015-4000-8000-000000000015', 'role-002'),
('a1b2c3d4-0016-4000-8000-000000000016', 'role-001'),
('a1b2c3d4-0017-4000-8000-000000000017', 'role-001'),
('a1b2c3d4-0018-4000-8000-000000000018', 'role-001'),
('a1b2c3d4-0019-4000-8000-000000000019', 'role-001'),
('a1b2c3d4-0020-4000-8000-000000000020', 'role-001');

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

--
-- Dumping data for table `achievement`
--

INSERT INTO `achievement` (`achievement_id`, `project_id`, `employee_responsible_id`, `title`, `description`, `achievement_date`, `evidence_link`) VALUES
('ach-001', 'proj-001', 'emp-001', 'Share Performance Optimization Delivered', 'Completed optimization of share modal reducing load time and improving starter share flow.', '2026-02-15', 'http://intranet.company.com/evidence/share-optimization'),
('ach-002', 'proj-004', 'emp-002', 'Notification System Refactor Completed', 'Delivered refactored notification batching logic reducing duplicate sends.', '2026-02-18', 'http://intranet.company.com/evidence/notification-refactor'),
('ach-003', 'proj-001', 'emp-003', 'Shared Component Refactor', 'Successfully refactored legacy share component improving tracking consistency.', '2026-02-12', 'http://intranet.company.com/evidence/component-refactor'),
('ach-004', 'proj-003', 'emp-004', 'Petition Validation Engine Upgrade', 'Implemented improved petition scoring system increasing validation precision.', '2026-02-20', 'http://intranet.company.com/evidence/validation-upgrade'),
('ach-005', 'proj-005', 'emp-005', 'Analytics Tracking Cleanup', 'Removed deprecated tracking events and aligned analytics taxonomy.', '2026-02-16', 'http://intranet.company.com/evidence/tracking-cleanup'),
('ach-006', 'proj-006', 'emp-006', 'Mobile Share Optimization Milestone', 'Improved performance across mobile devices and reduced render overhead.', '2026-02-22', 'http://intranet.company.com/evidence/mobile-optimization'),
('ach-007', 'proj-007', 'emp-007', 'CI Stability Improvement', 'Reduced CI pipeline instability by improving caching and test reliability.', '2026-02-19', 'http://intranet.company.com/evidence/ci-stability'),
('ach-008', 'proj-008', 'emp-008', 'Security Hardening Phase Completed', 'Closed high-risk vulnerabilities and strengthened CSP configuration.', '2026-02-25', 'http://intranet.company.com/evidence/security-audit'),
('ach-009', 'proj-009', 'emp-009', 'Dashboard Query Optimization Delivered', 'Optimized heavy queries reducing dashboard load time significantly.', '2026-02-17', 'http://intranet.company.com/evidence/dashboard-optimization'),
('ach-010', 'proj-010', 'emp-010', 'Design System Migration Phase 1', 'Migrated core UI components to new token-based design system.', '2026-02-23', 'http://intranet.company.com/evidence/design-migration'),
('ach-011', 'proj-011', 'emp-011', 'CRM Sync Reliability Improvement', 'Implemented retry backoff strategy reducing duplicated CRM records.', '2026-02-21', 'http://intranet.company.com/evidence/crm-sync'),
('ach-012', 'proj-012', 'emp-012', 'Checkout Flow Enhancement', 'Improved checkout validation and reduced payment errors.', '2026-02-24', 'http://intranet.company.com/evidence/checkout-enhancement'),
('ach-013', 'proj-013', 'emp-013', 'Admin Panel Improvements Released', 'Released enhanced filters and role-based access control in admin tools.', '2026-02-26', 'http://intranet.company.com/evidence/admin-panel'),
('ach-014', 'proj-014', 'emp-014', 'Feed Algorithm Optimization', 'Improved ranking weights increasing user engagement metrics.', '2026-02-28', 'http://intranet.company.com/evidence/feed-algorithm'),
('ach-015', 'proj-015', 'emp-015', 'Growth Experiment Success', 'Delivered high-performing A/B test improving recruit share flow.', '2026-02-27', 'http://intranet.company.com/evidence/growth-experiment'),
('ach-016', 'proj-016', 'emp-016', 'Validation Precision Milestone', 'Improved petition validation accuracy through heuristic refinements.', '2026-03-01', 'http://intranet.company.com/evidence/validation-precision'),
('ach-017', 'proj-017', 'emp-017', 'AI Classification Improvement', 'Improved AI classification accuracy for activity mapping.', '2026-03-02', 'http://intranet.company.com/evidence/ai-classification'),
('ach-018', 'proj-018', 'emp-018', 'Recruit Funnel Analytics Upgrade', 'Enhanced funnel visibility through improved tracking segmentation.', '2026-02-20', 'http://intranet.company.com/evidence/funnel-analytics'),
('ach-019', 'proj-019', 'emp-019', 'Content Optimization Deployment', 'Optimized petition content templates increasing completion rate.', '2026-02-22', 'http://intranet.company.com/evidence/content-optimization'),
('ach-020', 'proj-000', 'emp-020', 'Operational Automation Improvement', 'Delivered automation scripts reducing manual operational workload.', '2026-02-28', 'http://intranet.company.com/evidence/operational-automation');

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

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activity_id`, `project_id`, `employee_id`, `entry_id`,`team_id`, `title`, `description`, `completed_at`) VALUES
('act-001', 'proj-001', 'emp-003', 'de-001','team-003', 'Share Component Refactor', 'Refactored share button logic and tracking fixes', '2024-01-12'),
('act-002', 'proj-001', 'emp-003', 'de-002','team-003', 'Endorsement Form Update', 'Updated endorsement form and validation schema', '2024-02-03'),
('act-003', 'proj-003', 'emp-004', 'de-003','team-004', 'Petition Quality Pipeline', 'Improved validation and scoring logic', '2024-03-18'),
('act-004', 'proj-000', 'emp-005', 'de-004','team-005', 'General Refactor Work', 'Miscellaneous improvements and cleanup', '2024-04-07'),
('act-005', 'proj-002', 'emp-006', 'de-005','team-006', 'Recruit Share Experiment', 'Implemented A/B test adjustments', '2024-05-22'),
('act-006', 'proj-001', 'emp-001', 'de-006','team-001', 'Share Modal Optimization', 'Performance improvements in share modal', '2024-06-30'),
('act-007', 'proj-002', 'emp-002', 'de-007','team-002', 'Supporter Dashboard Improvements', 'Optimized dashboard and notifications', '2024-08-14'),
('act-008', 'proj-000', 'emp-007', 'de-008','team-007', 'Pipeline Cleanup', 'CI and feature flag cleanup', '2024-09-05'),
('act-009', 'proj-004', 'emp-002', 'de-009','team-002', 'Notification Optimization', 'Improved supporter notification batching', '2024-10-19'),
('act-010', 'proj-005', 'emp-005', 'de-010','team-005', 'Tracking Audit', 'Cleaned legacy analytics events', '2024-11-11'),
('act-011', 'proj-006', 'emp-006', 'de-011','team-006', 'Mobile Share Improvements', 'Optimized mobile share performance', '2025-01-08'),
('act-012', 'proj-007', 'emp-007', 'de-012','team-007', 'CI Pipeline Stabilization', 'Improved CI reliability', '2025-02-21'),
('act-013', 'proj-008', 'emp-008', 'de-013','team-008', 'Security Hardening', 'Patched dependencies and improved CSP', '2025-03-17'),
('act-014', 'proj-009', 'emp-009', 'de-014','team-009', 'Dashboard Query Optimization', 'Reduced dashboard load time', '2025-04-09'),
('act-015', 'proj-010', 'emp-010', 'de-015','team-010', 'Design System Migration', 'Migrated to new design tokens', '2025-05-26'),
('act-016', 'proj-011', 'emp-011', 'de-016','team-011', 'CRM Sync Refactor', 'Improved CRM sync reliability', '2025-07-02'),
('act-017', 'proj-012', 'emp-012', 'de-017','team-012', 'Checkout Optimization', 'Improved checkout conversion', '2025-08-15'),
('act-018', 'proj-013', 'emp-013', 'de-018','team-013', 'Admin Panel Improvements', 'Enhanced internal admin tools', '2025-09-28'),
('act-019', 'proj-014', 'emp-014', 'de-019','team-014', 'Feed Ranking Tuning', 'Improved community ranking algorithm', '2025-11-06'),
('act-020', 'proj-000', 'emp-015', 'de-020','team-015', 'General Cleanup Work', 'Non project specific improvements', '2026-03-20'),
-- 2024
('act-021', 'proj-001', 'emp-001', 'de-021','team-001', 'Project Initialization', 'Initial repository setup and tooling configuration', '2024-01-15'),
('act-022', 'proj-007', 'emp-001', 'de-021','team-001', 'CI Pipeline Setup', 'Configured CI pipeline with linting and build steps', '2024-01-15'),
('act-023', 'proj-002', 'emp-002', 'de-022','team-002', 'Login API Implementation', 'Developed authentication endpoint with JWT', '2024-03-10'),
('act-024', 'proj-002', 'emp-002', 'de-022','team-002', 'Authentication Testing', 'Implemented unit tests for login flow', '2024-03-10'),
('act-025', 'proj-003', 'emp-004', 'de-023','team-004', 'Validation Engine Refactor', 'Improved validation logic and modularized rules', '2024-06-05'),
('act-026', 'proj-009', 'emp-004', 'de-023','team-004', 'Query Optimization', 'Optimized heavy queries for validation engine', '2024-06-05'),
('act-027', 'proj-006', 'emp-006', 'de-024','team-006', 'Mobile Layout Fixes', 'Resolved layout issues across mobile devices', '2024-09-12'),
('act-028', 'proj-006', 'emp-006', 'de-024','team-006', 'Rendering Optimization', 'Improved rendering performance on low-end devices', '2024-09-12'),
-- 2025
('act-029', 'proj-008', 'emp-008', 'de-025','team-008', 'Security Patch Deployment', 'Patched critical vulnerabilities in dependencies', '2025-01-20'),
('act-030', 'proj-008', 'emp-008', 'de-025','team-008', 'CSP Hardening', 'Improved content security policy rules', '2025-01-20'),
('act-031', 'proj-010', 'emp-010', 'de-026','team-010', 'Design System Migration', 'Migrated components to new design system', '2025-04-18'),
('act-032', 'proj-010', 'emp-010', 'de-026','team-010', 'UI Token Refactor', 'Updated styling tokens across UI components', '2025-04-18'),
('act-033', 'proj-012', 'emp-012', 'de-027','team-012', 'Checkout Optimization', 'Improved checkout flow performance', '2025-07-30'),
('act-034', 'proj-012', 'emp-012', 'de-027','team-012', 'Validation Improvements', 'Enhanced validation logic for payments', '2025-07-30'),
('act-035', 'proj-014', 'emp-014', 'de-028','team-014', 'Feed Algorithm Tuning', 'Adjusted ranking weights to improve engagement', '2025-10-11'),
('act-036', 'proj-014', 'emp-014', 'de-028','team-014', 'Engagement Experiment', 'Deployed experiment for feed ranking', '2025-10-11'),
-- 2026
('act-037', 'proj-017', 'emp-017', 'de-029','team-017', 'Model Training', 'Trained improved AI classification model', '2026-01-05'),
('act-038', 'proj-017', 'emp-017', 'de-029','team-017', 'Dataset Cleanup', 'Cleaned dataset for improved accuracy', '2026-01-05'),
('act-039', 'proj-019', 'emp-019', 'de-030','team-012', 'Content Template Update', 'Improved petition content templates', '2026-03-15'),
('act-040', 'proj-019', 'emp-019', 'de-030','team-012', 'UX Improvements', 'Enhanced readability and flow of templates', '2026-03-15'),
-- de-031 (emp-003 | 2024-02-12)
('act-041', 'proj-001', 'emp-003', 'de-031','team-003', 'Share Module Refactor', 'Refactored internal structure of share module for maintainability', '2024-02-12'),
('act-042', 'proj-005', 'emp-003', 'de-031','team-003', 'Tracking Bug Fix', 'Resolved duplicate event firing in share tracking', '2024-02-12'),
('act-043', 'proj-005', 'emp-003', 'de-031','team-003', 'Analytics Event Standardization', 'Standardized naming conventions for analytics events', '2024-02-12'),
('act-044', 'proj-001', 'emp-003', 'de-031','team-003', 'Unit Test Implementation', 'Added unit tests for share logic and tracking flows', '2024-02-12'),
('act-045', 'proj-007', 'emp-003', 'de-031','team-003', 'Pull Request Reviews', 'Reviewed and provided feedback on multiple team PRs', '2024-02-12'),
-- de-032 (emp-005 | 2024-05-20)
('act-046', 'proj-005', 'emp-005', 'de-032','team-005', 'Legacy Utils Cleanup', 'Removed unused helper functions from utils module', '2024-05-20'),
('act-047', 'proj-005', 'emp-005', 'de-032','team-005', 'Null Pointer Bug Fix', 'Fixed null pointer exception in utility service', '2024-05-20'),
('act-048', 'proj-009', 'emp-005', 'de-032','team-005', 'Logging Improvement', 'Improved logging format for better debugging visibility', '2024-05-20'),
('act-049', 'proj-005', 'emp-005', 'de-032','team-005', 'Deprecated Services Removal', 'Removed outdated and unused backend services', '2024-05-20'),
('act-050', 'proj-003', 'emp-005', 'de-032','team-005', 'API Debugging Support', 'Assisted team in debugging API integration issue', '2024-05-20'),
-- de-033 (emp-007 | 2024-08-18)
('act-051', 'proj-007', 'emp-007', 'de-033','team-007', 'Flaky Test Fix', 'Resolved instability in integration test suite', '2024-08-18'),
('act-052', 'proj-007', 'emp-007', 'de-033','team-007', 'CI Cache Optimization', 'Improved caching strategy reducing pipeline runtime', '2024-08-18'),
('act-053', 'proj-007', 'emp-007', 'de-033','team-007', 'Pipeline Logging Enhancement', 'Added detailed logs for CI pipeline steps', '2024-08-18'),
('act-054', 'proj-007', 'emp-007', 'de-033','team-007', 'Pipeline Performance Improvement', 'Reduced CI pipeline execution time by optimizing steps', '2024-08-18'),
('act-055', 'proj-007', 'emp-007', 'de-033','team-007', 'Nightly Job Investigation', 'Investigated intermittent failures in nightly jobs', '2024-08-18'),
-- de-034 (emp-009 | 2025-02-11)
('act-056', 'proj-009', 'emp-009', 'de-034','team-005', 'Database Indexing', 'Added indexes to optimize heavy database queries', '2025-02-11'),
('act-057', 'proj-009', 'emp-009', 'de-034','team-005', 'Query Optimization', 'Improved SQL joins and reduced query execution time', '2025-02-11'),
('act-058', 'proj-009', 'emp-009', 'de-034','team-005', 'Performance Testing', 'Tested database performance under simulated load', '2025-02-11'),
('act-059', 'proj-009', 'emp-009', 'de-034','team-005', 'Dashboard Query Update', 'Updated dashboard queries to use optimized structures', '2025-02-11'),
('act-060', 'proj-018', 'emp-009', 'de-034','team-005', 'Analytics Dashboard Validation', 'Validated dashboard metrics after query improvements', '2025-02-11'),
-- de-041 (emp-001 | 2026-03-21)
('act-061', 'proj-001', 'emp-001', 'de-041','team-014', 'Share Modal Refactor', 'Refactored modal rendering logic', '2026-03-21'),
('act-062', 'proj-001', 'emp-001', 'de-041','team-014', 'Bundle Size Reduction', 'Reduced bundle size for performance', '2026-03-21'),
('act-063', 'proj-005', 'emp-001', 'de-041','team-014', 'Tracking Delay Fix', 'Fixed delayed analytics tracking events', '2026-03-21'),
('act-064', 'proj-001', 'emp-001', 'de-041','team-014', 'Unit Test Coverage', 'Added unit tests for modal logic', '2026-03-21'),
('act-065', 'proj-007', 'emp-001', 'de-041','team-014', 'Code Reviews', 'Reviewed multiple pull requests', '2026-03-21'),
-- de-042 (emp-001 | 2026-03-24)
('act-066', 'proj-002', 'emp-001', 'de-042','team-001', 'API Optimization', 'Reduced redundant API calls', '2026-03-24'),
('act-067', 'proj-002', 'emp-001', 'de-042','team-001', 'Caching Implementation', 'Implemented caching layer', '2026-03-24'),
('act-068', 'proj-002', 'emp-001', 'de-042','team-001', 'Edge Case Fixes', 'Resolved edge case issues in share flow', '2026-03-24'),
('act-069', 'proj-009', 'emp-001', 'de-042','team-001', 'Logging Improvements', 'Added detailed logging', '2026-03-24'),
('act-070', 'proj-002', 'emp-001', 'de-042','team-001', 'Flow Testing', 'Tested flows in staging environment', '2026-03-24'),
-- de-043 (emp-002 | 2026-03-22)
('act-071', 'proj-002', 'emp-002', 'de-043','team-001', 'Dashboard UI Update', 'Improved dashboard layout and UX', '2026-03-22'),
('act-072', 'proj-004', 'emp-002', 'de-043','team-001', 'Notification Bug Fix', 'Fixed duplicate notification issue', '2026-03-22'),
('act-073', 'proj-002', 'emp-002', 'de-043','team-001', 'Loader Implementation', 'Added skeleton loaders for UI', '2026-03-22'),
('act-074', 'proj-002', 'emp-002', 'de-043','team-001', 'Component Refactor', 'Refactored dashboard components', '2026-03-22'),
('act-075', 'proj-007', 'emp-002', 'de-043','team-001', 'PR Reviews', 'Reviewed team pull requests', '2026-03-22'),
-- de-044 (emp-002 | 2026-03-26)
('act-076', 'proj-004', 'emp-002', 'de-044','team-002', 'Notification Optimization', 'Improved batching performance', '2026-03-26'),
('act-077', 'proj-004', 'emp-002', 'de-044','team-002', 'Monitoring Integration', 'Added monitoring logs', '2026-03-26'),
('act-078', 'proj-004', 'emp-002', 'de-044','team-002', 'Retry Logic Fix', 'Fixed retry handling bug', '2026-03-26'),
('act-079', 'proj-004', 'emp-002', 'de-044','team-002', 'Edge Case Testing', 'Tested delayed notification scenarios', '2026-03-26'),
('act-080', 'proj-004', 'emp-002', 'de-044','team-002', 'Config Updates', 'Updated notification configs', '2026-03-26'),
-- de-045 (emp-003 | 2026-03-23)
('act-081', 'proj-001', 'emp-003', 'de-045','team-003', 'Endorsement Flow Refactor', 'Refactored endorsement flow logic', '2026-03-23'),
('act-082', 'proj-003', 'emp-003', 'de-045','team-003', 'Validation Improvement', 'Enhanced validation schema', '2026-03-23'),
('act-083', 'proj-001', 'emp-003', 'de-045','team-003', 'UI Fixes', 'Resolved UI alignment issues', '2026-03-23'),
('act-084', 'proj-001', 'emp-003', 'de-045','team-003', 'Test Coverage', 'Added unit tests for endorsement flow', '2026-03-23'),
('act-085', 'proj-010', 'emp-003', 'de-045','team-003', 'Design Sync', 'Aligned implementation with design team', '2026-03-23'),
-- de-046 (emp-003 | 2026-03-27)
('act-086', 'proj-005', 'emp-003', 'de-046','team-016', 'Analytics Event Fixes', 'Resolved missing analytics events', '2026-03-27'),
('act-087', 'proj-005', 'emp-003', 'de-046','team-016', 'Tracking Accuracy Improvement', 'Improved tracking consistency', '2026-03-27'),
('act-088', 'proj-001', 'emp-003', 'de-046','team-016', 'Performance Optimization', 'Optimized frontend performance', '2026-03-27'),
('act-089', 'proj-009', 'emp-003', 'de-046','team-016', 'Logging Enhancements', 'Added structured logging', '2026-03-27'),
('act-090', 'proj-007', 'emp-003', 'de-046','team-016', 'Code Review', 'Reviewed PRs and suggested improvements', '2026-03-27'),
-- de-047
('act-091', 'proj-001', 'emp-001', 'de-047','team-014', 'UX Improvement', 'Improved share UX transitions', '2026-03-22'),
('act-092', 'proj-001', 'emp-001', 'de-047','team-014', 'Edge Case Fixes', 'Resolved UX edge cases', '2026-03-22'),
('act-093', 'proj-009', 'emp-001', 'de-047','team-014', 'Logging Implementation', 'Added structured logs', '2026-03-22'),
('act-094', 'proj-006', 'emp-001', 'de-047','team-014', 'Mobile Testing', 'Tested mobile responsiveness', '2026-03-22'),
('act-095', 'proj-007', 'emp-001', 'de-047','team-014', 'PR Reviews', 'Reviewed pull requests', '2026-03-22'),
-- de-048
('act-096', 'proj-002', 'emp-002', 'de-048','team-002', 'Dashboard Refactor', 'Refactored dashboard structure', '2026-03-23'),
('act-097', 'proj-009', 'emp-002', 'de-048','team-002', 'Query Optimization', 'Optimized backend queries', '2026-03-23'),
('act-098', 'proj-002', 'emp-002', 'de-048','team-002', 'Loader Implementation', 'Added loading states', '2026-03-23'),
('act-099', 'proj-002', 'emp-002', 'de-048','team-002', 'UI Bug Fixes', 'Resolved UI inconsistencies', '2026-03-23'),
('act-100', 'proj-007', 'emp-002', 'de-048','team-002', 'Team Sync', 'Aligned with team on changes', '2026-03-23'),
-- de-049
('act-101', 'proj-003', 'emp-003', 'de-049','team-003', 'Validation Improvements', 'Enhanced validation logic', '2026-03-24'),
('act-102', 'proj-003', 'emp-003', 'de-049','team-003', 'Bug Fixes', 'Resolved validation bugs', '2026-03-24'),
('act-103', 'proj-001', 'emp-003', 'de-049','team-003', 'Test Coverage', 'Added unit tests', '2026-03-24'),
('act-104', 'proj-001', 'emp-003', 'de-049','team-003', 'Flow Optimization', 'Optimized frontend flow', '2026-03-24'),
('act-105', 'proj-000', 'emp-003', 'de-049','team-003', 'Code Cleanup', 'Cleaned legacy code', '2026-03-24'),
-- de-050
('act-106', 'proj-001', 'emp-001', 'de-050','team-001', 'Rendering Optimization', 'Reduced unnecessary re-renders', '2026-03-25'),
('act-107', 'proj-002', 'emp-001', 'de-050','team-001', 'Caching Improvement', 'Improved caching layer', '2026-03-25'),
('act-108', 'proj-009', 'emp-001', 'de-050','team-001', 'Logging Update', 'Enhanced logging system', '2026-03-25'),
('act-109', 'proj-002', 'emp-001', 'de-050','team-001', 'Flow Testing', 'Validated application flows', '2026-03-25'),
('act-110', 'proj-001', 'emp-001', 'de-050','team-001', 'Bug Fix', 'Fixed rendering bug', '2026-03-25'),
-- de-051
('act-111', 'proj-004', 'emp-002', 'de-051','team-002', 'Notification Fix', 'Resolved duplication issue', '2026-03-21'),
('act-112', 'proj-004', 'emp-002', 'de-051','team-002', 'Monitoring Logs', 'Added monitoring system', '2026-03-21'),
('act-113', 'proj-004', 'emp-002', 'de-051','team-002', 'Retry Testing', 'Tested retry scenarios', '2026-03-21'),
('act-114', 'proj-004', 'emp-002', 'de-051','team-002', 'Config Updates', 'Updated system configs', '2026-03-21'),
('act-115', 'proj-009', 'emp-002', 'de-051','team-002', 'Logging Improvements', 'Improved logging visibility', '2026-03-21'),
-- de-052
('act-116', 'proj-001', 'emp-003', 'de-052','team-016', 'Share Flow Refactor', 'Refactored share flow', '2026-03-22'),
('act-117', 'proj-005', 'emp-003', 'de-052','team-016', 'Analytics Improvement', 'Improved tracking events', '2026-03-22'),
('act-118', 'proj-001', 'emp-003', 'de-052','team-016', 'UI Fixes', 'Resolved UI issues', '2026-03-22'),
('act-119', 'proj-001', 'emp-003', 'de-052','team-016', 'Test Implementation', 'Added tests', '2026-03-22'),
('act-120', 'proj-007', 'emp-003', 'de-052','team-016', 'Code Reviews', 'Reviewed pull requests', '2026-03-22'),
-- de-053
('act-121', 'proj-002', 'emp-001', 'de-053','team-014', 'API Optimization', 'Improved API performance', '2026-03-26'),
('act-122', 'proj-009', 'emp-001', 'de-053','team-014', 'DB Optimization', 'Optimized database queries', '2026-03-26'),
('act-123', 'proj-002', 'emp-001', 'de-053','team-014', 'Caching Layer', 'Implemented caching', '2026-03-26'),
('act-124', 'proj-002', 'emp-001', 'de-053','team-014', 'Endpoint Testing', 'Tested endpoints', '2026-03-26'),
('act-125', 'proj-001', 'emp-001', 'de-053','team-014', 'Bug Fixes', 'Resolved API bugs', '2026-03-26'),
-- de-054
('act-126', 'proj-002', 'emp-002', 'de-054','team-015', 'Filter Enhancement', 'Improved dashboard filters', '2026-03-27'),
('act-127', 'proj-002', 'emp-002', 'de-054','team-015', 'UI Fix', 'Resolved UI issues', '2026-03-27'),
('act-128', 'proj-002', 'emp-002', 'de-054','team-015', 'UX Improvements', 'Enhanced user experience', '2026-03-27'),
('act-129', 'proj-002', 'emp-002', 'de-054','team-015', 'Test Coverage', 'Added tests', '2026-03-27'),
('act-130', 'proj-000', 'emp-002', 'de-054','team-015', 'Code Cleanup', 'Removed unused code', '2026-03-27'),
-- de-055
('act-131', 'proj-001', 'emp-003', 'de-055','team-003', 'Endorsement Flow Update', 'Improved endorsement logic', '2026-03-25'),
('act-132', 'proj-003', 'emp-003', 'de-055','team-003', 'Validation Fix', 'Fixed validation issues', '2026-03-25'),
('act-133', 'proj-009', 'emp-003', 'de-055','team-003', 'Logging', 'Added logs', '2026-03-25'),
('act-134', 'proj-001', 'emp-003', 'de-055','team-003', 'UI Optimization', 'Improved UI performance', '2026-03-25'),
('act-135', 'proj-001', 'emp-003', 'de-055','team-003', 'Flow Testing', 'Tested flows', '2026-03-25'),
-- de-056
('act-136', 'proj-000', 'emp-001', 'de-056','team-001', 'Codebase Cleanup', 'Cleaned overall codebase', '2026-03-27'),
('act-137', 'proj-007', 'emp-001', 'de-056','team-001', 'PR Reviews', 'Reviewed pull requests', '2026-03-27'),
('act-138', 'proj-009', 'emp-001', 'de-056','team-001', 'Logging Improvements', 'Improved logging system', '2026-03-27'),
('act-139', 'proj-002', 'emp-001', 'de-056','team-001', 'Deployment Fixes', 'Deployed fixes to production', '2026-03-27'),
('act-140', 'proj-002', 'emp-001', 'de-056','team-001', 'Flow Verification', 'Verified system flows post-deploy', '2026-03-27');


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

--
-- Dumping data for table `collaboration`
--
INSERT INTO `collaboration`
(`collaboration_id`, `project_id`, `employee_id`, `description`, `started_at`, `ended_at`, `role`)
VALUES
('col-001', 'proj-001', 'emp-001', 'Leading starter share optimization initiatives.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-002', 'proj-001', 'emp-002', 'Supporting UI improvements for share flow.', '2026-01-03 00:00:00', NULL, 'EMPLOYEE'),
('col-003', 'proj-001', 'emp-019', 'Content adjustments for petition share copy.', '2026-01-05 00:00:00', '2026-02-20 00:00:00', 'EMPLOYEE'),
('col-004', 'proj-002', 'emp-006', 'Designing A/B tests for recruit shares.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-005', 'proj-002', 'emp-018', 'Recruit funnel metrics tracking.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-006', 'proj-003', 'emp-004', 'Improving petition validation UI.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-007', 'proj-003', 'emp-016', 'Backend validation logic updates.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-008', 'proj-003', 'emp-003', 'Frontend optimization tasks.', '2026-01-04 00:00:00', '2026-02-18 00:00:00', 'EMPLOYEE'),
('col-009', 'proj-004', 'emp-002', 'Notification logic redesign.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-010', 'proj-004', 'emp-020', 'Support automation enhancements.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-011', 'proj-005', 'emp-005', 'API reliability improvements.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-012', 'proj-005', 'emp-010', 'Dashboard metrics alignment.', '2026-01-03 00:00:00', NULL, 'EMPLOYEE'),
('col-013', 'proj-006', 'emp-009', 'Mobile share performance fixes.', '2026-01-01 00:00:00', '2026-02-25 00:00:00', 'LEAD'),
('col-014', 'proj-006', 'emp-006', 'Growth validation for mobile tests.', '2026-01-02 00:00:00', '2026-02-25 00:00:00', 'EMPLOYEE'),
('col-015', 'proj-007', 'emp-007', 'CI/CD stability improvements.', '2026-01-01 00:00:00', '2026-02-28 00:00:00', 'LEAD'),
('col-016', 'proj-007', 'emp-005', 'Backend deployment fixes.', '2026-01-03 00:00:00', '2026-02-28 00:00:00', 'EMPLOYEE'),
('col-017', 'proj-008', 'emp-008', 'Security hardening implementation.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-018', 'proj-008', 'emp-007', 'Infrastructure audit support.', '2026-01-04 00:00:00', NULL, 'EMPLOYEE'),
('col-019', 'proj-009', 'emp-010', 'Dashboard query optimization.', '2026-01-01 00:00:00', '2026-02-20 00:00:00', 'LEAD'),
('col-020', 'proj-009', 'emp-005', 'API response tuning.', '2026-01-02 00:00:00', '2026-02-20 00:00:00', 'EMPLOYEE'),
('col-021', 'proj-010', 'emp-004', 'Design system components v2.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-022', 'proj-010', 'emp-001', 'Integration of shared components.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-023', 'proj-011', 'emp-011', 'CRM sync reliability updates.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-024', 'proj-011', 'emp-013', 'Internal tool adjustments.', '2026-01-03 00:00:00', NULL, 'EMPLOYEE'),
('col-025', 'proj-012', 'emp-012', 'Checkout conversion optimization.', '2026-01-01 00:00:00', '2026-02-24 00:00:00', 'LEAD'),
('col-026', 'proj-012', 'emp-015', 'Growth experiment analysis.', '2026-01-03 00:00:00', '2026-02-24 00:00:00', 'EMPLOYEE'),
('col-027', 'proj-013', 'emp-013', 'Admin panel feature expansion.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-028', 'proj-013', 'emp-011', 'CRM admin tools support.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-029', 'proj-014', 'emp-014', 'Community ranking improvements.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-030', 'proj-014', 'emp-019', 'Content structure optimization.', '2026-01-04 00:00:00', NULL, 'EMPLOYEE'),
('col-031', 'proj-015', 'emp-015', 'Growth experimentation strategy.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-032', 'proj-015', 'emp-006', 'A/B test technical setup.', '2026-01-03 00:00:00', NULL, 'EMPLOYEE'),
('col-033', 'proj-016', 'emp-016', 'Validation engine rebuild.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-034', 'proj-016', 'emp-004', 'UI validation messaging updates.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-035', 'proj-017', 'emp-017', 'AI classification development.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-036', 'proj-017', 'emp-001', 'Integration of AI responses.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-037', 'proj-018', 'emp-018', 'Recruit funnel metrics design.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-038', 'proj-018', 'emp-006', 'Growth experimentation link.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-039', 'proj-019', 'emp-019', 'Petition content optimization.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-040', 'proj-019', 'emp-010', 'Analytics alignment.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-041', 'proj-000', 'emp-005', 'General maintenance tasks.', '2026-01-01 00:00:00', NULL, 'LEAD'),
('col-042', 'proj-000', 'emp-020', 'Support automation improvements.', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('col-043', 'proj-000', 'emp-003', 'Unassigned operational tasks.', '2026-01-03 00:00:00', NULL, 'EMPLOYEE'),
('col-044', 'proj-001', 'emp-006', 'Growth validation for shares.', '2026-01-10 00:00:00', NULL, 'EMPLOYEE'),
('col-045', 'proj-004', 'emp-014', 'Community engagement alignment.', '2026-01-12 00:00:00', NULL, 'EMPLOYEE'),
('col-046', 'proj-010', 'emp-008', 'Security review of components.', '2026-01-15 00:00:00', NULL, 'EMPLOYEE'),
('col-047', 'proj-003', 'emp-010', 'Analytics support for validation.', '2026-01-16 00:00:00', NULL, 'EMPLOYEE'),
('col-048', 'proj-015', 'emp-002', 'Experiment support on UX copy.', '2026-01-18 00:00:00', NULL, 'EMPLOYEE'),
('col-049', 'proj-018', 'emp-017', 'AI analytics cross-support.', '2026-01-20 00:00:00', NULL, 'EMPLOYEE'),
('col-050', 'proj-019', 'emp-001', 'Frontend content rendering updates.', '2026-01-22 00:00:00', NULL, 'EMPLOYEE');
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

--
-- Dumping data for table `dailyentry`
--

INSERT INTO `dailyentry` (`entry_id`, `employee_id`,`team_id`, `entry_date`, `to_do`, `done`, `blockers`, `slack_standup_URL`) VALUES
('de-001', 'emp-003','team-003', '2026-02-01', '- Refactor share button logic\n- Improve share tracking analytics\n- Add unit tests for share component', '- Updated shared component previously developed by Vaquita Squad\n- Fixed double firing event on share click\n- Adjusted copy based on last marketing review\n- Reviewed PRs from Axolotl Squad', '- Waiting confirmation from analytics team about event naming convention\n- Need final decision on tracking schema', 'http://slack.com/standup/1'),
('de-002', 'emp-003','team-003', '2026-02-02', '- Finalize endorsement form validations\n- Sync with design about spacing issues\n- Prepare demo for sprint review', '- Updated Add Endorsement Form logic\n- Matched copies with latest figma designs\n- Refactored validation schema\n- Removed deprecated helper functions', '- Minor UI misalignment in Safari\n- Need clarification on recruit share metric definition', 'http://slack.com/standup/2'),
('de-003', 'emp-004','team-004', '2026-02-01', '- Improve petition validation rules\n- Add quality scoring threshold\n- Review duplicate detection logic', '- Updated confirmation modal copies\n- Implemented new petition validation pipeline\n- Added scoring weight for verified emails\n- Cleaned up legacy quality rules\n- Created migration for new quality flag', '- Need dataset sample from analytics for edge cases', 'http://slack.com/standup/3'),
('de-004', 'emp-005','team-005', '2026-02-01', '- General bug fixing\n- Code cleanup\n- Sync meeting follow ups', '- Fixed random console errors in dev\n- Minor refactor in utils folder\n- Removed unused imports\n- Team sync meeting\n- Helped Venado Squad with quick backend question', '- None at the moment', 'http://slack.com/standup/4'),
('de-005', 'emp-006','team-006', '2026-02-03', '- Analyze recruit share funnel\n- Adjust CTA experiment\n- Prepare A/B test config', '- Increased recruit share visibility on mobile\n- Adjusted CTA copy for clarity\n- Deployed experiment flag\n- Synced with Axolotl Squad about experiment scope', '- Waiting for experiment results baseline\n- Need confirmation on metric definition for share recruits', 'http://slack.com/standup/5'),
('de-006', 'emp-001','team-001', '2026-02-03', '- Improve share modal performance\n- Reduce render blocking\n- Align with marketing copy changes', '- Reduced bundle size of share component\n- Lazy loaded tracking module\n- Updated copy for new starter messaging\n- Tested share flow on staging\n- Verified tracking events in GA', '- Tracking delay still inconsistent in Safari', 'http://slack.com/standup/6'),
('de-007', 'emp-002','team-002', '2026-02-04', '- Improve supporter dashboard metrics\n- Refactor supporter notifications\n- Add loading states', '- Updated supporter dashboard cards\n- Optimized notification fetch logic\n- Added skeleton loaders\n- Fixed small bug in supporter badge logic\n- Reviewed PR from Tiburón Squad', '- Need API contract clarification from Tortuga Squad', 'http://slack.com/standup/7'),
('de-008', 'emp-007','team-007', '2026-02-04', '- Review deployment pipeline\n- Improve logging\n- Cleanup old feature flags', '- Updated CI pipeline\n- Cleaned old experiment flags\n- Improved logging for share events\n- Short sync with Growth team\n- Investigated flaky test case', '- Flaky test still failing intermittently', 'http://slack.com/standup/8'),
('de-009', 'emp-002','team-002', '2026-02-05', '- Refactor notification trigger logic\n- Improve batching strategy\n- Add monitoring logs', '- Reduced duplicate notification bug\n- Improved batching performance\n- Added monitoring hooks\n- Updated notification copy\n- Tested edge cases with delayed events', '- Waiting confirmation from backend about retry policy', 'http://slack.com/standup/9'),
('de-010', 'emp-005','team-005', '2026-02-05', '- Audit tracking events\n- Remove legacy events\n- Align analytics naming', '- Removed deprecated share events\n- Updated GA event mapping\n- Synced with analytics team\n- Verified production logs\n- Cleaned old feature flags', '- Analytics dashboard delay still present', 'http://slack.com/standup/10'),
('de-011', 'emp-006','team-006', '2026-02-06', '- Optimize mobile share modal\n- Improve rendering performance\n- Test on low-end devices', '- Reduced re-renders\n- Improved lazy loading\n- Updated CSS transitions\n- Tested on Android staging\n- Improved Lighthouse score', '- iOS Safari animation glitch remains', 'http://slack.com/standup/11'),
('de-012', 'emp-007','team-007', '2026-02-06', '- Stabilize flaky tests\n- Improve CI caching\n- Review pipeline config', '- Fixed environment variable bug\n- Optimized cache layers\n- Cleaned unused pipeline steps\n- Reviewed deployment logs\n- Documented pipeline flow', '- Random timeout still happening in nightly job', 'http://slack.com/standup/12'),
('de-013', 'emp-008','team-008', '2026-02-07', '- Run dependency audit\n- Patch vulnerabilities\n- Improve CSP headers', '- Updated vulnerable npm packages\n- Added stricter CSP rules\n- Tested auth flow under new policy\n- Documented security checklist\n- Synced with backend team', '- Awaiting penetration test results', 'http://slack.com/standup/13'),
('de-014', 'emp-009','team-009', '2026-02-07', '- Optimize heavy queries\n- Add DB indexes\n- Improve dashboard loading time', '- Added composite index for dashboard query\n- Reduced load time by 30%\n- Cleaned inefficient joins\n- Tested under production load\n- Updated monitoring dashboard', '- Need DBA approval before final deploy', 'http://slack.com/standup/14'),
('de-015', 'emp-010','team-010', '2026-02-08', '- Refactor button component\n- Improve accessibility labels\n- Update typography scale', '- Migrated buttons to new token system\n- Improved aria-label usage\n- Updated typography scale\n- Synced with design team\n- Fixed icon alignment issue', '- Some legacy pages still using old button version', 'http://slack.com/standup/15'),
('de-016', 'emp-011','team-011', '2026-02-08', '- Refactor CRM sync job\n- Improve retry strategy\n- Add monitoring alerts', '- Improved retry backoff logic\n- Fixed duplicated CRM records issue\n- Added monitoring alert\n- Tested with staging CRM\n- Cleaned legacy sync handlers', '- Need confirmation from CRM provider about API limits', 'http://slack.com/standup/16'),
('de-017', 'emp-012','team-012', '2026-02-09', '- Optimize checkout flow\n- Improve payment validation\n- Add loading states', '- Reduced checkout step time\n- Improved validation error messages\n- Added skeleton loaders\n- Fixed payment retry bug\n- Synced with payments provider', '- Pending confirmation for 3DS fallback scenario', 'http://slack.com/standup/17'),
('de-018', 'emp-013','team-013', '2026-02-09', '- Improve admin filters\n- Add role-based restrictions\n- Refactor settings page', '- Implemented advanced filters\n- Restricted admin settings by role\n- Improved layout responsiveness\n- Fixed session timeout issue\n- Updated internal documentation', '- Minor styling bug in Firefox', 'http://slack.com/standup/18'),
('de-019', 'emp-014','team-014', '2026-02-10', '- Improve feed ranking algorithm\n- Adjust content weighting\n- Add moderation flags', '- Tuned ranking weights\n- Added moderation toggle\n- Fixed pagination issue\n- Improved API response time\n- Synced with content team', '- Awaiting final KPI baseline from analytics', 'http://slack.com/standup/19'),
('de-020', 'emp-015','team-015', '2026-02-10', '- General code cleanup\n- Small UI tweaks\n- Sync meetings\n- Review open PRs', '- Fixed minor styling issues\n- Reviewed 4 pull requests\n- Cleaned deprecated utils\n- Short planning session with team\n- Investigated bug report without clear scope', '- No blockers, just waiting prioritization', 'http://slack.com/standup/20'),
('de-021', 'emp-001','team-001', '2024-01-15', '- Initial project setup\n- Configure repo\n- Setup CI', '- Initialized repository\n- Configured ESLint and Prettier\n- Setup basic CI pipeline', '- Waiting on infra credentials', 'http://slack.com/standup/21'),
('de-022', 'emp-002','team-002', '2024-03-10', '- Implement login API\n- Add validation\n- Write tests', '- Created login endpoint\n- Added JWT auth\n- Wrote unit tests', '- Need security review', 'http://slack.com/standup/22'),
('de-023', 'emp-004','team-004', '2024-06-05', '- Improve validation engine\n- Refactor scoring\n- Optimize queries', '- Refactored validation rules\n- Improved scoring accuracy\n- Optimized SQL queries', '- Missing dataset samples', 'http://slack.com/standup/23'),
('de-024', 'emp-006','team-006', '2024-09-12', '- Mobile UI fixes\n- Optimize rendering\n- Test devices', '- Fixed mobile layout issues\n- Improved rendering speed\n- Tested on Android', '- iOS issues remain', 'http://slack.com/standup/24'),
('de-025', 'emp-008','team-008','2025-01-20', '- Security audit\n- Fix vulnerabilities\n- Update dependencies', '- Patched vulnerabilities\n- Updated dependencies\n- Improved CSP headers', '- Awaiting final audit approval', 'http://slack.com/standup/25'),
('de-026', 'emp-010','team-010','2025-04-18', '- Design system migration\n- Update components\n- Sync with design', '- Migrated core components\n- Updated tokens\n- Fixed UI inconsistencies', '- Legacy components pending', 'http://slack.com/standup/26'),
('de-027', 'emp-012','team-012','2025-07-30', '- Improve checkout\n- Add validation\n- Optimize flow', '- Reduced checkout errors\n- Improved validation\n- Optimized API calls', '- Payment provider delay', 'http://slack.com/standup/27'),
('de-028', 'emp-014','team-014','2025-10-11', '- Improve feed algorithm\n- Tune weights\n- Test engagement', '- Adjusted ranking weights\n- Improved engagement metrics\n- Deployed experiment', '- Need analytics confirmation', 'http://slack.com/standup/28'),
('de-029', 'emp-017','team-017','2026-01-05', '- Improve AI classification\n- Train model\n- Evaluate results', '- Improved model accuracy\n- Cleaned dataset\n- Deployed new model', '- Need more training data', 'http://slack.com/standup/29'),
('de-030', 'emp-019','team-012','2026-03-15', '- Optimize content templates\n- Improve UX\n- Test flows', '- Updated templates\n- Improved readability\n- Tested user flows', '- Awaiting product approval', 'http://slack.com/standup/30'),
('de-031', 'emp-003','team-003', '2024-02-12',
'- Refactor share module\n- Fix tracking bugs\n- Improve analytics events\n- Add unit tests\n- Review PRs',
'- Refactored share module structure\n- Fixed duplicate tracking events\n- Standardized analytics naming\n- Added unit tests for share logic\n- Reviewed 3 PRs from team',
'- Pending analytics validation for new events',
'http://slack.com/standup/31'),
('de-032', 'emp-005','team-005', '2024-05-20',
'- Cleanup legacy utils\n- Fix minor bugs\n- Improve logging\n- Remove deprecated functions\n- Assist team',
'- Removed unused helper functions\n- Fixed null pointer bug in utils\n- Improved logging format\n- Deleted deprecated services\n- Helped team debug API issue',
'- None',
'http://slack.com/standup/32'),
('de-033', 'emp-007', 'team-007','2024-08-18',
'- Improve CI pipeline\n- Fix flaky tests\n- Optimize caching\n- Add logs\n- Review pipeline failures',
'- Fixed flaky integration test\n- Improved cache strategy\n- Added detailed logs\n- Reduced pipeline time by 20%\n- Investigated failing nightly job',
'- Intermittent timeout still present',
'http://slack.com/standup/33'),
('de-034', 'emp-009', 'team-005','2025-02-11',
'- Optimize DB queries\n- Add indexes\n- Improve joins\n- Test performance\n- Update dashboards',
'- Added indexes to heavy tables\n- Optimized joins in reports\n- Reduced query time significantly\n- Updated dashboard queries\n- Tested under load',
'- DBA approval pending',
'http://slack.com/standup/34'),
('de-035', 'emp-011', 'team-011','2025-06-25',
'- Improve CRM sync\n- Fix duplication\n- Add retry logic\n- Monitor jobs\n- Refactor services',
'- Fixed duplicated records issue\n- Implemented retry backoff\n- Added monitoring alerts\n- Refactored sync service\n- Tested edge cases',
'- Waiting CRM API rate limits confirmation',
'http://slack.com/standup/35'),
('de-036', 'emp-013','team-008', '2025-09-09',
'- Improve admin panel\n- Add filters\n- Fix permissions\n- Refactor UI\n- Improve responsiveness',
'- Added advanced filters\n- Fixed role-based access issues\n- Improved UI layout\n- Enhanced responsiveness\n- Cleaned legacy code',
'- Minor UI bug in Safari',
'http://slack.com/standup/36'),
('de-037', 'emp-015','team-015', '2025-12-01',
'- Code cleanup\n- Fix UI bugs\n- Review PRs\n- Improve styles\n- Sync with team',
'- Fixed UI alignment issues\n- Cleaned CSS\n- Reviewed 5 PRs\n- Improved button styles\n- Participated in planning meeting',
'- No blockers',
'http://slack.com/standup/37'),
('de-038', 'emp-016', 'team-010','2026-01-20',
'- Improve validation heuristics\n- Tune scoring\n- Add rules\n- Test edge cases\n- Document changes',
'- Tuned validation weights\n- Added heuristic rules\n- Improved scoring accuracy\n- Tested edge cases\n- Updated documentation',
'- Need more real-world samples',
'http://slack.com/standup/38'),
('de-039', 'emp-018','team-011', '2026-02-14',
'- Improve analytics funnel\n- Fix tracking gaps\n- Add segmentation\n- Test reports\n- Sync with product',
'- Fixed missing funnel steps\n- Added segmentation filters\n- Improved report accuracy\n- Tested analytics dashboards\n- Synced with product team',
'- Data delay in pipeline',
'http://slack.com/standup/39'),
('de-040', 'emp-020','team-020', '2026-03-10',
'- Automate processes\n- Write scripts\n- Reduce manual work\n- Test automation\n- Deploy scripts',
'- Created automation scripts\n- Reduced manual workload\n- Tested scripts in staging\n- Deployed automation\n- Documented processes',
'- Need monitoring for failures',
'http://slack.com/standup/40'),
-- emp-001
('de-041', 'emp-001', 'team-014','2026-03-21',
'- Refactor share modal\n- Improve performance\n- Fix tracking delays\n- Add tests\n- Review PRs\n- Sync with product',
'- Refactored modal rendering logic\n- Reduced bundle size\n- Fixed delayed tracking events\n- Added unit tests\n- Reviewed 4 PRs\n- Synced with product team',
'- Minor delay in analytics dashboard',
'http://slack.com/standup/41'),
('de-042', 'emp-001','team-001', '2026-03-24',
'- Optimize API calls\n- Improve caching\n- Fix edge cases\n- Add logs\n- Test flows',
'- Reduced API calls\n- Implemented caching layer\n- Fixed edge case in share flow\n- Added logging\n- Tested staging flows',
'- None',
'http://slack.com/standup/42'),
-- emp-002
('de-043', 'emp-002','team-001', '2026-03-22',
'- Improve dashboard UI\n- Fix notification bugs\n- Add loaders\n- Refactor components\n- Review PRs',
'- Updated dashboard layout\n- Fixed notification duplication\n- Added skeleton loaders\n- Refactored components\n- Reviewed 3 PRs',
'- Waiting API fix',
'http://slack.com/standup/43'),
('de-044', 'emp-002','team-002', '2026-03-26',
'- Optimize notifications\n- Improve batching\n- Add monitoring\n- Fix retry logic\n- Test edge cases',
'- Improved batching performance\n- Added monitoring logs\n- Fixed retry bug\n- Tested edge scenarios\n- Updated configs',
'- None',
'http://slack.com/standup/44'),
-- emp-003
('de-045', 'emp-003','team-003', '2026-03-23',
'- Refactor endorsement flow\n- Improve validation\n- Fix UI issues\n- Add tests\n- Sync design',
'- Refactored endorsement logic\n- Improved validation schema\n- Fixed UI misalignment\n- Added tests\n- Synced with design',
'- Minor Safari issue',
'http://slack.com/standup/45'),
('de-046', 'emp-003','team-016','2026-03-27',
'- Improve analytics events\n- Fix tracking gaps\n- Optimize performance\n- Add logs\n- Review PRs\n- Cleanup code',
'- Fixed missing events\n- Improved tracking accuracy\n- Optimized performance\n- Added logs\n- Reviewed PRs\n- Cleaned code',
'- None',
'http://slack.com/standup/46'),
('de-047', 'emp-001','team-014', '2026-03-22',
'- Improve share UX\n- Fix edge cases\n- Add logs\n- Test mobile\n- Review PRs',
'- Improved UX transitions\n- Fixed edge cases\n- Added logs\n- Tested mobile\n- Reviewed PRs',
'- None',
'http://slack.com/standup/47'),

('de-048', 'emp-002','team-002', '2026-03-23',
'- Refactor dashboard\n- Optimize queries\n- Add loaders\n- Fix UI bugs\n- Sync team',
'- Refactored dashboard\n- Optimized queries\n- Added loaders\n- Fixed UI bugs\n- Team sync',
'- Minor API delay',
'http://slack.com/standup/48'),

('de-049', 'emp-003','team-003', '2026-03-24',
'- Improve validation\n- Fix bugs\n- Add tests\n- Optimize flow\n- Cleanup code',
'- Improved validation\n- Fixed bugs\n- Added tests\n- Optimized flow\n- Cleaned code',
'- None',
'http://slack.com/standup/49'),

('de-050', 'emp-001','team-001', '2026-03-25',
'- Optimize rendering\n- Reduce re-renders\n- Improve caching\n- Add logs\n- Test flows',
'- Reduced re-renders\n- Improved caching\n- Added logs\n- Tested flows\n- Fixed minor bug',
'- None',
'http://slack.com/standup/50'),

('de-051', 'emp-002','team-002', '2026-03-21',
'- Improve notifications\n- Fix duplication\n- Add monitoring\n- Test retries\n- Update configs',
'- Fixed duplication\n- Added monitoring\n- Tested retries\n- Updated configs\n- Improved logs',
'- None',
'http://slack.com/standup/51'),

('de-052', 'emp-003','team-016', '2026-03-22',
'- Refactor share flow\n- Improve analytics\n- Fix UI\n- Add tests\n- Review PRs',
'- Refactored flow\n- Improved analytics\n- Fixed UI\n- Added tests\n- Reviewed PRs',
'- None',
'http://slack.com/standup/52'),

('de-053', 'emp-001','team-014', '2026-03-26',
'- Improve API performance\n- Optimize DB calls\n- Add caching\n- Test endpoints\n- Fix bugs',
'- Optimized DB calls\n- Added caching\n- Tested endpoints\n- Fixed bugs\n- Improved logs',
'- None',
'http://slack.com/standup/53'),

('de-054', 'emp-002','team-015', '2026-03-27',
'- Enhance dashboard filters\n- Fix UI\n- Improve UX\n- Add tests\n- Cleanup code',
'- Enhanced filters\n- Fixed UI\n- Improved UX\n- Added tests\n- Cleaned code',
'- None',
'http://slack.com/standup/54'),

('de-055', 'emp-003','team-003', '2026-03-25',
'- Improve endorsement flow\n- Fix validation\n- Add logs\n- Optimize UI\n- Test flows',
'- Improved flow\n- Fixed validation\n- Added logs\n- Optimized UI\n- Tested flows',
'- None',
'http://slack.com/standup/55'),

('de-056', 'emp-001','team-001', '2026-03-27',
'- Final optimizations\n- Cleanup codebase\n- Review PRs\n- Improve logs\n- Deploy fixes',
'- Cleaned codebase\n- Reviewed PRs\n- Improved logs\n- Deployed fixes\n- Verified flows',
'- None',
'http://slack.com/standup/56');
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
('emp-001', 'Juan Pérez', 'Juan', 'Pérez'),
('emp-002', 'Ana López', 'Ana', 'López'),
('emp-003', 'Carlos Ramírez', 'Carlos', 'Ramírez'),
('emp-004', 'María Torres', 'María', 'Torres'),
('emp-005', 'Luis Herrera', 'Luis', 'Herrera'),
('emp-006', 'Sofía Cruz', 'Sofía', 'Cruz'),
('emp-007', 'Diego Sánchez', 'Diego', 'Sánchez'),
('emp-008', 'Valeria Ortiz', 'Valeria', 'Ortiz'),
('emp-009', 'Fernando Morales', 'Fernando', 'Morales'),
('emp-010', 'Camila Ríos', 'Camila', 'Ríos'),
('emp-011', 'Ricardo Silva', 'Ricardo', 'Silva'),
('emp-012', 'Daniela Vega', 'Daniela', 'Vega'),
('emp-013', 'Pablo Medina', 'Pablo', 'Medina'),
('emp-014', 'Andrea Campos', 'Andrea', 'Campos'),
('emp-015', 'Jorge Navarro', 'Jorge', 'Navarro'),
('emp-016', 'Lucía Romero', 'Lucía', 'Romero'),
('emp-017', 'Miguel Flores', 'Miguel', 'Flores'),
('emp-018', 'Elena Castillo', 'Elena', 'Castillo'),
('emp-019', 'Arturo Delgado', 'Arturo', 'Delgado'),
('emp-020', 'Natalia Fuentes', 'Natalia', 'Fuentes');

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

--
-- Dumping data for table `employeeteam`
--

INSERT INTO `employeeteam` (`employee_id`, `team_id`, `joined_at`, `left_at`, `role`) VALUES
('emp-001', 'team-001', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-001', 'team-014', '2026-01-21 00:00:00', NULL, 'EMPLOYEE'),
('emp-002', 'team-001', '2026-01-02 00:00:00', NULL, 'EMPLOYEE'),
('emp-002', 'team-002', '2026-01-01 00:00:00', NULL, 'EMPLOYEE'),
('emp-001', 'team-002', '2026-01-01 00:00:00', NULL, 'EMPLOYEE'),
('emp-002', 'team-015', '2026-01-22 00:00:00', NULL, 'EMPLOYEE'),
('emp-003', 'team-001', '2026-01-03 00:00:00', NULL, 'EMPLOYEE'),
('emp-003', 'team-003', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-003', 'team-016', '2026-01-23 00:00:00', NULL, 'EMPLOYEE'),
('emp-004', 'team-002', '2026-01-04 00:00:00', NULL, 'EMPLOYEE'),
('emp-004', 'team-004', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-004', 'team-017', '2026-01-24 00:00:00', '2026-02-28 00:00:00', 'EMPLOYEE'),
('emp-005', 'team-002', '2026-01-05 00:00:00', NULL, 'EMPLOYEE'),
('emp-005', 'team-005', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-005', 'team-018', '2026-01-25 00:00:00', NULL, 'EMPLOYEE'),
('emp-006', 'team-003', '2026-01-06 00:00:00', NULL, 'EMPLOYEE'),
('emp-006', 'team-006', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-006', 'team-019', '2026-01-26 00:00:00', NULL, 'EMPLOYEE'),
('emp-007', 'team-004', '2026-01-07 00:00:00', NULL, 'EMPLOYEE'),
('emp-007', 'team-007', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-007', 'team-020', '2026-01-27 00:00:00', '2026-02-15 00:00:00', 'EMPLOYEE'),
('emp-008', 'team-001', '2026-02-01 00:00:00', NULL, 'EMPLOYEE'),
('emp-008', 'team-004', '2026-01-08 00:00:00', NULL, 'EMPLOYEE'),
('emp-008', 'team-008', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-009', 'team-003', '2026-02-02 00:00:00', NULL, 'EMPLOYEE'),
('emp-009', 'team-005', '2026-01-09 00:00:00', NULL, 'EMPLOYEE'),
('emp-009', 'team-009', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-010', 'team-004', '2026-02-03 00:00:00', NULL, 'EMPLOYEE'),
('emp-010', 'team-006', '2026-01-10 00:00:00', NULL, 'EMPLOYEE'),
('emp-010', 'team-010', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-011', 'team-005', '2026-02-04 00:00:00', NULL, 'EMPLOYEE'),
('emp-011', 'team-006', '2026-01-11 00:00:00', '2026-02-20 00:00:00', 'EMPLOYEE'),
('emp-011', 'team-011', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-012', 'team-006', '2026-02-05 00:00:00', NULL, 'EMPLOYEE'),
('emp-012', 'team-007', '2026-01-12 00:00:00', NULL, 'EMPLOYEE'),
('emp-012', 'team-012', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-013', 'team-007', '2026-02-06 00:00:00', NULL, 'EMPLOYEE'),
('emp-013', 'team-008', '2026-01-13 00:00:00', NULL, 'EMPLOYEE'),
('emp-013', 'team-013', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-014', 'team-008', '2026-01-14 00:00:00', NULL, 'EMPLOYEE'),
('emp-014', 'team-009', '2026-02-07 00:00:00', NULL, 'EMPLOYEE'),
('emp-014', 'team-014', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-015', 'team-009', '2026-01-15 00:00:00', NULL, 'EMPLOYEE'),
('emp-015', 'team-011', '2026-02-08 00:00:00', NULL, 'EMPLOYEE'),
('emp-015', 'team-015', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-016', 'team-010', '2026-01-16 00:00:00', NULL, 'EMPLOYEE'),
('emp-016', 'team-013', '2026-02-09 00:00:00', NULL, 'EMPLOYEE'),
('emp-016', 'team-016', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-017', 'team-010', '2026-01-17 00:00:00', '2026-02-25 00:00:00', 'EMPLOYEE'),
('emp-017', 'team-017', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-017', 'team-018', '2026-02-10 00:00:00', NULL, 'EMPLOYEE'),
('emp-018', 'team-011', '2026-01-18 00:00:00', NULL, 'EMPLOYEE'),
('emp-018', 'team-018', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-019', 'team-012', '2026-01-19 00:00:00', NULL, 'EMPLOYEE'),
('emp-019', 'team-019', '2026-01-01 00:00:00', NULL, 'LEAD'),
('emp-020', 'team-013', '2026-01-20 00:00:00', NULL, 'EMPLOYEE'),
('emp-020', 'team-020', '2026-01-01 00:00:00', NULL, 'LEAD');

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

--
-- Dumping data for table `goal`
--

INSERT INTO `goal` (`goal_id`, `project_id`, `employee_responsible_id`, `title`, `description`, `due_date`, `status`, `created_at`) VALUES
('goal-001', 'proj-001', 'emp-001', 'Increase Starter Shares 15%', 'Aumentar en 15% la cantidad de shares por parte de un Starter mejorando el flujo y visibilidad del botón de share.', '2025-04-09', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-002', 'proj-002', 'emp-006', 'Increase Recruit Shares 5%', 'Aumentar en 5% la cantidad de share recruits por petición mediante experimentos A/B y mejoras en CTA.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-003', 'proj-003', 'emp-004', 'Improve Quality Petitions 10%', 'Aumentar en 10% la cantidad de Quality Petitions mediante nuevas reglas de validación y scoring.', '2026-05-01', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-004', 'proj-004', 'emp-002', 'Increase Notification CTR', 'Incrementar el CTR de notificaciones en 7% optimizando copys y frecuencia.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-005', 'proj-005', 'emp-005', 'Reduce Tracking Errors', 'Reducir inconsistencias de tracking por debajo del 2% mediante auditoría completa.', '2026-04-20', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-006', 'proj-006', 'emp-006', 'Improve Mobile Share Speed', 'Reducir el tiempo de carga del modal de share móvil en un 20%.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-007', 'proj-007', 'emp-007', 'Reduce CI Failures', 'Reducir en 30% las fallas en el pipeline de integración continua.', '2026-05-05', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-008', 'proj-008', 'emp-008', 'Improve Security Score', 'Alcanzar un score mínimo de 95% en auditoría de seguridad 2026.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-009', 'proj-009', 'emp-009', 'Optimize Dashboard Load Time', 'Reducir el tiempo de carga del dashboard en un 25%.', '2026-04-30', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-010', 'proj-010', 'emp-010', 'Design System Migration 80%', 'Migrar al menos el 80% de los componentes al nuevo sistema de diseño.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-011', 'proj-011', 'emp-011', 'Improve CRM Sync Reliability', 'Reducir fallos de sincronización CRM en un 40%.', '2026-05-01', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-012', 'proj-012', 'emp-012', 'Increase Checkout Conversion', 'Incrementar conversión del checkout en 6% optimizando validaciones y UX.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-013', 'proj-013', 'emp-013', 'Improve Admin Efficiency', 'Reducir en 20% el tiempo promedio de tareas administrativas.', '2026-05-10', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-014', 'proj-014', 'emp-014', 'Increase Community Engagement', 'Incrementar engagement del feed en 12% ajustando algoritmo de ranking.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-015', 'proj-015', 'emp-015', 'Improve Experiment Win Rate', 'Alcanzar 60% de experimentos exitosos en iniciativas de growth.', '2024-02-15', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-016', 'proj-016', 'emp-016', 'Increase Validation Precision', 'Alcanzar 92% de precisión en el motor de validación de peticiones.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-017', 'proj-017', 'emp-017', 'Improve AI Classification Accuracy', 'Alcanzar 90% de precisión en clasificación automática de actividades.', '2026-05-30', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-018', 'proj-018', 'emp-018', 'Improve Recruit Funnel Visibility', 'Incrementar en 15% la visibilidad del funnel de reclutamiento.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-019', 'proj-019', 'emp-019', 'Increase Petition Completion Rate', 'Incrementar en 9% la tasa de finalización de peticiones mediante mejoras de contenido.', '2026-05-12', 'IN PROGRESS', '2026-01-01 00:00:00'),
('goal-020', 'proj-000', 'emp-020', 'Improve Operational Efficiency', 'Reducir en 10% la carga operativa general mediante automatización interna.', NULL, 'IN PROGRESS', '2026-01-01 00:00:00');

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

--
-- Dumping data for table `highlight`
--

INSERT INTO `highlight` (`highlight_id`, `employee_id`, `project_id`, `title`, `content`, `created_at`) VALUES
('high-001', 'emp-001', 'proj-001', 'Share Modal Performance Improvement', 'Optimized share modal rendering time and reduced bundle size, improving starter share flow responsiveness.', '2026-02-10 00:00:00'),
('high-002', 'emp-002', 'proj-004', 'Notification System Optimization', 'Reduced duplicate notifications and improved batching logic, increasing notification reliability.', '2026-02-10 00:00:00'),
('high-003', 'emp-003', 'proj-001', 'Shared Component Refactor', 'Refactored legacy share component to improve maintainability and event tracking consistency.', '2026-02-10 00:00:00'),
('high-004', 'emp-004', 'proj-003', 'Petition Validation Upgrade', 'Implemented improved scoring logic for petition validation, increasing quality detection accuracy.', '2026-02-10 00:00:00'),
('high-005', 'emp-005', 'proj-005', 'Tracking Audit Completion', 'Completed analytics audit removing deprecated events and aligning naming conventions.', '2026-02-10 00:00:00'),
('high-006', 'emp-006', 'proj-006', 'Mobile Share Optimization', 'Improved mobile share performance and reduced re-renders across low-end devices.', '2026-02-10 00:00:00'),
('high-007', 'emp-007', 'proj-007', 'CI Pipeline Stabilization', 'Reduced intermittent pipeline failures by improving caching and environment configuration.', '2026-02-10 00:00:00'),
('high-008', 'emp-008', 'proj-008', 'Security Hardening Phase 1', 'Patched vulnerable dependencies and implemented stricter CSP policies.', '2026-02-10 00:00:00'),
('high-009', 'emp-009', 'proj-009', 'Dashboard Query Optimization', 'Reduced dashboard load time by optimizing heavy queries and adding composite indexes.', '2026-02-10 00:00:00'),
('high-010', 'emp-010', 'proj-010', 'Design System Migration Progress', 'Migrated core button and typography components to the new design token system.', '2026-02-10 00:00:00'),
('high-011', 'emp-011', 'proj-011', 'CRM Sync Reliability Improvement', 'Improved retry logic and reduced duplicated CRM records during synchronization.', '2026-02-10 00:00:00'),
('high-012', 'emp-012', 'proj-012', 'Checkout Flow Enhancement', 'Optimized checkout validation and improved error messaging to reduce friction.', '2026-02-10 00:00:00'),
('high-013', 'emp-013', 'proj-013', 'Admin Panel Enhancement', 'Implemented advanced filters and role-based restrictions in internal admin tools.', '2026-02-10 00:00:00'),
('high-014', 'emp-014', 'proj-014', 'Feed Ranking Algorithm Adjustment', 'Tuned ranking weights to improve engagement and content visibility.', '2026-02-10 00:00:00'),
('high-015', 'emp-015', 'proj-015', 'Successful Growth Experiment', 'Delivered winning A/B test improving CTA effectiveness in recruit flow.', '2026-02-10 00:00:00'),
('high-016', 'emp-016', 'proj-016', 'Validation Engine Precision Boost', 'Improved validation precision through refined heuristics and scoring weights.', '2026-02-10 00:00:00'),
('high-017', 'emp-017', 'proj-017', 'AI Classification Improvement', 'Enhanced AI classification accuracy for daily entry activity mapping.', '2026-02-10 00:00:00'),
('high-018', 'emp-018', 'proj-018', 'Recruit Funnel Visibility Upgrade', 'Improved analytics tracking across recruit funnel stages.', '2026-02-10 00:00:00'),
('high-019', 'emp-019', 'proj-019', 'Content Optimization Initiative', 'Optimized petition content structure to improve completion rates.', '2026-02-10 00:00:00'),
('high-020', 'emp-020', 'proj-000', 'Operational Automation Improvement', 'Implemented small automation scripts reducing repetitive operational tasks.', '2026-02-10 00:00:00');

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

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `employee_responsible_id`, `name`, `description`, `status`, `start_date`, `end_date`, `created_at`) VALUES
('proj-000', 'emp-020', 'Unassigned', 'General operational tasks not associated with a specific project.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-001', 'emp-001', 'Starter Share Optimization', 'Improve share experience and increase starter shares by 15%.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-002', 'emp-006', 'Recruit Share Growth', 'Increase recruit shares per petition through growth experiments.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-003', 'emp-004', 'Quality Petition Improvement', 'Improve petition validation and quality scoring system.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-004', 'emp-002', 'Supporter Notification Revamp', 'Improve supporter notification system and engagement.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-005', 'emp-005', 'Share Tracking Reliability', 'Stabilize analytics tracking and remove inconsistencies.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-006', 'emp-006', 'Mobile Share Optimization', 'Improve mobile share performance across devices.', 'COMPLETED', '2026-01-01', '2026-02-25', '2026-01-01 00:00:00'),
('proj-007', 'emp-007', 'CI Pipeline Stabilization', 'Increase deployment reliability and reduce failures.', 'COMPLETED', '2026-01-01', '2026-02-28', '2026-01-01 00:00:00'),
('proj-008', 'emp-008', 'Security Audit 2026', 'Security hardening initiative and audit compliance.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-009', 'emp-009', 'Dashboard Performance', 'Optimize dashboard query performance and loading time.', 'COMPLETED', '2026-01-01', '2026-02-20', '2026-01-01 00:00:00'),
('proj-010', 'emp-010', 'Design System v2', 'Upgrade design system components and tokens.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-011', 'emp-011', 'CRM Sync Refactor', 'Improve CRM data synchronization reliability.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-012', 'emp-012', 'Checkout Optimization', 'Improve payment conversion and checkout UX.', 'COMPLETED', '2026-01-01', '2026-02-24', '2026-01-01 00:00:00'),
('proj-013', 'emp-013', 'Internal Admin Panel', 'Enhance internal administrative tooling.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-014', 'emp-014', 'Community Feed Enhancements', 'Improve feed ranking and engagement logic.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-015', 'emp-015', 'High Impact Growth Tests', 'Execute high-impact A/B testing initiatives.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-016', 'emp-016', 'Petition Validation Engine', 'Rebuild validation engine for higher precision.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-017', 'emp-017', 'AI Assisted Classification', 'Automate daily entry activity classification.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-018', 'emp-018', 'Recruit Funnel Analytics', 'Improve recruit funnel visibility and metrics.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00'),
('proj-019', 'emp-019', 'Content Optimization 2026', 'Improve petition content quality and completion rates.', 'IN PROGRESS', '2026-01-01', NULL, '2026-01-01 00:00:00');

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

--
-- Dumping data for table `projectteam`
--

INSERT INTO `projectteam` (`team_id`, `project_id`, `team_role`, `joined_at`) VALUES
('team-001', 'proj-001', 'OWNER', '2026-01-01'),
('team-001', 'proj-010', 'CONTRIBUTOR', '2026-01-02'),
('team-001', 'proj-017', 'CONTRIBUTOR', '2026-01-02'),
('team-002', 'proj-001', 'CONTRIBUTOR', '2026-01-05'),
('team-002', 'proj-004', 'OWNER', '2026-01-01'),
('team-003', 'proj-002', 'CONTRIBUTOR', '2026-01-08'),
('team-003', 'proj-003', 'SUPPORT', '2026-01-05'),
('team-004', 'proj-003', 'OWNER', '2026-01-01'),
('team-004', 'proj-010', 'OWNER', '2026-01-01'),
('team-004', 'proj-016', 'SUPPORT', '2026-01-02'),
('team-005', 'proj-005', 'OWNER', '2026-01-01'),
('team-005', 'proj-007', 'SUPPORT', '2026-01-02'),
('team-005', 'proj-009', 'CONTRIBUTOR', '2026-01-02'),
('team-005', 'proj-011', 'SUPPORT', '2026-01-10'),
('team-006', 'proj-001', 'CONTRIBUTOR', '2026-01-02'),
('team-006', 'proj-002', 'OWNER', '2026-01-01'),
('team-006', 'proj-006', 'CONTRIBUTOR', '2026-01-02'),
('team-006', 'proj-015', 'CONTRIBUTOR', '2026-01-02'),
('team-006', 'proj-018', 'SUPPORT', '2026-01-02'),
('team-007', 'proj-007', 'OWNER', '2026-01-01'),
('team-007', 'proj-008', 'CONTRIBUTOR', '2026-01-02'),
('team-008', 'proj-008', 'OWNER', '2026-01-01'),
('team-008', 'proj-010', 'CONTRIBUTOR', '2026-01-06'),
('team-009', 'proj-006', 'OWNER', '2026-01-01'),
('team-009', 'proj-014', 'SUPPORT', '2026-01-06'),
('team-010', 'proj-005', 'CONTRIBUTOR', '2026-01-02'),
('team-010', 'proj-009', 'OWNER', '2026-01-01'),
('team-010', 'proj-019', 'CONTRIBUTOR', '2026-01-02'),
('team-011', 'proj-011', 'OWNER', '2026-01-01'),
('team-011', 'proj-013', 'SUPPORT', '2026-01-02'),
('team-012', 'proj-012', 'OWNER', '2026-01-01'),
('team-012', 'proj-015', 'SUPPORT', '2026-01-07'),
('team-013', 'proj-011', 'CONTRIBUTOR', '2026-01-02'),
('team-013', 'proj-013', 'OWNER', '2026-01-01'),
('team-014', 'proj-005', 'SUPPORT', '2026-01-08'),
('team-014', 'proj-014', 'OWNER', '2026-01-01'),
('team-015', 'proj-012', 'CONTRIBUTOR', '2026-01-02'),
('team-015', 'proj-015', 'OWNER', '2026-01-01'),
('team-016', 'proj-003', 'CONTRIBUTOR', '2026-01-02'),
('team-016', 'proj-016', 'OWNER', '2026-01-01'),
('team-016', 'proj-018', 'CONTRIBUTOR', '2026-01-09'),
('team-017', 'proj-017', 'OWNER', '2026-01-01'),
('team-017', 'proj-019', 'CONTRIBUTOR', '2026-01-07'),
('team-018', 'proj-002', 'CONTRIBUTOR', '2026-01-02'),
('team-018', 'proj-009', 'CONTRIBUTOR', '2026-01-11'),
('team-018', 'proj-018', 'OWNER', '2026-01-01'),
('team-019', 'proj-001', 'SUPPORT', '2026-01-03'),
('team-019', 'proj-014', 'CONTRIBUTOR', '2026-01-02'),
('team-019', 'proj-019', 'OWNER', '2026-01-01'),
('team-020', 'proj-000', 'OWNER', '2026-01-01'),
('team-020', 'proj-004', 'SUPPORT', '2026-01-02');

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
Analyze the provided project data and identify what is going well in the project overall. Focus on progress, outcomes, and effective practices that positively impact delivery, quality, or efficiency.
Guidelines:
Identify positive patterns, progress, or outcomes across the project
Focus on project-level impact (delivery, quality, efficiency, coordination, risk reduction)
Highlight what is enabling progress or improving results
Consider how activities, goals, and achievements contribute to overall project success
Do not organize or reference results by individual employees
Requirements:
Be specific and evidence-based
Do not infer or assume missing information
Avoid generic or vague statements
Each bullet point must include:
(1) what is happening in the project
(2) the positive impact on the project
Output format:
Do not group results
Each bullet point must reflect project-level progress or outcomes
Follow strictly the provided schema
Do not include any extra text'
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
Evaluate the employee’s “what went well” contributions to identify areas for improvement based strictly on the available evidence.
Guidelines:
Identify gaps, inconsistencies, or missing elements in the employee’s contributions
Focus on what could be improved to increase impact, quality, or effectiveness
Consider patterns, not isolated observations
Base insights only on observed evidence (no assumptions or external standards)
Requirements:
Be specific and evidence-based (reference prior contributions)
Do not infer or assume missing information
Avoid vague or generic statements
Each insight must include:
(1) the observed gap or limitation
(2) a realistic, actionable improvement
Output:
Each bullet must reflect a clear improvement opportunity grounded in evidence
Do not reference company values
Strictly follow the schema
No extra text
','whatCanBeImproved','EMPLOYEE'),

('3a055d5f-b6c7-4f14-9645-b4922d971ff2','Improve','
Evaluate the team’s “what went well” contributions to identify areas for improvement based strictly on the available evidence.
Guidelines:
Identify gaps, inconsistencies, or missing elements in team-level performance
Focus on patterns across the team, not isolated actions
Evaluate how team execution could improve impact, coordination, quality, or efficiency
Base insights only on observed evidence (no assumptions or external standards)
Requirements:
Be specific and evidence-based (reference prior contributions)
Do not infer or assume missing information
Avoid vague or generic statements
Each insight must include:
(1) the observed team-level gap or limitation
(2) a realistic, actionable improvement
Output:
Each must reflect a clear team-level improvement opportunity grounded in evidence
Do not reference company values
Strictly follow the schema
No extra text
','whatCanBeImproved','TEAM'),

('831c0fc3-dac9-4264-975c-98f880766052','Improve','
Evaluate the project’s “what went well” outcomes to identify areas for improvement based strictly on the available evidence.
Guidelines:
Identify gaps, inconsistencies, or missing elements in project execution or outcomes
Focus on project-level patterns across delivery, coordination, quality, and efficiency
Evaluate what could be improved to increase overall project impact
Base insights only on observed outcomes (no assumptions or external standards)
Requirements:
Be specific and evidence-based (reference prior outcomes)
Do not infer or assume missing information
Avoid vague or generic statements
Each insight must include:
(1) the observed gap or limitation in the project
(2) a realistic, actionable improvement
Output:
Each must reflect a clear project-level improvement opportunity grounded in evidence
Do not reference company values
Strictly follow the schema
No extra text
','whatCanBeImproved','PROJECT'),

('0583ff2e-8cf6-4881-8fdf-fece65dea388','Values','
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
','companyValues','EMPLOYEE'),

('5633c478-eb1e-4075-9465-5dbcf74c1b4b','Values','
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
','companyValues','TEAM');

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
('role-001', 'EMPLOYEE'),
('role-002', 'LEAD'),
('role-003', 'ADMIN');

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
('role-001', 'ACC-01'),
('role-001', 'ACC-02'),
('role-001', 'AL-01'),
('role-001', 'AL-02'),
('role-001', 'AL-03'),
('role-001', 'EMP-01'),
('role-001', 'EMP-02'),
('role-001', 'EMP-04'),
('role-001', 'EMP-05'),
('role-001', 'HS-01'),
('role-001', 'PROJ-04'),
('role-001', 'PROJ-05-01'),
('role-001', 'PROJ-06'),
('role-001', 'PROJ-07'),
('role-001', 'PROJ-08'),
('role-001', 'PROJ-12'),
('role-001', 'REP-01'),
('role-001', 'TEAM-04'),
('role-001', 'TEAM-05'),
('role-001', 'TEAM-06-01'),
('role-001', 'TEAM-07-01'),
('role-001', 'TEAM-08'),
('role-002', 'ACC-01'),
('role-002', 'ACC-02'),
('role-002', 'AL-01'),
('role-002', 'AL-02'),
('role-002', 'AL-03'),
('role-002', 'EMP-01'),
('role-002', 'EMP-02'),
('role-002', 'EMP-03'),
('role-002', 'EMP-04'),
('role-002', 'EMP-05'),
('role-002', 'HS-01'),
('role-002', 'PROJ-01'),
('role-002', 'PROJ-02'),
('role-002', 'PROJ-04'),
('role-002', 'PROJ-05-01'),
('role-002', 'PROJ-05-02'),
('role-002', 'PROJ-06'),
('role-002', 'PROJ-06-02'),
('role-002', 'PROJ-07'),
('role-002', 'PROJ-08'),
('role-002', 'PROJ-09'),
('role-002', 'PROJ-10'),
('role-002', 'PROJ-12'),
('role-002', 'PROJ-13'),
('role-002', 'PROJ-14'),
('role-002', 'REP-01'),
('role-002', 'TEAM-01'),
('role-002', 'TEAM-02'),
('role-002', 'TEAM-04'),
('role-002', 'TEAM-05'),
('role-002', 'TEAM-06-01'),
('role-002', 'TEAM-06-02'),
('role-002', 'TEAM-07-01'),
('role-002', 'TEAM-07-02'),
('role-002', 'TEAM-08'),
('role-003', 'ACC-01'),
('role-003', 'ACC-02'),
('role-003', 'ADMIN-01'),
('role-003', 'ADMIN-02'),
('role-003', 'ADMIN-03'),
('role-003', 'ADMIN-04'),
('role-003', 'ADMIN-05'),
('role-003', 'ADMIN-06'),
('role-003', 'AL-01'),
('role-003', 'AL-02'),
('role-003', 'AL-03'),
('role-003', 'EMP-01'),
('role-003', 'EMP-02'),
('role-003', 'EMP-03'),
('role-003', 'EMP-04'),
('role-003', 'EMP-05'),
('role-003', 'HS-01'),
('role-003', 'PROJ-01'),
('role-003', 'PROJ-02'),
('role-003', 'PROJ-03'),
('role-003', 'PROJ-04'),
('role-003', 'PROJ-05-01'),
('role-003', 'PROJ-05-02'),
('role-003', 'PROJ-06'),
('role-003', 'PROJ-06-02'),
('role-003', 'PROJ-07'),
('role-003', 'PROJ-08'),
('role-003', 'PROJ-09'),
('role-003', 'PROJ-10'),
('role-003', 'PROJ-11'),
('role-003', 'PROJ-12'),
('role-003', 'PROJ-13'),
('role-003', 'PROJ-14'),
('role-003', 'PROJ-15'),
('role-003', 'REP-01'),
('role-003', 'TEAM-01'),
('role-003', 'TEAM-02'),
('role-003', 'TEAM-03'),
('role-003', 'TEAM-04'),
('role-003', 'TEAM-05'),
('role-003', 'TEAM-06-01'),
('role-003', 'TEAM-06-02'),
('role-003', 'TEAM-07-01'),
('role-003', 'TEAM-07-02'),
('role-003', 'TEAM-08');

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
-- Dumping data for table `team`
--

INSERT INTO `team` (`team_id`, `employee_responsible_id`, `name`, `description`, `created_at`, `image`, `status`) VALUES
('team-001', 'emp-001', 'Axolotl Squad', 'Starter Experience and onboarding flows', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/axolotl-squad.png', 'ACTIVE'),
('team-002', 'emp-001', 'Vaquita Squad', 'Supporter Experience and engagement tools', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/vaquita-squad.png', 'ACTIVE'),
('team-003', 'emp-003', 'Jaguar Squad', 'Frontend architecture and performance', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/jaguar-squad.png', 'ACTIVE'),
('team-004', 'emp-004', 'Colibrí Squad', 'Design system and UI consistency', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/colibri-squad.png', 'ACTIVE'),
('team-005', 'emp-005', 'Tortuga Squad', 'Backend APIs and stability', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/tortuga-squad.png', 'ACTIVE'),
('team-006', 'emp-006', 'Águila Squad', 'Growth experiments and A/B testing', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/aguila-squad.png', 'ACTIVE'),
('team-007', 'emp-007', 'Lobo Squad', 'Platform and DevOps', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/lobo-squad.png', 'ACTIVE'),
('team-008', 'emp-008', 'Pantera Squad', 'Security and compliance', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/pantera-squad.png', 'ACTIVE'),
('team-009', 'emp-009', 'Delfín Squad', 'Mobile features', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/delfin-squad.png', 'ACTIVE'),
('team-010', 'emp-010', 'Búho Squad', 'Analytics and dashboards', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/buho-squad.png', 'ACTIVE'),
('team-011', 'emp-011', 'Ocelote Squad', 'CRM integrations', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/ocelote-squad.png', 'ACTIVE'),
('team-012', 'emp-012', 'Halcón Squad', 'Payments and checkout flows', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/halcon-squad.png', 'ACTIVE'),
('team-013', 'emp-013', 'Coyote Squad', 'Internal tools', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/coyote-squad.png', 'ACTIVE'),
('team-014', 'emp-014', 'Mariposa Squad', 'Community features', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/mariposa-squad.png', 'ACTIVE'),
('team-015', 'emp-015', 'Tiburón Squad', 'High impact experiments', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/tiburon-squad.png', 'ACTIVE'),
('team-016', 'emp-016', 'Armadillo Squad', 'Petition validation engine', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/armadillo-squad.png', 'ACTIVE'),
('team-017', 'emp-017', 'Mapache Squad', 'AI innovation', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/mapache-squad.png', 'ACTIVE'),
('team-018', 'emp-018', 'Venado Squad', 'Recruitment tech', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/venado-squad.png', 'ACTIVE'),
('team-019', 'emp-019', 'Camaleón Squad', 'Content optimization', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/camaleon-squad.png', 'ACTIVE'),
('team-020', 'emp-020', 'Hormiga Squad', 'Support tooling and automation', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/hormiga-squad.png', 'ACTIVE');

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
