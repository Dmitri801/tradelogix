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

const AddTradeAction: React.FC = () => {
  const { control, watch } = useFormContext();

  return (
    <>
      {/* Action */}
      <TableCell>
        <FormField
        control={control}
        name="action"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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

      {/* Date/Time */}
      <TableCell>
        <FormField
        control={control}
        name="dateTime"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <FormControl>
              <Input
                {...field}
                type="datetime-local"
                className="w-full"
                aria-label="date-time"
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
        name="quantity"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <FormControl>
              <Input
                {...field}
                placeholder=""
                type="number"
                step="1"
                min="1"
                value={field.value || ""}
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
        name="price"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <FormControl>
              <Input
                {...field}
                placeholder=""
                type="number"
                step="0.01"
                min="0"
                value={field.value || ""}
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
        name="fee"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <FormControl>
              <Input
                {...field}
                placeholder=""
                type="number"
                step="0.01"
                min="0"
                value={field.value || ""}
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
