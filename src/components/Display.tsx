import { PageProps } from "./Form"
import { useSSE } from "./hooks/UseSSE";
import { useEffect, useRef, useState } from "react";
import { ButtonMenu } from "./ButtonMenu";
import LoadAnimations from "./LoadAnimations";
import StatusBar from "./StatusBar";
import DatasetDiffViewer, { sample1, sample2 } from "./diff-viewer";

function getItem(arr: Array<any>, index: number) { return index >= 0 && index < arr.length ? arr[index]["data"] : null; }

export function DisplaySSE({ payload, setLocked}: PageProps){
    const [showRectangle, setShowRectangle] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<any | null>()
    const [AnimationId, setAnimationId] = useState<number>(0)
    const [dataset1, setDataset1] = useState<any[]>([])
    const [dataset2, setDataset2] = useState<any[]>([])


    const { messages, isConnected, isLoading, error, connect, disconnect, clearMessages } = useSSE({
        postUrl: process.env.NEXT_PUBLIC_POST_URL || "",
        sseBaseUrl: process.env.NEXT_PUBLIC_SSE_URL || "",
    });

    const setId = (buttonId: number) => {
        console.log(buttonId)
        setShowRectangle(true)

        const data = getItem(messages, buttonId)

        console.log("DATA", data)

        setCurrentData(JSON.parse(data))

    }

    // Update Animation data
    useEffect(()=>{
        if (messages.length > 0){
            console.log(messages[messages.length-1].data)
            const data = JSON.parse(messages[messages.length-1].data)

            console.log("New data", data)
            const id = data.id

            console.log("ID", data.id)

            if (id == 5 ){
                setLocked(false)
                setCurrentData(data)
                setDataset2(data["data"])
            }

            setAnimationId(id)
        }
    }, [messages])

    // Send payload
    useEffect(()=>{

        if(payload){
            console.log("payload renderd ")
            connect(payload)

            if (Array.isArray(payload["data"])){
                setDataset1(payload["data"])
            } else {
                setDataset1(JSON.parse(payload["data"]))
            }
        }
    }, [payload])

    
    return (
        <> 
        <div className="relative space-y-6 flex flex-row justify-between">
            
        <ButtonMenu setId={setId} dataId={AnimationId}/>
        <LoadAnimations id={AnimationId} results={currentData}/>
        {/* <div className="pt-8">
            <Button size="lg" onClick={prevPage} variant="outline" className="gap-2 px-8 bg-transparent">
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Page 1
            </Button>
        </div> */}
        <div></div>
        </div>
        <DatasetDiffViewer set1={dataset1} set2={dataset2}/>
        <StatusBar showRectangle={showRectangle} setShowRectangle={setShowRectangle} data={currentData} />
        </>
    )
}
