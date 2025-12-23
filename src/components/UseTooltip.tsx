import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export function UseTooltip({info}: {info: string}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="size-5"><Info className="w-4 h-4 text-muted-foreground" /></Button>
      </TooltipTrigger >
      <TooltipContent side="bottom" >
        <p>{info}</p>
      </TooltipContent>
    </Tooltip>
  )
}
