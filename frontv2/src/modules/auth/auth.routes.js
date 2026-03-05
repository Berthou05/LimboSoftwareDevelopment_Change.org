const express = require('express');
const {
    renderLogin,
    login,
    logout,
    renderRecover,
    recover,
    renderReset,
    reset,
} = require('./auth.controller');

const router = express.Router();

/*
 * Root route behavior:
 * - authenticated users go straight to home,
 * - anonymous users go to login.
 */
router.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    }

    return res.redirect('/login');
});

router.get('/login', renderLogin);
router.post('/login', login);
router.post('/logout', logout);

router.get('/recover', renderRecover);
router.post('/recover', recover);

router.get('/reset', renderReset);
router.post('/reset', reset);

module.exports = router;
