const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const { createSessionMiddleware } = require("./config/session");
const flashMiddleware = require("./middlewares/flash.middleware");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");
const moduleRouters = require("./modules");

const app = express();

// View + static setup.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

// Session must be available before flash/auth-based middlewares.
app.use(createSessionMiddleware());
app.use(flashMiddleware);

// Mount all feature routers from one registry file for easier team maintenance.
for (const router of moduleRouters) {
  app.use("/", router);
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

