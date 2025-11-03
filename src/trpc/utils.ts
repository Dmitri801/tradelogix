import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TradeDirection } from "@/generated/prisma"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTradeDirection(
  market: string,
  optionType?: string,
  firstAction?: { actionType: "BUY" | "SELL" }
): TradeDirection {
  let tradeDirection: TradeDirection = "LONG"; // default for stocks
  
  if (market.toUpperCase() === "OPTION" && optionType && firstAction) {
    const actionType = firstAction.actionType;
    const optType = optionType.toUpperCase();
    
    if (optType === "CALL") {
      tradeDirection = actionType === "BUY" ? "LONG" : "SHORT";
    } else if (optType === "PUT") {
      tradeDirection = actionType === "BUY" ? "SHORT" : "LONG";
    }
  } else if (firstAction) {
    // For stocks, BUY = LONG, SELL = SHORT
    tradeDirection = firstAction.actionType === "BUY" ? "LONG" : "SHORT";
  }

  return tradeDirection;
}
