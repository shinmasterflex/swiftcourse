"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-emerald-50/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-top gap-3">
          <Image src="/logo1.svg" alt="SwiftCourse Logo" width={32} height={32} className="h-8 w-8" priority />
          <div className="text-3xl">
            <span className="font-serif font-light italic text-brand-orange">Swift </span>
            <span className="font-heading font-light text-brand-green">Course</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Button asChild variant="outline">
            <Link href="/demo">Try Module 0</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://calendly.com/your-calendly-link" target="_blank" rel="noopener noreferrer">
              Schedule a Call
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
