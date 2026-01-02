/**
 * GRID DISPLAY COMPONENT
 * 2x2 grid with axis labels for displaying principles or concepts
 * Used for Goals and Improvement section
 */

import { Card } from "@/components/ui/card"

interface GridItem {
  title: string
  description: string
}

interface GridDisplayProps {
  title: string
  items: GridItem[] // Array of items
  xAxisLabel?: string
  yAxisLabel?: string
}

export function GridDisplay({ title, items, xAxisLabel, yAxisLabel }: GridDisplayProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-balance">{title}</h3>

      <div className="relative">
        {/* Y-Axis Label */}
        {yAxisLabel && (
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{yAxisLabel}</span>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8">
          {items.map((item, index) => (
            <Card
              key={index}
              className="p-6 border-2 border-brand-green/20 hover:border-brand-green/40 transition-colors"
            >
              <h4 className="text-lg font-semibold mb-3 text-brand-green">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>

        {/* X-Axis Label */}
        {xAxisLabel && (
          <div className="text-center mt-4">
            <span className="text-sm font-medium text-muted-foreground">{xAxisLabel}</span>
          </div>
        )}
      </div>
    </div>
  )
}
