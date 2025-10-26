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
const AddTradeTable = () => {

  return (
    <Table className="w-[90%] mx-auto my-4">
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Date/Time</TableHead>
           <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Fee</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <AddTradeAction />
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default AddTradeTable;