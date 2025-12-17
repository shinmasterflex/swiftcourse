/**
 * MODULE 5: CHANGE AGENCY
 * Understanding and implementing behavioral change systems
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Brain, Target, Zap, Users } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { GridDisplay } from "@/components/learning/grid-display"
import { ComparisonCard } from "@/components/learning/comparison-card"

export default function Module5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<{
    q1: boolean
    q2: boolean
    q3: boolean
    q4: boolean
    q5: boolean
    q6: boolean
    q7: boolean
    q8: boolean
    q9: boolean
    q10: boolean
  }>({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    q6: false,
    q7: false,
    q8: false,
    q9: false,
    q10: false,
  })

  const MODULE_ID = "module-5"
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
    const savedQuiz = localStorage.getItem(`${MODULE_ID}-quiz-results`)
    if (savedQuiz) {
      setQuizResults(JSON.parse(savedQuiz))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`${MODULE_ID}-quiz-results`, JSON.stringify(quizResults))
  }, [quizResults])

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
        router.push(`/course/module-5?section=${nextSection.id}`)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const allQuizComplete = Object.values(quizResults).every((result) => result === true)

  const handleQuizComplete = (quizKey: keyof typeof quizResults, correct: boolean) => {
    setQuizResults((prev) => ({
      ...prev,
      [quizKey]: correct,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 5: Change Agency</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Understanding and implementing behavioral change in sales teams
            </p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Module Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6" id="module-overview">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">The Challenge of Behavioral Change</h3>
                <p className="text-lg leading-relaxed">
                  Most sales training fails because it focuses on teaching concepts rather than changing behavior. This
                  module explores why people resist change, how to design environments that make new behaviors stick,
                  and the science of building sustainable change in sales teams.
                </p>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <Brain className="h-8 w-8 text-brand-orange mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Neuroscience</h3>
                  <p className="text-sm">Understanding the brain's resistance to change and how to work with it</p>
                </Card>

                <Card className="p-6">
                  <Target className="h-8 w-8 text-brand-green mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Environment Design</h3>
                  <p className="text-sm">Creating systems and contexts that make good behavior automatic</p>
                </Card>

                <Card className="p-6">
                  <Users className="h-8 w-8 text-brand-orange mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Team Implementation</h3>
                  <p className="text-sm">Strategies for rolling out change across entire sales organizations</p>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 1: Why Change Is Hard */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6" id="why-change-hard">
              <h2 className="text-3xl font-bold text-brand-green">Why Behavioral Change Is Hard</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Brain's Resistance to Change</h3>
                <p className="leading-relaxed mb-4">
                  Your brain is designed to conserve energy. Existing behaviors run on autopilot using minimal mental
                  resources, while new behaviors require conscious effort and drain cognitive reserves.
                </p>
                <div className="p-4 bg-brand-orange/10 rounded">
                  <p className="font-semibold text-brand-orange">
                    Change isn't hard because people are lazy—it's hard because the brain is efficient.
                  </p>
                </div>
              </Card>

              <GridDisplay
                title="The Four Barriers to Change"
                items={[
                  {
                    title: "1. Cognitive Load",
                    description:
                      "New behaviors require conscious attention and working memory, which are limited resources.",
                  },
                  {
                    title: "2. Identity Conflict",
                    description:
                      "People resist changes that conflict with their self-image or threaten their status in a group.",
                  },
                  {
                    title: "3. Environmental Cues",
                    description:
                      "The same environment that supported old behaviors triggers them automatically, making new behaviors harder.",
                  },
                  {
                    title: "4. Immediate vs Delayed Rewards",
                    description:
                      "Old behaviors often provide immediate comfort, while benefits of new behaviors appear later.",
                  },
                ]}
              />

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Training Paradox</h3>
                <p className="leading-relaxed mb-3">Why most sales training fails:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Knowledge Transfer ≠ Behavior Change:</strong> Understanding a concept doesn't create
                      action
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No Environmental Support:</strong> Reps return to the same triggers for old behavior
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>No Accountability Systems:</strong> Without structure, motivation fades in 48-72 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Episodic Learning:</strong> One-time events don't create long-term neural pathways
                    </span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 2: The Change Agency Framework */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="change-framework">
              <h2 className="text-3xl font-bold text-brand-green">The Change Agency Framework</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  Instead of trying to force willpower, successful change agents design environments where the desired
                  behavior becomes the path of least resistance.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">Make It Obvious</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Design the environment so the right behavior is visible, easy to start, and hard to avoid.
                  </p>
                  <div className="p-4 bg-muted rounded">
                    <p className="font-semibold mb-2">Sales Application:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Script templates saved as desktop shortcuts</li>
                      <li>• Daily call blocks pre-scheduled in calendar</li>
                      <li>• Prospecting list automatically opens at 9 AM</li>
                      <li>• Camp/Voss question cards on every desk</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold">Make It Attractive</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Bundle new behaviors with immediate rewards or social proof to trigger dopamine.
                  </p>
                  <div className="p-4 bg-muted rounded">
                    <p className="font-semibold mb-2">Sales Application:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Public leaderboards for activity metrics (not just results)</li>
                      <li>• Team celebration after 100 collective "No's" received</li>
                      <li>• Pair new behaviors with preferred activities (calls before coffee)</li>
                      <li>• Highlight top performers using the new system</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold">Make It Easy</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Reduce friction for the desired behavior and increase friction for old patterns.
                  </p>
                  <div className="p-4 bg-muted rounded">
                    <p className="font-semibold mb-2">Sales Application:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Pre-load CRM with calibrated questions</li>
                      <li>• Two-click access to mission/purpose statements</li>
                      <li>• Auto-fill templates for accusation audits</li>
                      <li>• Remove distractions during call blocks (close email, Slack)</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold">Make It Satisfying</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Provide immediate feedback loops so the brain gets rewarded for the new behavior.
                  </p>
                  <div className="p-4 bg-muted rounded">
                    <p className="font-semibold mb-2">Sales Application:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Visual habit tracker (streak counter for daily prospecting)</li>
                      <li>• Instant Slack notification when goals are hit</li>
                      <li>• Weekly 1-on-1 recognition for process adherence</li>
                      <li>• Gamify "No" collection with points/badges</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 3: Implementation Strategy */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="implementation">
              <h2 className="text-3xl font-bold text-brand-green">Implementation Strategy for Sales Teams</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Phase 1: Baseline Assessment (Week 1)</h3>
                <p className="leading-relaxed mb-3">Before implementing any change, establish the current state:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Record current activity levels (calls, emails, meetings)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Shadow 3-5 reps to observe natural behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Identify existing environmental triggers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Map out the current "default" workday flow</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Phase 2: Single Behavior Focus (Weeks 2-4)</h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">Don't try to change everything. Pick ONE keystone behavior:</p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold mb-2">Example Keystone Behaviors:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• 20 minutes of daily prospecting at 9 AM</li>
                      <li>• Starting every call with mission clarity</li>
                      <li>• Using one calibrated question per conversation</li>
                      <li>• Tracking "No's" received instead of "Yes's"</li>
                    </ul>
                  </div>
                  <p className="text-sm italic">
                    Keystone behaviors create momentum and prove that change is possible, making subsequent changes
                    easier.
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Phase 3: Environment Design (Week 3)</h3>
                <p className="leading-relaxed mb-3">Redesign the workspace to support the new behavior:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded">
                    <p className="font-semibold text-sm mb-1">Physical Environment</p>
                    <p className="text-xs">Visual cues, reference cards, quiet zones for calls</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="font-semibold text-sm mb-1">Digital Environment</p>
                    <p className="text-xs">Browser bookmarks, CRM templates, auto-blocking calendar</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="font-semibold text-sm mb-1">Social Environment</p>
                    <p className="text-xs">Accountability partners, public commitment, team challenges</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="font-semibold text-sm mb-1">Feedback Environment</p>
                    <p className="text-xs">Daily check-ins, visual progress tracking, immediate recognition</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Phase 4: Habit Stacking (Weeks 5-8)</h3>
                <div className="space-y-3">
                  <p className="leading-relaxed">Once the first behavior is automatic, add the next one:</p>
                  <div className="p-4 bg-brand-orange/10 rounded">
                    <p className="font-semibold mb-2">Formula:</p>
                    <p className="text-sm">
                      "After [EXISTING BEHAVIOR], I will [NEW BEHAVIOR], followed by [REWARD]."
                    </p>
                    <p className="text-sm mt-2 italic">
                      Example: "After I finish my 9 AM prospecting block, I will review my mission statement, then get
                      my coffee."
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Phase 5: System Reinforcement (Weeks 9-12)</h3>
                <p className="leading-relaxed mb-3">Prevent regression by building in long-term accountability:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Weekly team reviews of adherence (not just results)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Monthly re-training on Camp/Voss principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Celebrate process wins publicly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Adjust environment based on observed friction points</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 4: Measuring Success */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="measuring-success">
              <h2 className="text-3xl font-bold text-brand-green">Measuring Behavioral Change</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  Traditional sales metrics focus on outcomes (deals closed, revenue). Change agency requires leading
                  indicators that measure behavior adoption.
                </p>
              </Card>

              <ComparisonCard
                leftSide={{
                  title: "Lagging Indicators (Outcomes)",
                  items: [
                    "Deals closed",
                    "Revenue generated",
                    "Win rate",
                    "Average deal size",
                    "Sales cycle length",
                  ],
                }}
                rightSide={{
                  title: "Leading Indicators (Behaviors)",
                  items: [
                    "Daily prospecting completion rate",
                    "Number of calibrated questions asked",
                    "Mission statements documented",
                    '"No\'s" received per week',
                    "Camp/Voss technique usage frequency",
                  ],
                }}
              />

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Behavior Scorecard</h3>
                <p className="leading-relaxed mb-4">Track these metrics weekly for each rep:</p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Consistency Score</span>
                      <span className="text-sm text-muted-foreground">Days behavior was performed / 5</span>
                    </div>
                    <p className="text-sm">Target: 5/5 days for at least 3 consecutive weeks</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Quality Score</span>
                      <span className="text-sm text-muted-foreground">Manager observation rating</span>
                    </div>
                    <p className="text-sm">
                      Rate execution quality 1-5 based on call reviews (using Camp/Voss correctly)
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Autonomy Score</span>
                      <span className="text-sm text-muted-foreground">Self-initiated vs prompted</span>
                    </div>
                    <p className="text-sm">Track if rep needs reminders or performs behavior automatically</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Environmental Support</span>
                      <span className="text-sm text-muted-foreground">Setup completion</span>
                    </div>
                    <p className="text-sm">Checklist of environmental supports in place (templates, schedules, etc.)</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Red Flags for Regression</h3>
                <p className="leading-relaxed mb-3">Watch for these warning signs:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <span>
                      <strong>Consistency drops below 4/5 days</strong> for two consecutive weeks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <span>
                      <strong>Excuses or rationalizations</strong> increase ("I'll do it later," "It doesn't work for
                      this prospect")
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <span>
                      <strong>Environmental supports are removed</strong> (scripts deleted, calendar blocks canceled)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <span>
                      <strong>Rep stops self-reporting</strong> or tracking their own behavior
                    </span>
                  </li>
                </ul>
                <div className="p-4 bg-red-50 rounded mt-3">
                  <p className="font-semibold text-red-600">Action: Address immediately with 1-on-1 coaching</p>
                  <p className="text-sm mt-1">Don't wait for complete regression—intervene at first warning sign</p>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 5: Common Pitfalls */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6" id="common-pitfalls">
              <h2 className="text-3xl font-bold text-brand-green">Common Implementation Pitfalls</h2>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">❌</span>
                  <h3 className="text-xl font-semibold">Pitfall 1: Too Much, Too Fast</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>The Problem:</strong> Trying to implement all Camp principles, all Voss techniques, and
                    personality assessment simultaneously.
                  </p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold mb-2">The Fix:</p>
                    <p className="text-sm">
                      One behavior at a time. Master daily prospecting before adding calibrated questions. Get
                      calibrated questions automatic before introducing accusation audits.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">❌</span>
                  <h3 className="text-xl font-semibold">Pitfall 2: No Environmental Support</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>The Problem:</strong> Teaching concepts in a training session, then sending reps back to
                    the same desk, same distractions, same triggers.
                  </p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold mb-2">The Fix:</p>
                    <p className="text-sm">
                      Redesign the environment first. Physical cues, digital tools, and social accountability must be in
                      place before the behavior is introduced.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">❌</span>
                  <h3 className="text-xl font-semibold">Pitfall 3: Focusing Only on Outcomes</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>The Problem:</strong> Celebrating deals closed but ignoring whether Camp/Voss behaviors
                    were used.
                  </p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold mb-2">The Fix:</p>
                    <p className="text-sm">
                      Reward process adherence as much as results. A rep who follows the system perfectly but doesn't
                      close this week should be celebrated, not punished.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">❌</span>
                  <h3 className="text-xl font-semibold">Pitfall 4: No Feedback Loop</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>The Problem:</strong> Reps don't know if they're doing it right until weeks later when
                    results (or lack of results) appear.
                  </p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold mb-2">The Fix:</p>
                    <p className="text-sm">
                      Daily or weekly check-ins. Real-time feedback on technique execution. Managers review recorded
                      calls within 24 hours and provide specific coaching.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">❌</span>
                  <h3 className="text-xl font-semibold">Pitfall 5: Leadership Doesn't Model the Behavior</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>The Problem:</strong> Sales managers tell reps to use Camp/Voss but don't use it
                    themselves in meetings, coaching sessions, or their own prospecting.
                  </p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold mb-2">The Fix:</p>
                    <p className="text-sm">
                      Leaders go first. Managers should be the best practitioners of the system and make their own
                      behavior visible (recorded demos, live shadowing, public self-reflection).
                    </p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 6: Module Assessment */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="module-assessment">
              <h2 className="text-3xl font-bold text-brand-green">Module Assessment</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg">Test your understanding of behavioral change and implementation strategies.</p>
              </Card>

              <MultipleChoice
                question="Why does most sales training fail to produce lasting behavioral change?"
                options={[
                  "Reps don't pay attention during training",
                  "Training focuses on knowledge transfer rather than creating environmental support for new behaviors",
                  "The concepts taught are too complex",
                  "Sales managers don't follow up enough",
                ]}
                correctAnswer={1}
                explanation="Most sales training fails because it focuses on transferring knowledge (concepts, theories) without creating the environmental structures, accountability systems, and feedback loops necessary to support new behaviors. Knowledge alone doesn't create action."
                onComplete={(correct) => handleQuizComplete("q1", correct)}
              />

              <MultipleChoice
                question="According to the Change Agency framework, what does 'Make It Obvious' mean?"
                options={[
                  "Tell people exactly what to do",
                  "Design the environment so the right behavior is visible, easy to start, and hard to avoid",
                  "Make training presentations clearer",
                  "Send daily reminder emails",
                ]}
                correctAnswer={1}
                explanation="'Make It Obvious' means designing the physical, digital, and social environment so that the desired behavior is clearly visible and the easiest action to take. This includes visual cues, pre-scheduled activities, templates, and environmental triggers."
                onComplete={(correct) => handleQuizComplete("q2", correct)}
              />

              <MultipleChoice
                question="What is a 'keystone behavior' in the context of change agency?"
                options={[
                  "The most important skill in sales",
                  "A single foundational behavior that creates momentum and makes subsequent changes easier",
                  "The first thing taught in training",
                  "The behavior that generates the most revenue",
                ]}
                correctAnswer={1}
                explanation="A keystone behavior is one foundational behavior that, when mastered, creates momentum and proves that change is possible. This makes subsequent behavior changes easier. Examples include daily prospecting or starting calls with mission clarity."
                onComplete={(correct) => handleQuizComplete("q3", correct)}
              />

              <MultipleChoice
                question="Why should you measure 'leading indicators' rather than just 'lagging indicators'?"
                options={[
                  "Leading indicators are easier to measure",
                  "Leading indicators (behaviors) can be corrected immediately, while lagging indicators (outcomes) appear too late to adjust",
                  "Lagging indicators are not important",
                  "Leading indicators are more impressive to executives",
                ]}
                correctAnswer={1}
                explanation="Leading indicators measure the behaviors that drive outcomes. They provide early feedback, allowing for immediate course correction. Lagging indicators (like deals closed) appear too late to adjust behavior during the change process."
                onComplete={(correct) => handleQuizComplete("q4", correct)}
              />

              <MultipleChoice
                question="What does 'habit stacking' mean in the implementation strategy?"
                options={[
                  "Learning multiple habits at the same time",
                  "Layering new behaviors on top of existing routines using a trigger-behavior-reward sequence",
                  "Stacking books about habits on your desk",
                  "Teaching habits in a specific order",
                ]}
                correctAnswer={1}
                explanation="Habit stacking is the practice of linking a new behavior to an existing routine using the formula: 'After [EXISTING BEHAVIOR], I will [NEW BEHAVIOR], followed by [REWARD].' This leverages existing neural pathways to make new behaviors stick."
                onComplete={(correct) => handleQuizComplete("q5", correct)}
              />

              <MultipleChoice
                question="What is the most critical warning sign that a rep is regressing to old behaviors?"
                options={[
                  "They miss one day of the new behavior",
                  "Consistency drops below 4/5 days for two consecutive weeks",
                  "They ask questions during training",
                  "They achieve lower results in one week",
                ]}
                correctAnswer={1}
                explanation="When consistency drops below 4/5 days for two consecutive weeks, it indicates the behavior is not becoming automatic and regression is likely. This requires immediate intervention with 1-on-1 coaching."
                onComplete={(correct) => handleQuizComplete("q6", correct)}
              />

              <MultipleChoice
                question="Why is environmental support more important than willpower in creating change?"
                options={[
                  "Because willpower doesn't exist",
                  "Because willpower is a limited resource that depletes, while environmental design makes desired behaviors automatic",
                  "Because environmental support is cheaper",
                  "Because managers prefer environmental changes",
                ]}
                correctAnswer={1}
                explanation="Willpower is a limited cognitive resource that depletes throughout the day. Environmental design creates structures where the desired behavior becomes the path of least resistance, requiring minimal willpower to maintain."
                onComplete={(correct) => handleQuizComplete("q7", correct)}
              />

              <MultipleChoice
                question="What should managers celebrate during the behavior change process?"
                options={[
                  "Only closed deals",
                  "Both process adherence (correct behavior execution) and results",
                  "Only revenue numbers",
                  "Only reps who exceed quota",
                ]}
                correctAnswer={1}
                explanation="Managers should celebrate process adherence as much as results. A rep who perfectly follows the Camp/Voss system but doesn't close deals this week should be recognized, as consistent process execution will eventually drive results."
                onComplete={(correct) => handleQuizComplete("q8", correct)}
              />

              <MultipleChoice
                question="Why is 'Make It Satisfying' important in the four-part framework?"
                options={[
                  "It keeps people happy",
                  "The brain needs immediate feedback and rewards to reinforce new behaviors and create positive associations",
                  "It makes training more fun",
                  "It reduces complaints",
                ]}
                correctAnswer={1}
                explanation="'Make It Satisfying' provides immediate feedback loops and rewards so the brain gets reinforcement for the new behavior. This creates positive associations and accelerates habit formation through dopamine release."
                onComplete={(correct) => handleQuizComplete("q9", correct)}
              />

              <MultipleChoice
                question="What is the biggest pitfall when implementing behavioral change in sales teams?"
                options={[
                  "Not having enough budget for training",
                  "Trying to change too many behaviors at once without environmental support or feedback systems",
                  "Choosing the wrong behaviors to change",
                  "Not having a good CRM system",
                ]}
                correctAnswer={1}
                explanation="The biggest pitfall is attempting to change too many behaviors simultaneously without creating environmental support structures or feedback systems. This cognitive overload leads to failure. Focus on one keystone behavior at a time with proper environmental design."
                onComplete={(correct) => handleQuizComplete("q10", correct)}
              />

              {allQuizComplete && (
                <Card className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 border-2 border-brand-green">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-brand-green" />
                    <h3 className="text-2xl font-bold text-brand-green">Module Complete!</h3>
                  </div>
                  <p className="text-lg mb-4">
                    Congratulations! You've mastered the Change Agency framework. You now understand why behavioral
                    change is difficult, how to design environments that support new behaviors, and how to implement
                    sustainable change in sales teams using the four-part framework: Make It Obvious, Make It
                    Attractive, Make It Easy, and Make It Satisfying.
                  </p>
                  <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                    Complete Module <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
