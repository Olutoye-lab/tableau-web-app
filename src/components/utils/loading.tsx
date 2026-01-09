"use client"

import { useState, useEffect } from "react"

export function LogoLoader() {
  const [rotationStep, setRotationStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationStep((prev) => (prev + 1) % 4)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Each array represents the 4 colors that will appear in that position
  const colorCycles = {
    topLeft: ["#fbbf24", "#6366f1", "#ef4444", "#f97316"], // yellow → purple → red → orange
    topRight: ["#6366f1", "#ef4444", "#f97316", "#fbbf24"], // purple → red → orange → yellow
    bottomLeft: ["#f97316", "#fbbf24", "#6366f1", "#ef4444"], // orange → yellow → purple → red
    bottomRight: ["#ef4444", "#f97316", "#fbbf24", "#6366f1"], // red → orange → yellow → purple
  }

  return (
    <div className="inline-flex flex-col items-center gap-3 w-full h-full justify-center">
      <div className="grid grid-cols-2 gap-1.5 w-24 h-24">
        {/* Top Left */}
        <div
          className="rounded-2xl transition-colors duration-700"
          style={{
            backgroundColor: colorCycles.topLeft[rotationStep],
          }}
        />

        {/* Top Right */}
        <div
          className="rounded-2xl transition-colors duration-700"
          style={{
            backgroundColor: colorCycles.topRight[rotationStep],
          }}
        />

        {/* Bottom Left */}
        <div
          className="rounded-2xl transition-colors duration-700"
          style={{
            backgroundColor: colorCycles.bottomLeft[rotationStep],
          }}
        />

        {/* Bottom Right */}
        <div
          className="rounded-2xl transition-colors duration-700"
          style={{
            backgroundColor: colorCycles.bottomRight[rotationStep],
          }}
        />
      </div>

      <span className="text-2xl font-bold text-[#6366f1] tracking-wider">MINI</span>
    </div>
  )
}
