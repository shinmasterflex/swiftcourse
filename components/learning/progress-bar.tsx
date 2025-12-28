/**
 * PROGRESS BAR COMPONENT
 * Visual indicator of course/module completion
 */

"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface ProgressBarProps {
  current: number
  total: number
  label?: string
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({ current, total, label, showPercentage = true, className }: ProgressBarProps) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Use 0 for SSR to avoid hydration mismatch
  const displayCurrent = isClient ? current : 0
  const percentage = Math.min(Math.max(Math.round((displayCurrent / total) * 100), 0), 100)

  return (
    <div className={cn("space-y-2", className)}>
      {/* Label and Percentage */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium font-heading">{label}</span>}
          {showPercentage && <span className="text-muted-foreground font-semibold">{percentage}% Complete</span>}
        </div>
      )}

      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #1a4d3e 0%, #ff5722 100%)",
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Current/Total */}
      <div className="text-xs text-muted-foreground text-right">
        {displayCurrent} of {total} completed
      </div>
    </div>
  )
}
