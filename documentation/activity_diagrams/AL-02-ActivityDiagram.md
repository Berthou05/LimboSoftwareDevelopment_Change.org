@startuml
|Employee|
start
:Fills Daily Standup form in Slack\n(Did Today, Doing Tomorrow, Blockers optional);
:Submits the form;

|Slack Workflow|
:Sends standup payload to System endpoint;

|System|
:Validates required fields are present;
if (Did Today AND Doing Tomorrow present?) is (no) then
  |Slack Workflow|
  :Shows error message to Employee\n"Please complete Did Today and Doing Tomorrow.";
  stop
else(yes)
endif

|System|
:Validates Slack request signature;
if (Signature valid?) is (no) then
  |Slack Workflow|
  :Shows error message to Employee\n"Verification failed. Please try again later.";
  stop
else(yes)
endif

|System|
:Identifies Employee by Slack user id;
if (Employee exists in system?) is (no) then
  |Slack Workflow|
  :Shows error message to Employee\n"Your Slack account is not linked to Unitas.";
  stop
else(yes)
endif

|System|
:Determines entry_date;
:Checks if Daily Entry already exists for Employee and date;
if (Daily Entry already exists?) is (yes) then
  |Slack Workflow|
  :Shows error message to Employee\n"You have already submitted today's standup.";
  stop
else(no)
endif

|System|
:Builds Daily Entry object\n(entry_date, did_today, doing_tomorrow, blockers?, slack_url);
:Saves Daily Entry in database;

|Database|
:Insert Daily Entry;

|System|
if (Insert successful?) is (no) then
  |Slack Workflow|
  :Shows error message to Employee\n"Your standup could not be saved. Please retry.";
  stop
else(yes)
endif

|System|
:Prepares AI input using Did Today;
label AI_step
:Sends request to AI API to extract Activities;

|AI API|
:Processes request;

|System|
:Receives AI response;
if (AI error or timeout?) is (yes) then
  |Slack Workflow|
  :Shows warning to Employee\n"Standup saved, but Activities could not be generated.";
  stop
else(no)
endif

|System|
:Validates AI response format;
if (Format valid?) is (no) then
  |Slack Workflow|
  :Shows warning to Employee\n"Standup saved, but processing failed.";
  stop
else(yes)
endif

|System|
:For each extracted Activity\nresolve Project reference;

if (Project identified?) is (yes) then
  :Assign project_id;
else(no)
  :Set project_id = null;
endif

:Saves Activities linked to Employee and Daily Entry;

|Database|
:Insert Activity rows;

|Slack Workflow|
:Shows confirmation message to Employee\n"Standup submitted successfully.";
stop
@enduml