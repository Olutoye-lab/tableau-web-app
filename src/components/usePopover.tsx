import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent } from "./ui/card"
import { ArrowRight } from "lucide-react"


export function UsePopover({title, variant}: {title: string, variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined}) {
  return (
    <Popover >
      <PopoverTrigger asChild className="flex justify-end cursor-pointer">
        <Button variant={variant}>{title}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-140">
        <Card>
            <CardContent className="flex flex-wrap">
                {"To view your dataset go to Home -> Explore -> Mini Project"}
                <p className="text-xs opacity-60">*Just add the datasource to your workbook!!</p>
            </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
