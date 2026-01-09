import { useEffect, useRef, useState } from "react"
import { RingProgress } from "@/components/reportUI/ring-progress"
import ScoreBlock from "@/components/reportUI/score-block"
import { columns } from "@/components/reportUI/table/columns"
import { DataTable } from "@/components/reportUI/table/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getReportData, getReportMetadata } from "@/app/actions"
import { LogoLoader } from "../utils/loading"
import { FisherYatesShuffle } from "@/components/utils/shuffle"
import { ChevronLeft, RefreshCw } from "lucide-react"
import { UseTooltip } from "../UseTooltip"

export type ReportProps = {
    id: string
    column: string
    type: string
    message: string
    status: "info" | "warning" | "critical"
  }

export interface MetadataProps {
    report_id: string
    report_name: string
    column_scores: {name: string, value: number}[]
    null_score: [number, number]
    report_score: number
    created_at: string
}


export const TestMetadata: MetadataProps[] = [{
    report_id: "000-000-000-000",
    report_name: "Mini Report 3464",
    column_scores: [{name: "col1", value: 10}, {name: "col2", value: 45}, {name: "col3", value: 32}, {name: "col4", value: 93}],
    null_score: [7, 10],
    report_score: 85,
    created_at: ""
    }]
export const TestReport: ReportProps[] = [
    {
        id: "000-000-000-000",
        column: "235345",
        type: "info",
        message: "235345",
        status: "info"
    },
    {
        id: "728ed52f",
        column: "col1",
        type: "info",
        message: "100",
        status: "info",
    },
    {
        id: "728ed52f",
        column: "col2",
        type: "warning",
        message: "900",
        status: "warning",
    },
    {
        id: "222",
        column: "235345",
        type: "critical",
        message: "235345",
        status: "critical"
    },
    {
        id: "728ed52f",
        column: "col1",
        type: "info",
        message: "100",
        status: "info",
    },
    {
        id: "728ed52f",
        column: "col2",
        type: "warning",
        message: "900",
        status: "warning",
    },
    {
        id: "222",
        column: "235345",
        type: "info",
        message: "235345",
        status: "info"
    },
    {
        id: "728ed52f",
        column: "col1",
        type: "critical",
        message: "100",
        status: "critical",
    },
    {
        id: "728ed52f",
        column: "col2",
        type: "warning",
        message: "900",
        status: "warning",
    },
]

export function Report({reportData, reportMetadata, setReportIndex, metadataSize}: {reportData: any, reportMetadata: any, setReportIndex: (index: number)=>void, metadataSize: number}){
    return (
        <div className="relative flex flex-col w-full h-full p-6 gap-6 bg-secondary/30">
            <UseTooltip component={<div className="absolute top-2 left-2 flex items-center justify-center z-10 size-10 rounded-full border-2 border-blue-2 bg-background cursor-pointer" onClick={()=>setReportIndex(metadataSize)}><ChevronLeft /></div>} info="Back" />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

                <ScoreBlock scores={reportMetadata["column_scores"]}/>
                <Card className="flex flex-col items-center justify-center shadow-md">
                    <CardHeader className="w-1/2 text-center">
                        <CardTitle>Null Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center justify-center">
                        <RingProgress value={reportMetadata["null_score"][0]} total={reportMetadata["null_score"][1]} size={140}/>
                    </CardContent>
                </Card>
                <Card className="flex flex-col items-center justify-center shadow-md">
                     <CardHeader className="w-1/2 text-center">
                        <CardTitle>Report Score</CardTitle>
                        <CardDescription>{reportMetadata["report_name"].replace(" ", "-")}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-6xl font-bold text-primary text-center">
                        {reportMetadata["report_score"]}
                    </CardContent>
                </Card>

            </div>
            <div className="w-full overflow-none" style={{height: "61%"}}>
                <DataTable columns={columns} data={reportData} />
            </div>
        </div>
    )
}


const renderReportList = ({reportMetadata, getReport, setIsLoading, metadata}: {reportMetadata: any, getReport: (index: number)=> void, setIsLoading: (state: boolean)=>void, metadata: ()=>void}) => {

    return <div className="w-full h-full relative p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-6 bg-secondary/30">
            <UseTooltip component={<div className="absolute top-2 left-2 flex items-center justify-center z-10 size-10 rounded-full border-2 border-blue-2 bg-background cursor-pointer" onClick={()=>{setIsLoading(true); metadata()}}><RefreshCw size="23"/></div>}  info="Refresh"/>
            {reportMetadata.map((item: any, index: number)=>(
                <Card key={index} onClick={()=>{setIsLoading(true); getReport(index)}} className="cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                    <CardHeader>
                            <CardTitle className="text-primary">{item["report_name"]}</CardTitle>
                            <CardDescription>{item["report_id"]}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-baseline justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Overall Score</p>
                            <p className="text-4xl font-bold">{item["report_score"]}</p>
                        </div>
                            <div>
                            <p className="text-sm text-muted-foreground text-right">Nulls</p>
                            <p className="text-2xl font-semibold">{item["null_score"][0]} {"/"} {item["null_score"][1]}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
}

export function ReportOverview(){
    const [reportIndex, setReportIndex] = useState<number>(1)
    const [reportData, setReportData] = useState<any>(null)
    const [reportMetadata, setReportMetadata] = useState<any[]>(TestMetadata)
    const [isLoading, setLoading] = useState<boolean>(true)

    // Get and Set list of all report metadata

    const metadata = async() => {
        const userId = localStorage.getItem("user_id") || "test_user"

        let data = await getReportMetadata(userId)
        setReportMetadata([...TestMetadata, ...data])
        setLoading(false)
        setReportIndex(data.length + 1)
    }

    useEffect(()=>{
        metadata()
    }, [])
    
    // Get report information based on report Id

    const setIsLoading = (state: boolean) => setLoading(state)
    const setIndex = (index: number) => setReportIndex(index)

    const getReport = async(index: number) => {
        console.log("getting report ...", index)
        setReportIndex(index)

        if (index !== 0 ){
            console.log("report", reportMetadata)
            const reportId = reportMetadata[index]["report_id"]
            const userId = localStorage.getItem("user_id") || "test_user"
            const data = await getReportData(userId, reportId)
            if (data){
                const shuffledList = FisherYatesShuffle(data)
                console.log("Data", shuffledList)
                setReportData(shuffledList)
                setLoading(false)
            } else {
                console.log("No report data recieved")
            }

        } else {
            setReportData(TestReport)
            console.log("loading false")

            setLoading(false)
        }
    }

    useEffect(()=>{
        console.log("Is loading changed", isLoading)
    }, [isLoading])
    
    return (
        <div className="w-full h-full ">
        {(isLoading)?
            <LogoLoader />
        :
            <>
            {(reportIndex === reportMetadata.length)?
                <>{renderReportList({reportMetadata, getReport, setIsLoading, metadata})}</>
                :<Report reportData={reportData} reportMetadata={reportMetadata[reportIndex]} setReportIndex={setIndex} metadataSize={reportMetadata.length} />
            }
            </>
        }

        </div>
    )
}
