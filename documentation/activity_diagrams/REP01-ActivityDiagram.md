@startuml
|User|
start
:Presses the Generate Report button;
|System|

:Validates that content_type and content_id are selected;
if (Are content_type and content_id present?) is (no) then
  |User|
  :Shows error "Please select a content type and specific content";
  stop
  |System|
else(yes)
endif


:Validates the date range entered;
if (start_date <= end_date) is (no) then
  |User|
  :Shows error "Please select a valid date range:";
  stop
  |System|
else(yes)
endif

|System|
:Gathers the content type, content id and date range.;
:Sends a petition to the server;
:Selects the query to use based on the content type;

|System|
if (Is the content_type == Employee?) is (yes) then
  :Selects Employee query;
  elseif  (Is the content_type == Team?) is (yes) then
    :Selects Team query;
  elseif  (Is the content_type == Project?) is (yes) then
    :Selects Project query;
  else(Invalid)
    :Return an error;
    |User|
    :Show error "Invalid Content Type";
    stop
  |System|
  endif
  
|System|
:Sends specific queries to the database;

|Database|
:Return queries;

|System|
:Verifies ant content was received;

if(Is there any information received from the database?) is (no) then
  |User|
  :Show error "There is no registered information for {content_type}: {content_id} during the specified date range";
  stop
  |System|
else(yes)
endif

:Unifies data into input_snapshot_json format;
:Unifies report data into filters_json;
:Selects a prompt based on the content_type;

if (Is the content_type == Employee?) is (yes) then
:Selects Employee Prompt query;
  else if (Is the content_type == Team?) is (yes) then
      :Selects Team Prompt query;
      else if (Is the content_type == Project?) is (yes) then
      :Selects Project Prompt query;
  else(Invalid)
  stop
endif

:Sends a query to the database;
|Database|
:Returns the prompt requested by the query;

|System|
:Verifies if the prompt was received;
if(Is there any information received from the database?) is (no) then
  |User|
  :Show error "There is no prompt registered under the selected Content Type:";
  stop
  |System|
else(yes)
endif

label step15
:sends a petition to the AI API with prompt, filters_json, input_snapshot_json;
|AI API|
:Processes the petition;
|System|
:Receives the response from the AI API;
if(Did the System receive an error message from the API?) is (yes) then
  |User|
  :Informs the user about the error, and asks if it desires to retry;
  if(Does the User want to try again?) is (yes) then
  note right
    Go to System sends a petition to the AI API  
  end note
  stop
  
  else(no)
  stop
  endif
  |System|
else(no)
endif

:Generates a downloadable PDF file;
:gathers the information of the petition and sends it to the database;

|Database|
:Inserts and saves new Report information;

|System|
:Receives the url of the generated report;
:Redirects to the Report Page;
:Displays the new Report object into the Reports Page;
|User|
:Downloads the generated report;
stop