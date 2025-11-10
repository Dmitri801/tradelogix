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

function getTradeStatus(
  actions: { actionType: "BUY" | "SELL"; size: number }[]
): "PENDING" | "OPEN" | "CLOSED" | "CANCELLED" {
  if (!actions || actions.length === 0) {
    return "PENDING";
  }

  // Calculate net position (positive = long position, negative = short position, zero = closed)
  let netPosition = 0;
  
  for (const action of actions) {
    if (action.actionType === "BUY") {
      netPosition += action.size;
    } else if (action.actionType === "SELL") {
      netPosition -= action.size;
    }
  }

  // Determine status based on net position
  if (netPosition === 0) {
    return "CLOSED"; // All positions have been closed
  } else if (netPosition !== 0) {
    return "OPEN"; // There's still an open position
  }

  return "PENDING"; // Fallback
};

export { getTradeStatus };
