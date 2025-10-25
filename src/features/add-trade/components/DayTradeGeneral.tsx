"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AssetType } from "@/generated/prisma";

const DayTradeGeneral: React.FC = () => {
  const { control, watch } = useFormContext();
  const market = watch("market");

  return (
    <section
      aria-label="day-trade-general"
      className="p-4 grid grid-cols-1 gap-2"
    >
      {/* Grid layout: Market | Symbol | Target | Stop-Loss | Side */}
      <div className="grid grid-cols-[160px_1fr_1fr_1fr_auto] gap-4 items-start">
        {/* Market select */}
        <FormField
          control={control}
          name="market"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel className="text-xs text-muted-foreground">Market</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="OPTION" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OPTION">OPTION</SelectItem>
                  <SelectItem value="STOCK">STOCK</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        {/* Symbol input */}
        <FormField
          control={control}
          name="symbol"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel className="text-xs text-muted-foreground">Symbol</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  aria-label="symbol"
                />
              </FormControl>
            </div>
          )}
        />

        {/* Target input */}
        <FormField
          control={control}
          name="target"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel className="text-xs text-muted-foreground">Target</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  type="number"
                  step="0.01"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  aria-label="target"
                />
              </FormControl>
            </div>
          )}
        />

        {/* Stop-Loss input */}
        <FormField
          control={control}
          name="stopLoss"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel className="text-xs text-muted-foreground">Stop-Loss</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  type="number"
                  step="0.01"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  aria-label="stop-loss"
                />
              </FormControl>
              <FormMessage className="min-h-[1.25rem]" />
            </div>
          )}
        />

        {/* Side badge (LONG/SHORT) */}
        {market === AssetType.OPTION && (
          <FormField
            control={control}
            name="direction"
            render={({ field }) => (
              <div className="flex flex-col gap-2 items-end">
                <FormLabel className="text-xs text-muted-foreground invisible">
                  side
                </FormLabel>
                <FormControl>
                  <Button
                    type="button"
                    onClick={() =>
                      field.onChange(field.value === "LONG" ? "SHORT" : "LONG")
                    }
                    className={cn(
                      "rounded-full bg-emerald-500/90 text-white px-4 py-1.5 text-sm font-medium shadow-sm w-20 h-auto hover:bg-emerald-600/90",
                      {
                        "bg-red-500/90 hover:bg-red-600/90":
                          field.value === "SHORT",
                      }
                    )}
                  >
                    {field.value === "LONG" ? "LONG" : "SHORT"}
                  </Button>
                </FormControl>
                <FormMessage className="min-h-[1.25rem]" />
              </div>
            )}
          />
        )}
      </div>
      <div className="grid grid-cols-[160px_1fr_1fr_1fr_auto] gap-4 items-center">
        <span className="text-xs text-muted-foreground invisible">side</span>
        <span className="text-xs text-muted-foreground invisible">side</span>
        <span className="text-xs text-muted-foreground invisible">side</span>
        <span className="text-xs text-muted-foreground invisible">side</span>
        {market === AssetType.OPTION && (
          <FormField
            control={control}
            name="strike"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="number"
                    step="0.01"
                    className="w-20"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    aria-label="strike"
                  />
                </FormControl>
                <FormLabel className="text-xs text-muted-foreground">Strike</FormLabel>
              </div>
            )}
          />
        )}
      </div>
    </section>
  );
};

export default DayTradeGeneral;
