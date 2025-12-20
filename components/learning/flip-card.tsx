/**
 * FLIP CARD COMPONENT
 * 3D flip card with X-axis rotation
 * Used for Big Five personality traits - high ratings on front, low ratings on back
 * Inverted color theme on back side
 */

"use client"

import { useState, type ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FlipCardProps {
  frontTitle: string
  frontContent: ReactNode
  backTitle: string
  backContent: ReactNode
  className?: string
}

/**
 * FlipCard component with 3D rotation around X-axis
 * Hover to flip between high and low trait ratings
 * Front side: Light background with brand colors
 * Back side: Black background with white text for maximum readability
 */
export function FlipCard({ frontTitle, frontContent, backTitle, backContent, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={cn("perspective-1000 cursor-pointer h-80", className)} 
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative h-full transition-transform duration-700 transform-style-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
        }}
      >
        {/* Front of card - High Ratings */}
        <Card
          className="absolute inset-0 p-6 backface-hidden bg-gradient-to-br from-brand-green/10 to-brand-orange/10 border-2 border-brand-green/20"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold font-heading text-brand-green">{frontTitle}</h3>
            </div>

            <div className="flex-1 overflow-y-auto">{frontContent}</div>
          </div>
        </Card>

        <Card
          className="absolute inset-0 p-6 backface-hidden bg-black text-white border-2 border-brand-orange"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
          <div className="flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold font-heading text-brand-orange">{backTitle}</h3>
            </div>

            <div className="flex-1 overflow-y-auto [&_p]:text-white [&_p]:opacity-90 [&_h4]:text-white">
              {backContent}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
