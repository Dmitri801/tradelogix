import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddTradeAction from "./AddTradeAction";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { TradeAction } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type TradeActionInput = Omit<TradeAction, "id" | "tradeId" | "fees"> & {
  fees?: number;
};

interface AddTradeTableProps {
  actions?: TradeActionInput[];
}
const AddTradeTable = ({ actions }: AddTradeTableProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useFormContext();

  // Check if there are any validation errors for quantity (size) or price fields
  const hasQuantityError = actions?.some(
    (_, index) => (errors as any)?.actions?.[index]?.size
  );
  const hasPriceError = actions?.some(
    (_, index) => (errors as any)?.actions?.[index]?.price
  );

  const addNewAction = async () => {
    const validationPassed = await trigger();
    const currentActions = getValues("actions") || [];
    const latestActionType =
      currentActions.length > 0
        ? currentActions[currentActions.length - 1].actionType
        : "BUY";
    const newAction = {
      actionType: latestActionType === "BUY" ? "SELL" : ("BUY" as const),
      price: undefined,
      size: undefined,
      fees: undefined,
      timestamp: new Date(),
    };
    if (validationPassed) {
      setValue("actions", [...currentActions, newAction]);
    }
  };

  return (
    <div>
      <Table className="w-[90%] mx-auto my-4 table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="w-[120px]">Action</TableHead>
            <TableHead className="w-auto">Date/Time</TableHead>
            <TableHead
              className={cn(
                "w-[120px]",
                hasQuantityError && "text-destructive"
              )}
            >
              Quantity
            </TableHead>
            <TableHead
              className={cn("w-[120px]", hasPriceError && "text-destructive")}
            >
              Price
            </TableHead>
            <TableHead className="w-[120px]">Fee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions?.map((action, index) => {
            return (
              <TableRow key={index}>
                <AddTradeAction action={action} index={index} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="w-[100%] mx-auto mt-4 text-center">
        <Button
          type="button"
          variant="dark"
          size="xlg"
          className="w-[250px] mx-auto"
          onClick={addNewAction}
        >
          <Plus />
          Add Action
        </Button>
      </div>
    </div>
  );
};

export default AddTradeTable;
