import { inngest } from "@/inngest/client";
import { protectedProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/db";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { AssetType, TradeDirection } from "@/generated/prisma";
import z from "zod";

export const appRouter = createTRPCRouter({
  addTrade: protectedProcedure
    .input(
      z.object({
        market: z.string(),
        symbol: z.string(),
        target: z.number().optional(),
        stopLoss: z.number().optional(),
        direction: z.enum(["LONG", "SHORT"]).optional(),
        strike: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const trade = await prisma.trade.create({
        data: {
          userId: ctx.auth.user.id,
          symbol: input.symbol,
          assetType: input.market.toUpperCase() as AssetType,
          direction: input.direction as TradeDirection,
          target: input.target,
          stopLoss: input.stopLoss,
          strike: input.strike,
        },
      });
      return trade;
    }),
  getTrades: protectedProcedure.query(async ({ ctx }) => {
    const trades = await prisma.trade.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return trades;
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
