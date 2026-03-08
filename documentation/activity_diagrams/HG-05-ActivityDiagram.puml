@startuml
skinparam maxMessageSize 30

|User|
start
:Type /highlight;

|Slack|
:Send command;

|System|
:Validate signature;
if (Invalid?) then (Yes)
  :Reject request;
  stop
endif

:Find Employee;

|Database|
:Get Projects;

|System|
if (No projects?) then (Yes)
  :No active projects;
  |Slack|
  :Show error;
  stop
endif

:Build modal;

|Slack|
:Open modal;

|User|
:Fill form;
:Submit;

|Slack|
:Send form data;

|System|
:Validate fields;
if (Invalid?) then (Yes)
  :Return validation error;
  |Slack|
  :Keep modal open;
  stop
endif

:Create Highlight;

|Database|
:Save Highlight;

|System|
if (Save failed?) then (Yes)
  :Show error;
  stop
endif

|Slack|
:Show confirmation;
stop

@enduml