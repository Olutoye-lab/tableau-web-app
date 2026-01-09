"use client"

import { useState, useEffect } from "react"

interface RingProgressProps {
  value: number
  total: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function RingProgress({ value, total, size = 120, strokeWidth = 8, className = "" }: RingProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    setAnimatedValue(0)
    const duration = 2000
    const startTime = Date.now()

    const easeOutCubic = (t: number) => {
      return 1 - Math.pow(1 - t, 4)
    }

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress = easeOutCubic(progress)
      const currentValue = Math.round(easedProgress * value)

      setAnimatedValue(currentValue)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value])

  const percentage = Math.min((animatedValue / total) * 100, 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted"
            opacity={0.2}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-75 ease-linear"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{animatedValue}</span>
          <span className="text-sm text-muted-foreground">/ {total}</span>
        </div>
      </div>
    </div>
  )
}
