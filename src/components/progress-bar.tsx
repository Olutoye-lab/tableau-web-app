"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className, showLabel = true }: ProgressBarProps) {
  // Clamp value between 0 and 100
  const percentage = Math.min(Math.max(value, 0), 100)

  const getEndColor = (val: number) => {
    if (val < 40) {
      // Red zone (0-40%)
      return "hsl(0, 75%, 45%)" // red
    } else if (val >= 70) {
      // Green zone (70-100%)
      return "hsl(120, 75%, 45%)" // green
    } else {
      // Transition zone (40-70%)
      const ratio = (val - 40) / 30
      const hue = ratio * 120
      return `hsl(${hue}, 75%, 45%)`
    }
  }

  const endColor = getEndColor(percentage)

  return (
    <div className={cn("w-full mb-1 mt-2", className)}>
      <div className="relative h-6 w-full overflow-hidden rounded-lg bg-muted">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(to right, hsl(0, 75%, 45%), ${endColor})`,
          }}
        />
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground mix-blend-difference">
            {percentage.toFixed(0)}%
          </div>
        )}
      </div>
    </div>
  )
}
