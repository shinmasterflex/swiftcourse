"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { progressManager } from "@/lib/global-progress"
import { AIChatButton } from "@/components/ai/ai-chat-button"

export function Header() {
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all course progress? This action cannot be undone.")) {
      progressManager.resetProgress()
      window.location.href = "/course"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-emerald-50/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/course" className="flex items-top gap-3">
          <Image src="/logo1.svg" alt="SwiftCourse Logo" width={32} height={32} className="h-8 w-8" priority />
          <div className="text-3xl">
            <span className="font-serif font-light italic text-brand-orange">Swift </span>
            <span className="font-heading font-light text-brand-green">Course</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/course" className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors">
            Dashboard
          </Link>
          <Link
            href="/course/module-0"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 0
          </Link>
          <Link
            href="/course/module-1"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 1
          </Link>
          <Link
            href="/course/module-2"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 2
          </Link>
          <Link
            href="/course/module-3"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 3
          </Link>
          <Link
            href="/course/module-4"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 4
          </Link>
          <Link
            href="/course/module-5"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 5
          </Link>
          <Link
            href="/course/module-6"
            className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors"
          >
            Module 6
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button onClick={handleReset} className="bg-brand-orange hover:bg-[#e64a19] text-white flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset Progress
          </Button>
        </div>
      </div>

      <AIChatButton />
    </header>
  )
}
