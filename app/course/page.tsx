/**
 * DASHBOARD PAGE
 * Main landing page showing course overview and progress
 */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/learning/progress-bar"
import { BookOpen, Target, TrendingUp, Award } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const router = useRouter()
  const progress = useProgress()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const module0 = progress.modules?.find((m) => m.id === "module-0")
  const module1 = progress.modules?.find((m) => m.id === "module-1")
  const module2 = progress.modules?.find((m) => m.id === "module-2")
  const module3 = progress.modules?.find((m) => m.id === "module-3")
  const module4 = progress.modules?.find((m) => m.id === "module-4")
  const module5 = progress.modules?.find((m) => m.id === "module-5")
  const module6 = progress.modules?.find((m) => m.id === "module-6")

  const module0Progress = {
    completed: module0?.sections.filter((s) => s.completed).length || 0,
    total: module0?.sections.length || 9,
  }

  const module1Progress = {
    completed: module1?.sections.filter((s) => s.completed).length || 0,
    total: module1?.sections.length || 9,
  }

  const module2Progress = {
    completed: module2?.sections.filter((s) => s.completed).length || 0,
    total: module2?.sections.length || 14,
  }

  const module3Progress = {
    completed: module3?.sections.filter((s) => s.completed).length || 0,
    total: module3?.sections.length || 5,
  }

  const module4Progress = {
    completed: module4?.sections.filter((s) => s.completed).length || 0,
    total: module4?.sections.length || 11,
  }

  const module5Progress = {
    completed: module5?.sections.filter((s) => s.completed).length || 0,
    total: module5?.sections.length || 7,
  }

  const module6Progress = {
    completed: module6?.sections.filter((s) => s.completed).length || 0,
    total: module6?.sections.length || 8,
  }

  const totalCompleted = module0Progress.completed + module1Progress.completed + module2Progress.completed + module3Progress.completed + module4Progress.completed + module5Progress.completed + module6Progress.completed
  const totalSections = module0Progress.total + module1Progress.total + module2Progress.total + module3Progress.total + module4Progress.total + module5Progress.total + module6Progress.total
  const completionRate = totalSections > 0 ? Math.round((totalCompleted / totalSections) * 100) : 0

  const moduleStatus0 =
    module0Progress.completed === 0
      ? "Not Started"
      : module0Progress.completed === module0Progress.total
        ? "Completed"
        : "In Progress"

  const moduleStatus1 =
    module1Progress.completed === 0
      ? "Not Started"
      : module1Progress.completed === module1Progress.total
        ? "Completed"
        : "In Progress"

  const moduleStatus2 =
    module2Progress.completed === 0
      ? "Not Started"
      : module2Progress.completed === module2Progress.total
        ? "Completed"
        : "In Progress"

  const moduleStatus3 =
    module3Progress.completed === 0
      ? "Not Started"
      : module3Progress.completed === module3Progress.total
        ? "Completed"
        : "In Progress"

  const moduleStatus4 =
    module4Progress.completed === 0
      ? "Not Started"
      : module4Progress.completed === module4Progress.total
        ? "Completed"
        : "In Progress"

  const moduleStatus5 =
    module5Progress.completed === 0
      ? "Not Started"
      : module5Progress.completed === module5Progress.total
        ? "Completed"
        : "In Progress"

  const moduleStatus6 =
    module6Progress.completed === 0
      ? "Not Started"
      : module6Progress.completed === module6Progress.total
        ? "Completed"
        : "In Progress"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">
            Welcome to <span className="font-serif italic text-brand-orange">Swift </span>
            <span className="text-brand-green">Course</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Strengthen your entrepreneurial and sales success through personality trait assessment
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-brand-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {!mounted ? "1" : moduleStatus0 === "In Progress" || moduleStatus1 === "In Progress" || moduleStatus2 === "In Progress" || moduleStatus3 === "In Progress" || moduleStatus4 === "In Progress" || moduleStatus5 === "In Progress" || moduleStatus6 === "In Progress"
                  ? "1-6"
                  : "1"}
              </div>
              <p className="text-xs text-muted-foreground">
                {!mounted ? "Ready to start" : moduleStatus0 === "In Progress"
                  ? "Module 0 in progress"
                  : moduleStatus1 === "In Progress"
                    ? "Module 1 in progress"
                    : moduleStatus2 === "In Progress"
                      ? "Module 2 in progress"
                      : moduleStatus3 === "In Progress"
                        ? "Module 3 in progress"
                        : moduleStatus4 === "In Progress"
                          ? "Module 4 in progress"
                          : moduleStatus5 === "In Progress"
                            ? "Module 5 in progress"
                            : moduleStatus6 === "In Progress"
                              ? "Module 6 in progress"
                              : "Ready to start"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mounted ? completionRate : 0}%</div>
              <p className="text-xs text-muted-foreground">
                {!mounted ? "Start learning today" : completionRate === 0 ? "Start learning today" : "Keep up the great work!"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Target className="h-4 w-4 text-brand-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 days</div>
              <p className="text-xs text-muted-foreground">Build your streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Earn your first badge</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phase Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phase 1 Card */}
            <Card>
              <CardContent className="grid grid-cols-1 gap-6 pt-6">
                {/* Phase 1 Header */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-orange mb-4">Phase 1: Personality Traits and Introduction to Neurobiology</h3>
                </div>

              {/* Module 0 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Module 0</CardTitle>
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                      moduleStatus0 === "Completed" ? "bg-green-100 text-green-800" :
                      moduleStatus0 === "In Progress" ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {moduleStatus0}
                    </span>
                  </div>
                  <CardDescription className="text-xl text-brand-green font-semibold">Introduction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Learn about the Big Five personality model and how it applies to sales success
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {module0Progress.completed} of {module0Progress.total} sections complete
                    </p>
                    <ProgressBar current={module0Progress.completed} total={module0Progress.total} showPercentage={true} />
                  </div>
                  <Button 
                    onClick={() => router.push("/course/module-0")} 
                    className="w-full bg-brand-green hover:bg-[#143d31] text-white"
                  >
                    {module0Progress.completed === 0
                      ? "Start Module 0"
                      : module0Progress.completed === module0Progress.total
                        ? "Review Module 0"
                        : "Continue Module 0"}
                  </Button>
                </CardContent>
              </Card>

              {/* Module 1 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Module 1</CardTitle>
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                      moduleStatus1 === "Completed" ? "bg-green-100 text-green-800" :
                      moduleStatus1 === "In Progress" ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {moduleStatus1}
                    </span>
                  </div>
                  <CardDescription className="text-xl text-brand-green font-semibold">Neurobiology & Growth Mindset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Understand the brain science behind goal achievement and develop a growth mindset
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {module1Progress.completed} of {module1Progress.total} sections complete
                    </p>
                    <ProgressBar current={module1Progress.completed} total={module1Progress.total} showPercentage={true} />
                  </div>
                  <Button 
                    onClick={() => router.push("/course/module-1")} 
                    className="w-full bg-brand-green hover:bg-[#143d31] text-white"
                  >
                    {module1Progress.completed === 0
                      ? "Start Module 1"
                      : module1Progress.completed === module1Progress.total
                        ? "Review Module 1"
                        : "Continue Module 1"}
                  </Button>
                </CardContent>
              </Card>
              </CardContent>
            </Card>

            {/* Phase 2 Card */}
            <Card>
              <CardContent className="grid grid-cols-1 gap-6 pt-6">
                {/* Phase 2 Header */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-orange mb-4">Phase 2: Growth Mindset and Growth Perspectives</h3>
                </div>

              {/* Module 2 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Module 2</CardTitle>
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                      moduleStatus2 === "Completed" ? "bg-green-100 text-green-800" :
                      moduleStatus2 === "In Progress" ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {moduleStatus2}
                    </span>
                  </div>
                  <CardDescription className="text-xl text-brand-green font-semibold">Learning, Habits & Measurement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Master the learning process, build lasting habits, and track your progress with KPIs
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {module2Progress.completed} of {module2Progress.total} sections complete
                    </p>
                    <ProgressBar current={module2Progress.completed} total={module2Progress.total} showPercentage={true} />
                  </div>
                  <Button 
                    onClick={() => router.push("/course/module-2")} 
                    className="w-full bg-brand-green hover:bg-[#143d31] text-white"
                  >
                    {module2Progress.completed === 0
                      ? "Start Module 2"
                      : module2Progress.completed === module2Progress.total
                        ? "Review Module 2"
                        : "Continue Module 2"}
                  </Button>
                </CardContent>
              </Card>

              {/* Module 3 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Module 3</CardTitle>
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                      moduleStatus3 === "Completed" ? "bg-green-100 text-green-800" :
                      moduleStatus3 === "In Progress" ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {moduleStatus3}
                    </span>
                  </div>
                  <CardDescription className="text-xl text-brand-green font-semibold">Win With NO</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Master Jim Camp's "Start With No" and Chris Voss's FBI negotiation tactics
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {module3Progress.completed} of {module3Progress.total} sections complete
                    </p>
                    <ProgressBar current={module3Progress.completed} total={module3Progress.total} showPercentage={true} />
                  </div>
                  <Button 
                    onClick={() => router.push("/course/module-3")} 
                    className="w-full bg-brand-green hover:bg-[#143d31] text-white"
                  >
                    {module3Progress.completed === 0
                      ? "Start Module 3"
                      : module3Progress.completed === module3Progress.total
                        ? "Review Module 3"
                        : "Continue Module 3"}
                  </Button>
                </CardContent>
              </Card>

              {/* Module 4 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Module 4</CardTitle>
                    {mounted && (
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                        moduleStatus4 === "Completed" ? "bg-green-100 text-green-800" :
                        moduleStatus4 === "In Progress" ? "bg-orange-100 text-orange-800" :
                        "bg-gray-100 text-gray-800"
                      )}>
                        {moduleStatus4}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-xl text-brand-green font-semibold">Integrating Big 10 with Camp & Voss</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Learn how to override personality traits with systematic negotiation skills
                  </p>
                  {mounted && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {module4Progress.completed} of {module4Progress.total} sections complete
                      </p>
                      <ProgressBar current={module4Progress.completed} total={module4Progress.total} showPercentage={true} />
                    </div>
                  )}
                  <Button 
                    onClick={() => router.push("/course/module-4")} 
                    className="w-full bg-brand-green hover:bg-[#143d31] text-white"
                  >
                    {mounted ? (
                      module4Progress.completed === 0
                        ? "Start Module 4"
                        : module4Progress.completed === module4Progress.total
                          ? "Review Module 4"
                          : "Continue Module 4"
                    ) : "Loading..."}
                  </Button>
                </CardContent>
              </Card>
              </CardContent>
            </Card>

            {/* Phase 3 Card */}
            <Card>
              <CardContent className="grid grid-cols-1 gap-6 pt-6">
                {/* Phase 3 Header */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-orange mb-4">Phase 3: Implementation and Change Agency</h3>
                </div>

              {/* Module 5 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Module 5</CardTitle>
                    {mounted && (
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                        moduleStatus5 === "Completed" ? "bg-green-100 text-green-800" :
                        moduleStatus5 === "In Progress" ? "bg-orange-100 text-orange-800" :
                        "bg-gray-100 text-gray-800"
                      )}>
                        {moduleStatus5}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-xl text-brand-green font-semibold">Change Agency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Design environments and systems that make behavioral change sustainable in sales teams
                  </p>
                  {mounted && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {module5Progress.completed} of {module5Progress.total} sections complete
                      </p>
                      <ProgressBar current={module5Progress.completed} total={module5Progress.total} showPercentage={true} />
                    </div>
                  )}
                  <Button 
                    onClick={() => router.push("/course/module-5")} 
                    className="w-full bg-brand-green hover:bg-[#143d31] text-white"
                  >
                    {mounted ? (
                      module5Progress.completed === 0
                        ? "Start Module 5"
                        : module5Progress.completed === module5Progress.total
                          ? "Review Module 5"
                          : "Continue Module 5"
                    ) : "Loading..."}
                  </Button>
                </CardContent>
              </Card>

              {/* Module 6 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Module 6</CardTitle>
                    {mounted && (
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                        moduleStatus6 === "Completed" ? "bg-green-100 text-green-800" :
                        moduleStatus6 === "In Progress" ? "bg-orange-100 text-orange-800" :
                        "bg-gray-100 text-gray-800"
                      )}>
                        {moduleStatus6}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-xl text-brand-green font-semibold">Measurement and Accountability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Track transformation across personality, mindset, change agency, and sales activity with the 4D Growth Framework
                  </p>
                  {mounted && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {module6Progress.completed} of {module6Progress.total} sections complete
                      </p>
                      <ProgressBar current={module6Progress.completed} total={module6Progress.total} showPercentage={true} />
                    </div>
                  )}
                  <Button 
                    onClick={() => router.push("/course/module-6")} 
                    className="w-full bg-brand-green hover:bg-[#143d31] text-white"
                  >
                    {mounted ? (
                      module6Progress.completed === 0
                        ? "Start Module 6"
                        : module6Progress.completed === module6Progress.total
                          ? "Review Module 6"
                          : "Continue Module 6"
                    ) : "Loading..."}
                  </Button>
                </CardContent>
              </Card>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* About Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About This Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  This comprehensive program uses the Big Five Aspects Model (BFAM) to identify your personality
                  strengths and challenges in sales.
                </p>
                <div className="pt-3 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">12 Weeks</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="font-medium">6 Total</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">All Levels</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps Card */}
            <Card className="bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
              <CardHeader>
                <CardTitle className="text-lg">Ready to Begin?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  Start with Module 0 to understand the foundation of personality-driven sales success.
                </p>
                <Link href="/module-0">
                  <Button className="w-full bg-brand-green hover:bg-[#143d31] text-white">Begin Learning</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
