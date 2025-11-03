import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddTradeAction from "./AddTradeAction";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

// Trade Action type (matching the schema)
type TradeAction = {
  actionType: "BUY" | "SELL";
  price: number;
  size: number;
  fees?: number;
  timestamp: Date;
};

interface AddTradeTableProps {
  actions?: TradeAction[];
}
const AddTradeTable = ({
  actions
}: AddTradeTableProps) => {
  const { formState: { errors } } = useFormContext();
  
  // Check if there are any validation errors for quantity (size) or price fields
  const hasQuantityError = actions?.some((_, index) => 
    (errors as any)?.actions?.[index]?.size
  );
  const hasPriceError = actions?.some((_, index) => 
    (errors as any)?.actions?.[index]?.price
  );

  return (
    <Table className="w-[90%] mx-auto my-4 table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Action</TableHead>
          <TableHead className="w-auto">Date/Time</TableHead>
          <TableHead className={cn(
            "w-[120px]",
            hasQuantityError && "text-destructive"
          )}>
            Quantity
          </TableHead>
          <TableHead className={cn(
            "w-[120px]",
            hasPriceError && "text-destructive"
          )}>
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
  )
}

export default AddTradeTable;