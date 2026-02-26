@startuml
|User|
start
:hovers or makes a click over the Team Information button;

|System|
:Obtains team_id from the Team page;
:Sends a query to obtain description, name and created_at to the database;

|Database|
:Returns the query;

|System|
:Verifies none of the information is null;
if(Is any of the information null?) then (no)
else(yes)
    |User|
    :Is informed an error has ocurred;
    stop
endif

|System|
:Creates a popover with the team information;
:Shows the popover;

|User|
:Passes the mouse or clicks outside the area of the Team Information button;
stop

@enduml
