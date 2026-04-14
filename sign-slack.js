const crypto = require('crypto');

const secret = process.env.SLACK_SIGNING_SECRET;
const timestamp = Math.floor(Date.now() / 1000).toString();

const body = JSON.stringify({
  "slack_username": "@vaquita.dev",
  "entry_date": "2026-04-13",
  "done": "Worked on Project Atlas",
  "to_do": "Finish Project Atlas tests",
  "blockers": "None",
  "slack_standup_URL": "https://slack.com/archives/whatever",
  "slack_teams": "Axolotl Squad"
});

const base = `v0:${timestamp}:${body}`;
const signature = 'v0=' + crypto.createHmac('sha256', secret).update(base).digest('hex');

console.log({ timestamp, signature, body });
