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
	FE 16. Adapt project Goals to recharge with AJAX.
		BE 19. AJAX function to add a goal & adapt frontend route.
		BE 20. AJAX function to edit a goal & adapt frontend route.
		BE 21. AJAX function to delete a goal & adapt frontend route.

---
11. 
FE 14. Adaption of actionPopup to accept a route where to POST the form.
	FE 17. Adapt project highlights to recharge with AJAX.
		BE 22. AJAX function to add a highlight & adapt frontend route.
		BE 23. AJAX function to edit a highlight & adapt frontend route.
		BE 24. AJAX function to delete a highlight & adapt frontend route.


---
12. PROJ-05-02
FE 14. Adaption of actionPopup to accept a route where to POST the form.
	FE 19. Add team_role as a new field to the add team into project mechanism.
		BE 25. Adapt working mechanism of adding a team into a project to include new information field team_role.

---

13. PROJ-05-01
FE 14. Adaption of actionPopup to accept a route where to POST the form.
	FE 20. Add the field started at at the actual project member card.
			BE 27. Adapt render function to integrate started_at into obtention and information normalization.
	FE 21. Add description as a new field to the add member into project mechanism.
		BE 28. Adapt working mechanism of adding a team into a project to include new information field description.

---

14. 
BE 29. Fix project search mechanism over agreed upon standards.
	BE 11.  Creation of the backend employee search mechanism that will feed the previous mentioned modification based on the Team search mechanism.
	

---

15. PROJ-01
FE 22. Addition of Status field into New Project Form.
	BE 30. Modification of createProject function into Project.controller in order to accept new field Status.




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

---

17. 
In: **partials/projectDirectory/projectHighlights.ejs**
Description: Adapt the functionality to refresh based on AJAX. Implement corresponding functionality in a JS behavior script.

---


18. 
In: **partials/projectDirectory/projectTeams.ejs**
Description: The section of each team must also include the team_role which is part of the ProjectTeam table.
Integrate this new field into the created card.

---


19. PROJ-05-02
In: **partials/projectDirectory/projectTeams.ejs**
Description: One of the conditions to add a Team to a Project must be also to include their role. Part of completing the team_role field information of the ProjectTeam table. Include this as an additional field before adding a new team to the projetc.
Optionally, extract the actual mechanism of team selection into an actionPopup (already integrated with the FE 14. to be able to function properly), and add the required field of team_role.

---

20. 
In: **partials/projectDirectory/projectMembers.ejs**
Description: The section of each member must also include the started collaboration date which is part of the collaboration table.
Integrate this new field into the created card.

 ---

21. 
In: **partials/projectDirectory/projectMembers.ejs**
Description: One of the conditions to add a member to a Project must be also to include their description. Part of completing the description field information of the collaboration table. Include this as an additional field before adding a new employee to the project.
Optionally, extract the actual mechanism of employee selection into an actionPopup (already integrated with the FE 14. to be able to function properly), and add the required field of description.

---

22. PROJ-01 
In:  **partials/projectDirectory/projectNewForm.ejs** 
Description: One field is missing in the creation form. The Status of the Project which should be added.


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

---

22.
In: **partials/projectDirectory/projectHighlights.ejs**
Description: AJAX function responsible in controller to create a new Highlight.

---
23. 
In: **partials/projectDirectory/projectHighlights.ejs**
Description: AJAX function responsible in controller to adit an Highlight.

---

24.  
In: **partials/projectDirectory/projectHighlights.ejs**
Description: AJAX function responsible in controller to delete an Highlight.

---


25. 
In: **partials/projectDirectory/projectTeams.ejs**
Description: Adapt already working adding a team into a project functionalliy to work with the new receiving information team_role.
Adapt to save this new information correctly into the model. Keep same answer mode, either render or AJAX.

---

26. PROJ-05-02
In: **partials/projectDirectory/projectTeams.sejs**
Description: Adapt controller function of the Project page to integrate new team_role into the obtention and normalization of the team information before sending it to render.

---

27. PROJ-05-01
In: **partials/projectDirectory/projectMembers.sejs**
Description: Adapt controller function of the Project page to integrate new started at field into the obtention and normalization of the member (employee) information before sending it to render.

---

28.  PROJ-05-01
In: **partials/projectDirectory/projectTeams.ejs**
Description: Adapt already working adding a team into a project functionalliy to work with the new receiving information team_role.
Adapt to save this new information correctly into the model. Keep same answer mode, either render or AJAX.

---

29. 
In: **pages/projectDirectory.ejs**
Description: Fix the project search mechanism to return suggestions based on agreed logic mechanism. Unified simplification.

---


30. PROJ-01
In:   **partials/projectDirectory/projectNewForm.ejs**
Description: Integrate into the controller function createProject the new field of information STATUS and integrate into the object creation.


## Styling requirements

It is required to clean, order and comment the project.controller.js
