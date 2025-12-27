/**
 * MODULE 6: MEASUREMENT AND ACCOUNTABILITY
 * The 4D Growth Framework for tracking transformation
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, BarChart3, Target, Eye, TrendingUp } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { GridDisplay } from "@/components/learning/grid-display"

export default function Module6Page() {
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
  }>({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  })

  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<string>>(new Set())
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false)

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
    const savedQuiz = localStorage.getItem(`${MODULE_ID}-quiz-results`)
    if (savedQuiz) {
      const parsed = JSON.parse(savedQuiz)
      setQuizResults(parsed)
    }
    const savedAttempted = localStorage.getItem(`${MODULE_ID}-attempted-questions`)
    if (savedAttempted) {
      const parsed = JSON.parse(savedAttempted)
      setAttemptedQuestions(new Set(parsed))
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
        router.push(`/course/module-6?section=${nextSection.id}`)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    localStorage.setItem(`${MODULE_ID}-attempted-questions`, JSON.stringify(Array.from(attemptedQuestions)))
  }, [attemptedQuestions])

  const allQuizAnswered = attemptedQuestions.size === 5
  const allQuizComplete = Object.values(quizResults).every((result) => result === true)

  useEffect(() => {
    if (assessmentSubmitted && allQuizComplete && currentSectionIndex === 7) {
      const assessmentSection = sections[7]
      if (assessmentSection) {
        markSectionComplete(MODULE_ID, assessmentSection.id)
        setCurrentPosition(MODULE_ID, assessmentSection.id)
      }
    }
  }, [assessmentSubmitted, allQuizComplete, currentSectionIndex, sections, MODULE_ID, markSectionComplete, setCurrentPosition])

  const handleSubmitAssessment = () => {
    setAssessmentSubmitted(true)
  }

  const handleQuizComplete = (quizKey: keyof typeof quizResults, correct: boolean) => {
    setAttemptedQuestions((prev) => new Set(prev).add(quizKey))
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
            <h1 className="text-4xl font-bold mb-2">Module 6: Measurement and Accountability</h1>
            <p className="text-lg text-muted-foreground mb-4">
              The 4D Growth Framework for tracking behavioral transformation
            </p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Module Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6" id="module-overview">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Measurement Creates Clarity</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Measurement is not about control or pressure. It is about seeing reality clearly enough to change it.
                </p>
                <p className="text-lg leading-relaxed">
                  When behavior, mindset, or activity is not measured, the result is not neutrality—it is willful
                  blindness. Unmeasured effort invites rationalization, self-deception, and false progress.
                </p>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2">What cannot be seen</h3>
                  <p className="text-sm text-muted-foreground">cannot be regulated.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2">What cannot be regulated</h3>
                  <p className="text-sm text-muted-foreground">cannot be improved.</p>
                </Card>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <Card className="p-6">
                  <BarChart3 className="h-8 w-8 text-brand-green mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Personality Work</h3>
                  <p className="text-sm">Big 10 trait integration and self-regulation</p>
                </Card>

                <Card className="p-6">
                  <Target className="h-8 w-8 text-brand-orange mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Mindset Shifts</h3>
                  <p className="text-sm">Camp + Voss + ITC cognitive transformations</p>
                </Card>

                <Card className="p-6">
                  <TrendingUp className="h-8 w-8 text-brand-green mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Change Agency</h3>
                  <p className="text-sm">Self-directed transformation capacity</p>
                </Card>

                <Card className="p-6">
                  <Eye className="h-8 w-8 text-brand-orange mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Sales Activity</h3>
                  <p className="text-sm">Mission-driven behavioral output</p>
                </Card>
              </div>

              <Card className="p-6 border-2 border-brand-orange/30">
                <h3 className="text-xl font-semibold mb-3">The Pulling and Pushing Forces</h3>
                <p className="leading-relaxed mb-3">Effective goals require two forces:</p>
                <div className="space-y-3">
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold text-brand-green mb-1">First: A Pulling Mechanism</p>
                    <p className="text-sm">
                      Goals must pull behavior forward by defining what progress looks like now—not someday. Pulling
                      mechanisms turn intention into direction and mission into daily action.
                    </p>
                  </div>
                  <div className="p-4 bg-brand-orange/10 rounded">
                    <p className="font-semibold text-brand-orange mb-1">Second: A Pushing Mechanism</p>
                    <p className="text-sm">
                      Goals must also define what is being pushed away from: old habits, avoidance patterns, neediness,
                      emotional reactivity, and counterfeit progress. Real change accelerates when the cost of staying
                      the same becomes visible.
                    </p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 1: D1 - Personality Work */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6" id="d1-personality">
              <h2 className="text-3xl font-bold text-brand-green">D1: Personality Work</h2>
              <p className="text-lg">The Big 10 Integration Index</p>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  Measures how well the participant understands and regulates trait tendencies that sabotage sales
                  behavior.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">The Big 10 Aspects Model</h3>
                <GridDisplay
                  title="Traits Assessed"
                  items={[
                    { title: "Orderliness", description: "Need for structure and organization" },
                    { title: "Industriousness", description: "Drive for productivity and achievement" },
                    { title: "Enthusiasm", description: "Positive emotionality and social engagement" },
                    { title: "Assertiveness", description: "Confidence in social dominance and leadership" },
                    { title: "Withdrawal", description: "Tendency to avoid threats and social situations" },
                    { title: "Volatility", description: "Emotional instability and reactivity" },
                    { title: "Intellect", description: "Abstract and philosophical thinking" },
                    { title: "Openness", description: "Aesthetic sensitivity and creativity" },
                    { title: "Politeness", description: "Respect for social norms and avoiding conflict" },
                    { title: "Compassion", description: "Empathy and concern for others' welfare" },
                  ]}
                />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Scoring Method: 0–4 Scale</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-red-500">0</span>
                      <span className="font-semibold">No Awareness</span>
                    </div>
                    <p className="text-sm">No awareness of trait's impact on sales behavior</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-orange-500">1</span>
                      <span className="font-semibold">Recognition Only</span>
                    </div>
                    <p className="text-sm">Recognizes trait but cannot regulate behavior</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-yellow-500">2</span>
                      <span className="font-semibold">Inconsistent Regulation</span>
                    </div>
                    <p className="text-sm">Attempts regulation with inconsistent results</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-lime-500">3</span>
                      <span className="font-semibold">Effective Strategies</span>
                    </div>
                    <p className="text-sm">Demonstrates effective compensation strategies</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-green-500">4</span>
                      <span className="font-semibold">Full Mastery</span>
                    </div>
                    <p className="text-sm">Full self-management in high-stress sales contexts</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Outputs</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Trait Risk Profile:</strong> Pre/post radar chart showing vulnerability areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Compensation Strategy Score:</strong> Ability to apply Camp/Voss tools to offset traits
                      like high Agreeableness, high Withdrawal, etc.
                    </span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 2: D2 - Mindset Shifts */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="d2-mindset">
              <h2 className="text-3xl font-bold text-brand-green">D2: Mindset Shifts</h2>
              <p className="text-lg">Negotiation Psychology Competency Score</p>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  Measures internal cognitive shifts influenced by Jim Camp, Chris Voss, Immunity to Change, and Adam
                  Grant's frameworks.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Five Core Mindset Shifts to Measure</h3>
                <div className="space-y-4">
                  <div className="p-4 border-2 border-brand-green/30 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <h4 className="font-semibold">From Outcome-Focused → Process-Focused</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-11">
                      Shifting attention from closing deals to executing disciplined behaviors
                    </p>
                  </div>

                  <div className="p-4 border-2 border-brand-green/30 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <h4 className="font-semibold">From Agreeable People-Pleasing → Confident Boundary Setting</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-11">
                      Using "No" strategically instead of avoiding conflict
                    </p>
                  </div>

                  <div className="p-4 border-2 border-brand-green/30 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <h4 className="font-semibold">From Fear of "No" → Using "No" as a Resource</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-11">
                      Seeking "No" to create clarity and eliminate neediness
                    </p>
                  </div>

                  <div className="p-4 border-2 border-brand-green/30 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        4
                      </div>
                      <h4 className="font-semibold">From Emotional Reactivity → Tactical Empathy & Curiosity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-11">
                      Labeling emotions instead of reacting to them
                    </p>
                  </div>

                  <div className="p-4 border-2 border-brand-green/30 rounded">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        5
                      </div>
                      <h4 className="font-semibold">From Fixed Identity → Systems-Based Change</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-11">
                      Viewing improvement as a process, not a personality overhaul
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Scoring Method: 0–4 Scale</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-semibold">0 - Default/Old Mindset Dominant</span>
                    <span className="text-sm text-muted-foreground">No shift</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-semibold">1 - Momentary Awareness</span>
                    <span className="text-sm text-muted-foreground">No consistency</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-semibold">2 - Active Struggle</span>
                    <span className="text-sm text-muted-foreground">Demonstrable attempts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-semibold">3 - Reliable Adoption</span>
                    <span className="text-sm text-muted-foreground">Consistent usage</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="font-semibold">4 - Fully Internalized</span>
                    <span className="text-sm text-muted-foreground">Works under pressure</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Outputs</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Mindset Shift Maturity Score:</strong> Overall cognitive transformation rating
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Negotiation Behavior Index:</strong> Application of Camp/Voss principles in real
                      situations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Emotional Regulation Map:</strong> Based on Volatility & Withdrawal trait shifts
                    </span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 3: D3 - Change Agency */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="d3-change-agency">
              <h2 className="text-3xl font-bold text-brand-green">D3: Change Agency</h2>
              <p className="text-lg">Personal Transformation Capacity Rating</p>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  This is the "Immunity to Change operationalization score"—the person's ability to notice, surface,
                  test, and revise their own limiting assumptions.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Four Core Capabilities</h3>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-brand-green bg-muted">
                    <h4 className="font-semibold mb-2">1. Self-Diagnosis</h4>
                    <p className="text-sm">Ability to identify concrete improvement goals and personal barriers</p>
                  </div>

                  <div className="p-4 border-l-4 border-brand-orange bg-muted">
                    <h4 className="font-semibold mb-2">2. Competing Commitments Awareness</h4>
                    <p className="text-sm">
                      Recognition of hidden commitments that work against stated goals (e.g., wanting to be seen as
                      agreeable while trying to be assertive)
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-brand-green bg-muted">
                    <h4 className="font-semibold mb-2">3. Assumption Testing & Disconfirmation</h4>
                    <p className="text-sm">
                      Actively experimenting to test limiting beliefs (e.g., "If I push back, the prospect will walk
                      away")
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-brand-orange bg-muted">
                    <h4 className="font-semibold mb-2">4. Behavioral Follow-Through with Scaffolding</h4>
                    <p className="text-sm">
                      Creating and maintaining support systems that enable sustained behavioral change
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Change Agency Scale: 0–4</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded border-l-4 border-red-500">
                    <div className="font-bold mb-1">0 - Avoidance</div>
                    <p className="text-sm">Avoids reflection; unaware of immunity patterns</p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded border-l-4 border-orange-500">
                    <div className="font-bold mb-1">1 - Problem Identification</div>
                    <p className="text-sm">Can identify problem but not the hidden system</p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded border-l-4 border-yellow-500">
                    <div className="font-bold mb-1">2 - Commitment Surfacing</div>
                    <p className="text-sm">Can surface commitments but cannot test assumptions</p>
                  </div>

                  <div className="p-4 bg-lime-50 dark:bg-lime-950/20 rounded border-l-4 border-lime-500">
                    <div className="font-bold mb-1">3 - Regular Testing</div>
                    <p className="text-sm">Regular, repeated assumption testing with increasing confidence</p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded border-l-4 border-green-500">
                    <div className="font-bold mb-1">4 - Self-Directed Transformation</div>
                    <p className="text-sm">Creates new scaffolds, habits, and plans independently</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Outputs</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Personal ITC Map:</strong> Pre/post comparison of immunity patterns
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Scaffolding Strength Index:</strong> Quality and sustainability of support systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Change Sustainability Score:</strong> Risk of regression assessment
                    </span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 4: D4 - Sales Activity */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="d4-sales-activity">
              <h2 className="text-3xl font-bold text-brand-green">D4: Sales Activity</h2>
              <p className="text-lg">Mission-Driven Action Score (Jim Camp Standard)</p>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  This is designed to reward behavior, not results, consistent with Camp's principles. Activity quality
                  matters more than outcomes.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Weekly Activity Tracking</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">1. Call Attempts</span>
                      <span className="text-sm text-muted-foreground">Daily volume target</span>
                    </div>
                    <p className="text-sm">Number of outbound attempts regardless of connection</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">2. Conversations</span>
                      <span className="text-sm text-muted-foreground">Connection rate</span>
                    </div>
                    <p className="text-sm">Actual conversations held, not just voicemails</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">3. Discovery Calls Run Properly</span>
                      <span className="text-sm text-muted-foreground">Process adherence</span>
                    </div>
                    <p className="text-sm">Calls that follow the Camp system structure and discipline</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">4. Mission-Driven Follow-Ups</span>
                      <span className="text-sm text-muted-foreground">Purpose clarity</span>
                    </div>
                    <p className="text-sm">Follow-ups with clear mission, not desperate checking-in</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">5. Camp/Voss Tool Usage</span>
                      <span className="text-sm text-muted-foreground">Technique application</span>
                    </div>
                    <p className="text-sm">Calibrated questions, labels, accusation audits in live conversations</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">6. Daily Pre-Call Mission Creation</span>
                      <span className="text-sm text-muted-foreground">Preparation quality</span>
                    </div>
                    <p className="text-sm">Clear mission and purpose statement before every call</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Activity Quality Rating: 0–4 Scale</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-red-500">0</span>
                      <span className="font-semibold">No Structured Activity</span>
                    </div>
                    <p className="text-sm">Random or minimal effort, no system</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-orange-500">1</span>
                      <span className="font-semibold">Random Activity</span>
                    </div>
                    <p className="text-sm">Volume exists but no mission process or discipline</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-yellow-500">2</span>
                      <span className="font-semibold">Consistent Volume, Inconsistent Discipline</span>
                    </div>
                    <p className="text-sm">Regular activity but sporadic use of Camp/Voss principles</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-lime-500">3</span>
                      <span className="font-semibold">Structured Mission-Driven Activity</span>
                    </div>
                    <p className="text-sm">Reliable volume with consistent mission clarity and tool usage</p>
                  </div>

                  <div className="p-4 bg-muted rounded">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-xl text-green-500">4</span>
                      <span className="font-semibold">High-Discipline Execution</span>
                    </div>
                    <p className="text-sm">Mastery of tactical empathy, calibrated questions, and neediness elimination</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Outputs</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Weekly Activity Scorecard:</strong> Visual dashboard of all six tracked behaviors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Conversation Quality Rating:</strong> Manager assessment of call execution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Negotiation Discipline Score:</strong> Consistency in applying Camp/Voss frameworks
                    </span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 5: Composite Score */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6" id="composite-score">
              <h2 className="text-3xl font-bold text-brand-green">The SwiftCourse Transformation Index (SCTI)</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Combining the Four Domains</h3>
                <p className="text-lg leading-relaxed">
                  The SCTI provides a single composite score that reflects overall transformation across personality,
                  mindset, change capacity, and sales activity.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Formula</h3>
                <div className="p-6 bg-muted rounded text-center">
                  <p className="text-2xl font-mono font-bold mb-2">SCTI = (D1 + D2 + D3 + D4) / 4</p>
                  <p className="text-sm text-muted-foreground">
                    Where each domain (D1-D4) is scored on a 0-4 scale
                  </p>
                </div>
                <p className="text-sm mt-3 italic">
                  Note: Weighted versions can prioritize sales activity or mindset depending on training cohort needs.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">SCTI Categories</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded border-2 border-green-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-lg">3.5 – 4.0</span>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        TRANSFORMATIONAL
                      </span>
                    </div>
                    <p className="text-sm">
                      Full integration of all systems; capable of coaching others; sustainable self-directed growth
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-lime-500/20 to-lime-600/20 rounded border-2 border-lime-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-lg">2.6 – 3.4</span>
                      <span className="text-sm font-semibold text-lime-600 dark:text-lime-400">STRONG GROWTH</span>
                    </div>
                    <p className="text-sm">
                      Reliable application of principles; occasional regression under stress; needs periodic coaching
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded border-2 border-yellow-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-lg">1.8 – 2.5</span>
                      <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                        EMERGING CAPABILITY
                      </span>
                    </div>
                    <p className="text-sm">
                      Awareness established; inconsistent execution; requires active scaffolding and support
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded border-2 border-red-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-lg">0 – 1.7</span>
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                        NEEDS INTENSIVE COACHING
                      </span>
                    </div>
                    <p className="text-sm">
                      Minimal behavior change; limited awareness; requires one-on-one intervention and remediation
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Application</h3>
                <p className="leading-relaxed mb-3">
                  The SCTI serves as both an evaluation framework and a coaching dashboard, perfect for:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Pre/post assessment to measure program effectiveness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Ongoing scorecards for individual coaching priorities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Certification criteria for program completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Identifying specific development areas for each participant</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 6: Module Summary */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="module-summary">
              <h2 className="text-3xl font-bold text-brand-green">Module Summary: Measurement Creates Clarity</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 border-2 border-brand-green/30">
                <p className="text-xl leading-relaxed mb-4 font-semibold">
                  Measurement is not about control or pressure. It is about seeing reality clearly enough to change it.
                </p>
                <p className="text-lg leading-relaxed">
                  When behavior, mindset, or activity is not measured, the result is not neutrality—it is willful
                  blindness. Unmeasured effort invites rationalization, self-deception, and false progress.
                </p>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-brand-orange/30">
                  <h3 className="text-lg font-semibold mb-3 text-brand-orange">What Cannot Be Seen</h3>
                  <p className="text-muted-foreground">cannot be regulated.</p>
                </Card>

                <Card className="p-6 border-2 border-brand-green/30">
                  <h3 className="text-lg font-semibold mb-3 text-brand-green">What Cannot Be Regulated</h3>
                  <p className="text-muted-foreground">cannot be improved.</p>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">The Bridge Between Forces</h3>
                <p className="leading-relaxed mb-4">
                  Measurement is the bridge between pulling mechanisms (goals that draw behavior forward) and pushing
                  mechanisms (clarity about what must be left behind).
                </p>
                <p className="leading-relaxed">
                  It pulls behavior toward disciplined action and pushes behavior away from drift and illusion.
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-brand-green">
                <h3 className="text-xl font-semibold mb-4">Why SwiftCourse Measures These Four Domains</h3>
                <p className="leading-relaxed mb-3">
                  This is why SwiftCourse measures traits, mindset shifts, change agency, and activity—not to judge,
                  but to illuminate.
                </p>
                <div className="space-y-3 text-lg">
                  <p className="leading-relaxed">
                    <strong>What you don't measure, you tolerate.</strong>
                  </p>
                  <p className="leading-relaxed">
                    <strong>What you tolerate, you reinforce.</strong>
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 border-2 border-brand-green">
                <h3 className="text-2xl font-bold mb-4 text-center">The Chain of Transformation</h3>
                <div className="space-y-3 text-center">
                  <div className="p-4 bg-background rounded">
                    <p className="text-lg font-semibold">Measurement creates clarity.</p>
                  </div>
                  <div className="text-3xl text-brand-green">↓</div>
                  <div className="p-4 bg-background rounded">
                    <p className="text-lg font-semibold">Clarity creates discipline.</p>
                  </div>
                  <div className="text-3xl text-brand-orange">↓</div>
                  <div className="p-4 bg-background rounded">
                    <p className="text-lg font-semibold">Discipline creates transformation.</p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue to Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 7: Module Assessment */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6" id="module-assessment">
              <h2 className="text-3xl font-bold text-brand-green">Module 6 Assessment</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  Test your understanding of the 4D Growth Framework and the principles of measurement and
                  accountability.
                </p>
              </Card>

              <MultipleChoice
                question="What is the primary purpose of measurement in the SwiftCourse framework?"
                options={[
                  {
                    id: "a",
                    text: "To judge and rank participants",
                    isCorrect: false,
                    feedback: "Judgment and ranking are not the purpose—measurement is about clarity, not comparison.",
                  },
                  {
                    id: "b",
                    text: "To create pressure and competition",
                    isCorrect: false,
                    feedback: "Pressure and competition are byproducts, not the purpose of measurement.",
                  },
                  {
                    id: "c",
                    text: "To see reality clearly enough to change it and eliminate self-deception",
                    isCorrect: true,
                    feedback: "Correct! Measurement is about seeing reality clearly enough to change it. It eliminates willful blindness, rationalization, and false progress—not about judgment or pressure.",
                  },
                  {
                    id: "d",
                    text: "To satisfy training requirements",
                    isCorrect: false,
                    feedback: "Compliance is not the purpose—creating clarity and enabling change is.",
                  },
                ]}
                explanation="Measurement is about seeing reality clearly enough to change it. It eliminates willful blindness, rationalization, and false progress—not about judgment or pressure."
                onAnswer={(correct) => handleQuizComplete("q1", correct)}
              />

              <MultipleChoice
                question="In the Big 10 Integration Index (D1), what does a score of 4 represent?"
                options={[
                  {
                    id: "a",
                    text: "Basic awareness of personality traits",
                    isCorrect: false,
                    feedback: "Basic awareness is score 1—score 4 represents full mastery.",
                  },
                  {
                    id: "b",
                    text: "Ability to recognize traits but not regulate them",
                    isCorrect: false,
                    feedback: "Recognition without regulation is score 2—score 4 requires full self-management.",
                  },
                  {
                    id: "c",
                    text: "Inconsistent attempts at self-regulation",
                    isCorrect: false,
                    feedback: "Inconsistent regulation is score 3—score 4 demonstrates consistent mastery.",
                  },
                  {
                    id: "d",
                    text: "Full self-management in high-stress sales contexts",
                    isCorrect: true,
                    feedback: "Correct! A score of 4 in D1 represents full mastery: the ability to manage trait-driven tendencies even in high-stress sales situations, using effective compensation strategies.",
                  },
                ]}
                explanation="A score of 4 in D1 represents full mastery: the ability to manage trait-driven tendencies even in high-stress sales situations, using effective compensation strategies."
                onAnswer={(correct) => handleQuizComplete("q2", correct)}
              />

              <MultipleChoice
                question="Which of these is NOT one of the five core mindset shifts measured in D2?"
                options={[
                  {
                    id: "a",
                    text: "From outcome-focused to process-focused",
                    isCorrect: false,
                    feedback: "This is one of the five core mindset shifts measured in D2.",
                  },
                  {
                    id: "b",
                    text: "From fear of 'No' to using 'No' as a resource",
                    isCorrect: false,
                    feedback: "This is one of the five core mindset shifts measured in D2.",
                  },
                  {
                    id: "c",
                    text: "From high activity to high conversion rates",
                    isCorrect: true,
                    feedback: "Correct! The five mindset shifts focus on cognitive and behavioral patterns, not conversion outcomes. They measure shifts in thinking (process vs outcome, using 'No', tactical empathy, etc.), not results metrics.",
                  },
                  {
                    id: "d",
                    text: "From emotional reactivity to tactical empathy and curiosity",
                    isCorrect: false,
                    feedback: "This is one of the five core mindset shifts measured in D2.",
                  },
                ]}
                explanation="The five mindset shifts focus on cognitive and behavioral patterns, not conversion outcomes. They measure shifts in thinking (process vs outcome, using 'No', tactical empathy, etc.), not results metrics."
                onAnswer={(correct) => handleQuizComplete("q3", correct)}
              />

              <MultipleChoice
                question="What does the D4 (Sales Activity) score primarily reward?"
                options={[
                  {
                    id: "a",
                    text: "Number of deals closed and revenue generated",
                    isCorrect: false,
                    feedback: "D4 rewards behavior, not outcomes—deals closed are lagging indicators.",
                  },
                  {
                    id: "b",
                    text: "Behavior quality and mission-driven activity, not outcomes",
                    isCorrect: true,
                    feedback: "Correct! D4 is designed to reward behavior, not results, consistent with Jim Camp's principles. It measures activity quality, discipline, and proper execution of the system—not deals closed.",
                  },
                  {
                    id: "c",
                    text: "Win rate and average deal size",
                    isCorrect: false,
                    feedback: "Win rate and deal size are outcome metrics, not behaviors—D4 measures behaviors.",
                  },
                  {
                    id: "d",
                    text: "Meeting quota targets",
                    isCorrect: false,
                    feedback: "Quota is an outcome metric—D4 measures the behaviors that lead to quota.",
                  },
                ]}
                explanation="D4 is designed to reward behavior, not results, consistent with Jim Camp's principles. It measures activity quality, discipline, and proper execution of the system—not deals closed."
                onAnswer={(correct) => handleQuizComplete("q4", correct)}
              />

              <MultipleChoice
                question="A participant with an SCTI score of 2.9 falls into which category?"
                options={[
                  {
                    id: "a",
                    text: "Needs Intensive Coaching (0-1.7)",
                    isCorrect: false,
                    feedback: "This range is for those needing intensive coaching—2.9 is higher.",
                  },
                  {
                    id: "b",
                    text: "Emerging Capability (1.8-2.5)",
                    isCorrect: false,
                    feedback: "This range is for emerging capability—2.9 is above this threshold.",
                  },
                  {
                    id: "c",
                    text: "Strong Growth (2.6-3.4)",
                    isCorrect: true,
                    feedback: "Correct! A score of 2.9 falls in the Strong Growth category (2.6-3.4), indicating reliable application of principles with occasional regression under stress and periodic coaching needs.",
                  },
                  {
                    id: "d",
                    text: "Transformational (3.5-4.0)",
                    isCorrect: false,
                    feedback: "This is the highest category—2.9 hasn't reached transformational level yet.",
                  },
                ]}
                explanation="A score of 2.9 falls in the Strong Growth category (2.6-3.4), indicating reliable application of principles with occasional regression under stress and periodic coaching needs."
                onAnswer={(correct) => handleQuizComplete("q5", correct)}
              />

              {!assessmentSubmitted && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleSubmitAssessment}
                    disabled={!allQuizAnswered}
                    className="bg-brand-green hover:bg-[#143d31] text-white px-8 py-6 text-lg"
                    size="lg"
                  >
                    Complete Assessment
                  </Button>
                </div>
              )}

              {assessmentSubmitted && allQuizComplete && (
                <Card className="p-6 bg-green-50 dark:bg-green-950 border-2 border-green-500 mt-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                        🎉 Module 6 Complete!
                      </h3>
                      <p className="text-green-800 dark:text-green-200 mb-4">
                        Congratulations! You've mastered the 4D Growth Framework for measuring behavioral transformation.
                        You now understand how to track personality work, mindset shifts, change agency, and sales activity
                        through structured measurement that creates clarity, discipline, and transformation.
                      </p>
                      <p className="text-green-800 dark:text-green-200 mb-4 font-semibold">
                        Perfect score! You answered all questions correctly. 🌟
                      </p>
                      <p className="text-green-800 dark:text-green-200 mb-4 font-semibold">
                        Remember: What you don't measure, you tolerate. What you tolerate, you reinforce.
                      </p>
                      <Button onClick={() => router.push("/course")} className="bg-brand-green hover:bg-[#143d31] text-white">
                        Return to Dashboard
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {assessmentSubmitted && !allQuizComplete && (
                <Card className="p-6 bg-amber-50 dark:bg-amber-950 border-2 border-amber-500 mt-8">
                  <div className="flex items-start gap-4">
                    <RefreshCw className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                        Review Your Answers
                      </h3>
                      <p className="text-amber-800 dark:text-amber-200 mb-4">
                        You've answered all questions, but some answers are incorrect. Please review the module content and try again. You need to answer all questions correctly to complete this module.
                      </p>
                      <Button onClick={() => window.location.reload()} className="bg-amber-600 hover:bg-amber-700 text-white">
                        Try Again
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
