# Daily Entry Module

This module receives Slack standups and orchestrates:

- Daily entry ingestion (`dailyentry` table)
- Team auto-membership synchronization (from `slack_teams`)
- Activity extraction (`aiWrapper`)
- Project auto-membership synchronization (from extracted project work)
- Activity persistence (`activity` table)

Main endpoint:

- `POST /daily-entries/slack`
