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
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `employee_id`, `email`, `password_hash`, `slack_username`, `status`, `first_login`, `last_login`, `image`, `created_at`) VALUES
('a1b2c3d4-0001-4000-8000-000000000001', 'emp-001', 'emp001@unitas.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@axolotl.lead', 'ACTIVE', 1, '2026-02-20 09:15:22', 'https://cdn.unitas-platform.com/profiles/emp-001.png', '2026-01-01 08:00:00'),
('a1b2c3d4-0002-4000-8000-000000000002', 'emp-002', 'emp002@unitas.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@vaquita.dev', 'ACTIVE', 1, '2026-02-18 10:05:12', 'https://cdn.unitas-platform.com/profiles/emp-002.png', '2026-01-01 08:05:00'),
('a1b2c3d4-0003-4000-8000-000000000003', 'emp-003', 'emp003@unitas.com', '$2b$12$ZIwACOdl9g8B/9yYz12GX.i3s3Wr6OqnT0VSdkb9qc5PVssUQTk/u', '@jaguar.dev', 'ACTIVE', 1, '2026-02-19 11:20:44', 'https://cdn.unitas-platform.com/profiles/emp-003.png', '2026-01-01 08:10:00'),
('a1b2c3d4-0004-4000-8000-000000000004', 'emp-004', 'emp004@unitas.com', '$2b$12$L8sdfg8sdfg8sdfg8sdFWEweYxZp4', '@colibri.design', 'ACTIVE', 1, '2026-02-17 08:44:11', 'https://cdn.unitas-platform.com/profiles/emp-004.png', '2026-01-01 08:15:00'),
('a1b2c3d4-0005-4000-8000-000000000005', 'emp-005', 'emp005@unitas.com', '$2b$12$Z7sdfg8sdfg8sdfg8sdQAZweYxZp5', '@tortuga.backend', 'ACTIVE', 0, NULL, 'https://cdn.unitas-platform.com/profiles/emp-005.png', '2026-01-01 08:20:00'),
('a1b2c3d4-0006-4000-8000-000000000006', 'emp-006', 'emp006@unitas.com', '$2b$12$X9sdfg8sdfg8sdfg8sdRTYweYxZp6', '@aguila.growth', 'ACTIVE', 1, '2026-02-20 13:55:09', 'https://cdn.unitas-platform.com/profiles/emp-006.png', '2026-01-01 08:25:00'),
('a1b2c3d4-0007-4000-8000-000000000007', 'emp-007', 'emp007@unitas.com', '$2b$12$V1sdfg8sdfg8sdfg8sdUIOweYxZp7', '@lobo.devops', 'ACTIVE', 1, '2026-02-16 07:55:10', 'https://cdn.unitas-platform.com/profiles/emp-007.png', '2026-01-01 08:30:00'),
('a1b2c3d4-0008-4000-8000-000000000008', 'emp-008', 'emp008@unitas.com', '$2b$12$B2sdfg8sdfg8sdfg8sdPASweYxZp8', '@pantera.sec', 'ACTIVE', 1, '2026-02-22 09:02:33', 'https://cdn.unitas-platform.com/profiles/emp-008.png', '2026-01-01 08:35:00'),
('a1b2c3d4-0009-4000-8000-000000000009', 'emp-009', 'emp009@unitas.com', '$2b$12$N3sdfg8sdfg8sdfg8sdLKJweYxZp9', '@delfin.mobile', 'ACTIVE', 1, '2026-02-21 14:12:01', 'https://cdn.unitas-platform.com/profiles/emp-009.png', '2026-01-01 08:40:00'),
('a1b2c3d4-0010-4000-8000-000000000010', 'emp-010', 'emp010@unitas.com', '$2b$12$M4sdfg8sdfg8sdfg8sdPOIweYxZp0', '@buho.analytics', 'ACTIVE', 1, '2026-02-19 16:33:45', 'https://cdn.unitas-platform.com/profiles/emp-010.png', '2026-01-01 08:45:00'),
('a1b2c3d4-0011-4000-8000-000000000011', 'emp-011', 'emp011@unitas.com', '$2b$12$Q5sdfg8sdfg8sdfg8sdZXCweYxZp1', '@ocelote.crm', 'ACTIVE', 1, '2026-02-18 12:22:22', 'https://cdn.unitas-platform.com/profiles/emp-011.png', '2026-01-01 08:50:00'),
('a1b2c3d4-0012-4000-8000-000000000012', 'emp-012', 'emp012@unitas.com', '$2b$12$R6sdfg8sdfg8sdfg8sdVBNweYxZp2', '@halcon.payments', 'ACTIVE', 1, '2026-02-24 11:11:11', 'https://cdn.unitas-platform.com/profiles/emp-012.png', '2026-01-01 08:55:00'),
('a1b2c3d4-0013-4000-8000-000000000013', 'emp-013', 'emp013@unitas.com', '$2b$12$T7sdfg8sdfg8sdfg8sdGHJweYxZp3', '@coyote.internal', 'ACTIVE', 1, '2026-02-23 10:09:09', 'https://cdn.unitas-platform.com/profiles/emp-013.png', '2026-01-01 09:00:00'),
('a1b2c3d4-0014-4000-8000-000000000014', 'emp-014', 'emp014@unitas.com', '$2b$12$Y8sdfg8sdfg8sdfg8sdWERweYxZp4', '@mariposa.community', 'ACTIVE', 1, '2026-02-20 17:17:17', 'https://cdn.unitas-platform.com/profiles/emp-014.png', '2026-01-01 09:05:00'),
('a1b2c3d4-0015-4000-8000-000000000015', 'emp-015', 'emp015@unitas.com', '$2b$12$U9sdfg8sdfg8sdfg8sdTYUweYxZp5', '@tiburon.growth', 'ACTIVE', 1, '2026-02-27 15:30:30', 'https://cdn.unitas-platform.com/profiles/emp-015.png', '2026-01-01 09:10:00'),
('a1b2c3d4-0016-4000-8000-000000000016', 'emp-016', 'emp016@unitas.com', '$2b$12$I0sdfg8sdfg8sdfg8sdQWEweYxZp6', '@armadillo.validation', 'ACTIVE', 1, '2026-03-01 09:45:00', 'https://cdn.unitas-platform.com/profiles/emp-016.png', '2026-01-01 09:15:00'),
('a1b2c3d4-0017-4000-8000-000000000017', 'emp-017', 'emp017@unitas.com', '$2b$12$O1sdfg8sdfg8sdfg8sdASDweYxZp7', '@mapache.ai', 'ACTIVE', 1, '2026-03-02 13:13:13', 'https://cdn.unitas-platform.com/profiles/emp-017.png', '2026-01-01 09:20:00'),
('a1b2c3d4-0018-4000-8000-000000000018', 'emp-018', 'emp018@unitas.com', '$2b$12$P2sdfg8sdfg8sdfg8sdFGHweYxZp8', '@venado.recruit', 'ACTIVE', 0, NULL, 'https://cdn.unitas-platform.com/profiles/emp-018.png', '2026-01-01 09:25:00'),
('a1b2c3d4-0019-4000-8000-000000000019', 'emp-019', 'emp019@unitas.com', '$2b$12$A3sdfg8sdfg8sdfg8sdJKLweYxZp9', '@camaleon.content', 'DISABLED', 1, '2026-02-22 08:08:08', 'https://cdn.unitas-platform.com/profiles/emp-019.png', '2026-01-01 09:30:00'),
('a1b2c3d4-0020-4000-8000-000000000020', 'emp-020', 'emp020@unitas.com', '$2b$12$S4sdfg8sdfg8sdfg8sdZXCweYxZp0', '@hormiga.support', 'ACTIVE', 1, '2026-02-28 18:18:18', 'https://cdn.unitas-platform.com/profiles/emp-020.png', '2026-01-01 09:35:00');

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
('a1b2c3d4-0001-4000-8000-000000000001', 'role-001'),
('a1b2c3d4-0001-4000-8000-000000000001', 'role-002'),
('a1b2c3d4-0001-4000-8000-000000000001', 'role-003'),
('a1b2c3d4-0002-4000-8000-000000000002', 'role-001'),
('a1b2c3d4-0002-4000-8000-000000000002', 'role-002'),
('a1b2c3d4-0003-4000-8000-000000000003', 'role-001'),
('a1b2c3d4-0004-4000-8000-000000000004', 'role-001'),
('a1b2c3d4-0005-4000-8000-000000000005', 'role-001'),
('a1b2c3d4-0006-4000-8000-000000000006', 'role-001'),
('a1b2c3d4-0006-4000-8000-000000000006', 'role-002'),
('a1b2c3d4-0007-4000-8000-000000000007', 'role-001'),
('a1b2c3d4-0008-4000-8000-000000000008', 'role-001'),
('a1b2c3d4-0009-4000-8000-000000000009', 'role-001'),
('a1b2c3d4-0010-4000-8000-000000000010', 'role-001'),
('a1b2c3d4-0010-4000-8000-000000000010', 'role-002'),
('a1b2c3d4-0011-4000-8000-000000000011', 'role-001'),
('a1b2c3d4-0012-4000-8000-000000000012', 'role-001'),
('a1b2c3d4-0013-4000-8000-000000000013', 'role-001'),
('a1b2c3d4-0014-4000-8000-000000000014', 'role-001'),
('a1b2c3d4-0015-4000-8000-000000000015', 'role-001'),
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
  `title` varchar(150) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `completed_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activity_id`, `project_id`, `employee_id`, `entry_id`, `title`, `description`, `completed_at`) VALUES
('act-001', 'proj-001', 'emp-003', 'de-001', 'Share Component Refactor', 'Refactored share button logic and tracking fixes', '2024-01-12'),
('act-002', 'proj-001', 'emp-003', 'de-002', 'Endorsement Form Update', 'Updated endorsement form and validation schema', '2024-02-03'),
('act-003', 'proj-003', 'emp-004', 'de-003', 'Petition Quality Pipeline', 'Improved validation and scoring logic', '2024-03-18'),
('act-004', 'proj-000', 'emp-005', 'de-004', 'General Refactor Work', 'Miscellaneous improvements and cleanup', '2024-04-07'),
('act-005', 'proj-002', 'emp-006', 'de-005', 'Recruit Share Experiment', 'Implemented A/B test adjustments', '2024-05-22'),
('act-006', 'proj-001', 'emp-001', 'de-006', 'Share Modal Optimization', 'Performance improvements in share modal', '2024-06-30'),
('act-007', 'proj-002', 'emp-002', 'de-007', 'Supporter Dashboard Improvements', 'Optimized dashboard and notifications', '2024-08-14'),
('act-008', 'proj-000', 'emp-007', 'de-008', 'Pipeline Cleanup', 'CI and feature flag cleanup', '2024-09-05'),
('act-009', 'proj-004', 'emp-002', 'de-009', 'Notification Optimization', 'Improved supporter notification batching', '2024-10-19'),
('act-010', 'proj-005', 'emp-005', 'de-010', 'Tracking Audit', 'Cleaned legacy analytics events', '2024-11-11'),
('act-011', 'proj-006', 'emp-006', 'de-011', 'Mobile Share Improvements', 'Optimized mobile share performance', '2025-01-08'),
('act-012', 'proj-007', 'emp-007', 'de-012', 'CI Pipeline Stabilization', 'Improved CI reliability', '2025-02-21'),
('act-013', 'proj-008', 'emp-008', 'de-013', 'Security Hardening', 'Patched dependencies and improved CSP', '2025-03-17'),
('act-014', 'proj-009', 'emp-009', 'de-014', 'Dashboard Query Optimization', 'Reduced dashboard load time', '2025-04-09'),
('act-015', 'proj-010', 'emp-010', 'de-015', 'Design System Migration', 'Migrated to new design tokens', '2025-05-26'),
('act-016', 'proj-011', 'emp-011', 'de-016', 'CRM Sync Refactor', 'Improved CRM sync reliability', '2025-07-02'),
('act-017', 'proj-012', 'emp-012', 'de-017', 'Checkout Optimization', 'Improved checkout conversion', '2025-08-15'),
('act-018', 'proj-013', 'emp-013', 'de-018', 'Admin Panel Improvements', 'Enhanced internal admin tools', '2025-09-28'),
('act-019', 'proj-014', 'emp-014', 'de-019', 'Feed Ranking Tuning', 'Improved community ranking algorithm', '2025-11-06'),
('act-020', 'proj-000', 'emp-015', 'de-020', 'General Cleanup Work', 'Non project specific improvements', '2026-03-20'),
-- 2024
('act-021', 'proj-001', 'emp-001', 'de-021', 'Project Initialization', 'Initial repository setup and tooling configuration', '2024-01-15'),
('act-022', 'proj-007', 'emp-001', 'de-021', 'CI Pipeline Setup', 'Configured CI pipeline with linting and build steps', '2024-01-15'),
('act-023', 'proj-002', 'emp-002', 'de-022', 'Login API Implementation', 'Developed authentication endpoint with JWT', '2024-03-10'),
('act-024', 'proj-002', 'emp-002', 'de-022', 'Authentication Testing', 'Implemented unit tests for login flow', '2024-03-10'),
('act-025', 'proj-003', 'emp-004', 'de-023', 'Validation Engine Refactor', 'Improved validation logic and modularized rules', '2024-06-05'),
('act-026', 'proj-009', 'emp-004', 'de-023', 'Query Optimization', 'Optimized heavy queries for validation engine', '2024-06-05'),
('act-027', 'proj-006', 'emp-006', 'de-024', 'Mobile Layout Fixes', 'Resolved layout issues across mobile devices', '2024-09-12'),
('act-028', 'proj-006', 'emp-006', 'de-024', 'Rendering Optimization', 'Improved rendering performance on low-end devices', '2024-09-12'),
-- 2025
('act-029', 'proj-008', 'emp-008', 'de-025', 'Security Patch Deployment', 'Patched critical vulnerabilities in dependencies', '2025-01-20'),
('act-030', 'proj-008', 'emp-008', 'de-025', 'CSP Hardening', 'Improved content security policy rules', '2025-01-20'),
('act-031', 'proj-010', 'emp-010', 'de-026', 'Design System Migration', 'Migrated components to new design system', '2025-04-18'),
('act-032', 'proj-010', 'emp-010', 'de-026', 'UI Token Refactor', 'Updated styling tokens across UI components', '2025-04-18'),
('act-033', 'proj-012', 'emp-012', 'de-027', 'Checkout Optimization', 'Improved checkout flow performance', '2025-07-30'),
('act-034', 'proj-012', 'emp-012', 'de-027', 'Validation Improvements', 'Enhanced validation logic for payments', '2025-07-30'),
('act-035', 'proj-014', 'emp-014', 'de-028', 'Feed Algorithm Tuning', 'Adjusted ranking weights to improve engagement', '2025-10-11'),
('act-036', 'proj-014', 'emp-014', 'de-028', 'Engagement Experiment', 'Deployed experiment for feed ranking', '2025-10-11'),
-- 2026
('act-037', 'proj-017', 'emp-017', 'de-029', 'Model Training', 'Trained improved AI classification model', '2026-01-05'),
('act-038', 'proj-017', 'emp-017', 'de-029', 'Dataset Cleanup', 'Cleaned dataset for improved accuracy', '2026-01-05'),
('act-039', 'proj-019', 'emp-019', 'de-030', 'Content Template Update', 'Improved petition content templates', '2026-03-15'),
('act-040', 'proj-019', 'emp-019', 'de-030', 'UX Improvements', 'Enhanced readability and flow of templates', '2026-03-15'),
-- de-031 (emp-003 | 2024-02-12)
('act-041', 'proj-001', 'emp-003', 'de-031', 'Share Module Refactor', 'Refactored internal structure of share module for maintainability', '2024-02-12'),
('act-042', 'proj-005', 'emp-003', 'de-031', 'Tracking Bug Fix', 'Resolved duplicate event firing in share tracking', '2024-02-12'),
('act-043', 'proj-005', 'emp-003', 'de-031', 'Analytics Event Standardization', 'Standardized naming conventions for analytics events', '2024-02-12'),
('act-044', 'proj-001', 'emp-003', 'de-031', 'Unit Test Implementation', 'Added unit tests for share logic and tracking flows', '2024-02-12'),
('act-045', 'proj-007', 'emp-003', 'de-031', 'Pull Request Reviews', 'Reviewed and provided feedback on multiple team PRs', '2024-02-12'),
-- de-032 (emp-005 | 2024-05-20)
('act-046', 'proj-005', 'emp-005', 'de-032', 'Legacy Utils Cleanup', 'Removed unused helper functions from utils module', '2024-05-20'),
('act-047', 'proj-005', 'emp-005', 'de-032', 'Null Pointer Bug Fix', 'Fixed null pointer exception in utility service', '2024-05-20'),
('act-048', 'proj-009', 'emp-005', 'de-032', 'Logging Improvement', 'Improved logging format for better debugging visibility', '2024-05-20'),
('act-049', 'proj-005', 'emp-005', 'de-032', 'Deprecated Services Removal', 'Removed outdated and unused backend services', '2024-05-20'),
('act-050', 'proj-003', 'emp-005', 'de-032', 'API Debugging Support', 'Assisted team in debugging API integration issue', '2024-05-20'),
-- de-033 (emp-007 | 2024-08-18)
('act-051', 'proj-007', 'emp-007', 'de-033', 'Flaky Test Fix', 'Resolved instability in integration test suite', '2024-08-18'),
('act-052', 'proj-007', 'emp-007', 'de-033', 'CI Cache Optimization', 'Improved caching strategy reducing pipeline runtime', '2024-08-18'),
('act-053', 'proj-007', 'emp-007', 'de-033', 'Pipeline Logging Enhancement', 'Added detailed logs for CI pipeline steps', '2024-08-18'),
('act-054', 'proj-007', 'emp-007', 'de-033', 'Pipeline Performance Improvement', 'Reduced CI pipeline execution time by optimizing steps', '2024-08-18'),
('act-055', 'proj-007', 'emp-007', 'de-033', 'Nightly Job Investigation', 'Investigated intermittent failures in nightly jobs', '2024-08-18'),
-- de-034 (emp-009 | 2025-02-11)
('act-056', 'proj-009', 'emp-009', 'de-034', 'Database Indexing', 'Added indexes to optimize heavy database queries', '2025-02-11'),
('act-057', 'proj-009', 'emp-009', 'de-034', 'Query Optimization', 'Improved SQL joins and reduced query execution time', '2025-02-11'),
('act-058', 'proj-009', 'emp-009', 'de-034', 'Performance Testing', 'Tested database performance under simulated load', '2025-02-11'),
('act-059', 'proj-009', 'emp-009', 'de-034', 'Dashboard Query Update', 'Updated dashboard queries to use optimized structures', '2025-02-11'),
('act-060', 'proj-018', 'emp-009', 'de-034', 'Analytics Dashboard Validation', 'Validated dashboard metrics after query improvements', '2025-02-11');

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
  `ended_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collaboration`
--

INSERT INTO `collaboration` (`collaboration_id`, `project_id`, `employee_id`, `description`, `started_at`, `ended_at`) VALUES
('col-001', 'proj-001', 'emp-001', 'Leading starter share optimization initiatives.', '2026-01-01 00:00:00', NULL),
('col-002', 'proj-001', 'emp-002', 'Supporting UI improvements for share flow.', '2026-01-03 00:00:00', NULL),
('col-003', 'proj-001', 'emp-019', 'Content adjustments for petition share copy.', '2026-01-05 00:00:00', '2026-02-20 00:00:00'),
('col-004', 'proj-002', 'emp-006', 'Designing A/B tests for recruit shares.', '2026-01-01 00:00:00', NULL),
('col-005', 'proj-002', 'emp-018', 'Recruit funnel metrics tracking.', '2026-01-02 00:00:00', NULL),
('col-006', 'proj-003', 'emp-004', 'Improving petition validation UI.', '2026-01-01 00:00:00', NULL),
('col-007', 'proj-003', 'emp-016', 'Backend validation logic updates.', '2026-01-02 00:00:00', NULL),
('col-008', 'proj-003', 'emp-003', 'Frontend optimization tasks.', '2026-01-04 00:00:00', '2026-02-18 00:00:00'),
('col-009', 'proj-004', 'emp-002', 'Notification logic redesign.', '2026-01-01 00:00:00', NULL),
('col-010', 'proj-004', 'emp-020', 'Support automation enhancements.', '2026-01-02 00:00:00', NULL),
('col-011', 'proj-005', 'emp-005', 'API reliability improvements.', '2026-01-01 00:00:00', NULL),
('col-012', 'proj-005', 'emp-010', 'Dashboard metrics alignment.', '2026-01-03 00:00:00', NULL),
('col-013', 'proj-006', 'emp-009', 'Mobile share performance fixes.', '2026-01-01 00:00:00', '2026-02-25 00:00:00'),
('col-014', 'proj-006', 'emp-006', 'Growth validation for mobile tests.', '2026-01-02 00:00:00', '2026-02-25 00:00:00'),
('col-015', 'proj-007', 'emp-007', 'CI/CD stability improvements.', '2026-01-01 00:00:00', '2026-02-28 00:00:00'),
('col-016', 'proj-007', 'emp-005', 'Backend deployment fixes.', '2026-01-03 00:00:00', '2026-02-28 00:00:00'),
('col-017', 'proj-008', 'emp-008', 'Security hardening implementation.', '2026-01-01 00:00:00', NULL),
('col-018', 'proj-008', 'emp-007', 'Infrastructure audit support.', '2026-01-04 00:00:00', NULL),
('col-019', 'proj-009', 'emp-010', 'Dashboard query optimization.', '2026-01-01 00:00:00', '2026-02-20 00:00:00'),
('col-020', 'proj-009', 'emp-005', 'API response tuning.', '2026-01-02 00:00:00', '2026-02-20 00:00:00'),
('col-021', 'proj-010', 'emp-004', 'Design system components v2.', '2026-01-01 00:00:00', NULL),
('col-022', 'proj-010', 'emp-001', 'Integration of shared components.', '2026-01-02 00:00:00', NULL),
('col-023', 'proj-011', 'emp-011', 'CRM sync reliability updates.', '2026-01-01 00:00:00', NULL),
('col-024', 'proj-011', 'emp-013', 'Internal tool adjustments.', '2026-01-03 00:00:00', NULL),
('col-025', 'proj-012', 'emp-012', 'Checkout conversion optimization.', '2026-01-01 00:00:00', '2026-02-24 00:00:00'),
('col-026', 'proj-012', 'emp-015', 'Growth experiment analysis.', '2026-01-03 00:00:00', '2026-02-24 00:00:00'),
('col-027', 'proj-013', 'emp-013', 'Admin panel feature expansion.', '2026-01-01 00:00:00', NULL),
('col-028', 'proj-013', 'emp-011', 'CRM admin tools support.', '2026-01-02 00:00:00', NULL),
('col-029', 'proj-014', 'emp-014', 'Community ranking improvements.', '2026-01-01 00:00:00', NULL),
('col-030', 'proj-014', 'emp-019', 'Content structure optimization.', '2026-01-04 00:00:00', NULL),
('col-031', 'proj-015', 'emp-015', 'Growth experimentation strategy.', '2026-01-01 00:00:00', NULL),
('col-032', 'proj-015', 'emp-006', 'A/B test technical setup.', '2026-01-03 00:00:00', NULL),
('col-033', 'proj-016', 'emp-016', 'Validation engine rebuild.', '2026-01-01 00:00:00', NULL),
('col-034', 'proj-016', 'emp-004', 'UI validation messaging updates.', '2026-01-02 00:00:00', NULL),
('col-035', 'proj-017', 'emp-017', 'AI classification development.', '2026-01-01 00:00:00', NULL),
('col-036', 'proj-017', 'emp-001', 'Integration of AI responses.', '2026-01-02 00:00:00', NULL),
('col-037', 'proj-018', 'emp-018', 'Recruit funnel metrics design.', '2026-01-01 00:00:00', NULL),
('col-038', 'proj-018', 'emp-006', 'Growth experimentation link.', '2026-01-02 00:00:00', NULL),
('col-039', 'proj-019', 'emp-019', 'Petition content optimization.', '2026-01-01 00:00:00', NULL),
('col-040', 'proj-019', 'emp-010', 'Analytics alignment.', '2026-01-02 00:00:00', NULL),
('col-041', 'proj-000', 'emp-005', 'General maintenance tasks.', '2026-01-01 00:00:00', NULL),
('col-042', 'proj-000', 'emp-020', 'Support automation improvements.', '2026-01-02 00:00:00', NULL),
('col-043', 'proj-000', 'emp-003', 'Unassigned operational tasks.', '2026-01-03 00:00:00', NULL),
('col-044', 'proj-001', 'emp-006', 'Growth validation for shares.', '2026-01-10 00:00:00', NULL),
('col-045', 'proj-004', 'emp-014', 'Community engagement alignment.', '2026-01-12 00:00:00', NULL),
('col-046', 'proj-010', 'emp-008', 'Security review of components.', '2026-01-15 00:00:00', NULL),
('col-047', 'proj-003', 'emp-010', 'Analytics support for validation.', '2026-01-16 00:00:00', NULL),
('col-048', 'proj-015', 'emp-002', 'Experiment support on UX copy.', '2026-01-18 00:00:00', NULL),
('col-049', 'proj-018', 'emp-017', 'AI analytics cross-support.', '2026-01-20 00:00:00', NULL),
('col-050', 'proj-019', 'emp-001', 'Frontend content rendering updates.', '2026-01-22 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dailyentry`
--

CREATE TABLE `dailyentry` (
  `entry_id` char(36) NOT NULL,
  `employee_id` char(36) NOT NULL,
  `entry_date` date NOT NULL,
  `to_do` varchar(500) NOT NULL,
  `done` varchar(500) NOT NULL,
  `blockers` varchar(500) NOT NULL,
  `slack_standup_URL` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dailyentry`
--

INSERT INTO `dailyentry` (`entry_id`, `employee_id`, `entry_date`, `to_do`, `done`, `blockers`, `slack_standup_URL`) VALUES
('de-001', 'emp-003', '2026-02-01', '- Refactor share button logic\n- Improve share tracking analytics\n- Add unit tests for share component', '- Updated shared component previously developed by Vaquita Squad\n- Fixed double firing event on share click\n- Adjusted copy based on last marketing review\n- Reviewed PRs from Axolotl Squad', '- Waiting confirmation from analytics team about event naming convention\n- Need final decision on tracking schema', 'http://slack.com/standup/1'),
('de-002', 'emp-003', '2026-02-02', '- Finalize endorsement form validations\n- Sync with design about spacing issues\n- Prepare demo for sprint review', '- Updated Add Endorsement Form logic\n- Matched copies with latest figma designs\n- Refactored validation schema\n- Removed deprecated helper functions', '- Minor UI misalignment in Safari\n- Need clarification on recruit share metric definition', 'http://slack.com/standup/2'),
('de-003', 'emp-004', '2026-02-01', '- Improve petition validation rules\n- Add quality scoring threshold\n- Review duplicate detection logic', '- Updated confirmation modal copies\n- Implemented new petition validation pipeline\n- Added scoring weight for verified emails\n- Cleaned up legacy quality rules\n- Created migration for new quality flag', '- Need dataset sample from analytics for edge cases', 'http://slack.com/standup/3'),
('de-004', 'emp-005', '2026-02-01', '- General bug fixing\n- Code cleanup\n- Sync meeting follow ups', '- Fixed random console errors in dev\n- Minor refactor in utils folder\n- Removed unused imports\n- Team sync meeting\n- Helped Venado Squad with quick backend question', '- None at the moment', 'http://slack.com/standup/4'),
('de-005', 'emp-006', '2026-02-03', '- Analyze recruit share funnel\n- Adjust CTA experiment\n- Prepare A/B test config', '- Increased recruit share visibility on mobile\n- Adjusted CTA copy for clarity\n- Deployed experiment flag\n- Synced with Axolotl Squad about experiment scope', '- Waiting for experiment results baseline\n- Need confirmation on metric definition for share recruits', 'http://slack.com/standup/5'),
('de-006', 'emp-001', '2026-02-03', '- Improve share modal performance\n- Reduce render blocking\n- Align with marketing copy changes', '- Reduced bundle size of share component\n- Lazy loaded tracking module\n- Updated copy for new starter messaging\n- Tested share flow on staging\n- Verified tracking events in GA', '- Tracking delay still inconsistent in Safari', 'http://slack.com/standup/6'),
('de-007', 'emp-002', '2026-02-04', '- Improve supporter dashboard metrics\n- Refactor supporter notifications\n- Add loading states', '- Updated supporter dashboard cards\n- Optimized notification fetch logic\n- Added skeleton loaders\n- Fixed small bug in supporter badge logic\n- Reviewed PR from Tiburón Squad', '- Need API contract clarification from Tortuga Squad', 'http://slack.com/standup/7'),
('de-008', 'emp-007', '2026-02-04', '- Review deployment pipeline\n- Improve logging\n- Cleanup old feature flags', '- Updated CI pipeline\n- Cleaned old experiment flags\n- Improved logging for share events\n- Short sync with Growth team\n- Investigated flaky test case', '- Flaky test still failing intermittently', 'http://slack.com/standup/8'),
('de-009', 'emp-002', '2026-02-05', '- Refactor notification trigger logic\n- Improve batching strategy\n- Add monitoring logs', '- Reduced duplicate notification bug\n- Improved batching performance\n- Added monitoring hooks\n- Updated notification copy\n- Tested edge cases with delayed events', '- Waiting confirmation from backend about retry policy', 'http://slack.com/standup/9'),
('de-010', 'emp-005', '2026-02-05', '- Audit tracking events\n- Remove legacy events\n- Align analytics naming', '- Removed deprecated share events\n- Updated GA event mapping\n- Synced with analytics team\n- Verified production logs\n- Cleaned old feature flags', '- Analytics dashboard delay still present', 'http://slack.com/standup/10'),
('de-011', 'emp-006', '2026-02-06', '- Optimize mobile share modal\n- Improve rendering performance\n- Test on low-end devices', '- Reduced re-renders\n- Improved lazy loading\n- Updated CSS transitions\n- Tested on Android staging\n- Improved Lighthouse score', '- iOS Safari animation glitch remains', 'http://slack.com/standup/11'),
('de-012', 'emp-007', '2026-02-06', '- Stabilize flaky tests\n- Improve CI caching\n- Review pipeline config', '- Fixed environment variable bug\n- Optimized cache layers\n- Cleaned unused pipeline steps\n- Reviewed deployment logs\n- Documented pipeline flow', '- Random timeout still happening in nightly job', 'http://slack.com/standup/12'),
('de-013', 'emp-008', '2026-02-07', '- Run dependency audit\n- Patch vulnerabilities\n- Improve CSP headers', '- Updated vulnerable npm packages\n- Added stricter CSP rules\n- Tested auth flow under new policy\n- Documented security checklist\n- Synced with backend team', '- Awaiting penetration test results', 'http://slack.com/standup/13'),
('de-014', 'emp-009', '2026-02-07', '- Optimize heavy queries\n- Add DB indexes\n- Improve dashboard loading time', '- Added composite index for dashboard query\n- Reduced load time by 30%\n- Cleaned inefficient joins\n- Tested under production load\n- Updated monitoring dashboard', '- Need DBA approval before final deploy', 'http://slack.com/standup/14'),
('de-015', 'emp-010', '2026-02-08', '- Refactor button component\n- Improve accessibility labels\n- Update typography scale', '- Migrated buttons to new token system\n- Improved aria-label usage\n- Updated typography scale\n- Synced with design team\n- Fixed icon alignment issue', '- Some legacy pages still using old button version', 'http://slack.com/standup/15'),
('de-016', 'emp-011', '2026-02-08', '- Refactor CRM sync job\n- Improve retry strategy\n- Add monitoring alerts', '- Improved retry backoff logic\n- Fixed duplicated CRM records issue\n- Added monitoring alert\n- Tested with staging CRM\n- Cleaned legacy sync handlers', '- Need confirmation from CRM provider about API limits', 'http://slack.com/standup/16'),
('de-017', 'emp-012', '2026-02-09', '- Optimize checkout flow\n- Improve payment validation\n- Add loading states', '- Reduced checkout step time\n- Improved validation error messages\n- Added skeleton loaders\n- Fixed payment retry bug\n- Synced with payments provider', '- Pending confirmation for 3DS fallback scenario', 'http://slack.com/standup/17'),
('de-018', 'emp-013', '2026-02-09', '- Improve admin filters\n- Add role-based restrictions\n- Refactor settings page', '- Implemented advanced filters\n- Restricted admin settings by role\n- Improved layout responsiveness\n- Fixed session timeout issue\n- Updated internal documentation', '- Minor styling bug in Firefox', 'http://slack.com/standup/18'),
('de-019', 'emp-014', '2026-02-10', '- Improve feed ranking algorithm\n- Adjust content weighting\n- Add moderation flags', '- Tuned ranking weights\n- Added moderation toggle\n- Fixed pagination issue\n- Improved API response time\n- Synced with content team', '- Awaiting final KPI baseline from analytics', 'http://slack.com/standup/19'),
('de-020', 'emp-015', '2026-02-10', '- General code cleanup\n- Small UI tweaks\n- Sync meetings\n- Review open PRs', '- Fixed minor styling issues\n- Reviewed 4 pull requests\n- Cleaned deprecated utils\n- Short planning session with team\n- Investigated bug report without clear scope', '- No blockers, just waiting prioritization', 'http://slack.com/standup/20'),
('de-021', 'emp-001', '2024-01-15', '- Initial project setup\n- Configure repo\n- Setup CI', '- Initialized repository\n- Configured ESLint and Prettier\n- Setup basic CI pipeline', '- Waiting on infra credentials', 'http://slack.com/standup/21'),
('de-022', 'emp-002', '2024-03-10', '- Implement login API\n- Add validation\n- Write tests', '- Created login endpoint\n- Added JWT auth\n- Wrote unit tests', '- Need security review', 'http://slack.com/standup/22'),
('de-023', 'emp-004', '2024-06-05', '- Improve validation engine\n- Refactor scoring\n- Optimize queries', '- Refactored validation rules\n- Improved scoring accuracy\n- Optimized SQL queries', '- Missing dataset samples', 'http://slack.com/standup/23'),
('de-024', 'emp-006', '2024-09-12', '- Mobile UI fixes\n- Optimize rendering\n- Test devices', '- Fixed mobile layout issues\n- Improved rendering speed\n- Tested on Android', '- iOS issues remain', 'http://slack.com/standup/24'),
('de-025', 'emp-008', '2025-01-20', '- Security audit\n- Fix vulnerabilities\n- Update dependencies', '- Patched vulnerabilities\n- Updated dependencies\n- Improved CSP headers', '- Awaiting final audit approval', 'http://slack.com/standup/25'),
('de-026', 'emp-010', '2025-04-18', '- Design system migration\n- Update components\n- Sync with design', '- Migrated core components\n- Updated tokens\n- Fixed UI inconsistencies', '- Legacy components pending', 'http://slack.com/standup/26'),
('de-027', 'emp-012', '2025-07-30', '- Improve checkout\n- Add validation\n- Optimize flow', '- Reduced checkout errors\n- Improved validation\n- Optimized API calls', '- Payment provider delay', 'http://slack.com/standup/27'),
('de-028', 'emp-014', '2025-10-11', '- Improve feed algorithm\n- Tune weights\n- Test engagement', '- Adjusted ranking weights\n- Improved engagement metrics\n- Deployed experiment', '- Need analytics confirmation', 'http://slack.com/standup/28'),
('de-029', 'emp-017', '2026-01-05', '- Improve AI classification\n- Train model\n- Evaluate results', '- Improved model accuracy\n- Cleaned dataset\n- Deployed new model', '- Need more training data', 'http://slack.com/standup/29'),
('de-030', 'emp-019', '2026-03-15', '- Optimize content templates\n- Improve UX\n- Test flows', '- Updated templates\n- Improved readability\n- Tested user flows', '- Awaiting product approval', 'http://slack.com/standup/30'),
('de-031', 'emp-003', '2024-02-12',
'- Refactor share module\n- Fix tracking bugs\n- Improve analytics events\n- Add unit tests\n- Review PRs',
'- Refactored share module structure\n- Fixed duplicate tracking events\n- Standardized analytics naming\n- Added unit tests for share logic\n- Reviewed 3 PRs from team',
'- Pending analytics validation for new events',
'http://slack.com/standup/31'),
('de-032', 'emp-005', '2024-05-20',
'- Cleanup legacy utils\n- Fix minor bugs\n- Improve logging\n- Remove deprecated functions\n- Assist team',
'- Removed unused helper functions\n- Fixed null pointer bug in utils\n- Improved logging format\n- Deleted deprecated services\n- Helped team debug API issue',
'- None',
'http://slack.com/standup/32'),
('de-033', 'emp-007', '2024-08-18',
'- Improve CI pipeline\n- Fix flaky tests\n- Optimize caching\n- Add logs\n- Review pipeline failures',
'- Fixed flaky integration test\n- Improved cache strategy\n- Added detailed logs\n- Reduced pipeline time by 20%\n- Investigated failing nightly job',
'- Intermittent timeout still present',
'http://slack.com/standup/33'),
('de-034', 'emp-009', '2025-02-11',
'- Optimize DB queries\n- Add indexes\n- Improve joins\n- Test performance\n- Update dashboards',
'- Added indexes to heavy tables\n- Optimized joins in reports\n- Reduced query time significantly\n- Updated dashboard queries\n- Tested under load',
'- DBA approval pending',
'http://slack.com/standup/34'),
('de-035', 'emp-011', '2025-06-25',
'- Improve CRM sync\n- Fix duplication\n- Add retry logic\n- Monitor jobs\n- Refactor services',
'- Fixed duplicated records issue\n- Implemented retry backoff\n- Added monitoring alerts\n- Refactored sync service\n- Tested edge cases',
'- Waiting CRM API rate limits confirmation',
'http://slack.com/standup/35'),
('de-036', 'emp-013', '2025-09-09',
'- Improve admin panel\n- Add filters\n- Fix permissions\n- Refactor UI\n- Improve responsiveness',
'- Added advanced filters\n- Fixed role-based access issues\n- Improved UI layout\n- Enhanced responsiveness\n- Cleaned legacy code',
'- Minor UI bug in Safari',
'http://slack.com/standup/36'),
('de-037', 'emp-015', '2025-12-01',
'- Code cleanup\n- Fix UI bugs\n- Review PRs\n- Improve styles\n- Sync with team',
'- Fixed UI alignment issues\n- Cleaned CSS\n- Reviewed 5 PRs\n- Improved button styles\n- Participated in planning meeting',
'- No blockers',
'http://slack.com/standup/37'),
('de-038', 'emp-016', '2026-01-20',
'- Improve validation heuristics\n- Tune scoring\n- Add rules\n- Test edge cases\n- Document changes',
'- Tuned validation weights\n- Added heuristic rules\n- Improved scoring accuracy\n- Tested edge cases\n- Updated documentation',
'- Need more real-world samples',
'http://slack.com/standup/38'),
('de-039', 'emp-018', '2026-02-14',
'- Improve analytics funnel\n- Fix tracking gaps\n- Add segmentation\n- Test reports\n- Sync with product',
'- Fixed missing funnel steps\n- Added segmentation filters\n- Improved report accuracy\n- Tested analytics dashboards\n- Synced with product team',
'- Data delay in pipeline',
'http://slack.com/standup/39'),
('de-040', 'emp-020', '2026-03-10',
'- Automate processes\n- Write scripts\n- Reduce manual work\n- Test automation\n- Deploy scripts',
'- Created automation scripts\n- Reduced manual workload\n- Tested scripts in staging\n- Deployed automation\n- Documented processes',
'- Need monitoring for failures',
'http://slack.com/standup/40');
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
('emp-002', 'team-002', '2026-01-01 00:00:00', NULL, 'LEAD'),
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
('AUTH-01', 'Sign in', NULL),
('AUTH-02', 'Sign out', NULL),
('AUTH-03', 'Recover password', NULL),
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
  `status` enum('PLANNED','IN PROGRESS','ON HOLD','COMPLETED','CANCELLED') NOT NULL,
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
  `description` varchar(2500) NOT NULL,
  `type` enum('EMPLOYEE','TEAM','PROJECT') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prompt`
--

INSERT INTO `prompt` (`prompt_id`, `name`, `description`, `type`) VALUES
('prompt-001', 'Employee Performance', 'Generates individual employee performance report', 'EMPLOYEE'),
('prompt-002', 'Team Performance', 'Generates team performance report', 'TEAM'),
('prompt-003', 'Project Performance', 'Generates project performance report', 'PROJECT');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` char(36) NOT NULL,
  `generated_by_employee_id` char(36) NOT NULL,
  `content_id` varchar(36) NOT NULL,
  `content_type` enum('EMPLOYEE','TEAM','PROJECT') NOT NULL,
  `prompt_id` char(36) NOT NULL,
  `period_start` date NOT NULL,
  `period_end` date NOT NULL,
  `created_at` datetime NOT NULL,
  `content_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content_json`)),
  `filters_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`filters_json`)),
  `input_snapshot_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`input_snapshot_json`)),
  `model_name` varchar(100) NOT NULL,
  `model_version` varchar(50) NOT NULL,
  `ai_output_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`report_id`, `generated_by_employee_id`, `content_id`, `content_type`, `prompt_id`, `period_start`, `period_end`, `created_at`, `content_json`, `filters_json`, `input_snapshot_json`, `model_name`, `model_version`, `ai_output_text`) VALUES
('proj-020', 'emp-001', 'emp-001', 'EMPLOYEE', 'prompt-001', '2024-02-01', '2024-02-28', '2026-03-03 22:33:58', '{\"tickets_cerrados\": 12, \"horas_invertidas\": 40, \"eficiencia\": \"95%\"}', '{\"department\": \"Engineering\"}', '{\"raw_data_points\": 150}', 'GPT-4', 'Turbo-2024', 'El empleado ha mostrado un excelente desempeño este mes, superando la meta de tickets por un 20% y manteniendo bloqueos mínimos.'),
('rep-001', 'emp-001', 'emp-001', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-01 10:00:00', '{\"employee_id\":\"emp-001\",\"projects\":[\"proj-001\",\"proj-010\",\"proj-017\"],\"goals_summary\":{\"completed\":2,\"in_progress\":1},\"highlights_count\":3,\"achievements_count\":1}', '{\"include_goals\":true,\"include_highlights\":true,\"include_achievements\":true,\"projects_filter\":[],\"teams_filter\":[]}', '{\"daily_entries_analyzed\":18,\"activities_generated\":124,\"collaborations_count\":3,\"period_start\":\"2026-02-01\",\"period_end\":\"2026-02-28\"}', 'gpt-4.1-mini', '1.0.2', 'During February 2026, the employee demonstrated consistent contribution across multiple strategic initiatives including Starter Share Optimization and Design System v2. The overall productivity metrics indicate strong engagement with daily operational tasks and cross-team collaboration. Two goals were successfully completed within the defined timeframe, contributing directly to measurable improvements in share conversion metrics. One ongoing objective remains aligned with Q1 growth targets. The employee also contributed to AI integration efforts, supporting experimentation workflows and improving internal component reuse. Communication and cross-functional coordination were noted as strong, particularly in collaborative validation efforts. Areas for improvement include documentation consistency and earlier risk flagging in cross-team dependencies.'),
('rep-002', 'emp-002', 'team-002', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-01 11:00:00', '{\"team_id\":\"team-002\",\"projects\":[\"proj-004\",\"proj-015\"],\"members\":3,\"goals_active\":2,\"completed_milestones\":1}', '{\"include_member_summaries\":true,\"include_goal_progress\":true,\"include_velocity_metrics\":true}', '{\"aggregated_daily_entries\":42,\"aggregated_activities\":267,\"team_collaborations\":5,\"period\":\"2026-02\"}', 'gpt-4.1-mini', '1.0.2', 'Throughout February 2026, Vaquita Squad maintained steady progress across its primary engagement initiatives. The team contributed to improvements in notification systems and experiment validation frameworks. One milestone was completed ahead of schedule, reflecting effective coordination between backend and growth functions. Team velocity remained stable compared to January, with increased collaboration density across multiple projects. Areas identified for optimization include reducing dependency wait times and formalizing retrospective documentation. Overall performance aligns positively with quarterly objectives.'),
('rep-003', 'emp-006', 'proj-002', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-01 12:00:00', '{\"project_id\":\"proj-002\",\"teams_involved\":[\"team-006\",\"team-018\"],\"active_collaborators\":2,\"goals\":{\"total\":3,\"completed\":1,\"in_progress\":2}}', '{\"include_team_breakdown\":true,\"include_goal_analysis\":true,\"include_risk_section\":true}', '{\"daily_entries\":31,\"activities_classified\":188,\"cross_team_dependencies\":4}', 'gpt-4.1', '2.1.0', 'The Recruit Share Growth initiative demonstrated measurable improvements in experiment coverage and analytical depth during February 2026. A total of 31 daily entries were analyzed, producing 188 classified activities that contributed to structured experimentation cycles. One strategic goal was completed, leading to a 3.2% increase in recruit share rate compared to the previous baseline. Two goals remain in progress and are forecasted to close within Q1. Identified risks include data latency issues in funnel attribution and temporary misalignment in UX messaging consistency. Overall project health is considered stable with upward momentum.'),
('rep-004', 'emp-004', 'emp-004', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-01 13:00:00', '{\"employee_id\":\"emp-004\",\"projects\":[\"proj-003\",\"proj-010\",\"proj-016\"],\"goals_summary\":{\"completed\":1,\"in_progress\":2},\"highlight_count\":2}', '{\"include_goals\":true,\"include_highlights\":true,\"include_peer_feedback\":false}', '{\"daily_entries_analyzed\":21,\"activities_generated\":143,\"collaborations\":3}', 'gpt-4.1-mini', '1.0.2', 'The employee focused primarily on UI validation improvements and design system enhancements throughout February. One goal related to validation error messaging was completed successfully. Two additional goals remain active, including improvements in accessibility compliance and cross-device component consistency. Productivity metrics reflect a high activity density with structured task categorization. Collaboration with backend validation teams was consistent and constructive. Improvement opportunities include earlier UX testing cycles and increased cross-squad documentation alignment.'),
('rep-005', 'emp-015', 'proj-015', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-01 14:00:00', '{\"project_id\":\"proj-015\",\"teams\":[\"team-015\",\"team-006\",\"team-012\"],\"active_experiments\":4,\"completed_experiments\":2}', '{\"include_experiment_metrics\":true,\"include_growth_impact\":true}', '{\"daily_entries\":37,\"activities\":221,\"collaborators\":3,\"risk_flags\":1}', 'gpt-4.1', '2.1.0', 'High Impact Growth Tests progressed significantly during February with four active experiments and two successful experiment closures. Data indicates early positive trends in petition share conversion and checkout completion rates. Cross-functional alignment between growth and analytics teams improved iteration speed. One minor risk was detected related to inconsistent segmentation tagging, currently under mitigation. Overall project trajectory remains positive with projected KPI uplift exceeding initial quarterly forecasts.'),
('rep-006', 'emp-006', 'emp-006', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-02 09:00:00', '{\"employee_id\":\"emp-006\",\"projects\":[\"proj-001\",\"proj-002\",\"proj-015\",\"proj-018\"],\"goals_summary\":{\"completed\":1,\"in_progress\":2},\"collaboration_intensity\":\"high\"}', '{\"include_goals\":true,\"include_growth_metrics\":true,\"include_cross_project_analysis\":true}', '{\"daily_entries_analyzed\":24,\"activities_generated\":176,\"collaborations\":4,\"experiments_supported\":5}', 'gpt-4.1', '2.1.0', 'During February, the employee played a central role in multiple growth initiatives including Recruit Share Growth and High Impact Experiments. Analytical contributions directly influenced experiment prioritization and validation methodology. One goal was completed while two remain active and on track. Collaboration levels were significantly above team average, reflecting cross-functional leadership in experimentation workflows. Overall contribution is categorized as strategically impactful.'),
('rep-007', 'emp-010', 'team-010', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-02 10:00:00', '{\"team_id\":\"team-010\",\"projects\":[\"proj-005\",\"proj-009\",\"proj-019\"],\"members\":3,\"analytics_requests\":14}', '{\"include_kpi_summary\":true,\"include_member_breakdown\":true}', '{\"daily_entries_aggregated\":39,\"activities_total\":233,\"performance_delta_vs_january\":\"+8%\"}', 'gpt-4.1-mini', '1.0.2', 'Búho Squad maintained consistent analytical support across three major initiatives. Dashboard performance improvements and content optimization metrics showed measurable gains compared to January. Activity classification density increased, and cross-team response times improved by approximately eight percent. Continued focus on data consistency and visualization standardization is recommended.'),
('rep-008', 'emp-004', 'proj-016', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-02 11:00:00', '{\"project_id\":\"proj-016\",\"teams\":[\"team-016\",\"team-004\"],\"validation_rules_updated\":12,\"ui_updates\":7}', '{\"include_risk_section\":true,\"include_validation_metrics\":true}', '{\"daily_entries\":28,\"activities_classified\":165,\"bug_reports_closed\":9}', 'gpt-4.1', '2.1.0', 'The Petition Validation Engine project progressed steadily with twelve backend rule updates and seven UI adjustments deployed. Classification accuracy improved and validation feedback clarity increased for end users. Remaining risk involves rule overlap scenarios that require further automated testing. Overall project health is positive and aligned with roadmap expectations.'),
('rep-009', 'emp-002', 'emp-002', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-02 12:00:00', '{\"employee_id\":\"emp-002\",\"projects\":[\"proj-001\",\"proj-004\",\"proj-015\"],\"goals\":{\"completed\":1,\"in_progress\":1},\"team_role\":\"LEAD\"}', '{\"include_goal_tracking\":true,\"include_team_influence\":true}', '{\"daily_entries\":20,\"activities\":138,\"collaborations\":3}', 'gpt-4.1-mini', '1.0.2', 'The employee maintained strong involvement in share optimization and notification redesign initiatives. Leadership responsibilities were evident in coordination tasks and milestone planning. One goal was successfully achieved, contributing to incremental performance improvements. Continued focus on documentation clarity will further enhance cross-squad efficiency.'),
('rep-010', 'emp-014', 'team-014', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-02 13:00:00', '{\"team_id\":\"team-014\",\"projects\":[\"proj-014\",\"proj-005\"],\"members\":2,\"community_features_released\":3}', '{\"include_release_notes\":true,\"include_goal_alignment\":true}', '{\"daily_entries_aggregated\":26,\"activities_total\":149,\"engagement_delta\":\"+5%\"}', 'gpt-4.1-mini', '1.0.2', 'Mariposa Squad focused on community feed enhancements and cross-project support tasks. Three incremental feature updates were deployed, contributing to measurable engagement improvements. Collaboration with analytics ensured metric validation. Future attention should address scalability of ranking logic under increased traffic conditions.'),
('rep-011', 'emp-007', 'proj-008', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-02 14:00:00', '{\"project_id\":\"proj-008\",\"security_patches\":6,\"infra_updates\":4,\"audit_findings_resolved\":3}', '{\"include_compliance_status\":true,\"include_security_metrics\":true}', '{\"daily_entries\":22,\"activities\":117,\"risk_level\":\"moderate\"}', 'gpt-4.1', '2.1.0', 'Security Audit 2026 advanced with six patches deployed and multiple infrastructure reinforcements. Three previously identified vulnerabilities were resolved. Audit progression remains on track, though moderate risk remains regarding dependency update timelines. Overall compliance posture has improved significantly.'),
('rep-012', 'emp-011', 'emp-011', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-02 15:00:00', '{\"employee_id\":\"emp-011\",\"projects\":[\"proj-011\",\"proj-013\"],\"goals\":{\"completed\":0,\"in_progress\":2}}', '{\"include_goal_details\":true}', '{\"daily_entries\":19,\"activities\":121,\"collaborations\":2}', 'gpt-4.1-mini', '1.0.2', 'CRM synchronization and internal tool enhancements were the primary focus areas. Although no goals were fully completed during this period, consistent progress was recorded across both initiatives. Data consistency and error handling robustness improved measurably.'),
('rep-013', 'emp-018', 'proj-018', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-02 16:00:00', '{\"project_id\":\"proj-018\",\"funnel_stages_optimized\":3,\"data_accuracy_delta\":\"+4%\"}', '{\"include_funnel_breakdown\":true}', '{\"daily_entries\":17,\"activities\":98}', 'gpt-4.1', '2.1.0', 'Recruit Funnel Analytics saw incremental improvements across three optimized stages. Data reliability increased and reporting latency decreased. Further work will focus on segmentation refinement and automated anomaly detection.'),
('rep-014', 'emp-015', 'emp-015', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-02 17:00:00', '{\"employee_id\":\"emp-015\",\"projects\":[\"proj-012\",\"proj-015\"],\"goals\":{\"completed\":1,\"in_progress\":1}}', '{\"include_growth_metrics\":true}', '{\"daily_entries\":23,\"activities\":162}', 'gpt-4.1-mini', '1.0.2', 'Growth experimentation leadership remained strong with one key milestone achieved in checkout optimization. Performance uplift trends indicate sustainable improvements. Continued monitoring of experiment maturity is recommended.'),
('rep-015', 'emp-019', 'team-019', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-02 18:00:00', '{\"team_id\":\"team-019\",\"projects\":[\"proj-001\",\"proj-014\",\"proj-019\"],\"content_updates\":18}', '{\"include_content_metrics\":true}', '{\"daily_entries\":29,\"activities\":171}', 'gpt-4.1-mini', '1.0.2', 'Camaleón Squad delivered substantial content optimization efforts across multiple initiatives. Eighteen content updates were deployed, resulting in improved clarity and shareability metrics. Coordination with growth and analytics teams ensured measurable validation of improvements.'),
('rep-016', 'emp-001', 'team-001', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-03 09:00:00', '{\"team_id\":\"team-001\",\"projects\":[\"proj-001\",\"proj-010\",\"proj-017\"],\"members\":3,\"velocity_index\":1.12}', '{\"include_member_performance\":true,\"include_goal_alignment\":true}', '{\"daily_entries_aggregated\":41,\"activities_total\":244,\"collaborations_detected\":6}', 'gpt-4.1-mini', '1.0.2', 'Axolotl Squad maintained strong delivery velocity throughout February, contributing across three strategic initiatives. Component reuse and AI integration tasks improved operational efficiency. Cross-squad alignment was particularly strong in design system adoption and share flow optimization. Minor coordination delays were detected but did not significantly impact milestones.'),
('rep-017', 'emp-006', 'proj-001', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-03 09:45:00', '{\"project_id\":\"proj-001\",\"share_rate_delta\":\"+6%\",\"experiments_run\":3,\"teams_involved\":3}', '{\"include_experiment_metrics\":true,\"include_team_breakdown\":true}', '{\"daily_entries\":36,\"activities\":209,\"risk_flags\":0}', 'gpt-4.1', '2.1.0', 'Starter Share Optimization demonstrated measurable uplift during February, with a six percent increase in share conversion. Three structured experiments were executed and validated. Collaboration between frontend and growth functions significantly reduced iteration cycles. Overall risk profile remains low and performance momentum is positive.'),
('rep-018', 'emp-004', 'emp-016', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-03 10:30:00', '{\"employee_id\":\"emp-016\",\"projects\":[\"proj-003\",\"proj-016\"],\"goals\":{\"completed\":0,\"in_progress\":2},\"bug_fixes\":14}', '{\"include_goal_tracking\":true,\"include_activity_density\":true}', '{\"daily_entries\":22,\"activities\":151,\"collaborations\":2}', 'gpt-4.1-mini', '1.0.2', 'The employee focused on backend validation logic and engine stability improvements. Although no formal goals were completed this period, measurable progress was achieved across rule refactoring tasks and bug resolution. Collaboration with design teams improved error clarity and reduced rework cycles.'),
('rep-019', 'emp-010', 'proj-009', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-03 11:15:00', '{\"project_id\":\"proj-009\",\"query_latency_delta\":\"-18%\",\"dashboards_updated\":5}', '{\"include_performance_metrics\":true}', '{\"daily_entries\":25,\"activities\":140}', 'gpt-4.1', '2.1.0', 'Dashboard Performance optimization efforts reduced query latency by eighteen percent compared to baseline. Five high-traffic dashboards were updated and validated. Backend query tuning and index adjustments contributed significantly to performance gains. Monitoring will continue to ensure stability under peak load.'),
('rep-020', 'emp-015', 'team-015', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-03 12:00:00', '{\"team_id\":\"team-015\",\"projects\":[\"proj-012\",\"proj-015\"],\"active_experiments\":4}', '{\"include_growth_kpis\":true}', '{\"daily_entries\":33,\"activities\":198}', 'gpt-4.1-mini', '1.0.2', 'Tiburón Squad executed multiple growth experiments with structured validation cycles. Early signals suggest improvements in checkout conversion and petition engagement metrics. Experiment documentation practices improved, though statistical validation rigor can be enhanced further.'),
('rep-021', 'emp-007', 'emp-007', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-03 13:00:00', '{\"employee_id\":\"emp-007\",\"projects\":[\"proj-007\",\"proj-008\"],\"goals\":{\"completed\":1,\"in_progress\":0}}', '{\"include_security_contributions\":true}', '{\"daily_entries\":18,\"activities\":103}', 'gpt-4.1-mini', '1.0.2', 'Infrastructure stabilization and security hardening were successfully delivered. One CI reliability goal was fully completed, reducing deployment rollback incidents. Security audit preparation tasks were executed efficiently with minimal disruption to production workflows.'),
('rep-022', 'emp-012', 'proj-012', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-03 14:00:00', '{\"project_id\":\"proj-012\",\"checkout_conversion_delta\":\"+4.8%\",\"ab_tests\":2}', '{\"include_revenue_metrics\":true}', '{\"daily_entries\":27,\"activities\":166}', 'gpt-4.1', '2.1.0', 'Checkout Optimization resulted in a measurable four point eight percent improvement in conversion. Two A/B tests were executed, focusing on friction reduction and payment clarity. Cross-team alignment with analytics ensured statistically valid evaluation. Revenue impact projections remain favorable.'),
('rep-023', 'emp-013', 'team-013', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-03 15:00:00', '{\"team_id\":\"team-013\",\"projects\":[\"proj-011\",\"proj-013\"],\"admin_features_added\":6}', '{\"include_internal_tool_metrics\":true}', '{\"daily_entries\":21,\"activities\":129}', 'gpt-4.1-mini', '1.0.2', 'Coyote Squad delivered six incremental enhancements to internal administrative tools. Improvements reduced manual configuration overhead and improved CRM synchronization stability. Internal adoption metrics increased steadily throughout the period.'),
('rep-024', 'emp-017', 'proj-017', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-03 16:00:00', '{\"project_id\":\"proj-017\",\"classification_accuracy\":\"+7%\",\"models_tested\":3}', '{\"include_ai_metrics\":true}', '{\"daily_entries\":30,\"activities\":187}', 'gpt-4.1', '2.1.0', 'AI Assisted Classification improved accuracy metrics by seven percent during February. Three model configurations were evaluated and validated against historical daily entries. Automation reduced manual categorization effort and improved reporting consistency across teams.'),
('rep-025', 'emp-020', 'emp-020', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-03 17:00:00', '{\"employee_id\":\"emp-020\",\"projects\":[\"proj-004\",\"proj-000\"],\"support_automation_tasks\":9}', '{\"include_support_metrics\":true}', '{\"daily_entries\":20,\"activities\":112}', 'gpt-4.1-mini', '1.0.2', 'Support tooling enhancements and operational automation tasks were prioritized. Nine automation adjustments reduced repetitive manual interventions. Collaboration with notification redesign teams improved ticket response time and workflow clarity.'),
('rep-026', 'emp-003', 'proj-003', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-03 18:00:00', '{\"project_id\":\"proj-003\",\"validation_accuracy_delta\":\"+5%\",\"ui_updates\":4}', '{\"include_quality_metrics\":true}', '{\"daily_entries\":29,\"activities\":174}', 'gpt-4.1', '2.1.0', 'Quality Petition Improvement achieved a five percent accuracy increase in validation scoring. UI updates enhanced clarity of error feedback and improved user correction rates. Continued monitoring will ensure model consistency across edge cases.'),
('rep-027', 'emp-014', 'emp-014', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-03 19:00:00', '{\"employee_id\":\"emp-014\",\"projects\":[\"proj-014\",\"proj-005\"],\"goals\":{\"completed\":1,\"in_progress\":1}}', '{\"include_engagement_metrics\":true}', '{\"daily_entries\":21,\"activities\":137}', 'gpt-4.1-mini', '1.0.2', 'Community feature enhancements progressed steadily, with one milestone achieved in ranking logic optimization. Engagement improvements were observed across new feature deployments. Cross-team collaboration strengthened experimentation alignment.'),
('rep-028', 'emp-018', 'team-018', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-03 20:00:00', '{\"team_id\":\"team-018\",\"projects\":[\"proj-002\",\"proj-018\"],\"funnel_analysis_cycles\":4}', '{\"include_recruitment_metrics\":true}', '{\"daily_entries\":24,\"activities\":145}', 'gpt-4.1-mini', '1.0.2', 'Venado Squad conducted four funnel analysis cycles during February. Improvements in data clarity and stage attribution reduced reporting inconsistencies. Collaboration with growth teams improved experiment planning precision.'),
('rep-029', 'emp-005', 'proj-005', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-03 21:00:00', '{\"project_id\":\"proj-005\",\"api_latency_delta\":\"-12%\",\"stability_improvements\":8}', '{\"include_backend_metrics\":true}', '{\"daily_entries\":26,\"activities\":158}', 'gpt-4.1', '2.1.0', 'Share Tracking Reliability improved backend stability with eight targeted fixes. API latency decreased by twelve percent, improving dashboard and reporting responsiveness. Continued log monitoring will ensure sustained reliability gains.'),
('rep-030', 'emp-008', 'emp-008', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-03 22:00:00', '{\"employee_id\":\"emp-008\",\"projects\":[\"proj-008\",\"proj-010\"],\"security_reviews\":5}', '{\"include_security_contributions\":true}', '{\"daily_entries\":17,\"activities\":95}', 'gpt-4.1-mini', '1.0.2', 'Security review efforts were sustained across component upgrades and design system changes. Five targeted reviews identified minor vulnerabilities which were resolved within the same reporting period. Collaboration quality with frontend teams remained high.'),
('rep-031', 'emp-012', 'team-012', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-04 09:00:00', '{\"team_id\":\"team-012\",\"projects\":[\"proj-012\"],\"conversion_delta\":\"+4.8%\",\"deployments\":3}', '{\"include_revenue_impact\":true,\"include_member_breakdown\":true}', '{\"daily_entries\":22,\"activities\":134,\"collaborations\":2}', 'gpt-4.1-mini', '1.0.2', 'Halcón Squad focused primarily on checkout optimization initiatives. Deployment cycles were stable and incremental improvements in payment clarity contributed to measurable gains in conversion. Cross-functional testing alignment reduced post-release regressions.'),
('rep-032', 'emp-009', 'emp-009', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-04 09:40:00', '{\"employee_id\":\"emp-009\",\"projects\":[\"proj-006\",\"proj-009\"],\"goals\":{\"completed\":1,\"in_progress\":0}}', '{\"include_mobile_metrics\":true}', '{\"daily_entries\":18,\"activities\":102}', 'gpt-4.1-mini', '1.0.2', 'Mobile performance optimizations were successfully finalized. The employee contributed to latency reduction and UI responsiveness improvements, ensuring consistent experience across devices. Collaboration with analytics supported measurable validation.'),
('rep-033', 'emp-016', 'proj-016', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-04 10:20:00', '{\"project_id\":\"proj-016\",\"engine_refactors\":5,\"test_coverage_delta\":\"+6%\"}', '{\"include_validation_metrics\":true}', '{\"daily_entries\":31,\"activities\":182}', 'gpt-4.1', '2.1.0', 'Validation engine refactors improved maintainability and increased automated test coverage by six percent. Backend stability improved and error feedback clarity was enhanced. Project health remains stable and technically sound.'),
('rep-034', 'emp-014', 'team-014', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-04 11:00:00', '{\"team_id\":\"team-014\",\"engagement_delta\":\"+5%\",\"features_released\":3}', '{\"include_engagement_analysis\":true}', '{\"daily_entries\":25,\"activities\":141}', 'gpt-4.1-mini', '1.0.2', 'Community feed enhancements continued to drive engagement improvements. Feature rollouts were smooth and coordination with content optimization teams strengthened iteration cycles.'),
('rep-035', 'emp-017', 'emp-017', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-04 11:40:00', '{\"employee_id\":\"emp-017\",\"projects\":[\"proj-017\",\"proj-018\"],\"models_tested\":3}', '{\"include_ai_metrics\":true}', '{\"daily_entries\":23,\"activities\":154}', 'gpt-4.1', '2.1.0', 'AI experimentation efforts expanded with multiple classification configurations evaluated. Automation improvements reduced manual tagging effort and increased reporting consistency.'),
('rep-036', 'emp-005', 'proj-007', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-04 12:20:00', '{\"project_id\":\"proj-007\",\"deployment_success_rate\":\"99.2%\",\"pipeline_improvements\":4}', '{\"include_devops_metrics\":true}', '{\"daily_entries\":19,\"activities\":110}', 'gpt-4.1', '2.1.0', 'CI pipeline stabilization improved deployment reliability to over ninety-nine percent. Infrastructure updates reduced rollback events and enhanced monitoring visibility.'),
('rep-037', 'emp-003', 'team-003', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-04 13:00:00', '{\"team_id\":\"team-003\",\"projects\":[\"proj-003\",\"proj-002\"],\"frontend_refactors\":6}', '{\"include_code_quality_metrics\":true}', '{\"daily_entries\":27,\"activities\":168}', 'gpt-4.1-mini', '1.0.2', 'Jaguar Squad executed targeted frontend refactors improving maintainability and reducing technical debt. Collaboration with validation teams enhanced UI clarity.'),
('rep-038', 'emp-018', 'emp-018', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-04 13:40:00', '{\"employee_id\":\"emp-018\",\"projects\":[\"proj-002\",\"proj-018\"],\"goals\":{\"completed\":0,\"in_progress\":2}}', '{\"include_recruitment_metrics\":true}', '{\"daily_entries\":21,\"activities\":130}', 'gpt-4.1-mini', '1.0.2', 'Recruitment analytics initiatives progressed steadily. Funnel attribution clarity improved and experiment alignment strengthened cross-team communication.'),
('rep-039', 'emp-015', 'proj-015', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-04 14:20:00', '{\"project_id\":\"proj-015\",\"experiments_active\":4,\"conversion_delta\":\"+3.5%\"}', '{\"include_growth_summary\":true}', '{\"daily_entries\":34,\"activities\":201}', 'gpt-4.1', '2.1.0', 'Growth experiments continued to deliver incremental conversion improvements. Statistical validation cycles improved reliability of insights and prioritization accuracy.'),
('rep-040', 'emp-020', 'team-020', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-04 15:00:00', '{\"team_id\":\"team-020\",\"projects\":[\"proj-004\",\"proj-000\"],\"automation_updates\":7}', '{\"include_support_metrics\":true}', '{\"daily_entries\":20,\"activities\":118}', 'gpt-4.1-mini', '1.0.2', 'Hormiga Squad enhanced support tooling automation and reduced manual triage tasks. Operational efficiency improved measurably during the reporting period.'),
('rep-041', 'emp-011', 'emp-011', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-04 15:40:00', '{\"employee_id\":\"emp-011\",\"projects\":[\"proj-011\",\"proj-013\"],\"sync_improvements\":5}', '{\"include_crm_metrics\":true}', '{\"daily_entries\":18,\"activities\":111}', 'gpt-4.1-mini', '1.0.2', 'CRM synchronization reliability improved through targeted fixes and logging enhancements. Internal administrative workflows became more predictable and stable.'),
('rep-042', 'emp-004', 'proj-010', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-04 16:20:00', '{\"project_id\":\"proj-010\",\"components_updated\":12,\"design_tokens_refactored\":8}', '{\"include_design_metrics\":true}', '{\"daily_entries\":29,\"activities\":173}', 'gpt-4.1', '2.1.0', 'Design System v2 expanded component coverage and improved visual consistency. Twelve components were upgraded and design tokens standardized across projects.'),
('rep-043', 'emp-002', 'team-002', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-04 17:00:00', '{\"team_id\":\"team-002\",\"notification_updates\":5,\"engagement_delta\":\"+3%\"}', '{\"include_engagement_analysis\":true}', '{\"daily_entries\":28,\"activities\":162}', 'gpt-4.1-mini', '1.0.2', 'Notification redesign tasks improved supporter engagement metrics. Iterative UX validation cycles strengthened clarity and reduced friction.'),
('rep-044', 'emp-006', 'emp-006', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-04 17:40:00', '{\"employee_id\":\"emp-006\",\"projects\":[\"proj-001\",\"proj-002\",\"proj-015\"],\"experiments_supported\":6}', '{\"include_growth_impact\":true}', '{\"daily_entries\":26,\"activities\":180}', 'gpt-4.1', '2.1.0', 'Cross-project growth experimentation continued at high intensity. Analytical support accelerated experiment validation cycles and improved prioritization accuracy.'),
('rep-045', 'emp-013', 'proj-013', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-04 18:20:00', '{\"project_id\":\"proj-013\",\"admin_features_added\":6,\"adoption_rate\":\"+9%\"}', '{\"include_internal_metrics\":true}', '{\"daily_entries\":24,\"activities\":139}', 'gpt-4.1', '2.1.0', 'Internal Admin Panel enhancements improved adoption rates and reduced manual configuration errors. Feature reliability remained stable during rollout.'),
('rep-046', 'emp-001', 'proj-017', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-04 19:00:00', '{\"project_id\":\"proj-017\",\"ai_integration_tasks\":8,\"classification_delta\":\"+7%\"}', '{\"include_ai_metrics\":true}', '{\"daily_entries\":30,\"activities\":185}', 'gpt-4.1', '2.1.0', 'AI integration efforts supported classification accuracy improvements and streamlined reporting automation. Cross-functional adoption increased confidence in AI-assisted workflows.'),
('rep-047', 'emp-010', 'emp-010', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-04 19:40:00', '{\"employee_id\":\"emp-010\",\"projects\":[\"proj-005\",\"proj-009\",\"proj-019\"],\"analytics_requests\":14}', '{\"include_dashboard_metrics\":true}', '{\"daily_entries\":20,\"activities\":126}', 'gpt-4.1-mini', '1.0.2', 'Analytics alignment efforts improved reporting consistency across projects. Dashboard latency reductions enhanced stakeholder visibility and trust in performance metrics.'),
('rep-048', 'emp-019', 'proj-019', 'PROJECT', 'prompt-003', '2026-02-01', '2026-02-28', '2026-03-04 20:20:00', '{\"project_id\":\"proj-019\",\"content_updates\":18,\"completion_rate_delta\":\"+4%\"}', '{\"include_content_metrics\":true}', '{\"daily_entries\":28,\"activities\":167}', 'gpt-4.1', '2.1.0', 'Content Optimization 2026 delivered consistent improvements in clarity and petition completion rate. Iterative testing refined copy structure and readability.'),
('rep-049', 'emp-008', 'team-008', 'TEAM', 'prompt-002', '2026-02-01', '2026-02-28', '2026-03-04 21:00:00', '{\"team_id\":\"team-008\",\"security_patches\":6,\"audit_findings_resolved\":3}', '{\"include_security_summary\":true}', '{\"daily_entries\":19,\"activities\":108}', 'gpt-4.1-mini', '1.0.2', 'Pantera Squad maintained strong security posture improvements with multiple vulnerability resolutions and infrastructure reviews completed.'),
('rep-050', 'emp-015', 'emp-015', 'EMPLOYEE', 'prompt-001', '2026-02-01', '2026-02-28', '2026-03-04 21:40:00', '{\"employee_id\":\"emp-015\",\"projects\":[\"proj-012\",\"proj-015\"],\"goals\":{\"completed\":1,\"in_progress\":1},\"experiment_cycles\":4}', '{\"include_growth_summary\":true}', '{\"daily_entries\":23,\"activities\":158}', 'gpt-4.1', '2.1.0', 'Growth experimentation leadership remained consistent with structured iteration cycles and measurable KPI uplift. Collaboration intensity and cross-team planning maturity increased during the reporting period.');

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
('role-001', 'AUTH-01'),
('role-001', 'AUTH-02'),
('role-001', 'AUTH-03'),
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
('role-002', 'AUTH-01'),
('role-002', 'AUTH-02'),
('role-002', 'AUTH-03'),
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
('role-003', 'AUTH-01'),
('role-003', 'AUTH-02'),
('role-003', 'AUTH-03'),
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
('team-002', 'emp-002', 'Vaquita Squad', 'Supporter Experience and engagement tools', '2026-01-01 00:00:00', 'https://cdn.unitas-platform.com/teams/vaquita-squad.png', 'ACTIVE'),
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
  ADD KEY `fk_act_entry` (`entry_id`);

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
  ADD KEY `fk_de_emp` (`employee_id`);

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
  ADD KEY `fk_rep_prompt` (`prompt_id`),
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
  ADD CONSTRAINT `fk_act_proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`);

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
  ADD CONSTRAINT `fk_de_emp` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

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
  ADD CONSTRAINT `fk_rep_employee` FOREIGN KEY (`generated_by_employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `fk_rep_prompt` FOREIGN KEY (`prompt_id`) REFERENCES `prompt` (`prompt_id`);

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
