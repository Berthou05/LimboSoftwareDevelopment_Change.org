const express = require("express");
const { requireAuth } = require("../../middlewares/auth.middleware");
const { renderReports, handleGenerateReport } = require("./reports.controller");

const router = express.Router();

router.use(requireAuth);

router.get("/reports", renderReports);
router.post("/reports/generate", handleGenerateReport);

module.exports = router;
