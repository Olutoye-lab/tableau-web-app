import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { PageProps } from "./Form"
import { useSSE } from "./hooks/UseSSE";
import { useEffect, useReducer, useRef, useState } from "react";
import { ButtonMenu } from "./ButtonMenu";
import LoadAnimations from "./LoadAnimations";
import StatusBar from "./StatusBar";

function getItem(arr: Array<any>, index: number) { return index >= 0 && index < arr.length ? arr[index] : null; }

export function DisplaySSE({prevPage, payload}: PageProps){
    const [showRectangle, setShowRectangle] = useState<boolean>(false)
    const [buttonId, setButtonId] = useState<number>(0)
    const [currentData, setCurrentData] = useState<any | null>()
    const [AnimationId, setAnimationId] = useState<number>(0)
    const isOnMount = useRef(false)

    const { messages, isConnected, isLoading, error, connect, disconnect, clearMessages } = useSSE({
        postUrl: 'http://localhost:8000/save',
        sseBaseUrl: 'http://localhost:8000/events',
    });

    // Update status bar data
    useEffect(()=>{
        if (isOnMount.current){
            console.log(buttonId)
            setShowRectangle(true)

            const data = getItem(messages, buttonId)

            console.log("DATA", data)

            if (data){
                setCurrentData((data) ? JSON.parse(data["data"]) : null)
            } else {
                setCurrentData(null)
            }
        } 
        isOnMount.current = true
    }, [buttonId])

    // Update Animation data
    useEffect(()=>{
        if (messages.length > 0){
            const data = JSON.parse(messages[messages.length-1].data)
            setAnimationId(data.id)
        }
    }, [messages])

    // Send payload
    useEffect(()=>{
        if(payload){
            console.log("payload renderd ")
            connect(payload)
        }
    }, [payload])

    
    return (
        <> 
        <div className="relative space-y-6 flex flex-row justify-between">
            
        <ButtonMenu setId={setButtonId} dataId={AnimationId}/>
        <LoadAnimations id={AnimationId}/>
        {/* <div className="pt-8">
            <Button size="lg" onClick={prevPage} variant="outline" className="gap-2 px-8 bg-transparent">
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Page 1
            </Button>
        </div> */}
        <div></div>
        </div>
        <StatusBar showRectangle={showRectangle} setShowRectangle={setShowRectangle} data={currentData} />
        </>
    )
}
