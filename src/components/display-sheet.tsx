import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { EyeIcon } from "lucide-react"
import { SheetTable } from "./table"

export function DisplaySheet({data}: {data: any}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="size-7"><EyeIcon /></Button>
      </SheetTrigger>
      <SheetContent style={{width: "600px", maxWidth: "900px", maxHeight: "100vh"}}>
        <SheetHeader>
          <SheetTitle>{data["name"]}</SheetTitle>
          <SheetDescription className="whitespace-pre-line text-md">
            <span>{data["description"]}</span>
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-3/4 overflow-auto">
        <SheetTable data={data["data"].slice(0, 50)} type={data["name"].slice(0, 4)}/>
        </div>
      </SheetContent>
    </Sheet>
  )
}
