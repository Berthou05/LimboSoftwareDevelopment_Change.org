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
You are a senior performance analyst specialized in evaluating organizational effectiveness across employees, teams, and projects.

Your role is to analyze structured data about activities, goals, and achievements, and extract clear, objective, and actionable insights.

You must:
- Focus on impact, not just activity volume
- Compare performance relative to context when possible
- Identify meaningful patterns, not isolated events
- Be concise, specific, and evidence-based
- Avoid vague statements and generic feedback

When evaluating performance:
- Highlight what drives success and positive outcomes
- Identify gaps between current behavior and desired standards
- Ground all insights in the provided data

When suggesting improvements:
- Align recommendations with the organization's core values:
  Ambition, Responsibility, Openness, Candor, and Connection
- Ensure suggestions are realistic, actionable, and relevant

Always structure your output strictly according to the provided schema.
Do not include any information outside the schema.
`;

const VERSION = "4o";
const MODEL = `gpt-${VERSION}-mini`;

//---------------------- Report Schemas ---------------------------------

/*WhatWentWellEmployeeSectionSchema
Defined schema for the employee report, section what went well?*/

const WhatWentWellEmployeeSectionSchema = z.object({
  title: z
    .string()
    .min(1)
    .describe("Project title"),
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
    .min(1)
    .describe("Project title"),
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
  whatWentWellProject: WhatWentWellTeamSectionSchema,
  teamImpact: TeamImpactGroupSchema,
  whatCanBeImproved: WhatCanBeImprovedSectionSchema
}


//---------------------- AI Wrapper Functions ----------------------------

/*createOpenAI
Creation of the openai object based on the given API key*/

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


/*beBetterProject(project, prompt, schema)
Auxiliar function to collect the report "What went well?" section*/

export async function beBetterProject(project, prompt, schema){
  return  await generateReportSection(project, prompt, schema);
}


/*teamImpact(projects, prompt, schema)
Auxiliar function to collect the report "Team Impact" section*/

export async function teamImpact(projects, prompt, schema){
  return await generateReportSection(projects, prompt, schema);
}


/*whatToImprove(sections, prompt, schema)
Auxiliar function to collect the report "What to improve?" section*/

export async function whatToImprove(sections, prompt, schema){
  return await generateReportSection(sections, prompt, schema);
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

  const {output} = await generateText({
    model: openai("gpt-4o-mini"),
    output: Output.object({schema: reportSchema}),
    system: SYSTEM_MESSAGE,
    messages: buildMessages(body, prompt)
  });

  console.log(output);

  return output
};


/*getResponse(prompt)
Funcion de prueba del uso del servicio web de IA.*/

const getResponse = async function getResponse(prompt) {
  const {text, totalUsage} = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
  });
  console.log(totalUsage.totalTokens);
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
- Set "worked_on_project" to true only when the activity clearly describes actual work on a project.
- Ignore greetings, filler text, and generic statements with no actionable work.
- If there are no valid activities, return an empty array.

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
