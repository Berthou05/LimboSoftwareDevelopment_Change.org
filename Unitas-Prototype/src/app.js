const express = require("express");
const path = require("path");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

// const authRoutes = require("./routes/authRoutes");
// const moduleRoutes = require("./routes/moduleRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "unitas-prototype-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.session.flash || null;
  req.session.flash = null;
  next();
});

// app.use("/", authRoutes);
// app.use("/", moduleRoutes);

app.use((req, res) => {
  res.status(404).render("pages/notFound", {
    title: "Page Not Found",
    isAuthPage: false,
    activeRoute: "",
    pageTitle: "404",
    pageSubtitle: "The requested page does not exist.",
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Unitas prototype running on http://localhost:${PORT}`);
});
