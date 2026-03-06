@startuml
|Employee|
start
:Fill Daily Standup form in Slack;
:Submit form;

|Slack Workflow|
:Send standup payload to System;

|System|
:Validate request, employee identity,\nand duplicate submission rules;
if (Submission valid?) is (no) then
  |Slack Workflow|
  :Show validation error to Employee;
  stop
endif

|System|
:Create and save Daily Entry;
if (Save failed?) is (yes) then
  |Slack Workflow|
  :Show error\n"Your standup could not be saved. Please retry.";
  stop
endif

|System|
:Generate Activities from Did Today using AI;
if (AI generation failed or response invalid?) is (yes) then
  |Slack Workflow|
  :Show warning\n"Standup saved, but Activities could not be generated.";
  stop
endif

|System|
:Resolve project references and save Activities;

|Slack Workflow|
:Show confirmation\n"Standup submitted successfully.";
stop
@enduml