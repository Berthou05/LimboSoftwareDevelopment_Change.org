const { loginWithIdentity } = require('./auth.service');

const renderLogin = function renderLogin(req, res) {
    if (req.session.user) {
        return res.redirect('/home');
    }

    return res.render('auth/login', {
        title: 'Unitas | Login',
        isAuthPage: true,
        activeRoute: '/login',
    });
};

const login = function login(req, res) {
    const username = String(req.body.username || '').trim();
    const password = String(req.body.password || '').trim();

    const user = loginWithIdentity(username, password);

    if (!user) {
        req.session.flash = {
            type: 'danger',
            message: 'Invalid credentials. Try demo users: rodrigo@unitas.dev / 123456',
        };

        return res.redirect('/login');
    }

    req.session.user = user;
    req.session.flash = {
        type: 'success',
        message: `Welcome back, ${user.name}.`,
    };

    return res.redirect('/home');
};

const logout = function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

const renderRecover = function renderRecover(req, res) {
    return res.render('auth/recover', {
        title: 'Unitas | Recover Password',
        isAuthPage: true,
        activeRoute: '/recover',
    });
};

const recover = function recover(req, res) {
    req.session.flash = {
        type: 'success',
        message: 'If the account exists, a recovery message has been sent.',
    };

    return res.redirect('/login');
};

const renderReset = function renderReset(req, res) {
    return res.render('auth/reset', {
        title: 'Unitas | Reset Password',
        isAuthPage: true,
        activeRoute: '/reset',
    });
};

const reset = function reset(req, res) {
    req.session.flash = {
        type: 'success',
        message: 'Password reset simulation completed. Use your existing demo credentials.',
    };

    return res.redirect('/login');
};

module.exports = {
    renderLogin,
    login,
    logout,
    renderRecover,
    recover,
    renderReset,
    reset,
};
