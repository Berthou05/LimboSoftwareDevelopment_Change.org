## Deoendencies between Requirements

2. ACC-01, ACC-02
FE 3.- Creation of the account.ejs page
	BE 2. - Creation of the method to support the render information for the account.ejs page.
	FE 4.- Creation of the accountForm.ejs page
		BE - Creation of the method to support the render of the accountForm.ejs page
		BE - Creation of the method to support the post information from the accountForm page and save this information.


## Frontend requirements

3. ACC-01
In: **partials/topbar.ejs | account.ejs**
Description: The creation of the actual front-end of the Account page is required.
Line 39.
Consider this will include information from Employee (names,lastnames) and Account models.
Consider similarly that a new page **accountForm.ejs** would be required to allow the edition of the fields mentiones.

---
4. ACC-02 
In: **account.ejs**
Description: The creation of the actual front-end of the edition form for Account. **accountForm.ejs**
Consider this will include information from Employee (names,lastnames) and Account models.


## Backend requirements

2. ACC-01
In: **partials/topbar.ejs | account.ejs**
Description: The creation of a backend that supports the render of the account.ejs page is required.
Consider this will include information from Employee (names,lastnames) and Account models.

---
3. ACC-02 
In: **partials/topbar.ejs | account.ejs**
Description: The creation of the backend that support the render of the accountForm.ejs page is required.
Consider this will include information from Employee (names,lastnames) and Account models.

---
4. ACC-02 
In: **account.ejs**
Description: The creation of the backend that handles the POST of the information from the form accountForm.ejs is required to save this information into models and database and redirects to account.ejs.