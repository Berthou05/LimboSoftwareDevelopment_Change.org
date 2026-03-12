@startuml
|Admin|
start
:Select "Create Account";

|System|
:Display form;

|Admin|
:Enter email & password;
:Submit form;

|System|
:Validate input;

if (Valid?) then (Yes)
  :Check email exists;
else (No)
  :Show validation errors;
  stop
endif

if (Email exists?) then (Yes)
  :Show duplicate message;
  stop
else (No)
endif

:Generate account_id;
:Encrypt password;
:Set defaults & created_at;
:Store Account;

if (Stored?) then (Yes)
  :Show success message;
else (No)
  :Show error message;
endif

stop
@enduml