import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GitCompareArrowsIcon } from "lucide-react"
import { UseTooltip } from "../UseTooltip"

export default function UseDialog({component}: {component: any}){
    return (
        <Dialog>
            <UseTooltip info="Show diff" component={<DialogTrigger className=" absolute top-5 right-5 flex items-center justify-center size-10 rounded-full bg-white border-green-100 border-4 cursor-pointer"><GitCompareArrowsIcon /></DialogTrigger>} />
            <DialogContent>
                <DialogTitle className="flex-none">Dataset Difference</DialogTitle>
                {component}
            </DialogContent>
        </Dialog>
    )
}