## Dependencies between Requirements


9. PROJ-13, 14, 15
FE 14. Adaption of actionPopup to accept a route where to POST the form.
	FE 15. Adapt project Achievement to recharge with AJAX.
		BE 16. AJAX function to add an achievement & adapt frontend route.
		BE 17. AJAX function to edit an achievement & adapt frontend route.
		BE 18. AJAX function to delete an achievement & adapt frontend route.
		
---

10. PROJ-09, 10, 11
FE 14. Adaption of actionPopup to accept a route where to POST the form.
	FE 15. Adapt project Goals to recharge with AJAX.
		BE 16. AJAX function to add a goal & adapt frontend route.
		BE 17. AJAX function to edit a goal & adapt frontend route.
		BE 18. AJAX function to delete a goal & adapt frontend route.


## Frontend requirements

14. 
In: **partials/projectDirectory/actionPopup.ejs**
Description: Currently the creation and implementation work wonderfully, however there is no place the form is being submitted to: adapt view to accept another requirement, the link where the form will be post to.

Once this adaptation is made, this will allow to implement all functionalities getting half through.

---

15. 
In: **partials/projectDirectory/projectAchievements.ejs**
Description: Adapt the functionality to refresh based on AJAX. Implement corresponding functionality in a JS behavior script.

---

16. 
In: **partials/projectDirectory/projectGoals.ejs**
Description: Adapt the functionality to refresh based on AJAX. Implement corresponding functionality in a JS behavior script.

## Backend requirements

16.  PROJ-13
In: **partials/projectDirectory/projectAchievements.ejs**
Description: AJAX function responsible in controller to create a new Achievement.

---
17. PROJ-14
In: **partials/projectDirectory/projectAchievements.ejs**
Description: AJAX function responsible in controller to adit an Achievement.

---

18.  PROJ-15
In: **partials/projectDirectory/projectAchievements.ejs**
Description: AJAX function responsible in controller to delete an Achievement.

---

19. PROJ-09  
In: **partials/projectDirectory/projectGoals.ejs**
Description: AJAX function responsible in controller to create a new Goal.

---
20. PROJ-10
In: **partials/projectDirectory/projectGoals.ejs**
Description: AJAX function responsible in controller to adit an Goal.

---

21.  PROJ-11
In: **partials/projectDirectory/projectGoals.ejs**
Description: AJAX function responsible in controller to delete an Goal.


## Styling requirements

It is required to clean, order and comment the project.controller.js
