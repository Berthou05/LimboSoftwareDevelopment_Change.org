/*
Title: dailyentry.routes.js
Last modification: April 12,2026
Modified by: Alexis Berthou
*/

const express = require('express');
const router = express.Router();

const dailyEntryController = require('./dailyentry.controller');

/*Webhook route for Slack daily standup ingestion.*/

router.post('/slack', dailyEntryController.submitFromSlack);

module.exports = router;
