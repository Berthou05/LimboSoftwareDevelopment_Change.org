## Dependencies between Requirements

7. AUTH-03
FE 11. Creation of the user email verification of AUTH-03.
	BE 12. Creation of the render of the previous page.
	FE 12. Creation of the token verification of AUTH-03.
		BE.13. Creation of the backend functionality that verifies email, send token and renders the token processing page. 
		FE 13. Creation of the page for the restablishment of the new password.
			BE 14. Function responsible for the processing of the token, verifing its the same within the expected time range and renders the page of password verification.
				BE 15. Function responsible for verifing and restablishing the new password to the user. Afterwards redirect to login.

## Frontend requirements

7. AUTH-01
In: **admin-accounts.ejs**
Description: Creation of the SignIn form that is filled by the administrator to create a new account. The backend for this signin form and processing has already been created available in auth.controller. This may refer to the **auth.ejs page**.

---

11. AUTH-03
In: **pages/login.ejs**
Description: Creation of the page for confirm email and send token. 

---
12. AUTH-03
In: 
Description: Creation of the page for the token insertion and calling the functionallity for token verification.

---
13. AUTH-03
In:
Description: Creation of the page for the new password creation. 

## Backend requirements

12. AUTH-03
In: **pages/login.ejs**
Description: Implement the backend functionality that renders the first page of AUTH-03 responsible for the email confirmation, answers to the route '/reset'.

---

13. AUTH-03
In: **pages/ {insert name}**
Description: Functionallity responsible for verifing the email sent by the form of the first page of the AUTH-03 responsible for email confirmation. This verifies email, creates token, establish an expiration and send email through email service. 

Afterwards manages  the render of the token insertion page part of the AUTH-03 user case.

---

14. AUTH-03
In: **pages/{insert name of second page}**
Description: Functionality responsible for verifying the token within the expiration time and redirects to new page.

Afterwards manages the render of the password creation part of the AUTH-03 functionality.

---

15. AUTH-03
In: **pages/{insert name of third page}**
Description: Function responsible for the validations and insertion of new password to user account.
Afterwards redirects to login page.
