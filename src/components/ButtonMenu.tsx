"use client"

import { BetweenHorizontalEnd, ScanBarcode, GitCompareArrows, MapPlus, IdCard, DatabaseBackup } from "lucide-react"
import { useState } from "react"
import { SolidLine } from "./Lines/solid-line"
import { DashedLine } from "./Lines/dashed-line"
import { ShadedLine } from "./Lines/shaded-line"

interface MenuProps {
    setId: (id: number)=>void
    dataId: number
}

const buttons = [
  { id: 0, icon: BetweenHorizontalEnd, label: "Ingestion" },
  { id: 1, icon: ScanBarcode, label: "Metadata Scanning" },
  { id: 2, icon: GitCompareArrows, label: "Intent Decoding" },
  { id: 3, icon: MapPlus, label: "Semantic Mapping" },
  { id: 4, icon: IdCard, label: "Entity Resolution" },
  { id: 5, icon: DatabaseBackup, label: "Confidence Analysis" },
]

const progressLine = ({currentId, buttonId}: {currentId: number; buttonId: number}) => (
    <div>
      {(buttonId < currentId )?
      <SolidLine />:
      (currentId === buttonId)?
      <DashedLine />:
      (buttonId > currentId )?
      <ShadedLine />:
      <></>
    }
    </div>
  )


export function ButtonMenu({setId, dataId}: MenuProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-0">
      {buttons.map((button) => {
        const Icon = button.icon
        const isHovered = hoveredId === button.id
        const buttonId = button.id
        const currentId = dataId

        return (
          <div
            key={button.id}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredId(button.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex flex-col items-center justify-center gap-0">
              <div className="relative flex flex-col">

                {/* Icon button */}
                <button
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-125 hover:shadow-xl"
                  aria-label={button.label}
                  onClick={()=>setId(button.id)}
                >
                  <Icon className="h-6 w-6" />
                </button>

                {/* Label that appears on hover */}
                <div
                  className={`absolute left-16 whitespace-nowrap rounded-lg bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-lg transition-all duration-300 ${
                    isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 pointer-events-none"
                  }`}
                >
                  {button.label}
                </div>
              </div>
              {(buttonId < 5)? progressLine({currentId, buttonId}): <></>}
            </div>

          </div>
        )
      })}
    </div>
  )
}
