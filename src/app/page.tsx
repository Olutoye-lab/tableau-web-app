'use client'
import Home from "@/components/pages/home";
import Panel from "@/components/pages/panel";
import {ReportOverview} from "@/components/pages/reports";
import { Separator } from "@/components/ui/separator";
import { BookOpenText, House, SlidersVertical, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Start() {
  const [page, setPage] = useState<number>(0)
  const [isLocked, setIsLocked] = useState<boolean>(false)

  const setLocked = (state: boolean) => setIsLocked(state)

  const handleSetPage = (value: number)=>{
    setPage(value)
  }

  useEffect(()=>{
    if (!localStorage.getItem("user_id")){
      let user_id = crypto.randomUUID()
      localStorage.setItem("user_id", user_id)
    }
  }, [])

  const Logo = () => (
    <div className="flex items-center gap-2">
      <span className="font-bold text-xl text-primary">MINI</span>
    </div>
  )

  return (
    <main className="w-screen h-screen bg-background text-foreground font-body">
      <div className="w-screen h-[50px] flex justify-between items-center p-5 px-4 z-30">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex flex-row items-center gap-4">
          <button className="rounded-md hover:bg-secondary px-3 py-1 text-sm font-medium">Feedback</button>
          <span className="text-sm font-medium">Demo User</span>
          <UserCircle className="text-muted-foreground"/>
        </div>
      </div>
      <Separator />
      <div className="w-full flex flex-row" style={{height: "calc(100vh - 51px)"}}>
        <div className="relative w-[100px] h-full flex flex-col gap-2 items-center justify-center p-2">
          <div className="absolute top-10 left-0 flex items-center justify-center"><img src="logo.png" alt="Logo" width="100" height="100" className="" ></img></div>
          <div className={`w-20 h-20 rounded-lg hover:bg-secondary flex flex-col justify-center items-center cursor-pointer data-[active=true]:bg-accent/20 data-[active=true]:text-primary ${(isLocked == true)? "pointer-events-none opacity-25 cursor-not-allowed": ""}`}
          onClick={()=>setPage(0)}
          data-active={page===0}
          >
            <House />
            <p className="text-sm mt-1">Home</p>
          </div>
          <div className={`w-20 h-20 rounded-lg hover:bg-secondary flex flex-col justify-center items-center cursor-pointer data-[active=true]:bg-accent/20 data-[active=true]:text-primary`}
          onClick={()=>setPage(1)}
          data-active={page===1}
          data-testid="start-demo"
          >
            <SlidersVertical />
            <p className="text-sm mt-1">Panel</p>
          </div>
          <div className={`w-20 h-20 rounded-lg hover:bg-secondary flex flex-col justify-center items-center cursor-pointer data-[active=true]:bg-accent/20 data-[active=true]:text-primary ${(isLocked == true)? "pointer-events-none opacity-25 cursor-not-allowed": ""}`}
          onClick={()=>setPage(2)}
          data-active={page===2}
          >
            <BookOpenText />
            <p className="text-sm mt-1">Reports</p>
          </div>
        </div>
        <Separator orientation="vertical"/>
        <div className="w-full h-full bg-secondary/50">
          {(page == 0)?
            <Home setPage={handleSetPage} />:
          (page == 1)?
            <Panel setLocked={setLocked}/>:
            <ReportOverview />
          }
        </div>
      </div>
    </main>
  );
}
