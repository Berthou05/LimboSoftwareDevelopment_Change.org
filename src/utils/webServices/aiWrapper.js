import { generateText, streamText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

//Open AI version

/*
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReport(body, prompt,report_type){
    const integratedPrompt = integratePrompt(body, prompt);
    const schema = getSchema(report_type);

    const result = await streamText({
        model: openai("gpt-4o-mini"),
        output: Output.object({schema:schema}),
        prompt: integratedPrompt,
    });
}
*/

import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_KEY,
});






