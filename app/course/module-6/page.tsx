/**
 * MODULE 6: MEASUREMENT AND ACCOUNTABILITY
 * Participant Self-Training Model for self-assessment and growth
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, BarChart3, Target, Eye, TrendingUp, Brain, Lightbulb, Zap, Activity, Award, Sparkles, Calendar, TrendingDown } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { GridDisplay } from "@/components/learning/grid-display"
import { DailyCallSheet } from "@/components/learning/daily-call-sheet"

export default function Module6Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [callSheetCompleted, setCallSheetCompleted] = useState(false)

  const MODULE_ID = "module-6"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length

  const completedSectionIds = getCompletedSections(MODULE_ID)

  useEffect(() => {
    const sectionParam = searchParams?.get("section")
    if (sectionParam) {
      const sectionIndex = sections.findIndex((s) => s.id === sectionParam)
      if (sectionIndex !== -1 && sectionIndex !== currentSectionIndex) {
        setCurrentSectionIndex(sectionIndex)
      }
    }
  }, [searchParams, sections, currentSectionIndex])

  useEffect(() => {
    const savedCallSheet = localStorage.getItem(`${MODULE_ID}-call-sheet-completed`)
    if (savedCallSheet) {
      setCallSheetCompleted(JSON.parse(savedCallSheet))
    }
  }, [])

  useEffect(() => {
    if (callSheetCompleted && currentSectionIndex === 2) {
      const assessmentSection = sections[2]
      if (assessmentSection) {
        markSectionComplete(MODULE_ID, assessmentSection.id)
        setCurrentPosition(MODULE_ID, assessmentSection.id)
      }
    }
  }, [callSheetCompleted, currentSectionIndex, sections, MODULE_ID, markSectionComplete, setCurrentPosition])

  const handleCallSheetComplete = () => {
    setCallSheetCompleted(true)
    localStorage.setItem(`${MODULE_ID}-call-sheet-completed`, JSON.stringify(true))
  }

  const handleSectionComplete = () => {
    const currentSection = sections[currentSectionIndex]
    if (currentSection) {
      markSectionComplete(MODULE_ID, currentSection.id)
      setCurrentPosition(MODULE_ID, currentSection.id)
    }

    if (currentSectionIndex < totalSections - 1) {
      const nextIndex = currentSectionIndex + 1
      setCurrentSectionIndex(nextIndex)
      const nextSection = sections[nextIndex]
      if (nextSection) {
        router.push(`/course/module-6?section=${nextSection.id}`)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 6: Measurement and Accountability</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Participant Self-Training Model for self-assessment and growth
            </p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Module Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6" id="module-overview">
              <h2 className="text-3xl font-bold text-brand-green">Module Six: Measurement Creates Clarity</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <Eye className="h-8 w-8 text-brand-green flex-shrink-0 mt-1" />
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      Measurement is not about control or pressure. It is about seeing reality clearly enough to change it.
                    </p>
                    <p className="text-lg leading-relaxed">
                      When behavior, mindset, or activity is not measured, the result is not neutrality—it is willful blindness. Unmeasured effort invites rationalization, self-deception, and false progress.
                    </p>
                    <p className="text-lg leading-relaxed font-semibold text-brand-green">
                      What cannot be seen cannot be regulated.
                    </p>
                    <p className="text-lg leading-relaxed font-semibold text-brand-green">
                      What cannot be regulated cannot be improved.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-brand-orange/30 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Target className="h-8 w-8 text-brand-orange flex-shrink-0 mt-1" />
                  <h3 className="text-2xl font-semibold">Effective goals require two forces.</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-brand-green/5 rounded-lg hover:bg-brand-green/10 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-6 w-6 text-brand-green flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-lg font-semibold text-brand-green mb-2">First, a pulling mechanism.</p>
                        <p className="text-lg leading-relaxed">
                          Goals must pull behavior forward by defining what progress looks like now—not someday. Pulling mechanisms turn intention into direction and mission into daily action.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-brand-orange/5 rounded-lg hover:bg-brand-orange/10 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-6 w-6 text-brand-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-lg font-semibold text-brand-orange mb-2">Second, a pushing mechanism.</p>
                        <p className="text-lg leading-relaxed">
                          Goals must also define what is being pushed away from: old habits, avoidance patterns, neediness, emotional reactivity, and counterfeit progress. Real change accelerates when the cost of staying the same becomes visible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 hover:shadow-lg transition-shadow duration-300">
                <p className="text-lg leading-relaxed mb-4">
                  Measurement is the bridge between these two forces. It pulls behavior toward disciplined action and pushes behavior away from drift and illusion.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  This is why SwiftCourse measures traits, mindset shifts, change agency, and activity—not to judge, but to illuminate.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-background/50 rounded-lg hover:bg-background transition-colors duration-200">
                    <p className="text-lg font-semibold text-brand-orange">
                      What you don't measure, you tolerate.
                    </p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg hover:bg-background transition-colors duration-200">
                    <p className="text-lg font-semibold text-brand-orange">
                      What you tolerate, you reinforce.
                    </p>
                  </div>
                </div>
                <div className="space-y-3 p-4 bg-brand-green/10 rounded-lg border-l-4 border-brand-green">
                  <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0" />
                    <p className="text-lg font-semibold text-brand-green">
                      Measurement creates clarity.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0" />
                    <p className="text-lg font-semibold text-brand-green">
                      Clarity creates discipline.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0" />
                    <p className="text-lg font-semibold text-brand-green">
                      Discipline creates transformation.
                    </p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 1: The Self-Training Model */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6" id="self-training-model">
              <h2 className="text-3xl font-bold text-brand-green">PARTICIPANT SELF-TRAINING MODEL</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 border-2 border-brand-green/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <Sparkles className="h-8 w-8 text-brand-green flex-shrink-0 mt-1" />
                  <p className="text-xl leading-relaxed font-semibold">
                    A structured weekly framework that helps each participant self-assess, self-regulate, and self-direct growth.
                  </p>
                </div>
              </Card>

              {/* Personality Work */}
              <Card className="p-6 border-l-4 border-brand-green hover:shadow-lg transition-all duration-300 hover:border-l-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-brand-green/10 rounded-full">
                    <Brain className="h-8 w-8 text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 text-brand-green">Personality Work: "Trait Check & Course Correct"</h3>
                    <p className="text-base text-muted-foreground">
                      <strong>Objective:</strong> Track how Big 10 tendencies impacted behavior and apply compensating tools.
                    </p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-brand-green/80">Weekly Prompts:</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-green/5 hover:border-l-4 hover:border-brand-green transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold mb-2 text-base">1. Where did a trait sabotage my performance this week?</p>
                    <p className="text-sm text-muted-foreground italic">
                      (e.g., High Politeness → avoided asking difficult questions)
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-green/5 hover:border-l-4 hover:border-brand-green transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold mb-2 text-base">2. Which tool did I use to compensate?</p>
                    <ul className="text-sm ml-4 list-disc space-y-1">
                      <li>Camp: Ask a No-oriented question</li>
                      <li>Voss: Labeling & mirroring</li>
                      <li>ITC: Identify the competing commitment</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-green/5 hover:border-l-4 hover:border-brand-green transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold mb-2 text-base">3. What will I test next week?</p>
                    <p className="text-sm text-muted-foreground italic">
                      "I will practice asking 'What are we missing?' when my High Agreeableness makes me want to accept the first solution. I'll use calibrated questions to push back without confrontation."
                    </p>
                  </div>
                </div>
              </Card>

              {/* Mindset Shift Work */}
              <Card className="p-6 border-l-4 border-brand-orange hover:shadow-lg transition-all duration-300 hover:border-l-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-brand-orange/10 rounded-full">
                    <Lightbulb className="h-8 w-8 text-brand-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 text-brand-orange">Mindset Shift Work: "The Negotiator's Operating System"</h3>
                    <p className="text-base text-muted-foreground">
                      <strong>Objective:</strong> Strengthen the internal psychological structure of a world-class negotiator.
                    </p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-brand-orange/80">Weekly Prompts:</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">1. Where did I catch myself being outcome-focused?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">2. Where did I successfully use 'No' as a resource?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">3. Where did I fall into emotional reactivity over tactical empathy?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">4. Which mindset shift strengthened most this week?</p>
                  </div>
                </div>
              </Card>

              {/* Change Agency */}
              <Card className="p-6 border-l-4 border-brand-green hover:shadow-lg transition-all duration-300 hover:border-l-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-brand-green/10 rounded-full">
                    <Zap className="h-8 w-8 text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 text-brand-green">Change Agency: "My ITC Map in Motion"</h3>
                    <p className="text-base text-muted-foreground">
                      <strong>Objective:</strong> Self-directed personal transformation using the Immunity to Change process.
                    </p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-brand-green/80">Weekly Prompts:</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-green/5 hover:border-l-4 hover:border-brand-green transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">1. Did I surface any hidden commitments?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-green/5 hover:border-l-4 hover:border-brand-green transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">2. Did I test an assumption? What happened?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-green/5 hover:border-l-4 hover:border-brand-green transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">3. What scaffolds (routines, structures, cues) did I use?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-green/5 hover:border-l-4 hover:border-brand-green transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">4. Did I create any new habits or reduce any avoidant behaviors?</p>
                  </div>
                </div>
              </Card>

              {/* Sales Activity */}
              <Card className="p-6 border-l-4 border-brand-orange hover:shadow-lg transition-all duration-300 hover:border-l-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-brand-orange/10 rounded-full">
                    <Activity className="h-8 w-8 text-brand-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 text-brand-orange">Sales Activity: "The Mission Discipline Scorecard"</h3>
                    <p className="text-base text-muted-foreground">
                      <strong>Objective:</strong> Evaluate behavior—not outcomes—to develop consistent daily production.
                    </p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-brand-orange/80">Weekly Prompts:</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">1. Did I create a mission for each day?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">2. Did I follow the mission regardless of how I felt?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">3. Did I use Camp/Voss tools in live conversations?</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg hover:bg-brand-orange/5 hover:border-l-4 hover:border-brand-orange transition-all duration-200 border-l-4 border-transparent">
                    <p className="font-semibold text-base">4. Did I complete my call attempts, conversations, and follow-ups?</p>
                  </div>
                </div>
              </Card>

              {/* Qualitative Boxes */}
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <Award className="h-8 w-8 text-brand-green flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">QUALITATIVE BOXES</h3>
                    <p className="text-base text-muted-foreground">
                      Capture the qualitative richness of your weekly growth and transformation.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-brand-green/30 hover:border-brand-green hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <div className="flex items-start gap-3">
                      <Target className="h-6 w-6 text-brand-green flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-brand-green mb-2">Most Effective Tool Used This Week</h4>
                        <p className="text-sm text-muted-foreground">
                          Which tool or technique had the greatest impact?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-brand-orange/30 hover:border-brand-orange hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-brand-orange mb-2">Biggest Trait Trigger</h4>
                        <p className="text-sm text-muted-foreground">
                          Which personality trait created the most challenge?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-brand-green/30 hover:border-brand-green hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-6 w-6 text-brand-green flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-brand-green mb-2">Breakthrough Moment</h4>
                        <p className="text-sm text-muted-foreground">
                          What was your most significant insight?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-brand-orange/30 hover:border-brand-orange hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-brand-orange mb-2">Next Week's Testing Behavior</h4>
                        <p className="text-sm text-muted-foreground">
                          What will you experiment with?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 border-2 border-brand-green hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-brand-green flex-shrink-0" />
                  <h3 className="text-2xl font-bold text-center flex-1">Complete Your Weekly Review</h3>
                </div>
                <p className="text-base text-center leading-relaxed mb-4">
                  Use these four dimensions plus the qualitative boxes to track your transformation journey systematically and intentionally.
                </p>
                <div className="text-center p-4 bg-brand-green/10 rounded-lg border-l-4 border-brand-green">
                  <p className="text-lg font-semibold text-brand-green">
                    Measurement creates clarity. Clarity creates discipline. Discipline creates transformation.
                  </p>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue to Daily Call Sheet <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 2: Daily Call Sheet */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="daily-call-sheet">
              <h2 className="text-3xl font-bold text-brand-green">Call Sheet: KPI Tracking</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed mb-4">
                  We are mostly concerned with leading indicators of sales activity. Thus, we will keep daily track of:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-semibold text-brand-green mb-2">Outbound Prospecting Activity:</h4>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Number of outbound calls</li>
                      <li>Contacts made with prospects</li>
                      <li>New prospects generated through outreach</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-semibold text-brand-orange mb-2">Follow Up Calling Activities:</h4>
                    <ol className="list-decimal list-inside space-y-1 ml-2" start={4}>
                      <li>Lead follow up calls</li>
                      <li>Appointment generated with agenda set</li>
                      <li>Leads that do not have an advancing agenda</li>
                    </ol>
                  </div>
                </div>
              </Card>

              <DailyCallSheet
                onComplete={handleCallSheetComplete}
                storageKey={`${MODULE_ID}-call-sheet`}
              />

              {callSheetCompleted && (
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 border-2 border-brand-green mt-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-brand-green flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-brand-green mb-2">
                        🎉 Module 6 Complete!
                      </h3>
                      <p className="text-base mb-4">
                        Congratulations! You've completed your Call Sheet and understand the importance of tracking
                        both leading and lagging indicators. Remember to use this tool daily to maintain discipline and
                        focus on the activities that drive success.
                      </p>
                      <p className="text-base mb-4 font-semibold">
                        Keep tracking your KPIs consistently—what gets measured gets managed. 🌟
                      </p>
                      <p className="text-base mb-4 font-semibold">
                        Remember: Leading indicators drive your success. Stay committed to your daily disciplines.
                      </p>
                      <Button onClick={() => router.push("/course")} className="bg-brand-green hover:bg-[#143d31] text-white">
                        Return to Dashboard
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
