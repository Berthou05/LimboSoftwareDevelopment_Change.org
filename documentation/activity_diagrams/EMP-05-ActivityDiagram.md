@startuml
skinparam conditionStyle diamond

|User|
start
:Accesses an Employee's profile;
:Navigates to the **"Your Projects"** section;

|System|
:Captures Employee ID;
:Requests project list associated with the Employee;

|Database|
:Queries Projects where Employee is a member;
if (Is there a connection or data error?) then (yes)
    |System|
    :Informs the user an error has occurred;
    |User|
    :Show "no proyects yet message";
    stop
else (no)
    |Database|
    :Returns project list (Name, Role, Date);
endif

|System|
:Displays summary list in the "Your Projects" widget;

|User|
:Clicks on the "Your Projects" header/button;

|System|
:Redirects to the **Full Projects List** view;

|User|
:Views all projects linked to that Employee;

stop
@enduml