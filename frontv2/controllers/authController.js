const { authenticate } = require("../data/mockData");

function renderLogin(req, res) {
  if (req.session.user) {
    return res.redirect("/home");
  }

  return res.render("auth/login", {
    title: "Unitas | Login",
    isAuthPage: true,
    activeRoute: "/login",
  });
}

function login(req, res) {
  const { username, password } = req.body;
  const user = authenticate((username || "").trim(), (password || "").trim());

  if (!user) {
    req.session.flash = {
      type: "danger",
      message: "Invalid credentials. Try demo users: rodrigo@unitas.dev / 123456",
    };
    return res.redirect("/login");
  }

  req.session.user = user;
  req.session.flash = {
    type: "success",
    message: `Welcome back, ${user.name}.`,
  };
  return res.redirect("/home");
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

function renderRecover(req, res) {
  return res.render("auth/recover", {
    title: "Unitas | Recover Password",
    isAuthPage: true,
    activeRoute: "/recover",
  });
}

function recover(req, res) {
  req.session.flash = {
    type: "success",
    message: "If the account exists, a recovery message has been sent.",
  };
  return res.redirect("/login");
}

function renderReset(req, res) {
  return res.render("auth/reset", {
    title: "Unitas | Reset Password",
    isAuthPage: true,
    activeRoute: "/reset",
  });
}

function reset(req, res) {
  req.session.flash = {
    type: "success",
    message: "Password reset simulation completed. Use your existing demo credentials.",
  };
  return res.redirect("/login");
}

module.exports = {
  renderLogin,
  login,
  logout,
  renderRecover,
  recover,
  renderReset,
  reset,
};
