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
import { useFormContext } from "react-hook-form";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TradeAction } from "@/generated/prisma";
import { X } from "lucide-react";

type TradeActionInput = Omit<TradeAction, "id" | "tradeId" | "fees"> & {
  fees?: number;
};

interface AddTradeActionProps {
  action: TradeActionInput;
  index: number; // For field naming in forms
}

const AddTradeAction: React.FC<AddTradeActionProps> = ({ action, index }) => {
  const { control, watch, setValue } = useFormContext();

  return (
    <>
      {/* Remove Button */}
      <TableCell className="p-2">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
          disabled={index === 0}
          onClick={() => {
            const currentActions = watch("actions") || [];
            const updatedActions = currentActions.filter(
              (_: any, i: number) => i !== index
            );
            setValue("actions", updatedActions);
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      </TableCell>

      {/* Action */}
      <TableCell>
        <FormField
          control={control}
          name={`actions.${index}.actionType`}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="BUY" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </TableCell>

      {/* Date/Time TODO: Change to use React Datepicker */}
      <TableCell>
        <FormField
          control={control}
          name={`actions.${index}.timestamp`}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormControl>
                <Input
                  type="datetime-local"
                  className="w-full"
                  aria-label="date-time"
                  value={
                    field.value
                      ? new Date(
                          field.value.getTime() -
                            field.value.getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : new Date(value));
                  }}
                />
              </FormControl>
            </div>
          )}
        />
      </TableCell>

      {/* Quantity */}
      <TableCell>
        <FormField
          control={control}
          name={`actions.${index}.size`}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  type="number"
                  step="1"
                  min="1"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  aria-label="quantity"
                />
              </FormControl>
            </div>
          )}
        />
      </TableCell>

      {/* Price */}
      <TableCell>
        <FormField
          control={control}
          name={`actions.${index}.price`}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  aria-label="price"
                />
              </FormControl>
            </div>
          )}
        />
      </TableCell>

      {/* Fee */}
      <TableCell>
        <FormField
          control={control}
          name={`actions.${index}.fees`}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  aria-label="fee"
                />
              </FormControl>
            </div>
          )}
        />
      </TableCell>
    </>
  );
};

export default AddTradeAction;
