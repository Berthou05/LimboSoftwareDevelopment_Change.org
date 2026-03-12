@startuml
|Admin|
start
:Select "Create Account";
:Display form;
:Enter email, password & Slack username;
:Submit form;

|System|
:Validate input;

if (Valid?) then (Yes)
  :Check email exists;
  
  if (Email exists?) then (Yes)
    |Admin|
    :Show duplicate message;
    stop
  else (No)
    |System|
  endif
else (No)
  |Admin|
  :Show validation errors;
  stop
endif

|System|
:Generate account_id;
:Encrypt password;
:Set defaults & created_at;
:Store Account (email, password_hash, Slack username);

if (Stored?) then (Yes)
  |Admin|
  :Show success message;
else (No)
  |Admin|
  :Show error message;
endif

stop
@enduml