"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

import DayTradeGeneral from "./DayTradeGeneral";
import { AssetType } from "@/generated/prisma/wasm";
import { DialogTitle } from "@radix-ui/react-dialog";

// Form schema
const tradeSchema = z.object({
  market: z.string().min(1, "Please select a market"),
  symbol: z.string().min(1, "Symbol is required").max(10, "Symbol must be 10 characters or less"),
  target: z.number().optional(),
  stopLoss: z.number().optional(),
  direction: z.enum(["LONG", "SHORT"]).optional(),
  strike: z.number().min(0.01, "Strike must be greater than 0").optional(),
}).refine(
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
    defaultValues: {
      market: AssetType.OPTION,
      symbol: "",
      target: undefined,
      stopLoss: undefined,
      direction: "LONG",
      strike: undefined,
    },
  });

  const onSubmit = (data: TradeFormData) => {
    addTradeMutation.mutate(data, {
      onSuccess: () => {
        console.log("Trade saved successfully");
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
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                    <CardDescription>Plan your trade</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <DayTradeGeneral />
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
                    <CardDescription>
                      Change your journal here. After saving, you&apos;ll be
                      logged out.
                    </CardDescription>
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
