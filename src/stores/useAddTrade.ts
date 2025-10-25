import { create } from "zustand";
import { AssetType } from "@/generated/prisma";

interface DayTradeGeneralState {
  market: AssetType;
  symbol: string;
  target: number;
  strike: number;
  stopLoss: number;
  direction: string;
  setMarket: (market: AssetType) => void;
  setSymbol: (symbol: string) => void;
  setTarget: (target: number) => void;
  setStrike: (strike: number) => void;
  setStopLoss: (stopLoss: number) => void;
  setDirection: (direction: string) => void;
}

const useAddTrade = create<DayTradeGeneralState>((set) => ({
  market: AssetType.OPTION,
  symbol: "",
  target: 0,
  strike: 0,
  stopLoss: 0,
  direction: "LONG",
  setMarket: (market: AssetType) => set({ market }),
  setSymbol: (symbol: string) => set({ symbol }),
  setTarget: (target: number) => set({ target }),
  setStrike: (strike: number) => set({ strike }), 
  setStopLoss: (stopLoss: number) => set({ stopLoss }),
  setDirection: (direction: string) => set({ direction }),
}));

export default useAddTrade;
