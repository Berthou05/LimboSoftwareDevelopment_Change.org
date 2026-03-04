const { getHomeByEmployeeId } = require("./home.service");
const { renderModule } = require("../shared/view.util");
const { buildDateAndQuarterContext } = require("../shared/page-context.util");

// Home controller: keeps HTTP concerns only, data comes from service layer.
function renderHome(req, res) {
  const homeData = getHomeByEmployeeId(req.session.user.employeeId);
  if (!homeData) {
    req.session.flash = { type: "danger", message: "Unable to load home data." };
    return res.redirect("/login");
  }

  const { currentDateLabel, currentQuarterLabel } = buildDateAndQuarterContext();

  return renderModule(res, "pages/home", {
    activeRoute: "/home",
    pageTitle: "Home",
    pageSubtitle: "Latest activity, team activity, and project highlights.",
    currentDateLabel,
    currentQuarterLabel,
    ...homeData,
  });
}

module.exports = {
  renderHome,
};

