/**
 * MODULE 4: INTEGRATING BIG 10 WITH CAMP & VOSS MODELS
 * Comprehensive module covering how to override personality traits with systems
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { ComparisonCard } from "@/components/learning/comparison-card"
import { GridDisplay } from "@/components/learning/grid-display"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { MatchingGame } from "@/components/learning/matching-game"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { FlipCard } from "@/components/learning/flip-card"

export default function Module4Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<{
    matching: boolean
    quiz1: boolean
    quiz2: boolean
    quiz3: boolean
    quiz4: boolean
    quiz5: boolean
    quiz6: boolean
    quiz7: boolean
    quiz8: boolean
    quiz9: boolean
    quiz10: boolean
  }>({
    matching: false,
    quiz1: false,
    quiz2: false,
    quiz3: false,
    quiz4: false,
    quiz5: false,
    quiz6: false,
    quiz7: false,
    quiz8: false,
    quiz9: false,
    quiz10: false,
  })

  const MODULE_ID = "module-4"
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
        router.push(`/course/module-4?section=${nextSection.id}`)
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
            <h1 className="text-4xl font-bold mb-2">Module 4: Integrating Big 10 with Camp & Voss</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Override personality traits with systematic negotiation skills
            </p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Module Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6" id="module-overview">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Your Personality Creates Tendencies—Not Destiny</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Most salespeople rely on personality. That's why they burn out, get inconsistent results, or avoid
                  the work entirely. Swiftcourse teaches something different:
                </p>
                <p className="text-lg font-semibold text-brand-orange">
                  Your personality traits create tendencies. Your training determines your performance.
                </p>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">What You'll Learn</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Identify your Big 10 tendencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>See how traits show up in sales behavior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Counter tendencies with Camp & Voss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Replace instinct with structured execution</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">The Philosophy</h3>
                  <p className="text-sm leading-relaxed">
                    "At Swiftcourse, we treat personality traits as tendencies—not limitations. Using the Big 10
                    Aspects as a diagnostic lens, we teach negotiators how to override unproductive impulses with
                    disciplined systems from Jim Camp and emotional-control tools from Chris Voss."
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">The Goal</h3>
                  <p className="text-lg font-semibold text-brand-green mb-2">
                    Make personality traits irrelevant to performance
                  </p>
                  <p className="text-sm">
                    Your natural wiring shapes your instincts, but your training shapes your outcomes.
                  </p>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 1: Understanding Big 10 Aspects */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6" id="big-10-aspects">
              <h2 className="text-3xl font-bold text-brand-green">Understanding the Big 10 Aspects</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">How the Big 10 Model Works</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Peterson, DeYoung, and Quilty break the Big Five into 10 aspects. For sales, these aspects act like
                  tendencies, not destiny:
                </p>
              </Card>

              <GridDisplay
                title="The Big 10 Breakdown"
                items={[
                  {
                    title: "Openness",
                    description: "Intellect (analytical thinking) / Openness to Experience (creativity, novelty)",
                  },
                  {
                    title: "Conscientiousness",
                    description: "Industriousness (work ethic) / Orderliness (organization, perfectionism)",
                  },
                  {
                    title: "Extraversion",
                    description: "Enthusiasm (positive energy) / Assertiveness (dominance, control)",
                  },
                  {
                    title: "Agreeableness",
                    description: "Compassion (empathy, warmth) / Politeness (respect, conflict avoidance)",
                  },
                  {
                    title: "Neuroticism",
                    description: "Volatility (emotional reactivity) / Withdrawal (anxiety, social avoidance)",
                  },
                ]}
              />

              <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                <h3 className="text-xl font-semibold mb-3 text-brand-orange">Key Sales Problems by Aspect</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded">
                    <strong>High Compassion:</strong> Avoids conflict, struggles to say "no," fears pushing prospects
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>High Orderliness:</strong> Over-preparation, avoids imperfect action
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>Low Industriousness:</strong> Inconsistent prospecting
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>Low Assertiveness:</strong> Weak control of conversation
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>High Volatility:</strong> Takes rejection personally
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>High Withdrawal:</strong> Avoids outreach
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>High Openness:</strong> Too many ideas, not enough execution
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>High Intellect:</strong> Overthinking objections
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>High Enthusiasm:</strong> Talks too much, listens too little
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 2: The Counterweight System */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="counterweight-system">
              <h2 className="text-3xl font-bold text-brand-green">The Counterweight System</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  <strong>Swiftcourse's philosophy:</strong> Camp and Voss skills are the counterweights—tools for
                  transcending your default traits so you can perform with discipline, control, and emotional
                  neutrality.
                </p>
              </Card>

              <ComparisonCard
                leftTitle="Jim Camp Systems"
                leftItems={[
                  "Mission first, ego last",
                  '"No" leads to safety and truth',
                  "Emotional detachment",
                  "Checklist thinking",
                  "Clear boundaries",
                  "Never seek approval",
                ]}
                rightTitle="Chris Voss Tools"
                rightItems={[
                  "Label the emotion",
                  "Mirror to slow conversation",
                  "Calibrated questions",
                  "Accusation audits",
                  "Late-night FM DJ tone",
                  "Tactical empathy",
                ]}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-green">Camp = Override Agreeableness</h3>
                  <p className="mb-3">Use Camp's tools to counter agreeable tendencies:</p>
                  <ul className="space-y-2">
                    <li>• Mission over relationship</li>
                    <li>• Boundaries over accommodation</li>
                    <li>• "No" as a productive tool</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">Voss = Override Volatility</h3>
                  <p className="mb-3">Use Voss's tools to manage emotional reactions:</p>
                  <ul className="space-y-2">
                    <li>• Labeling for self-awareness</li>
                    <li>• Tactical empathy for control</li>
                    <li>• Calm listening over reacting</li>
                  </ul>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 3: Extraversion Aspects */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="extraversion">
              <h2 className="text-3xl font-bold text-brand-green">Extraversion: Assertiveness & Enthusiasm</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Assertiveness</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Takes control too quickly, talks over prospects
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Pushiness creates resistance
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter (Camp/Voss):</p>
                  <ul className="space-y-1">
                    <li>• Camp: "No"-oriented questions slow the pace</li>
                    <li>• Voss: Mirroring and calibrated questions force listening</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Drills for High Assertiveness</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> 2-second pause before any response
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> 10 mirrored statements in live roleplay
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Enthusiasm</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Over-talks, sells too early, emotional highs/lows
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Burns trust, kills discovery
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter:</p>
                  <ul className="space-y-1">
                    <li>• Camp: Checklist discipline, mission-before-ego</li>
                    <li>• Voss: Label excitement—"Sounds like I'm getting ahead of myself."</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Drills for High Enthusiasm</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> Limit statements to 2 sentences
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> "Stop selling" exercise: 2 minutes of pure listening
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 4: Agreeableness Aspects */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="agreeableness">
              <h2 className="text-3xl font-bold text-brand-green">Agreeableness: Compassion & Politeness</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Compassion</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Avoids tension, fears asking commitment questions
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Creates weak follow-up, vague timelines
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter (Camp/Voss):</p>
                  <ul className="space-y-1">
                    <li>• Camp: "No" is productive</li>
                    <li>• Voss: Softening techniques (labels + gentle tone)</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Drills for High Compassion</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> Ask 3 commitment questions per call
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> Practice saying: "Is now a bad time to push on this?"
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Politeness</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Avoids conflict, accepts "maybe," tolerates disrespect
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Gets manipulated by prospects
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter:</p>
                  <ul className="space-y-1">
                    <li>• Camp: Boundaries + mission clarity</li>
                    <li>• Voss: Accusation audit to neutralize fear of conflict</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Drills for High Politeness</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> Start each roleplay with an accusation audit
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> Practice "Let's slow down—what's the real issue here?"
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 5: Conscientiousness Aspects */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6" id="conscientiousness">
              <h2 className="text-3xl font-bold text-brand-green">Conscientiousness: Industriousness & Orderliness</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Industriousness</h3>
                <p className="mb-2">
                  <strong>Low Tendency:</strong> Inconsistent prospecting
                </p>
                <p className="mb-2">
                  <strong>High Tendency:</strong> Overworking without strategic focus
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter (Camp/Voss):</p>
                  <ul className="space-y-1">
                    <li>• Camp: Productive activity metrics</li>
                    <li>• Voss: Tactical priorities ("what's the real problem here?")</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Drills for Industriousness</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> Build a daily "3 Priority" list
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> Timebox prospecting into 20-minute sprints
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Orderliness</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Perfectionism, over-prep, fear of imperfect action
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Delayed outreach, analysis paralysis
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter:</p>
                  <ul className="space-y-1">
                    <li>• Camp: "Don't need the whole picture"</li>
                    <li>• Voss: Use calibrated questions to avoid over-preparation</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Drills for High Orderliness</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> Send 10 imperfect outreach messages
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> 80/20 prep rule: set a 5-minute timer
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 6: Openness & Neuroticism Aspects */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="openness-neuroticism">
              <h2 className="text-3xl font-bold text-brand-green">Openness & Neuroticism Aspects</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Intellect (Openness)</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Overanalyzing objections, thinking instead of asking
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Slow reaction time, long sales cycles
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter:</p>
                  <ul className="space-y-1">
                    <li>• Camp: Stick to the mission</li>
                    <li>• Voss: Mirroring over analysis</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> Replace every explanation with a question
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> "Analysis interrupt" → pause + mirror
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Openness to Experience</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Idea overload, inconsistent execution
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Constant strategy changes
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter:</p>
                  <ul className="space-y-1">
                    <li>• Camp: One mission, one checklist</li>
                    <li>• Voss: Calibration forces focus</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> Pick 1 script style for 30 days
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> Highlight all deviations in red
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Volatility (Neuroticism)</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Emotional spikes, defensive responses
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Rushes, reacts, fights prospects
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter:</p>
                  <ul className="space-y-1">
                    <li>• Camp: Detachment from outcome</li>
                    <li>• Voss: Label your emotions ("Sounds like I'm frustrated.")</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> 2 emotional labels per call
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> "Emotional detachment" breathing cadence (4–2–6)
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Withdrawal (Neuroticism)</h3>
                <p className="mb-2">
                  <strong>Tendency:</strong> Avoids outreach due to fear of rejection
                </p>
                <p className="mb-3">
                  <strong>Sales Problem:</strong> Inconsistent pipeline
                </p>
                <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                  <p className="font-semibold mb-2">Counter:</p>
                  <ul className="space-y-1">
                    <li>• Camp: Reframe "no" as progress</li>
                    <li>• Voss: Small stakes reps (micro-dials)</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 1:</strong> 20 micro-dials (5-second intro each)
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <strong>Drill 2:</strong> Track rejection as a metric
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 7: The Overcoming Framework */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6" id="overcoming-framework">
              <h2 className="text-3xl font-bold text-brand-green">The Swiftcourse Overcoming Framework</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg leading-relaxed">
                  This is the core three-part system that transcends natural personality tendencies.
                </p>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-green">1. Self-Awareness</h3>
                  <p className="mb-3">Identify your Big 10 tendencies.</p>
                  <p className="font-semibold mb-2">Ask: "Where am I predictable?"</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Self-assessment questionnaire</li>
                    <li>• Peer feedback</li>
                    <li>• Call recording pattern analysis</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">2. Camp Systems</h3>
                  <p className="mb-3">Jim Camp's principles turn your traits into non-issues:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Mission first, ego last</li>
                    <li>• "No" leads to safety and truth</li>
                    <li>• Emotional detachment</li>
                    <li>• Checklist thinking</li>
                    <li>• Clear boundaries</li>
                    <li>• Never seek approval</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-green">3. Voss Tools</h3>
                  <p className="mb-3">Chris Voss gives you emotional control:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Label the emotion</li>
                    <li>• Mirror to slow conversation</li>
                    <li>• Calibrated questions</li>
                    <li>• Accusation audits</li>
                    <li>• Late-night FM DJ tone</li>
                    <li>• Tactical empathy</li>
                  </ul>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Trait → Problem → Countermeasure Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-brand-green/10">
                      <tr>
                        <th className="p-2 text-left">Trait</th>
                        <th className="p-2 text-left">Sales Problem</th>
                        <th className="p-2 text-left">Camp System</th>
                        <th className="p-2 text-left">Voss Tool</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2">High Compassion</td>
                        <td className="p-2">Avoids hard questions</td>
                        <td className="p-2">Detach from outcome with "No" questions</td>
                        <td className="p-2">Calibrated Questions</td>
                      </tr>
                      <tr>
                        <td className="p-2">High Orderliness</td>
                        <td className="p-2">Over-prep</td>
                        <td className="p-2">Checklist</td>
                        <td className="p-2">Mirroring</td>
                      </tr>
                      <tr>
                        <td className="p-2">High Volatility</td>
                        <td className="p-2">Emotional reactions</td>
                        <td className="p-2">Mission</td>
                        <td className="p-2">Accusation audit</td>
                      </tr>
                      <tr>
                        <td className="p-2">High Enthusiasm</td>
                        <td className="p-2">Talking too much</td>
                        <td className="p-2">Pause discipline</td>
                        <td className="p-2">Mirror to talk less</td>
                      </tr>
                      <tr>
                        <td className="p-2">Low Industriousness</td>
                        <td className="p-2">Inconsistent work</td>
                        <td className="p-2">Activity metrics</td>
                        <td className="p-2">Task bracket</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 8: Daily Practice */}
          {currentSectionIndex === 8 && (
            <div className="space-y-6" id="daily-practice">
              <h2 className="text-3xl font-bold text-brand-green">Field Drills & Daily Practice</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg font-semibold">Your people need reps, not theory.</p>
                <p className="text-lg">This is the Swiftcourse daily regimen.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-green">Daily Drills</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>10 Mirrored statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>2 Accusation audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>20 minutes of cold outreach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Track: No's, not Yes's</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>One paragraph of self-reflection tied to your Big 10 aspect</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-orange">Weekly Drills</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Review 2 recorded calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Isolate trait patterns (Compassion, Orderliness, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Roleplay adversity scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>"Say No" practice—5 scripted refusals</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-brand-green">Monthly Checkpoint</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Reassess your Big 10 tendencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Identify 1 trait to suppress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Identify 1 system to strengthen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Add 1 new calibrated question to your arsenal</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 9: Performance Outcomes */}
          {currentSectionIndex === 9 && (
            <div className="space-y-6" id="performance-outcomes">
              <h2 className="text-3xl font-bold text-brand-green">Performance Outcomes</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg font-semibold mb-2">
                  When the Big 10 model + Camp + Voss are mastered:
                </p>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-semibold">Personality → Income Disconnect</h3>
                  </div>
                  <p>Your personality no longer determines your income.</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">Emotional Stability</h3>
                  </div>
                  <p>Emotional volatility disappears from your calls.</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">Boundary Respect</h3>
                  </div>
                  <p>Prospects respect your boundaries.</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      4
                    </div>
                    <h3 className="text-xl font-semibold">Mission-Driven Control</h3>
                  </div>
                  <p>You become a calm, controlled, mission-driven negotiator.</p>
                </Card>

                <Card className="p-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      5
                    </div>
                    <h3 className="text-xl font-semibold">Cleaner Pipeline</h3>
                  </div>
                  <p>You stop chasing, start qualifying, and create a cleaner pipeline.</p>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-br from-brand-orange/20 to-brand-green/20 border-2 border-brand-green">
                <p className="text-xl font-semibold text-center text-brand-green">
                  This is where Swiftcourse becomes identity-changing, not just skill-changing.
                </p>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 10: Module Assessment */}
          {currentSectionIndex === 10 && (
            <div className="space-y-6" id="module-assessment">
              <h2 className="text-3xl font-bold text-brand-green">Module Assessment</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg">
                  Test your understanding of the Big 10 integration with Camp and Voss systems.
                </p>
              </Card>

              <MultipleChoice
                question="Swiftcourse views the Big 10 personality aspects as:"
                options={[
                  "Fixed traits that limit performance",
                  "Predictors of long-term success",
                  "Tendencies that can be overridden with systems",
                  "Indicators of natural sales talent",
                ]}
                correctAnswer={2}
                explanation="Swiftcourse treats personality traits as tendencies—not limitations. They can be overridden with disciplined systems from Camp and emotional-control tools from Voss."
                onComplete={(correct) => handleQuizComplete("quiz1", correct)}
              />

              <MultipleChoice
                question="High Orderliness most commonly leads to which sales problem?"
                options={[
                  "Poor listening",
                  "Analysis paralysis and over-preparation",
                  "Overselling too early",
                  "Aggressive pushiness",
                ]}
                correctAnswer={1}
                explanation="High Orderliness creates perfectionism, over-preparation, and fear of imperfect action, leading to analysis paralysis."
                onComplete={(correct) => handleQuizComplete("quiz2", correct)}
              />

              <MultipleChoice
                question="Which Camp/Voss countermeasure best helps a highly volatile salesperson remain stable?"
                options={[
                  "Mirroring",
                  "Detachment from the mission",
                  "Tactical Empathy to focus only on customer needs",
                  "Asking for the 'No'",
                ]}
                correctAnswer={2}
                explanation="Tactical empathy, combined with Camp's emotional detachment and Voss's labeling, helps volatile salespeople focus on customer needs instead of emotional reactions."
                onComplete={(correct) => handleQuizComplete("quiz3", correct)}
              />

              <MultipleChoice
                question="High Agreeableness–Compassion tends to create what behavioral pattern in sales?"
                options={[
                  "Talking too much",
                  "Avoiding necessary tension and commitment questions",
                  "Refusing to prepare",
                  "Oversimplifying objections",
                ]}
                correctAnswer={1}
                explanation="High Compassion leads to avoiding tension, fearing commitment questions, and struggling to push prospects when necessary."
                onComplete={(correct) => handleQuizComplete("quiz4", correct)}
              />

              <MultipleChoice
                question="Which tool helps counter high Enthusiasm and talking too much?"
                options={[
                  "Accusation Audit",
                  "2-second pause + labeling yourself",
                  "Late-night FM DJ tone and calibrated questions",
                  "Boundary statements",
                ]}
                correctAnswer={2}
                explanation="Late-night FM DJ tone and calibrated questions slow down the conversation and force listening, countering the tendency to over-talk."
                onComplete={(correct) => handleQuizComplete("quiz5", correct)}
              />

              <MultipleChoice
                question="Low Industriousness most often results in:"
                options={[
                  "Too many ideas",
                  "Inconsistent prospecting activity",
                  "Overthinking objections",
                  "Overselling without listening",
                ]}
                correctAnswer={1}
                explanation="Low Industriousness creates inconsistent work patterns and prospecting activity."
                onComplete={(correct) => handleQuizComplete("quiz6", correct)}
              />

              <MultipleChoice
                question="What is the purpose of Jim Camp's mission-focused thinking in this system?"
                options={[
                  "To create emotional investment",
                  "To eliminate the need for listening",
                  "To anchor behavior in process instead of emotion",
                  "To maximize enthusiasm",
                ]}
                correctAnswer={2}
                explanation="Camp's mission-focused thinking anchors behavior in process instead of emotion, creating stability regardless of natural wiring."
                onComplete={(correct) => handleQuizComplete("quiz7", correct)}
              />

              <MultipleChoice
                question="Which Voss tool slows down fast-talking, over-enthusiastic reps?"
                options={[
                  "Mirroring",
                  "'Why' questions",
                  "High-energy tone",
                  "Long explanations",
                ]}
                correctAnswer={0}
                explanation="Mirroring forces listening and slows down the conversation, helping over-enthusiastic reps to pause and reflect."
                onComplete={(correct) => handleQuizComplete("quiz8", correct)}
              />

              <MultipleChoice
                question="High Intellect in the Big 10 model often results in:"
                options={[
                  "Overanalyzing objections instead of asking questions",
                  "Emotional breakdowns",
                  "A refusal to use scripts",
                  "Avoiding outreach completely",
                ]}
                correctAnswer={0}
                explanation="High Intellect leads to overthinking and overanalyzing objections instead of simply asking calibrated questions."
                onComplete={(correct) => handleQuizComplete("quiz9", correct)}
              />

              <MultipleChoice
                question="The goal of integrating Big 10 + Camp + Voss in Swiftcourse is:"
                options={[
                  "To make personality traits irrelevant to performance",
                  "To create a personality-based selling style",
                  "To categorize reps into fixed roles",
                  "To eliminate the need for structure",
                ]}
                correctAnswer={0}
                explanation="The goal is to make personality traits irrelevant to performance by using systems and tools to override natural tendencies."
                onComplete={(correct) => handleQuizComplete("quiz10", correct)}
              />

              <MatchingGame
                title="Match the Item to Its Answer"
                pairs={[
                  { left: "Fear of asking commitment questions", right: "Big 10: High Compassion" },
                  { left: '"No is a decision, not rejection"', right: "Camp's No-Based Decision Path" },
                  { left: "Mirroring to slow a conversation", right: "Voss's Mirroring" },
                  { left: "Over-preparing due to fear of imperfect action", right: "Big 10: High Orderliness" },
                  { left: "Labeling the prospect's emotion", right: "Voss's Labeling" },
                  { left: "Mission-before-ego principle", right: "Camp's Mission Clarity" },
                  { left: "Taking rejection personally", right: "Big 10: Withdrawal and Volatility" },
                  { left: "Tactical empathy during discovery", right: "Voss's Calibrated Questions" },
                  { left: "One clear checklist for execution", right: "Swiftcourse Execution Framework" },
                  { left: "Talking too much and rushing", right: "Big 10: High Enthusiasm" },
                ]}
                onComplete={(correct) => handleQuizComplete("matching", correct)}
              />

              {allQuizComplete && (
                <Card className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 border-2 border-brand-green">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-brand-green" />
                    <h3 className="text-2xl font-bold text-brand-green">Module Complete!</h3>
                  </div>
                  <p className="text-lg mb-4">
                    Congratulations! You've mastered the integration of the Big 10 Aspects Model with Camp and Voss
                    negotiation systems. You now have the tools to make your personality traits irrelevant to your
                    performance.
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
