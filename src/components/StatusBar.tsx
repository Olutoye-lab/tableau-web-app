import { CircleXIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

  const TestData: any = {
    title: "Metadata Scanner",
    text: "This is test text, for the data test to be inside this place",
    table: [{
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
    
  }

const EmptyData = {
    title: "Uninitialised Process",
    text: "This process has not been resolved.",
}

function displayTable(table: any, columns: any){
  return (
  <Table className="min-h-1/2">
    <TableHeader>
      <TableRow>
        {columns.map((col: any, index: number) => (
          <TableHead key={index} className="font-medium">
            {col.header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {table.map((item: any, idx: number) => (
        <TableRow key={item.id  || idx}>
          {columns.map((col: any) => (
            <TableCell key={col.header} className="text-right">
              {item[col.header] ?? "—"}
            </TableCell>
          ))}
          </TableRow>
      ))}
    </TableBody>
  </Table>
)
}
 
function displayList(data: string[]){
  return (
    <div className="grid grid-cols-2 gap-2">
      {data.map((text: string)=>(
          <div className="w-1/3 h-1/5 bg-white rounded-xl">{text}</div>
      ))}
    </div>
  )
}

function displayJson({json}:any) {
  return <p>JSON</p>
}

interface StatusBarProps {
    showRectangle: boolean
    data: any
    setShowRectangle: (value: boolean)=>void
}

export default function StatusBar({showRectangle, data, setShowRectangle}: StatusBarProps){

  // const data = {
  //   title: "",
  //   text: "",
  //   list: [],
  //   text2: ""
  //   table: {}
  //   json: {}
  // }
  let columns = []

  if (data == null) {
    data = EmptyData
  } else {

    if (data["table"]){

      const FirstEntry = data["table"][0]
      for (const [key, value] of Object.entries(FirstEntry)) {
        columns.push({header: key, id: key.toLowerCase()})
      }
      console.log("Columns Parsed", columns)
    }
    
  }

    return (
    <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out ${
          showRectangle ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button  onClick={()=>setShowRectangle(false)} className="mr-4 p-0 size-6 cursor-pointer flex items-center justify-center hover:bg-slate-300 rounded-full" ><CircleXIcon size={17}/></button>
        <Card className="w-70 h-120 min-h-120 shadow-xl mr-8">
          <CardContent className="h-full flex flex-col justify-between">
            <h3 className="text-xl font-medium text-center">{data["title"]}</h3>

            <p>{data["text"]}</p>

            {(data["list"])? 
              <>
                {displayList(data["list"])}
                <p>{data["text2"]}</p>
              </>
            : null}

            {(data["table"])? displayTable(data["table"], columns): null }

            {(data["json"])? displayJson(data["json"]): null }

          </CardContent>
        </Card>
      </div>
    )
}