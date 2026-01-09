"use client"

import { useState, useEffect, useRef } from "react"

export function MiniLogo() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Using a ref to track the timeout so we can cancel it on unmount/leave
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isHovered) {
      // Immediate first trigger
      const trigger = () => {
        setIsTransitioning(true)
        timeoutRef.current = setTimeout(() => setIsTransitioning(false), 1500)
      }

      trigger() // Run once immediately on hover
      interval = setInterval(trigger, 3000)
    } else {
      setIsTransitioning(false)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    return () => {
      if (interval) clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isHovered])

  const duration = "duration-500"

  // Configuration for the squares to keep the JSX clean
  const squares = [
    { normal: "#fbbf24", active: "#ef4444", delayIn: "0ms", delayOut: "600ms" }, // TL
    { normal: "#6366f1", active: "#fbbf24", delayIn: "200ms", delayOut: "400ms" }, // TR
    { normal: "#f97316", active: "#6366f1", delayIn: "400ms", delayOut: "200ms" }, // BL
    { normal: "#ef4444", active: "#f97316", delayIn: "600ms", delayOut: "0ms" },   // BR
  ]

  return (
    <div
      className="inline-flex flex-col items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="banner"
    >
      <div className="grid grid-cols-2 gap-1.5 w-20 h-20">
        {squares.map((sq, i) => (
          <div
            key={i}
            className={`rounded-2xl transition-all ${duration}`}
            style={{
              backgroundColor: isTransitioning ? sq.active : sq.normal,
              transitionDelay: isTransitioning ? sq.delayIn : sq.delayOut,
            }}
          />
        ))}
      </div>
    </div>
  )
}