import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AddTradeTable = () => {

  return (
    <Table>
      <TableCaption>Add Trade Summary</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Market</TableCell>
          <TableCell>NASDAQ</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Symbol</TableCell>
          <TableCell>AAPL</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default AddTradeTable;