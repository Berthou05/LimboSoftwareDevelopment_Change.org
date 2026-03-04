const {
  getReports,
  generateReport,
} = require("../../data/repositories/inMemory/mockData.repository");

function listReports() {
  return getReports();
}

function createReport(payload) {
  return generateReport(payload);
}

module.exports = {
  listReports,
  createReport,
};

