import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/sheet-table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const data: any = ""

export function SheetTable({data, type}: {data: any, type: string}) {

  return (
    <Table className="rounded-lg h-full" style={{scrollbarWidth: "thin", right: 0}}>
      <TableCaption>Vendor Transaction Information.</TableCaption>
      {(type === "Good")?
      <TableHeader className="bg-slate-100 sticky top-0" style={{position: "sticky", top: 0 }}>
        <TableRow className="relative">
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Vendor Name</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead className="text-right">Currency code</TableHead>
          <TableHead>Exchange Rate</TableHead>
          <TableHead className="w-[100px]">Transaction ID</TableHead>
          <TableHead>Approval Status</TableHead>
          <TableHead className="text-right">Invoice Date</TableHead>
          <TableHead className="w-[100px]">Tax Amount</TableHead>
          <TableHead>{"Total Amount ($)"}</TableHead>
        </TableRow>
      </TableHeader>
      :<TableHeader className="bg-slate-100 sticky top-0" style={{position: "sticky", top: 0 }}>
        <TableRow className="relative">
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Comp Name</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="text-right">Curr</TableHead>
          <TableHead>Ex Rate</TableHead>
          <TableHead className="text-right">Snack Pref</TableHead>
          <TableHead className="w-[100px]">Trans Ref</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Internal Mood Index</TableHead>
          <TableHead className="text-right">Entry Date</TableHead>
          <TableHead className="w-[100px]">Tax </TableHead>
          <TableHead className="w-[100px]">Weather</TableHead>
          <TableHead>{"Total ($)"}</TableHead>
        </TableRow>
      </TableHeader>
      
      }
      {(type === "Good")?
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.Id}>
            <TableCell className="text-right">{item.Id}</TableCell>
            <TableCell className="font-medium">{item.Vendor_Name}</TableCell>
            <TableCell>{item.Customer_Name}</TableCell>
            <TableCell>{item.Currency_Code}</TableCell>
            <TableCell >{item.Exchange_Rate}</TableCell>
            <TableCell className="font-medium">{item.Transaction_ID}</TableCell>
            <TableCell>{item.Approval_Status}</TableCell>
            <TableCell>{item.Invoice_Date}</TableCell>
            <TableCell className="text-right">{item.Tax_Amount}</TableCell>
            <TableCell className="font-medium text-right">{item.Total_Amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      :<TableBody>
        {data.map((item: any) => (
          <TableRow key={item.Id}>
            <TableCell className="text-right">{item.Id}</TableCell>
            <TableCell className="font-medium">{item.Comp_Name}</TableCell>
            <TableCell>{item.Client}</TableCell>
            <TableCell>{item.Curr}</TableCell>
            <TableCell >{item.Ex_Rate}</TableCell>
            <TableCell className="text-right">{item.Snack_Pref}</TableCell>
            <TableCell className="font-medium">{item.Trans_Ref}</TableCell>
            <TableCell>{item.Status}</TableCell>
            <TableCell>{item.Internal_Mood_Index}</TableCell>
            <TableCell>{item.Entry_Date}</TableCell>
            <TableCell className="text-right">{item.Tax}</TableCell>
            <TableCell>{item.Weather}</TableCell>
            <TableCell className="font-medium text-right">{item.Total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      }
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>50 more rows ...</TableCell>
        </TableRow>
      </TableFooter>

    </Table>
  )
}
