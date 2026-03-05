@startuml
skinparam conditionStyle diamond
|Usuario|
start
:Select a proyect from the list;

|Sistema|
:Caputre selected proyect's ID;
:Send pryect's details consult;

|Base de Datos|
:Search proyect's information\n(Name, Desc, Team, etc.);

if (¿Register exist?) then (yes)
    :Return pryect's details;
    |Sistema|
    :Process and format data for visualization;
    :Render details' interface;
    |Usuario|
    :Visualize proyect's information;
    stop
else (no)
    |Base de Datos|
    :Return error (Register not found);
    |Sistema|
    :Show error message on teh interface;
    |Usuario|
    :Return to list of proyects;
    stop
endif
@enduml