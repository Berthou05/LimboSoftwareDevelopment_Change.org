const express = require('express');
const { requireAuth } = require('../../middlewares/auth.middleware');
const {
    renderProjects,
    renderProjectDetail,
    handleProjectMembership,
} = require('./projects.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/projects', renderProjects);
router.get('/projects/:id', renderProjectDetail);
router.post('/projects/:id/toggle-membership', handleProjectMembership);

module.exports = router;
