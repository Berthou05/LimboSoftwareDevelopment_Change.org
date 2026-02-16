classDiagram
direction LR

class Team {
  +UUID team_id
  +varchar name
  +varchar description

  +UUID team_manager_id
  +UUID product_manager_id
  +UUID design_manager_id

  +datetime created_at
}

class Employee {
  +UUID employee_id
  +varchar full_name
  +varchar email
  +varchar timezone

  +bool is_active

  +datetime created_at
}

class Membership {
    +UUID membership_id PK
    +UUID employee_id FK
    +UUID team_id FK

    +datetime joined_at
    +datetime left_at
    +varchar role
}

class Project {
  +UUID project_id
  +varchar name
  +varchar description
  +ProjectStatus status
  +UUID owner_employee_id
  +date start_date
  +date end_date
  +datetime created_at
}

class ProjectTeam {
    +UUID team_id FK
    +UUID project_id FK
    +varchar team_role
    +date joined_at
}


class Colaboration {
  +UUID coolaboration_id PK
  +UUID project_id FK
  +UUID employee_id FK
  +varchar description
  +datetime started_at
  +datetime ended_at
}

class Goal {
  +UUID goal_id
  +UUID project_id
  +varchar title
  +varchar description
  +varchar metric_target ()
  +date due_date
  +GoalStatus status
  +datetime created_at
}

class Activity {
  +UUID activity_id PK
  +varchar title
  +varchar description
  +UUID employee_id FK
  +UUID project_id FK
  +UUID entry_id FK
  +date completed_at
}

class DailyEntry {
  +UUID entry_id
  +UUID employee_id
  +date entry_date
  +varchar description
  +varchar slack_standup_URL
}

class Achievement {
  +UUID achievement_id
  +UUID project_id
  +UUID created_by_pm_id
  +varchar title
  +varchar description
  +date achievement_date
  +varchar evidence_link
}

class Report {
  +UUID report_id
  +UUID generated_by_employee_id
  +date period_start
  +date period_end
  +varchar content_json
  +varchar file_url
  +datetime created_at
}

class EmployeeReport {
  +UUID report_id FK
  +UUID employee_id FK
}

class ProjectReport {
  +UUID report_id FK
  +UUID project_id FK
}

class TeamReport {
  +UUID report_id FK
  +UUID team_id FK
}

Project "1" --> "0..*" Goal : has
Project "1" --> "0..*" Achievement : has

Employee "1" --> "0..*" DailyEntry : logs
DailyEntry "1" --> "0..*" Activity : creates

Project "1" --> "0..*" Activity : contains
Employee "1" --> "0..*" Activity : performs



Employee "1" --> "0..*" Achievement : creates
Team "0..*" --> "0..*" Membership : has a
Employee "1" --> "0..*" Membership : is a member in

Team "1..*" --> "0..*" ProjectTeam : works
Project "1..*" --> "0..*" ProjectTeam : participates in
Project "1..*" --> "0..*" Colaboration : participates in
Employee "1..*" --> "0..*" Colaboration : participates in


Employee "1" --> "0..*" Report : creates
EmployeeReport "1" --> "1" Report : is a
ProjectReport "1" --> "1" Report : is a
TeamReport "1" --> "1" Report : is a
