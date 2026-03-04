const { findAccountById, saveOwnAccount } = require("./account.service");
const { renderModule } = require("../shared/view.util");

function renderAccount(req, res) {
  const account = findAccountById(req.session.user.accountId);

  return renderModule(res, "pages/account", {
    activeRoute: "/account",
    pageTitle: "Account",
    pageSubtitle: "Modify account information and save changes.",
    account,
  });
}

function handleAccountSave(req, res) {
  saveOwnAccount(req.session.user.accountId, req.body);
  req.session.flash = {
    type: "success",
    message: "Account information updated.",
  };
  return res.redirect("/account");
}

module.exports = {
  renderAccount,
  handleAccountSave,
};

