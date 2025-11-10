import { inngest } from "@/inngest/client";
import { protectedProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/db";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { AssetType, TradeDirection } from "@/generated/prisma";
import { getTradeDirection, getTradeStatus } from "@/trpc/utils";
import z from "zod";
import { get } from "http";

export const appRouter = createTRPCRouter({
  addTrade: protectedProcedure
    .input(
      z.object({
        market: z.string(),
        symbol: z.string(),
        expectedHoldTime: z.enum(["DAY", "SWING", "LONG"]),
        target: z.number().optional(),
        stopLoss: z.number().optional(),
        direction: z.enum(["LONG", "SHORT"]).optional(),
        optionType: z.string().optional(),
        strike: z.number().optional(),
        actions: z.array(
          z.object({
            actionType: z.enum(["BUY", "SELL"]),
            price: z.number(),
            size: z.number(),
            fees: z.number().optional(),
            timestamp: z.string().or(z.date()).transform((val) => 
              typeof val === 'string' ? new Date(val) : val
            ),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const direction = getTradeDirection(
        input.market,
        input.optionType,
        input.actions[0]
      );

      const trade = await prisma.trade.create({
        data: {
          userId: ctx.auth.user.id,
          symbol: input.symbol,
          expectedHoldTime: input.expectedHoldTime,
          assetType: input.market.toUpperCase() as AssetType,
          direction,
          target: input.target,
          stopLoss: input.stopLoss,
          optionType: input.optionType,
          status: getTradeStatus(input.actions),
          strike: input.strike,
          actions: {
            create: input.actions.map((action) => ({
              actionType: action.actionType,
              price: action.price,
              size: action.size,
              fees: action.fees,
              timestamp: action.timestamp,
            })),
          },
        },
        include: {
          actions: true, // Include actions in the response so we can see what was actually created
        }
      });
      
      return trade;
    }),
  getTrades: protectedProcedure.query(async ({ ctx }) => {
    const trades = await prisma.trade.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
      include: {
        actions: true, // Include the actions that belong to each trade
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
