## Dependencies between requirements




## Frontend requirements

23. 
In: **partials/teamDirectory/teamDetailsCard.ejs**
Description: Remove the breadbrumb team information at the end of the card, as it might be confused with a button.

---

24. TEAM-02
In: **partials/teamDirectory/teamDetailsCard.ejs**
Description: Add button and popup action form to edit the team information. Similar application to projectDetailsCard.
Do not forget possible upload of image.

---

25. TEAM-01
In: **pages/teamDirectory.ejs**
Description: Create the form for the creation of a new Team. Create implementation based on the creation of the form of project. **pages/projectNew.ejs**
Within this implement file uploads for the team image.


26. TEAM-06
In: **partials/teamDirectory/teamParticipants.ejs**
Description: One of the conditions to add a member to a team  must be also to include their role. Part of completing the role field information of the collaboration table. Include this as an additional field before adding a new employee to the project.
Optionally, extract the actual mechanism of employee selection into an actionPopup (already integrated with the FE 14. to be able to function properly), and add the required field of role.

---

27. TEAM-01
In: **pages/teamDirectory.ejs**
Description: Add "Create Team" button and calling the page "pages/teamNew.ejs".


## Backend requirements

31. TEAM-01
In: **partials/teamDirectory/teamNewForm.ejs**
Description: Create controller function to create Team based on the teamNew.ejs form created before. Adapt to file upload and all team fields. Create function basing over the function createProject from project.controller.

---

32. 
In: **partials/teamDirectory/teamprojects.ejs**
Description: Pass goals, achievements and highlights normalization outside of the **partials/teamDirectory/teamprojects.ejs**. Pass it to the team render function in the team.controller function.

---


33. TEAM-02
In: **partials/teamDirectory/teamDetailsCard.ejs**
Description: Implement edit team information functionallity in team.controller based on the popupAction form developed previously.

---


34.  TEAM-06
In:**partials/teamDirectory/teamParticipants.ejs**
Description: Adapt already working adding an employee into a team functionalliy to work with the new receiving information role.
Adapt to save this new information correctly into the model. Keep same answer mode, either render or AJAX.
