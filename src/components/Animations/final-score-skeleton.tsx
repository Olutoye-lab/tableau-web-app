import { useEffect, useRef } from "react"
import { ProgressBar } from "../progress-bar"
import { Separator } from "../ui/separator"
import { UsePopover } from "../usePopover"
import { toast } from "sonner"


export const TestData  ={
    score: 70,
    text: "This is a test description for the final score erg rty rty tru ty ut yu tyu tyu t yut yu tyu t yut yu tu t yu tyu",
    fields: [
        {
            name: "Employee",
            score: 50
        },
        {
            name: "Employee",
            score: 50
        },
        {
            name: "Employee",
            score: 50
        },
        {
            name: "Employee",
            score: 50
        },
        {
            name: "Employee",
            score: 50
        },
        {
            name: "Employee",
            score: 50
        },
            {
            name: "Employee",
            score: 50
        },
    ]
}


export default function FinalScoreSkeleton(data: any){
    const hasRun = useRef(0)

    useEffect(()=>{
        if (hasRun.current == 3){
            const run = ()=>toast.success("Congradulations!! your just saved hours of your day. 🎉")
            run()
        }
        hasRun.current += 1
    }, [data])

    if (data == null || data["data"]){
        data = TestData
    }
    
    return(
    <div className="w-full h-full rounded-xl border border-border bg-card shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md">
          Results
        </div>
      </div>
      <Separator />
      <div className="mt-4 text-center flex flex-col justify-between">
        <h1 className="font-bold text-xl"> Data Confidence Score</h1>
        <span>{data["text"]}</span>
        <div className="flex justify-end">
            <p className=" rounded-lg border-2 w-13">{data["score"]}%</p>
        </div>
        <ProgressBar value={data["score"]}/>

        <Separator className="mb-2 mt-2"/>

        <div className="grid grid-rows-2 grid-flow-col auto-cols-min gap-x-4 overflow-auto" style={{scrollbarWidth: "none", scrollbarColor: ""}}>
        {data["fields"].map((field: any, index: number)=>(
            <div key={index} className="mt-4 flex flex-row gap-2 justify-between items-center rounded-xl border-2 px-3 py-1 border-blue-200 hover:bg-zinc-100">
                <p>{field["name"]}</p>
                <Separator orientation="vertical"/>
                <div className="">{field["score"]}%</div>
            </div>
        ))}
        </div>
        <UsePopover title="Where is your data?" variant="link" />
      </div>
    </div>
    )
}