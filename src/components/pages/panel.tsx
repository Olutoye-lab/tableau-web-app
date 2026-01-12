"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Form from "@/components/Form"
import { DisplaySSE } from "@/components/Display"

export default function Panel({setLocked}:{setLocked: (state: boolean)=>void}) {
  const [currentPage, setCurrentPage] = useState(0)
  const [payload, setPayload] = useState<any>()

  const nextPage = () => {
    if (currentPage < 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-background to-muted p-4" 
    style={{
      background: "linear-gradient(117deg,rgba(247, 247, 208, 1) 0%, rgba(160, 250, 226, 1) 52%, rgba(106, 235, 235, 1) 100%)"  
    }}>
      <div className="w-full max-w-5xl space-y-4">

        {/* Page Indicators */}
        <div className="flex justify-end gap-2 mt-8 mr-10">
          {[0, 1].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPage === page ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to page ${page + 1}`}
            />
          ))}
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {/* Page 1 */}
            <div className="w-full flex-shrink-0">
              <Card className="border-none border-white " style={{flex: "none", padding: 0}}>
                  <Form setPayload={setPayload} nextPage={nextPage} setLocked={setLocked}/>
              </Card>
            </div>

            {/* Page 2 */}
            <div className="w-full flex-shrink-0">
              <Card className="border-2 py-3">
                <CardContent className="p-12 relative">
                  <DisplaySSE nextPage={nextPage} setPayload={setPayload} payload={payload} prevPage={prevPage} setLocked={setLocked}/>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
