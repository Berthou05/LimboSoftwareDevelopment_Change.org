const express = require('express');
const { requireAuth } = require('../../middlewares/auth.middleware');
const {
    renderTeams,
    renderTeamDetail,
    handleTeamMembership,
} = require('./teams.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/teams', renderTeams);
router.get('/teams/:id', renderTeamDetail);
router.post('/teams/:id/toggle-membership', handleTeamMembership);

module.exports = router;
