import { inngest } from "@/inngest/client";
import { protectedProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/db";
import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";
import { getMotivational } from "@/inngest/functions";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async () => {
    return await prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "testUser@example.com",
      },
    });
    return {
      success: true,
      message: "Workflow creation initiated.",
    };
  }),
  getMotivationalQuote: protectedProcedure.mutation(async () => {
    const response = await streamText({
      model: google("gemini-2.5-flash"),
      system:
        "You are a helpful assistant that generates motivational quotes for stock traders.",
      prompt:
        "Generate a motivational quote for stock trading. Make it involve the psychology of trading. Keep it under 50 words. dont put any quotes in the response",
    });

    return response.text;
  }),
  getMotivationalQuoteInngest: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "motivational/motivational.ai",
    });
    return {
      success: true,
      message: "Motivational quote generation initiated.",
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
