const express = require("express");
const {
  renderLogin,
  login,
  logout,
  renderRecover,
  recover,
  renderReset,
  reset,
} = require("./auth.controller");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/home");
  }
  return res.redirect("/login");
});

router.get("/login", renderLogin);
router.post("/login", login);
router.post("/logout", logout);

router.get("/recover", renderRecover);
router.post("/recover", recover);

router.get("/reset", renderReset);
router.post("/reset", reset);

module.exports = router;

