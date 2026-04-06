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
