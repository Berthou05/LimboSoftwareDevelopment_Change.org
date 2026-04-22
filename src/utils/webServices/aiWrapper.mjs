/*
Title: aiWrapper.js
Last modification: April 14,2026
Modified by: Alexis Berthou
*/

/*extractActivities(payload)
Function responsible for extracting normalized activities from a standup
payload. This wrapper can later be replaced with an external AI provider.*/

import { generateText, streamText, Output} from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

// --------------------- System Message --------------------------------

/*System message that is passed to every generateRepportSection() function
in order to give a role to Open AI to work with, leading to more precise results.*/

const SYSTEM_MESSAGE = `
You are a senior performance analyst. Analyze structured data (activities, goals, achievements) and produce concise, evidence-based insights.
Rules:
Use only provided data; no assumptions or fabrication
Do NOT invent metrics, percentages, trends, or comparisons
Only compute values if all required inputs are explicitly present
Guidelines:
Focus on impact over volume
Identify patterns only with repeated evidence
Compare only when explicit context exists
Avoid vague statements
Evaluation:
Highlight success drivers with evidence
Identify gaps only against explicit references
Improvements:
Provide actionable recommendations grounded in data only
Align with: Ambition, Responsibility, Openness, Candor, Connection
Output:
Strictly follow schema
Output only schema-compliant content
`

const VERSION = "4o";
const MODEL = `gpt-${VERSION}-mini`;

//---------------------- Report Schemas ---------------------------------

/*WhatWentWellEmployeeSectionSchema
Defined schema for the employee report, section what went well?*/

const WhatWentWellEmployeeSectionSchema = z.object({
  title: z
    .string()
    .min(0)
    .describe("Project title.Only project title direct"),
  items: z
    .array(z.string().min(1)
      .describe("A specific, evidence-based bullet point describing an action and its positive impact"))
    .max(8, "Maximum of 8 bullet points per project")
    .describe("Up to 8 bullet points describing the employee's impact in this project"),
});


/*WhatWentWellTeamSectionSchema
Defined schema for the team and project resports, section what went well?*/

const WhatWentWellTeamSectionSchema = z.object({
  title: z
    .string()
    .min(0)
    .describe("Project title.Only project title direct"),
  subgroups: z
    .array(z.object({
      title: z.string().min(1)
        .describe("Employee name"),
      items: z
        .array(z.string().min(1)
          .describe("A specific, evidence-based bullet point describing an action and its positive impact"))
        .max(5, "Maximum of 5 bullet points per employee")
        .describe("Exactly 5 bullet points describing the employee's contributions within the project"),
    }))
    .describe("List of employees contributing to the project, each with their own bullet points"),
});

/*WhatWentWellProjectSectionSchema
Defined schema for the project resports, section what went well?*/

const WhatWentWellProjectSectionSchema = z.object({
  items: z
    .array(
      z.string().min(1)
        .describe("A specific, evidence-based statement describing what is going well in the project and its impact")
    )
    .max(10, "Exactly 10 bullet points are required")
    .describe("Exactly 10 evidence-based bullet points describing positive progress, outcomes, or effective practices in the project"),
});
/*TeamImpactGroupSchema
Defined schema for the team impact section in a team report.*/

const TeamImpactGroupSchema = z.object({
  title: z
    .literal("Team Impact")
    .describe("Group summarizing the overall impact of the team across projects"),
  items: z
    .array(z.string().min(1)
      .describe("A specific, evidence-based bullet point describing a cross-project team impact and its outcome"))
    .max(5, "Maximum of 5 bullet points for team impact")
    .describe("Up to 5 bullet points describing the team’s most significant contributions across projects, including comparisons to other teams and overall impact"),
});

/*WhatCanBeImprovedSectionSchema
Defined schema for any report about the last section: what can be improved?*/

const WhatCanBeImprovedSectionSchema = z.object({
  title: z
    .literal("What can be improved")
    .describe("Section focused on general improvement areas"),
  items: z
    .array(
      z.string().min(1)
        .describe("A specific, evidence-based improvement insight describing a gap and a realistic recommendation")
    )
    .max(5)
    .describe("Exactly 5 evidence-based bullet points describing key improvement areas and actionable recommendations"),
});

/*ValuesSectionSchema
Defined schema for any report about the last section: what can be improved? based
on values*/

const ValuesSectionSchema = z.object({
  title: z
    .literal("CHANGE.ORG values")
    .describe("Section focused on improvement areas aligned with company values"),
  items: z
    .array(z.string().min(1)
      .describe("A specific, evidence-based improvement insight linked to one company value, including the gap and a suggested improvement direction"))
    .max(5, "Maximum of 5 bullet points (one per value)")
    .describe(
      "Up to 5 bullet points, each corresponding to one company value and describing a gap plus actionable improvement"
    ),
});

const reportSchemas = {
  whatWentWellEmployee: WhatWentWellEmployeeSectionSchema,
  whatWentWellTeam: WhatWentWellTeamSectionSchema,
  whatWentWellProject: WhatWentWellProjectSectionSchema,
  teamImpact: TeamImpactGroupSchema,
  whatCanBeImproved: WhatCanBeImprovedSectionSchema,
  companyValues: ValuesSectionSchema,
}

//---------------------- PROMPTS SECTION ----------------------------

const WENT_WELL_EMPLOYEE = `
You are writing the "What Went Well?" section of a professional Employee Performance Report.

## Your Task
Analyze the provided project data and write a structured bullet-point summary highlighting what the employee did well during the project period.

## Rules
- Write ONLY in bullet points.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless they are explicitly stated in the input data.
- Focus exclusively on the employee identified in <employee_activities>. Do not evaluate other teammates.
- You MAY reference other teammates' activities and project-level data (goals, highlights, achievements) as supporting context to show how the employee's contributions fit into or elevated the broader project.
- Each bullet should reflect a concrete, observable strength — not vague praise.
- Tone: professional, factual, constructive, and specific.
- Do not invent information. If the data is sparse, write fewer bullets rather than padding with assumptions.
- Do not use filler phrases like "showed great dedication" or "was a key player" without grounding them in the provided data.
- If the project name or ID is NULL AND <activities> is empty or absent, return null immediately. Do not generate a JSON object, do not use "General Activities", do not output anything else.
- If the project name or ID is NULL AND <employee_activities> has content, treat those activities as "General Activities" and analyze them with the same depth and criteria as any other project.
- If the project name or ID is provided AND <employee_activities> is empty or absent, return null immediately. Do not generate a JSON object at all.

## Output Format
Return ONLY a JSON object that strictly follows this structure. No additional text, no markdown backticks, no preamble.

{
  "title": "{{project_name}}",
  "items": [
    "string",
    ...
  ]
}

- title: Must be exactly the project name as provided in the input. If the project name or ID is NULL, use "General Activities". Do not prepend or append any text such as "What Went Well", "Contribution of [Name]", or any other label.
- items: Between 1 and 8 strings. Each string is a self-contained bullet describing a concrete employee strength and its connection to the project context.
- If <employee_activities> is empty or absent, return exactly: null
`;

const WENT_WELL_TEAM = `

You are writing the "What Went Well?" section of a professional Team Performance Report.

## Your Task
Analyze the provided project data and write a structured bullet-point summary explaining what the team did well during the project, in the context of the overall project development.

## Rules
- Write ONLY in bullet points.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Focus on the team identified in <team_info>. Do not evaluate other teams.
- If <other_teams_activities> is empty or absent, evaluate the team solely against the project goals, highlights, and achievements — do not mention the absence of other teams.
- If <other_teams_activities> is present, draw QUALITATIVE contrasts to show how the team's contributions stand out or complement the broader project effort. Do not rank or score teams.
- Contrasts must be grounded in the data. Do not imply another team underperformed unless the data clearly supports it.
- Each bullet must reflect a concrete, observable strength — not vague praise.
- The goal of this section is to help an employee understand: "How is my team doing in this project?"
- Tone: professional, factual, clear, and accessible to a non-managerial reader.
- Do not pad with assumptions. If data is sparse, write fewer, stronger bullets.
- Avoid filler phrases like "demonstrated great synergy" or "went above and beyond" without grounding them in the provided data.

## Title Field
- The title must be ONLY the project name, exactly as it appears in the input data.
- Do NOT use section labels such as "What Went Well?", "What can be improved?", "Contributions of [team name]", or any descriptive phrase.
- If no project name is provided in the input data, return an empty string "".

## Output Format
Return ONLY the bullet list. No section titles, no introductory sentence, no closing remarks.

Each bullet should follow this pattern:
- [Team strength or behavior] — [how it connected to the project goal, highlight, achievement, or how it contrasts with the broader team effort]

`;

const WENT_WELL_PROJECT = `
You are writing the "What Went Well?" section of a professional Project Performance Report.

## Your Task
Analyze the provided project data and write a structured bullet-point summary highlighting what has gone well in the project as a whole, considering all activities, goals, achievements, and highlights together.

## Rules
- Write ONLY in bullet points.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Analyze the project as a whole. Do not evaluate or single out individual employees — activities are provided for context only, to understand the collective effort and progress of the project.
- Each bullet must reflect a concrete, observable strength of the project — not vague praise.
- Ground every bullet in at least one of the following: a completed or progressing activity, a met goal, a highlight, or an achievement.
- Tone: professional, factual, and clear.
- Do not pad with assumptions. If data is sparse, write fewer, stronger bullets.
- Avoid filler phrases like "the project is on track" or "the team worked hard" without grounding them in the provided data.

## Output Format
Return ONLY the bullet list. No section titles, no introductory sentence, no closing remarks.

Each bullet should follow this pattern:
- [What has gone well in the project] — [grounded in a goal, activity, highlight, or achievement that supports this conclusion]
`;

const TEAM_IMPACT=`
You are writing the "Team Impact" section of a professional Team Performance Report.

## Your Task
Based on the "What Went Well?" analysis already produced for this team, synthesize an overall picture of the team's impact across the projects they participated in, expressed as structured bullet points.

## Rules
- Write ONLY in bullet points.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Do not introduce new information that was not present in the "What Went Well?" section. Your job is to synthesize and elevate, not to expand.
- Each bullet should capture a pattern, theme, or cross-project strength that emerges from reading the "What Went Well?" points together — not simply restate individual bullets.
- If the team only participated in one project, identify the broader impact themes within that single project context instead of forcing cross-project comparisons.
- Tone: professional, factual, and forward-facing. This section should help the reader understand the team's overall value and contribution.
- Do not pad with assumptions. If the input is sparse, write fewer, stronger bullets.
- Avoid restating the "What Went Well?" bullets verbatim — this section must add a layer of synthesis.

## Output Format
Return ONLY the bullet list. No section titles, no introductory sentence, no closing remarks.

Each bullet should follow this pattern:
- [Overarching impact theme or pattern] — [how it manifests across the team's project contributions]
`;

const VALUES_EMPLOYEE = `
You are writing the "Company Values Alignment" section of a professional Employee Performance Report.

## Your Task
Based on the employee's "What Went Well?" analysis, evaluate how the employee's actions and contributions align with each of the five company values. For each value, write one bullet point with a brief supporting paragraph that acknowledges what the employee is already doing well in relation to that value, identifies what is missing or underdeveloped, and suggests a concrete direction for growth.

## Company Values
The five company values are fixed and must always appear in this order:
1. Ambition
2. Responsibility
3. Openness
4. Candor
5. Connection

## Rules
- Write EXACTLY five bullet points, one per value, in the order listed above.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Each bullet must be grounded in the "What Went Well?" input. Do not introduce strengths or weaknesses not supported by that data.
- Every bullet must contain three elements:
    a) What the employee is already doing that connects to this value.
    b) What is absent, underdeveloped, or could be strengthened in relation to this value.
    c) A concrete, actionable suggestion for how the employee can grow toward this value.
- If the "What Went Well?" data provides little or no evidence for a specific value, acknowledge the gap honestly and focus the bullet on the growth suggestion rather than forcing a connection.
- Tone: developmental, constructive, and forward-looking. This section is not a critique — it is a growth roadmap. Avoid harsh language, but do not soften gaps to the point of obscuring them.
- Do not use filler phrases like "keep up the great work" or "continues to show promise" without grounding them in the data.

## Output Format
Return ONLY the five bullet points. No section titles, no introductory sentence, no closing remarks.

Each bullet must follow this structure:
- [Value Name] — [One sentence summarizing the employee's current alignment with this value.]
  [Brief paragraph: what they are doing well in relation to this value, what is missing or underdeveloped, and one concrete suggestion for growth.]
`;
const VALUES_TEAM = `
You are writing the "Company Values Alignment" section of a professional Team Performance Report.

## Your Task
Based on the team's "What Went Well?" analysis, evaluate how the team's collective actions and contributions align with each of the five company values. For each value, write one bullet point with a brief supporting paragraph that acknowledges what the team is already doing well in relation to that value, identifies what is missing or underdeveloped at a team level, and suggests a concrete direction for collective growth.

## Company Values
The five company values are fixed and must always appear in this order:
1. Ambition
2. Responsibility
3. Openness
4. Candor
5. Connection

## Rules
- Write EXACTLY five bullet points, one per value, in the order listed above.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Evaluate the team as a whole. Do not single out or attribute strengths or gaps to individual team members.
- Each bullet must be grounded in the "What Went Well?" input. Do not introduce strengths or weaknesses not supported by that data.
- Every bullet must contain three elements:
    a) What the team is already doing collectively that connects to this value.
    b) What is absent, underdeveloped, or could be strengthened at the team level in relation to this value.
    c) A concrete, actionable suggestion for how the team can grow toward this value as a unit.
- If the "What Went Well?" data provides little or no evidence for a specific value, acknowledge the gap honestly and focus the bullet on the growth suggestion rather than forcing a connection.
- Tone: developmental, constructive, and forward-looking. This section is a collective growth roadmap, not a critique of any individual or the team as a whole. Avoid harsh language, but do not soften gaps to the point of obscuring them.
- Do not use filler phrases like "the team continues to show promise" or "great collaboration across the board" without grounding them in the data.

## Output Format
Return ONLY the five bullet points. No section titles, no introductory sentence, no closing remarks.

Each bullet must follow this structure:
- [Value Name] — [One sentence summarizing the team's current alignment with this value.]
  [Brief paragraph: what the team is doing well collectively in relation to this value, what is missing or underdeveloped at the team level, and one concrete suggestion for collective growth.]
`;

const TO_IMPROVE_EMPLOYEE = `
You are writing the "What Can Be Improved" section of a professional Employee Performance Report.

## Your Task
Based on the employee's "What Went Well?" analysis, identify gaps, underdeveloped areas, and missed opportunities in the employee's performance and write exactly 5 actionable improvement points.

## Rules
- Write EXACTLY 5 bullet points. No more, no less.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Each bullet must be grounded in the "What Went Well?" input — improvements must be derived from what is absent, partial, or could be pushed further based on the evidence provided.
- Do not introduce weaknesses or gaps that have no basis in the input data.
- Each bullet must contain two elements:
    a) A specific, observable gap or underdeveloped area identified from the data.
    b) A realistic, concrete recommendation for how the employee can address it.
- Improvements must be distinct from each other — do not reframe the same gap across multiple bullets.
- This section is intentionally separate from the Company Values Alignment section. Do not frame improvements around company values — focus purely on performance, work habits, project contributions, and overall impact.
- Tone: constructive, direct, and growth-oriented. Surface gaps clearly without being punitive.
- Do not use filler phrases like "could benefit from" or "might want to consider" — be specific and direct about what needs to change and why.
`;

const TO_IMPROVE_TEAM = `
You are writing the "What Can Be Improved" section of a professional Team Performance Report.

## Your Task
Based on the team's "What Went Well?" analysis, identify collective gaps, underdeveloped areas, and missed opportunities in the team's performance and write exactly 5 actionable improvement points.

## Rules
- Write EXACTLY 5 bullet points. No more, no less.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Each bullet must be grounded in the "What Went Well?" input — improvements must be derived from what is absent, partial, or could be pushed further based on the evidence provided.
- Do not introduce weaknesses or gaps that have no basis in the input data.
- Evaluate the team as a whole. Do not single out or attribute gaps to individual team members.
- Each bullet must contain two elements:
    a) A specific, observable collective gap or underdeveloped area identified from the data.
    b) A realistic, concrete recommendation for how the team can address it together.
- Improvements must be distinct from each other — do not reframe the same gap across multiple bullets.
- This section is intentionally separate from the Company Values Alignment section. Do not frame improvements around company values — focus purely on team performance, collaborative dynamics, project contributions, and overall collective impact.
- Tone: constructive, direct, and growth-oriented. Surface gaps clearly without being punitive toward the team or any individual within it.
- Do not use filler phrases like "could benefit from" or "might want to consider" — be specific and direct about what needs to change collectively and why.

`;
const TO_IMPROVE_PROJECT = `
You are writing the "What Can Be Improved" section of a professional Project Performance Report.

## Your Task
Based on the project's "What Went Well?" analysis and the original project data, identify gaps, unmet goals, underdeveloped areas, and missed opportunities at the project level and write exactly 5 actionable improvement points.

## Rules
- Write EXACTLY 5 bullet points. No more, no less.
- Do NOT invent, estimate, or imply any numbers, percentages, or metrics unless explicitly stated in the input data.
- Each bullet must be grounded in either the "What Went Well?" input or the project data — improvements must be derived from:
    - Goals that were not fully met or addressed.
    - Highlights that could have gone further.
    - Achievements that are absent or incomplete relative to the project's stated ambitions.
    - Areas present in the project data that are not reflected at all in the "What Went Well?" output.
- Do not introduce weaknesses or gaps that have no basis in the provided data.
- Do not attribute gaps to individual employees or teams — evaluate the project as a whole.
- Each bullet must contain two elements:
    a) A specific, observable gap or underdeveloped area identified from the project data or "What Went Well?" output.
    b) A realistic, concrete recommendation for how the project could address it going forward.
- Improvements must be distinct from each other — do not reframe the same gap across multiple bullets.
- Tone: constructive, direct, and forward-looking. Surface gaps clearly without being punitive.
- Do not use filler phrases like "could benefit from" or "might want to consider" — be specific and direct about what needs to change and why.


`;

const doingGoodPrompts = {
  EMPLOYEE: WENT_WELL_EMPLOYEE,
  PROJECT: WENT_WELL_PROJECT,
  TEAM: WENT_WELL_TEAM
}

const valuesPrompts = {
  EMPLOYEE: VALUES_EMPLOYEE,
  TEAM: VALUES_TEAM
}

const toImprovePrompts = {
  EMPLOYEE: TO_IMPROVE_EMPLOYEE,
  PROJECT: TO_IMPROVE_PROJECT,
  TEAM: TO_IMPROVE_TEAM
}


//---------------------- AI Wrapper Functions ----------------------------
//====================== Report Generation ===============================

/*createOpenAI
Creation of the openai object based on the given API key*/

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*getModelDetails
Function responsible for returning the model and version of the
AI applied*/

export function getModelDetails(){
  return {
    model: MODEL,
    version: VERSION
  }
}

/*beBetterProject(project, prompt, schema)
Auxiliar function to collect the report "What went well?" section*/

export async function beBetterProject(project, prompt, schema, reportType = ''){
  let PROMPT = doingGoodPrompts[reportType];
  return  await generateReportSection(project, PROMPT, schema);
}


/*teamImpact(projects, prompt, schema)
Auxiliar function to collect the report "Team Impact" section*/

export async function teamImpact(projects, prompt, schema){
  return await generateReportSection(projects, TEAM_IMPACT, schema);
}


/*whatToImprove(sections, prompt, schema)
Auxiliar function to collect the report "What to improve?" section*/

export async function whatToImprove(sections, prompt, schema, reportType=''){
  let PROMPT = toImprovePrompts[reportType];
  return await generateReportSection(sections, PROMPT, schema);
}

/*companyValues(sections, prompt, schema)
Auxiliar function to collect the report "CHANGE.org values" section*/

export async function companyValues(sections, prompt, schema, reportType=''){
  let PROMPT = valuesPrompts[reportType];
  return await generateReportSection(sections, PROMPT, schema);
}

/*generateReportSection(body, prompt, schema)
Function responsible for obtaining a section of the report based on the given
prompt, schema and information.
Main function all remaining functions are integrated to*/

const generateReportSection = async function generateReportSection(body, prompt, schema) {
  let reportSchema = reportSchemas[schema];

  const buildMessages = (body, prompt) => ([
    { role: "user", content: "Context data:" },
    { role: "user", content: JSON.stringify(body) },
    { role: "user", content: prompt }
  ]);

  const {output, totalUsage} = await generateText({
    model: openai(MODEL),
    output: Output.object({schema: reportSchema}),
    system: SYSTEM_MESSAGE,
    messages: buildMessages(body, prompt),
    maxRetries: 0
  });
  return output
};


/*getResponse(prompt)
Funcion de prueba del uso del servicio web de IA.*/

const getResponse = async function getResponse(prompt) {
  const {text, totalUsage} = await generateText({
    model: openai(MODEL),
    prompt,
  });
  console.log(totalUsage);
  return text;
}

// ====================== Daily Entry Processing =============================

const ActivityItemSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(150)
    .describe("Short action title that can be stored in activity.title"),
  description: z
    .string()
    .min(1)
    .max(1000)
    .describe("Clear summary that can be stored in activity.description"),
  project_hint: z
    .string()
    .max(150)
    .describe("Project name or hint mentioned in the activity. Empty string when none is detected"),
  worked_on_project: z
    .boolean()
    .describe("True only when the activity clearly refers to concrete work on a project"),
});

const ActivityExtractionSchema = z.object({
  activities: z
    .array(ActivityItemSchema)
    .max(40)
    .describe("Normalized activities extracted from the standup"),
});

/*extractActivities(payload)
Function responsible for extracting normalized activities from standup
sections so they can be stored as activity rows.*/

export async function extractActivities(payload = {}) {
  const normalizedPayload = {
    done: String(payload.done || '').trim(),
    projects: Array.isArray(payload.projects)
      ? payload.projects
          .map((project) => ({
            id: String(project?.id || '').trim(),
            name: String(project?.name || '').trim(),
          }))
          .filter((project) => project.id && project.name)
      : [],
  };

  if (!normalizedPayload.done) {
    return [];
  }

  const prompt = `
Extract concrete work activities only from the didToday section of this standup.

Return only activities that are meaningful enough to persist in the activity table.
Use these rules:
- Keep each activity atomic and concise.
- Put the main work item in "title".
- Put a fuller explanation in "description".
- If a project name, squad name, ticket, or clear project reference appears, place the best project clue in "project_hint".
- Prefer exact project names from the candidate list below when they match the standup text.
- When a project mention appears once and is followed by multiple bullets, sentences, or clauses, check whether that project remains the active context until another project or an explicit general-activity cue is mentioned.
- Explicit general-activity cues such as "general activity", "general activities", "no project", or clearly non-project coordination work should break project inheritance.
- Use nearby context across the whole standup before deciding whether an activity belongs to a project or should remain general activity.
- Keep concrete coordination, planning, review, or alignment work as general activity when it is specific enough to persist and not clearly tied to one project.
- Set "worked_on_project" to true only when the activity clearly describes actual work on a project.
- Ignore greetings, filler text, and generic statements with no actionable work.
- If there are no valid activities, return an empty array.

Candidate projects:
${normalizedPayload.projects.length
  ? normalizedPayload.projects.map((project) => `- ${project.name} (${project.id})`).join('\n')
  : '- No candidate projects were provided.'}

Standup content:
didToday:
${normalizedPayload.done}
`;

  console.log("Extracting activities with prompt");

  const { output } = await generateText({
    model: openai(MODEL),
    output: Output.object({ schema: ActivityExtractionSchema }),
    messages: [
      {
        role: "system",
        content: "You extract normalized engineering activities only from completed work already done.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log("Extracted activities:", output.activities);
  return output.activities || [];
};
