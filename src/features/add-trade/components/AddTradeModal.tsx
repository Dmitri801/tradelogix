"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";

import DayTradeGeneral from "./AddTradeGeneral";
import { AssetType, ExpectedHoldTime } from "@/generated/prisma/wasm";
import { DialogTitle } from "@radix-ui/react-dialog";
import AddTradeTable from "./AddTradeTable";

// Form schema
const tradeSchema = z
  .object({
    market: z.string().min(1, "Please select a market"),
    symbol: z
      .string()
      .min(1, "Symbol is required")
      .max(10, "Symbol must be 10 characters or less"),
    target: z.number().optional(),
    stopLoss: z.number().optional(),
    direction: z.enum(["LONG", "SHORT"]).optional(),
    strike: z.number().min(0.01, "Strike must be greater than 0").optional(),
    optionType: z.string().optional(),
    expectedHoldTime: z.enum([
      ExpectedHoldTime.DAY,
      ExpectedHoldTime.SWING,
      ExpectedHoldTime.LONG,
    ]),
    actions: z.array(
      z.object({
        actionType: z.enum(["BUY", "SELL"]),
        price: z.number().min(0.01, "Price must be greater than 0"),
        size: z.number().min(0.01, "Size must be greater than 0"),
        fees: z.number().optional(),
        timestamp: z.date(),
      })
    ).min(1, "At least one trade action is required"),  
  })
  .refine(
    (data) => {
      // If market is OPTION, strike is required
      if (data.market === "OPTION") {
        return data.strike !== undefined && data.strike > 0;
      }
      return true;
    },
    {
      message: "Strike is required for options",
      path: ["strike"], // This tells Zod which field to show the error on
    }
  );

type TradeFormData = z.infer<typeof tradeSchema>;
interface AddTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddTradeModal: React.FC<AddTradeModalProps> = ({ isOpen, onClose }) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const addTradeMutation = useMutation(trpc.addTrade.mutationOptions());

  // Initialize react-hook-form
  const tradeForm = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
    mode: 'all', // Validate all fields and show all errors simultaneously
    defaultValues: {
      market: AssetType.OPTION,
      symbol: "",
      target: undefined,
      stopLoss: undefined,
      optionType: "CALL", 
      strike: undefined,
      expectedHoldTime: ExpectedHoldTime.DAY,
      actions: [{
        actionType: "BUY",
        price: undefined,
        size: undefined,
        fees: undefined,
        timestamp: new Date(),
      }],
    },
  });


  // Watch the actions array to pass to AddTradeTable
  const actions = tradeForm.watch("actions");

  // Update timestamp when modal opens
  useEffect(() => {
    if (isOpen) {
      tradeForm.setValue("actions.0.timestamp", new Date());
    }
  }, [isOpen, tradeForm]);


  const handleModalClose = () => {
    tradeForm.reset();
    onClose();
  };

  const onSubmit = (data: TradeFormData) => {
    addTradeMutation.mutate(data, {
      onSuccess: () => {
        // Invalidate and refetch the getTrades query
        queryClient.invalidateQueries({ queryKey: [["getTrades"]] });
        tradeForm.reset();
        onClose();
      },
      onError: (error) => {
        console.error("Error saving trade:", error);
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <Form {...tradeForm}>
        <DialogContent className="sm:max-w-[425px]" fullscreen>
          <DialogTitle className="sr-only">Add New Trade</DialogTitle>
          <form onSubmit={tradeForm.handleSubmit(onSubmit)}>
            <Tabs defaultValue="trade" className="w-full">
              <TabsList>
                <TabsTrigger value="trade">Trade</TabsTrigger>
                <TabsTrigger value="journal">Journal</TabsTrigger>
              </TabsList>
              <TabsContent value="trade">
                <Card>
                  <CardHeader>
                    <CardTitle>Trade</CardTitle>
                    <CardDescription>Add your trade</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <DayTradeGeneral />
                    <AddTradeTable actions={actions} />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={addTradeMutation.isPending}>
                      {addTradeMutation.isPending ? "Saving..." : "Save Trade"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="journal">
                <Card>
                  <CardHeader>
                    <CardTitle>Journal</CardTitle>
                    <CardDescription>Journal your trade</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="tabs-demo-current">
                        Current password
                      </Label>
                      <Input id="tabs-demo-current" type="password" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="tabs-demo-new">New password</Label>
                      <Input id="tabs-demo-new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
export default AddTradeModal;
