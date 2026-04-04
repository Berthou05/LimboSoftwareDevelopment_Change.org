## Dependencies between requirements.


3. ADMIN-01, 02, 03, 04
*BE. The backend of the functionalitues of ADMIN-01, 02 and 03 is already implemented into admin.controller.*

FE 6. Creation of the  admin-roles.ejs page. Consider creation of roles popup and toggles for the additional user cases. Adapt front-end to created backend.
	BE 6. Creation of the AJAX function tgat regulates the privileges applied to a role.

---
4. ADMIN-05-06 y AUTH-01
FE 5. Creation of the admin-accounts.ejs page.
	BE 5. Creation of the admin-accounts.ejs page render.
	BE 7. Creation of the AJAX function that handles the role assignation per account.
	*BE. Backend for the render and processing of the signin form have already been created in the auth.controller*
	FE 7. Creation of the signIn.ejs form or aoth.ejs that is the signIn form page. 


## Backend requirements

5. 
In: **admin-accounts.ejs**
Description: Creation of the admin account administration page render. 

---
6. ADMIN-04
In: **admin-roles.ejs**
Description: Creation of the backend function that handles the approval or cancelation of a privilege assigned to a specific role, and control the toggle.

---
7. ADMIN-05
In: **admin-accounts.ejs**
Description: Creation of the backend function that handles the update of the assignation of different roles to an account. Refer to ADMIN-05 SD for more information.


## Frontend requirements

5. ADMIN 05,06
In: **admin-accounts.ejs**
Description: Creation of the admin account administration page in front-end. Make sure to add button that triggers the AUTH-01 (Creation of an Account or Sign In).
Make sure to add edit button or only make the Account Role always edditable witha  dropdown.

---
6. ADMIN-01, 02, 03,04
In: **admin-roles.ejs**
Description: Creation of the admin roles administration page in front-end. Make sure the toggles respond to the status of the called AJAX function. Consult ADMIN-04 for specifications in view.