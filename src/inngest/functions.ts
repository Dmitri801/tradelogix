import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const google = createGoogleGenerativeAI();

export const getMotivational = inngest.createFunction(
  { id: "motivational-ai" },
  { event: "motivational/motivational.ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap(
      "Generate Motivational Quote",
      streamText,
      {
        model: google("gemini-2.5-flash"),
        system:
          "You are a helpful assistant that generates motivational quotes for stock traders.",
        prompt:
          "Generate a motivational quote for stock trading. Make it involve the psychology of trading. Keep it under 50 words.",
      }
    );

    console.group({steps: steps, event})

    return steps;
  }
);
