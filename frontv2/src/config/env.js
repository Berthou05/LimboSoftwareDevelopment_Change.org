const PORT = Number(process.env.PORT) || 3001;
const SESSION_SECRET = process.env.SESSION_SECRET || "unitas-prototype-secret";

module.exports = {
  PORT,
  SESSION_SECRET,
};
