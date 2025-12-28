"use client"
import { useRouter, usePathname } from "next/navigation"
import { ChevronDown, BookOpen, CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProgress } from "@/hooks/use-progress"
import { useState, useEffect } from "react"

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { getCourseStructure, getCompletedSections, currentModule, currentSection, setCurrentPosition } = useProgress()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Mark as client-side after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  const courseStructure = getCourseStructure()

  const handleSectionClick = (moduleId: string, sectionId: string) => {
    setCurrentPosition(moduleId, sectionId)

    // Navigate to the module with section parameter
    const modulePath = `/course/${moduleId}`
    router.push(`${modulePath}?section=${sectionId}`)
  }

  const activeModuleId = pathname?.includes("module-1") ? "module-1" : "module-0"

  if (isCollapsed) {
    return (
      <button
        onClick={toggleCollapsed}
        className="fixed -left-2 top-20 z-50 flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg hover:bg-muted transition-all duration-300 ease-in-out group hover:left-0"
        aria-label="Expand sidebar"
      >
        <BookOpen className="h-4 w-4 text-brand-green" />
        <span className="text-sm font-medium">Menu</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>
    )
  }

  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 font-heading">
            <BookOpen className="h-5 w-5 text-brand-green" />
            Course Menu
          </h2>
          <button
            onClick={toggleCollapsed}
            className="p-1 rounded hover:bg-muted transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <nav className="space-y-2">
          {courseStructure.modules.map((module) => {
            const isActiveModule = pathname?.includes(module.id)
            const completedSectionIds = getCompletedSections(module.id)

            return (
              <div key={module.id}>
                {/* Module Header */}
                <div
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors font-heading",
                    isActiveModule ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                >
                  <span className="text-left">{module.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </div>

                {/* Module Sections - Always show for active module */}
                {isActiveModule && (
                  <div className="ml-4 mt-2 space-y-1">
                    {module.sections.map((section, index) => {
                      // Don't show completion or active status until client-side hydration is complete
                      const isCompleted = isClient && completedSectionIds.includes(section.id)
                      const isActive = isClient && currentModule === module.id && currentSection === section.id

                      return (
                        <button
                          key={section.id}
                          onClick={() => handleSectionClick(module.id, section.id)}
                          className={cn(
                            "w-full flex items-center gap-2 p-2 rounded text-sm transition-colors text-left",
                            isActive && "bg-brand-green/10 text-brand-green font-medium",
                            !isActive && "hover:bg-muted",
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                          ) : isActive ? (
                            <Circle className="h-4 w-4 text-brand-orange fill-brand-orange flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className="text-pretty">{section.title}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
