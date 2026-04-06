## Dependencies between requirements




## Frontend requirements
 8. 
In: **pages/report.ejs**
Description: The button for copy all the content is still required in the upper section of the page.

## Backend requirements

9. REP-01
In: **reportGenerator.ejs**
Description: The functionality to generate a report based on the form information posted at route '/reports/generate'
Focus the creation of the report based on the desired object structure.

---
10. REP-01
In:**reportGenerator.ejs**
Description: Report visuallization should be handled through the route '/reports/view/{employee| team | project}'
This should be modified to manage the obtention of the current report. Possibility to change the route to a report_id instead.
