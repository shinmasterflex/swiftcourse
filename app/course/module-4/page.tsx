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
import { Slider } from "@/components/ui/slider"

export default function Module4Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [compassionLevel, setCompassionLevel] = useState([50])
  const [politenessLevel, setPolitenessLevel] = useState([50])
  const [industriousnessLevel, setIndustriousnessLevel] = useState([50])
  const [orderlinessLevel, setOrderlinessLevel] = useState([50])
  const [enthusiasmLevel, setEnthusiasmLevel] = useState([50])
  const [assertivenessLevel, setAssertivenessLevel] = useState([50])
  const [intellectLevel, setIntellectLevel] = useState([50])
  const [opennessToExperienceLevel, setOpennessToExperienceLevel] = useState([50])
  const [volatilityLevel, setVolatilityLevel] = useState([50])
  const [withdrawalLevel, setWithdrawalLevel] = useState([50])
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

  const allQuizComplete = Object.values(quizResults).every((result) => result === true)

  useEffect(() => {
    if (allQuizComplete && currentSectionIndex === 9) {
      const assessmentSection = sections[9]
      if (assessmentSection) {
        markSectionComplete(MODULE_ID, assessmentSection.id)
        setCurrentPosition(MODULE_ID, assessmentSection.id)
      }
    }
  }, [allQuizComplete, currentSectionIndex, sections, MODULE_ID, markSectionComplete, setCurrentPosition])

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
                <p className="text-lg font-semibold text-brand-orange mb-4">
                  Your personality traits create tendencies. Your training determines your performance.
                </p>
                <p className="text-lg leading-relaxed">
                  At Swiftcourse, we treat personality traits as tendencies—not limitations. Using the Big 10
                  Aspects as a diagnostic lens, we teach negotiators how to override unproductive impulses with
                  disciplined systems from Jim Camp and emotional-control tools from Chris Voss.
                </p>
              </Card>

              <div className="grid gap-4">
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
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">The Goal</h3>
                  <p className="text-lg font-semibold text-brand-green mb-2">
                    Make personality traits irrelevant to performance
                  </p>
                  <p className="text-sm">
                    Your natural wiring shapes your instincts, but your training shapes your outcomes.
                  </p>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-brand-orange">When the Big 10 model + Camp + Voss are mastered:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Personality → Income Disconnect:</span> Your personality no longer determines your income.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Emotional Stability:</span> Emotional volatility disappears from your calls.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Boundary Respect:</span> Prospects respect your boundaries.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Mission-Driven Control:</span> You become a calm, controlled, mission-driven negotiator.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Cleaner Pipeline:</span> You stop chasing, start qualifying, and create a cleaner pipeline.
                    </div>
                  </li>
                </ul>
              </Card>

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

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-brand-green">The Big 10 Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FlipCard
                    frontTitle="Openness"
                    frontContent={
                      <div className="flex items-center justify-center h-full">
                        <div className="text-8xl">🌟</div>
                      </div>
                    }
                    backTitle="Openness Aspects"
                    backContent={
                      <p className="text-sm">
                        <strong>Intellect:</strong> Analytical thinking<br />
                        <strong>Openness to Experience:</strong> Creativity, novelty
                      </p>
                    }
                  />
                  <FlipCard
                    frontTitle="Conscientiousness"
                    frontContent={
                      <div className="flex items-center justify-center h-full">
                        <div className="text-8xl">✅</div>
                      </div>
                    }
                    backTitle="Conscientiousness Aspects"
                    backContent={
                      <p className="text-sm">
                        <strong>Industriousness:</strong> Work ethic<br />
                        <strong>Orderliness:</strong> Organization, perfectionism
                      </p>
                    }
                  />
                  <FlipCard
                    frontTitle="Extraversion"
                    frontContent={
                      <div className="flex items-center justify-center h-full">
                        <div className="text-8xl">🎉</div>
                      </div>
                    }
                    backTitle="Extraversion Aspects"
                    backContent={
                      <p className="text-sm">
                        <strong>Enthusiasm:</strong> Positive energy<br />
                        <strong>Assertiveness:</strong> Dominance, control
                      </p>
                    }
                  />
                  <FlipCard
                    frontTitle="Agreeableness"
                    frontContent={
                      <div className="flex items-center justify-center h-full">
                        <div className="text-8xl">🤝</div>
                      </div>
                    }
                    backTitle="Agreeableness Aspects"
                    backContent={
                      <p className="text-sm">
                        <strong>Compassion:</strong> Empathy, warmth<br />
                        <strong>Politeness:</strong> Respect, conflict avoidance
                      </p>
                    }
                  />
                  <FlipCard
                    frontTitle="Neuroticism"
                    frontContent={
                      <div className="flex items-center justify-center h-full">
                        <div className="text-8xl">🌊</div>
                      </div>
                    }
                    backTitle="Neuroticism Aspects"
                    backContent={
                      <p className="text-sm">
                        <strong>Volatility:</strong> Emotional reactivity<br />
                        <strong>Withdrawal:</strong> Anxiety, social avoidance
                      </p>
                    }
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-brand-orange">Key Sales Problems by Aspect</h3>
                <p className="text-sm text-muted-foreground">Both extremes of each aspect create distinct sales challenges</p>
                
                <div className="space-y-6">
                  {/* Agreeableness */}
                  <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                    <h4 className="text-xl font-semibold text-brand-green mb-4">Agreeableness</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Compassion</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={compassionLevel}
                              onValueChange={setCompassionLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {compassionLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Compassion:</strong>
                                <p className="mt-1">Comes across as cold, dismisses prospect concerns, damages rapport</p>
                              </div>
                            ) : compassionLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Compassion:</strong>
                                <p className="mt-1">Balanced empathy and directness, builds rapport while maintaining boundaries</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Compassion:</strong>
                                <p className="mt-1">Avoids conflict, struggles to say "no," fears pushing prospects</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Politeness</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={politenessLevel}
                              onValueChange={setPolitenessLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {politenessLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Politeness:</strong>
                                <p className="mt-1">Blunt delivery alienates prospects, creates unnecessary tension</p>
                              </div>
                            ) : politenessLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Politeness:</strong>
                                <p className="mt-1">Respectful yet direct, maintains professionalism while being assertive</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Politeness:</strong>
                                <p className="mt-1">Accepts "maybe," tolerates disrespect, avoids directness</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Conscientiousness */}
                  <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                    <h4 className="text-xl font-semibold text-brand-green mb-4">Conscientiousness</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Industriousness</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={industriousnessLevel}
                              onValueChange={setIndustriousnessLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {industriousnessLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Industriousness:</strong>
                                <p className="mt-1">Inconsistent prospecting, unreliable follow-up</p>
                              </div>
                            ) : industriousnessLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Industriousness:</strong>
                                <p className="mt-1">Balanced work ethic, sustainable effort with strategic focus</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Industriousness:</strong>
                                <p className="mt-1">Overworks without strategy, burns out team members</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Orderliness</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={orderlinessLevel}
                              onValueChange={setOrderlinessLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {orderlinessLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Orderliness:</strong>
                                <p className="mt-1">Disorganized pipeline, missed follow-ups, sloppy CRM</p>
                              </div>
                            ) : orderlinessLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Orderliness:</strong>
                                <p className="mt-1">Organized yet flexible, maintains structure without perfectionism</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Orderliness:</strong>
                                <p className="mt-1">Over-preparation, perfectionism blocks action</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Extraversion */}
                  <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                    <h4 className="text-xl font-semibold text-brand-green mb-4">Extraversion</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Enthusiasm</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={enthusiasmLevel}
                              onValueChange={setEnthusiasmLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {enthusiasmLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Enthusiasm:</strong>
                                <p className="mt-1">Flat delivery, fails to build excitement, low engagement</p>
                              </div>
                            ) : enthusiasmLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Enthusiasm:</strong>
                                <p className="mt-1">Balanced energy, engaging without overwhelming prospects</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Enthusiasm:</strong>
                                <p className="mt-1">Talks too much, oversells, burns trust with excessive energy</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Assertiveness</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={assertivenessLevel}
                              onValueChange={setAssertivenessLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {assertivenessLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Assertiveness:</strong>
                                <p className="mt-1">Weak control of conversation, gets walked over by prospects</p>
                              </div>
                            ) : assertivenessLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Assertiveness:</strong>
                                <p className="mt-1">Confident yet respectful, guides conversations without dominating</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Assertiveness:</strong>
                                <p className="mt-1">Pushiness creates resistance, dominates instead of listens</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Openness */}
                  <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                    <h4 className="text-xl font-semibold text-brand-green mb-4">Openness</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Intellect</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={intellectLevel}
                              onValueChange={setIntellectLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {intellectLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Intellect:</strong>
                                <p className="mt-1">Misses nuance, struggles with complex deals, shallow discovery</p>
                              </div>
                            ) : intellectLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Intellect:</strong>
                                <p className="mt-1">Analytical yet action-oriented, asks thoughtful questions without overthinking</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Intellect:</strong>
                                <p className="mt-1">Overthinks objections, analyzes instead of asks</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Openness to Experience</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={opennessToExperienceLevel}
                              onValueChange={setOpennessToExperienceLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {opennessToExperienceLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Openness to Experience:</strong>
                                <p className="mt-1">Rigid scripts, resists adaptation, struggles with objections</p>
                              </div>
                            ) : opennessToExperienceLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Openness to Experience:</strong>
                                <p className="mt-1">Flexible yet consistent, adapts strategies while maintaining core methodology</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Openness to Experience:</strong>
                                <p className="mt-1">Too many ideas, constant strategy shifts, inconsistent execution</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Neuroticism */}
                  <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                    <h4 className="text-xl font-semibold text-brand-green mb-4">Neuroticism</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Volatility</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={volatilityLevel}
                              onValueChange={setVolatilityLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {volatilityLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Volatility:</strong>
                                <p className="mt-1">May lack urgency, doesn't respond to competitive threats</p>
                              </div>
                            ) : volatilityLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Volatility:</strong>
                                <p className="mt-1">Emotionally stable with appropriate urgency, responds calmly to challenges</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Volatility:</strong>
                                <p className="mt-1">Emotional spikes, takes rejection personally, defensive reactions</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-brand-orange mb-4">Withdrawal</h5>
                        <div className="space-y-4">
                          <div className="px-4">
                            <Slider
                              value={withdrawalLevel}
                              onValueChange={setWithdrawalLevel}
                              min={0}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white rounded-lg shadow-sm min-h-[80px]">
                            {withdrawalLevel[0] < 33 ? (
                              <div>
                                <strong className="text-black">Low Withdrawal:</strong>
                                <p className="mt-1">May push too hard after rejection, doesn't respect boundaries</p>
                              </div>
                            ) : withdrawalLevel[0] < 67 ? (
                              <div>
                                <strong className="text-black">Medium Withdrawal:</strong>
                                <p className="mt-1">Confident outreach with respect for boundaries, handles rejection constructively</p>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-black">High Withdrawal:</strong>
                                <p className="mt-1">Avoids outreach due to fear, inconsistent pipeline building</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 2: The Swiftcourse Overcoming Framework */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="swiftcourse-framework">
              <h2 className="text-3xl font-bold text-brand-green">The Swiftcourse Overcoming Framework</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3 text-brand-orange">Core Philosophy</h3>
                <p className="text-lg leading-relaxed">
                  Your personality traits create tendencies, not destiny. The Swiftcourse framework gives you a systematic method to override unproductive impulses with disciplined execution.
                </p>
              </Card>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-brand-green">The Three-Part System</h3>

                {/* Part 1: Self-Awareness */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-brand-green">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-brand-green mb-3">Self-Awareness</h4>
                      <p className="text-lg mb-4">Identify your Big 10 tendencies</p>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <p className="font-semibold mb-2">Ask: "Where am I predictable?"</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Understanding your personality tendencies is the first step toward overriding them. Each aspect of the Big 10 creates predictable behavioral patterns that can undermine sales effectiveness:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• <strong>High Compassion:</strong> Consistently avoids conflict situations, struggles to deliver direct feedback, and hesitates to ask commitment questions that might create tension</li>
                          <li>• <strong>High Assertiveness:</strong> Dominates conversations, interrupts prospects mid-sentence, and provides excessive information before understanding needs</li>
                          <li>• <strong>Low Withdrawal:</strong> Pursues prospects aggressively after rejection, fails to recognize disengagement signals, and continues pitching beyond appropriate boundaries</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-brand-orange">Tools for Self-Assessment:</p>
                        <ul className="space-y-2 ml-4">
                          <li>• Self-assessment questionnaire</li>
                          <li>• Peer feedback sessions</li>
                          <li>• Call recording pattern analysis</li>
                          <li>• Manager observations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Part 2: Camp Systems */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-brand-orange">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-brand-orange mb-3">Jim Camp Systems</h4>
                      <p className="text-lg mb-4">Structure and discipline to override personality defaults</p>
                      
                      <div className="bg-gradient-to-br from-brand-green/5 to-brand-orange/5 p-4 rounded-lg mb-4">
                        <p className="font-semibold mb-2">Core Principles:</p>
                        <ul className="space-y-1 text-sm">
                          <li>• Mission first, ego last</li>
                          <li>• "No" leads to safety and truth</li>
                          <li>• Emotional detachment</li>
                          <li>• Checklist thinking</li>
                          <li>• Clear boundaries</li>
                          <li>• Never seek approval</li>
                        </ul>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-3">Example Application:</p>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-semibold text-foreground mb-1">Personality Tendency</p>
                            <p className="text-muted-foreground">
                              Sales representative with high compassion consistently avoids asking for explicit commitments, fearing that direct questions will damage rapport or create discomfort for the prospect.
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Camp System Override</p>
                            <p className="text-muted-foreground">
                              By adopting Camp's mission-first mindset, the representative reframes commitment questions as a service to the prospect rather than a personal imposition. The "No" framework provides psychological safety—understanding that "no" reveals truth and protects both parties from wasted time. This systematic approach enables the representative to ask direct commitment questions ("Are you prepared to move forward with next steps?") without experiencing guilt or emotional discomfort.
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Behavioral Outcome</p>
                            <p className="text-muted-foreground">
                              Clear timelines, defined next steps, and qualified pipeline opportunities replace vague follow-ups and stalled deals.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Part 3: Voss Tools */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-brand-green">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-brand-green mb-3">Chris Voss Tools</h4>
                      <p className="text-lg mb-4">Emotional control techniques for real-time regulation</p>
                      
                      <div className="bg-gradient-to-br from-brand-green/5 to-brand-orange/5 p-4 rounded-lg mb-4">
                        <p className="font-semibold mb-2">Core Techniques:</p>
                        <ul className="space-y-1 text-sm">
                          <li>• Label the emotion</li>
                          <li>• Mirror to slow conversation</li>
                          <li>• Calibrated questions</li>
                          <li>• Accusation audits</li>
                          <li>• Late-night FM DJ tone</li>
                          <li>• Tactical empathy</li>
                        </ul>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-3">Example Application:</p>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-semibold text-foreground mb-1">Personality Tendency</p>
                            <p className="text-muted-foreground">
                              Sales representative with high enthusiasm oversells solutions prematurely, dominates conversations with excessive information, and fails to create space for prospect input. The representative's natural energy, while initially engaging, ultimately prevents effective discovery and relationship building.
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Voss Tool Override</p>
                            <p className="text-muted-foreground">
                              Voss's mirroring technique (repeating the last 1-3 words of what the prospect says) forces the representative to pause and listen before responding. When combined with labeling their own excitement ("It sounds like I'm getting ahead of myself" or "You might be thinking I'm pushing too hard"), the representative creates self-awareness in real-time. These techniques physiologically slow down the conversation pace, redirect attention to the prospect's words, and create psychological space for the prospect to expand on their thoughts without feeling overwhelmed.
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Behavioral Outcome</p>
                            <p className="text-muted-foreground">
                              Balanced conversation dynamics, deeper discovery insights, and stronger prospect engagement replace one-sided presentations and premature pitching.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Key Integration Points */}
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-4 text-brand-orange">How The Three Parts Work Together</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-brand-green font-bold">→</span>
                    <p><strong>Self-Awareness</strong> identifies the specific tendency you need to override</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-green font-bold">→</span>
                    <p><strong>Camp Systems</strong> provide the structural discipline and framework to counter the tendency</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-green font-bold">→</span>
                    <p><strong>Voss Tools</strong> give you real-time emotional control techniques to execute in the moment</p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 3: Extraversion Aspects */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="extraversion">
              <h2 className="text-3xl font-bold text-brand-green">Extraversion: Assertiveness & Enthusiasm</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Understanding Extraversion in Sales</h3>
                <p className="text-lg leading-relaxed">
                  Extraversion encompasses two distinct behavioral dimensions: Assertiveness (dominance, influence, and control) and Enthusiasm (positive emotion, sociability, and energy). Both aspects create predictable sales challenges at their extremes, requiring systematic intervention to achieve optimal performance.
                </p>
              </Card>

              {/* Assertiveness Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Assertiveness</h3>
                
                {/* High Assertiveness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Assertiveness: Dominance & Control</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high assertiveness naturally seek to control conversation direction, interrupt prospects to redirect dialogue, and push their agenda forward aggressively. They experience discomfort when prospects maintain conversational control and interpret silence as an opportunity to fill space with their own perspective.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Creates defensive prospect behavior and resistance</li>
                        <li>• Prevents discovery of true needs and pain points</li>
                        <li>• Damages rapport through perceived disrespect</li>
                        <li>• Generates premature objections before value is established</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> "No"-oriented questions transfer control to prospect while maintaining structure. Mission-first mindset reframes listening as strategic advantage rather than weakness.</li>
                        <li>• <strong>Voss:</strong> Mirroring (repeating last 1-3 words) forces pause before responding. Calibrated questions ("How am I supposed to do that?") give prospect perception of control while guiding conversation.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Mandatory Pause Protocol</p>
                        <p className="text-sm mb-2">Implement 2-second pause after every prospect statement before responding. Use physical cue (count fingers under desk) to enforce discipline.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Every conversation for 30 days</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Mirror Quota</p>
                        <p className="text-sm mb-2">Execute minimum 10 mirroring statements per roleplay session. Track count explicitly. Focus on mirroring prospect's last 3 words with upward inflection.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Daily roleplay (15 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Question-Only Discovery</p>
                        <p className="text-sm mb-2">Conduct 10-minute discovery sessions using only questions. Zero statements about your solution. Partner provides feedback on any violations.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 3x per week</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Assertiveness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Assertiveness: Passivity & Deference</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low assertiveness defer to prospect control, hesitate to challenge objections, and avoid directing conversation toward close. They accept prospect timeline without pushing, rationalize "maybe" as acceptable response, and fail to establish authority positioning.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Loses control to dominant prospects who waste time</li>
                        <li>• Fails to qualify properly, creating bloated pipeline</li>
                        <li>• Allows prospects to delay indefinitely without consequence</li>
                        <li>• Undermines perceived expertise and value</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> Mission clarity provides permission to be direct. Boundary-setting protocols (clear next steps, defined timelines) create structure independent of personality comfort.</li>
                        <li>• <strong>Voss:</strong> Accusation audits ("You probably think I'm being too direct...") preempt fear of prospect reaction. Labeling ("It seems like you're not fully committed") forces clarity without aggression.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Commitment Question Mandate</p>
                        <p className="text-sm mb-2">Ask 3 direct commitment questions per call using scripted language: "Are you prepared to move forward if this solves [problem]?" Track completion in CRM.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Every prospect conversation</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Boundary Assertion Practice</p>
                        <p className="text-sm mb-2">Roleplay ending calls that lack clear next steps. Practice phrase: "I need to understand if this is a priority. If not, let's revisit when timing aligns." Record and review for tone.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 2x per week</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Accusation Audit Script</p>
                        <p className="text-sm mb-2">Begin 5 conversations with preemptive accusation audit: "You might think I'm being too direct, but I want to respect your time..." Track comfort level progression.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 5x per week</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Enthusiasm Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Enthusiasm</h3>
                
                {/* High Enthusiasm */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Enthusiasm: Excessive Energy & Overselling</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high enthusiasm dominate airtime with excessive talking, pitch solutions before understanding needs, and display energy levels that overwhelm prospects. They experience difficulty tolerating silence, interrupt with excitement, and conflate activity with productivity.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Burns trust through premature pitching before discovery</li>
                        <li>• Creates information overload that prevents decision-making</li>
                        <li>• Misses buying signals due to talking over prospect</li>
                        <li>• Generates fatigue in prospects during extended interactions</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> Checklist discipline constrains enthusiasm within productive parameters. Mission-before-ego framework redirects energy toward prospect needs rather than representative excitement.</li>
                        <li>• <strong>Voss:</strong> Labeling own excitement ("It sounds like I'm getting ahead of myself") creates self-awareness. Strategic silence after questions forces listening behavior.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Two-Sentence Maximum</p>
                        <p className="text-sm mb-2">Limit all responses to 2 sentences maximum before asking another question. Partner counts sentences and signals violations. Build tolerance for prospect-controlled pacing.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Every roleplay session (20 minutes daily)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: "Stop Selling" Protocol</p>
                        <p className="text-sm mb-2">Conduct 5-minute conversations with zero mention of product/solution. Pure discovery questions only. Record and analyze talk-to-listen ratio (target: 30% talk / 70% listen).</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 3x per week</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Excitement Labeling Practice</p>
                        <p className="text-sm mb-2">When energy rises, immediately label it: "I'm getting excited about this, but let me slow down—what matters to you?" Practice 10 times in roleplay before deploying live.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Daily until automatic</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Enthusiasm */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Enthusiasm: Flat Affect & Low Energy</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low enthusiasm deliver information with minimal energy variation, struggle to generate prospect excitement, and display muted emotional responses. They fail to match prospect energy levels, present features without compelling delivery, and create monotonous interaction patterns.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Fails to build emotional connection and rapport</li>
                        <li>• Projects lack of confidence in product value</li>
                        <li>• Creates perception of disinterest or boredom</li>
                        <li>• Misses opportunities to amplify prospect excitement</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> Mission clarity provides authentic energy source independent of personality. Focus on prospect outcome creates genuine engagement that reads as enthusiasm.</li>
                        <li>• <strong>Voss:</strong> Tactical empathy and mirroring prospect energy creates perceived warmth. Late-night FM DJ voice (calm, warm tone) substitutes warmth for high energy.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Vocal Variation Practice</p>
                        <p className="text-sm mb-2">Record yourself reading discovery questions with three different energy levels (low, medium, high). Get feedback from team on which sounds most engaging. Practice high energy version 10 times daily.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Daily warm-up (5 minutes before calls)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Energy Matching Exercise</p>
                        <p className="text-sm mb-2">In roleplay, partner delivers statements at varying energy levels. Practice matching their energy within 10% (partner scores). Build capacity to flex energy up/down on demand.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 2x per week (15 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Positive Outcome Visualization</p>
                        <p className="text-sm mb-2">Before each call, spend 30 seconds visualizing positive impact your solution creates for prospect. Let that generate authentic energy. Track whether this improves engagement ratings.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Before every prospect conversation</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 4: Agreeableness Aspects */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="agreeableness">
              <h2 className="text-3xl font-bold text-brand-green">Agreeableness: Compassion & Politeness</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Understanding Agreeableness in Sales</h3>
                <p className="text-lg leading-relaxed">
                  Agreeableness encompasses two distinct behavioral dimensions: Compassion (empathy, warmth, and concern for others) and Politeness (respect, conflict avoidance, and deference). Both aspects create predictable sales challenges at their extremes, requiring systematic intervention to balance relationship building with commercial effectiveness.
                </p>
              </Card>

              {/* Compassion Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Compassion</h3>
                
                {/* High Compassion */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Compassion: Excessive Empathy & Conflict Avoidance</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high compassion prioritize prospect comfort above deal progression, internalize prospect stress as personal responsibility, and experience genuine emotional distress when creating tension. They avoid asking commitment questions that might generate discomfort, rationalize prospect delays to protect feelings, and struggle to maintain commercial boundaries when prospects express difficulties.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Creates vague timelines and weak follow-up cadences</li>
                        <li>• Fails to qualify properly, carrying unviable prospects</li>
                        <li>• Avoids necessary tension that reveals true objections</li>
                        <li>• Accepts "thinking it over" without establishing decision criteria</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> "No" framework reframes rejection as productive clarity, removing emotional burden from commitment questions. Mission-first mindset positions directness as service to prospect, not selfishness.</li>
                        <li>• <strong>Voss:</strong> Labeling techniques soften direct questions ("You might feel I'm pushing too hard...") while maintaining commercial discipline. Tactical empathy demonstrates care without sacrificing deal control.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Commitment Question Quota</p>
                        <p className="text-sm mb-2">Ask minimum 3 direct commitment questions per prospect conversation using scripted language: "Are you prepared to move forward if we solve [specific problem]?" Track completion in CRM notes field.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Every prospect interaction</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Tension Tolerance Exercise</p>
                        <p className="text-sm mb-2">Practice phrase: "Is now a bad time to push on this, or should we be direct?" in roleplay. Sit through 10 seconds of silence after asking. Build comfort with prospect discomfort.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 3x per week (15 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: "No" Reframing Practice</p>
                        <p className="text-sm mb-2">After each prospect declines, immediately write: "This 'no' protected both of us from [specific waste]." Train brain to associate rejection with value protection, not failure.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> After every declined opportunity</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Compassion */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Compassion: Emotional Detachment & Dismissiveness</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low compassion minimize prospect emotional concerns, dismiss objections as irrational without exploring underlying needs, and display limited patience for prospect uncertainty. They prioritize efficiency over rapport building, view emotional discussions as time-wasting, and fail to recognize when prospects need emotional validation before logical progression.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Comes across as cold or uncaring, damaging rapport</li>
                        <li>• Misses emotional objections that block deals</li>
                        <li>• Creates defensive prospect behavior through dismissiveness</li>
                        <li>• Fails to build trust necessary for complex sales</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> Mission clarity includes understanding prospect worldview as strategic requirement, not optional courtesy. Recognizing emotional needs becomes commercial intelligence, not empathy.</li>
                        <li>• <strong>Voss:</strong> Tactical empathy provides formula for demonstrating understanding without requiring genuine emotional connection. Labeling and mirroring create perception of care through technique.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Emotional Label Requirement</p>
                        <p className="text-sm mb-2">Execute 5 emotional labels per conversation: "It seems like [emotion] is affecting your timeline..." Record labels in post-call notes. Focus on accuracy, not authenticity of feeling.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Every prospect conversation</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Concern Exploration Protocol</p>
                        <p className="text-sm mb-2">When prospect raises concern, ask 3 follow-up questions before responding: "Tell me more about that... What specifically worries you... How does that impact you?" Practice in roleplay first.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 3x per week (20 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Warmth Tone Practice</p>
                        <p className="text-sm mb-2">Record yourself delivering discovery questions in three tones: clinical, neutral, warm. Get team feedback on which sounds most empathetic. Practice warm tone 10 times daily before live calls.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Daily warm-up (5 minutes)</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Politeness Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Politeness</h3>
                
                {/* High Politeness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Politeness: Excessive Deference & Conflict Avoidance</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high politeness accept prospect disrespect without pushback, tolerate "maybe" responses without clarification, and avoid challenging prospect statements that contradict reality. They prioritize maintaining pleasant interactions over deal clarity, rationalize poor prospect behavior to preserve relationship, and fail to establish boundaries when prospects waste time or violate commitments.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Gets manipulated by prospects exploiting politeness</li>
                        <li>• Carries dead deals due to inability to challenge "maybe"</li>
                        <li>• Tolerates disrespectful behavior that signals low intent</li>
                        <li>• Fails to establish authority positioning necessary for complex sales</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> Boundary protocols provide permission for directness. Mission clarity positions challenging prospects as obligation, not rudeness. Clear next-step requirements become non-negotiable regardless of comfort.</li>
                        <li>• <strong>Voss:</strong> Accusation audits preempt fear of offending: "You might think I'm being too direct..." Labels neutralize prospect defensiveness while maintaining commercial discipline.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Accusation Audit Opening</p>
                        <p className="text-sm mb-2">Begin every roleplay with preemptive accusation audit: "You might think I'm being too direct, but I want to respect your time by getting clarity..." Practice until automatic before live deployment.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Daily roleplay (10 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: "Maybe" Challenge Protocol</p>
                        <p className="text-sm mb-2">When prospect says "maybe," immediately respond: "Let's slow down—what's the real issue here? What specifically needs to change for this to be a 'yes' or 'no'?" Practice 10 times in roleplay.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 3x per week (15 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Boundary Statement Practice</p>
                        <p className="text-sm mb-2">Practice ending unproductive calls: "I need to understand if this is a priority now. If not, let's reconnect when timing aligns." Record and score for assertiveness without aggression.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 2x per week (20 minutes)</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Politeness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Politeness: Bluntness & Disregard for Social Norms</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low politeness deliver feedback without softening language, challenge prospects aggressively without building safety, and dismiss social conventions that slow commercial progress. They prioritize directness over relationship maintenance, interpret politeness as weakness, and create unnecessary tension through abrasive communication style.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Alienates prospects through unnecessarily harsh delivery</li>
                        <li>• Creates defensiveness that blocks information sharing</li>
                        <li>• Damages long-term relationships with blunt communication</li>
                        <li>• Generates negative word-of-mouth from offended prospects</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp:</strong> Mission clarity includes protecting long-term relationship as commercial asset. Recognizing social norms as strategic tools, not obstacles. Respect becomes tactical choice, not personality constraint.</li>
                        <li>• <strong>Voss:</strong> Late-night FM DJ voice provides formula for delivering directness with warmth. Labeling softens hard truths: "This might sound harsh, but..." creates receptivity to difficult messages.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Softening Language Exercise</p>
                        <p className="text-sm mb-2">Rewrite 10 blunt statements using softening phrases: "It seems like..." "Help me understand..." "What I'm hearing is..." Practice delivery with roleplay partner who scores politeness level.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> 3x per week (15 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Empathy Buffer Protocol</p>
                        <p className="text-sm mb-2">Before delivering hard truth, add empathy label: "I can see this timeline is frustrating. Let me be direct about what we're seeing..." Practice until automatic in roleplay.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Daily (10 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Tone Calibration Practice</p>
                        <p className="text-sm mb-2">Record delivery of challenging messages in three tones: harsh, neutral, warm-but-direct. Get team feedback on optimal balance. Practice warm-but-direct version 10 times before live calls.</p>
                        <p className="text-xs text-muted-foreground"><strong>Frequency:</strong> Daily warm-up (5 minutes)</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 5: Conscientiousness Aspects */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6" id="conscientiousness">
              <h2 className="text-3xl font-bold text-brand-green">Conscientiousness: Industriousness & Orderliness</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Understanding Conscientiousness in Sales</h3>
                <p className="text-lg leading-relaxed">
                  Conscientiousness encompasses two distinct behavioral dimensions: Industriousness (work ethic, persistence, and goal-directed behavior) and Orderliness (organization, structure, and attention to detail). Both aspects create predictable sales challenges at their extremes, requiring systematic intervention to balance activity with effectiveness and structure with execution speed.
                </p>
              </Card>

              {/* Industriousness Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Industriousness</h3>
                
                {/* High Industriousness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Industriousness: Overactivity Without Strategic Focus</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high industriousness equate activity with progress, maintain constant motion without strategic prioritization, and experience guilt during necessary reflection or planning time. They pursue volume metrics without quality assessment, resist downtime even when strategic thinking would improve outcomes, and struggle to distinguish productive activity from busywork that creates false sense of accomplishment.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Pursuing low-quality prospects to maintain activity levels instead of strategic targeting</li>
                        <li>• Exhaustion and burnout from unsustainable work patterns without recovery</li>
                        <li>• Missing high-value opportunities while executing low-value activities</li>
                        <li>• Poor work-life balance leading to decreased long-term performance and retention</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission clarity distinguishes productive activity from motion. "What moves this deal forward?" becomes filter for all activity. Work becomes mission-focused rather than activity-focused, eliminating guilt around strategic downtime.</li>
                        <li>• <strong>Voss Tool:</strong> Calibrated questions create built-in pause points: "What would need to happen for this to move forward?" forces strategic thinking. Quality conversations replace quantity of touches.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Strategic Priority Assessment</p>
                        <p className="text-sm mb-2">Each morning, list all planned activities. Score each 1-10 on deal progression impact. Eliminate bottom 50%. Track whether reduced activity increases conversion rates over 30 days.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Daily morning ritual (10 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Quality vs. Quantity Tracking</p>
                        <p className="text-sm mb-2">Create two-column log: Activity Count vs. Meaningful Conversations. Define "meaningful" as prospect sharing budget/authority/timeline information. Goal: Increase meaningful percentage while decreasing total activity.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Daily review (5 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Forced Downtime Protocol</p>
                        <p className="text-sm mb-2">Schedule 30-minute "strategic thinking blocks" with no execution allowed. Use time for deal analysis, pattern identification, or Camp mission refinement. Practice tolerating the discomfort of non-activity.</p>
                        <p className="text-xs text-muted-foreground">Frequency: 3x per week (30 minutes)</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Industriousness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Industriousness: Inconsistent Effort & Procrastination</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low industriousness delay prospecting activities until urgency forces action, experience difficulty maintaining consistent daily routines, and rationalize avoidance with quality-over-quantity arguments. They wait for motivation rather than executing systematically, allow pipeline to deplete before initiating outreach, and struggle with tasks requiring sustained effort without immediate reward.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Inconsistent pipeline generation creating feast-or-famine revenue patterns</li>
                        <li>• Last-minute scrambling when quota pressure increases, reducing deal quality</li>
                        <li>• Missed opportunities from delayed follow-up and slow response times</li>
                        <li>• Dependence on manager pressure rather than self-directed execution</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission-and-purpose framework removes motivation dependence. Checklist execution replaces emotional readiness. "Start Your Mission" becomes trigger phrase. Work becomes decision-independent activity.</li>
                        <li>• <strong>Voss Tool:</strong> Five-minute micro-commitments lower activation energy. "Just one mirror" or "Just one label" creates momentum. Small tactical wins build systematic execution patterns.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Non-Negotiable Minimum Protocol</p>
                        <p className="text-sm mb-2">Establish absolute minimum daily actions: 10 outreach touches, 3 follow-ups, 1 discovery call booked. Execute before any discretionary work. Track completion streak, aiming for 30-day consistency.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Daily minimum (45 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Implementation Intention Scripting</p>
                        <p className="text-sm mb-2">Write "When [time/trigger], I will [specific action]" statements. Example: "When I open laptop, I will send 5 outreach messages before checking email." Create 5 implementation intentions for key activities.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Weekly planning (15 minutes), daily execution</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Activation Energy Reduction</p>
                        <p className="text-sm mb-2">Pre-load tomorrow's first task: Open prospect list, draft first message, cue dialer. Eliminate all friction between intention and action. Time from sitting down to first action should be under 60 seconds.</p>
                        <p className="text-xs text-muted-foreground">Frequency: End-of-day ritual (5 minutes)</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Orderliness Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Orderliness</h3>
                
                {/* High Orderliness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Orderliness: Perfectionism & Analysis Paralysis</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high orderliness delay action until all information is gathered and organized, experience anxiety when initiating contact without comprehensive preparation, and create elaborate systems that become barriers to execution. They revise outreach messages repeatedly before sending, demand complete understanding before asking questions, and interpret incomplete preparation as unprofessional incompetence.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Delayed outreach while competitors engage prospects first</li>
                        <li>• Over-preparation creating rigid scripts that fail under real conditions</li>
                        <li>• Paralysis when prospect introduces unexpected information</li>
                        <li>• Reduced volume from excessive preparation time per interaction</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> "Start without the whole picture" becomes operational principle. Mission clarity replaces comprehensive preparation. Recognize preparation beyond core mission as avoidance. Action generates information faster than research.</li>
                        <li>• <strong>Voss Tool:</strong> Calibrated questions eliminate need for perfect preparation: "What challenges are you facing?" discovers information rather than requiring it upfront. Discovery replaces prediction.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Imperfect Action Protocol</p>
                        <p className="text-sm mb-2">Set 5-minute timer for preparation. When timer ends, execute regardless of readiness level. Send 10 "imperfect" messages daily. Track whether preparation level correlates with response rates (it won't).</p>
                        <p className="text-xs text-muted-foreground">Frequency: Daily (10 messages, 15 minutes total)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Discovery-First Approach</p>
                        <p className="text-sm mb-2">Enter every call with only 3 prepared calibrated questions. Ban research beyond company name and prospect title. Practice asking "What should I know about your situation?" within first 2 minutes.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every prospect call</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Preparation Time Limits</p>
                        <p className="text-sm mb-2">Establish maximum preparation times: Cold outreach (2 minutes), discovery call (5 minutes), demo (10 minutes). Set visible timer. Practice tolerating discomfort of incomplete preparation while maintaining professional competence.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Before every sales activity</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Orderliness */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Orderliness: Disorganization & Inconsistent Execution</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low orderliness lose track of follow-up commitments, operate without systematic processes for deal progression, and tolerate chaos in CRM and prospect tracking. They rely on memory rather than documentation, miss scheduled calls due to poor calendar management, and improvise approach for each prospect without repeatable methodology.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Lost deals from forgotten follow-ups and missed commitments</li>
                        <li>• Inconsistent messaging creating confusion across buying committee</li>
                        <li>• Inability to scale successful approaches due to lack of documentation</li>
                        <li>• Damaged credibility when forgetting previous conversations or commitments</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission-and-purpose checklist becomes external organizing structure. One simple checklist for every deal stage. System replaces memory. "What's the next mission step?" provides clarity in chaos.</li>
                        <li>• <strong>Voss Tool:</strong> Summary technique creates forced documentation: "Let me make sure I have this right..." restates commitments and next steps. Labeling creates mental bookmarks: "Sounds like we agreed to three things..."</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Universal Checklist Implementation</p>
                        <p className="text-sm mb-2">Create single-page checklist for each deal stage (Prospecting, Discovery, Demo, Proposal, Close). Use same checklist for every deal. Check off items in real-time. Never deviate from checklist sequence.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every deal interaction</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Immediate Documentation Protocol</p>
                        <p className="text-sm mb-2">Establish rule: No task switching until current interaction is documented. After every call, 2-minute summary: What happened, what's next, when's follow-up. Calendar entry created before leaving desk.</p>
                        <p className="text-xs text-muted-foreground">Frequency: After every prospect interaction (2 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: End-of-Call Summary Technique</p>
                        <p className="text-sm mb-2">Practice Voss summary: "So it seems like we've agreed to [X], and the next step is [Y] by [date]. Is that accurate?" Get verbal confirmation. Creates mutual accountability and forces organization.</p>
                        <p className="text-xs text-muted-foreground">Frequency: End of every call with commitments</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 6: Openness Aspects */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="openness">
              <h2 className="text-3xl font-bold text-brand-green">Openness: Intellect and Openness to Experience</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Understanding Openness in Sales</h3>
                <p className="text-lg leading-relaxed">
                  Openness encompasses two distinct behavioral dimensions: Intellect (abstract thinking, idea generation, and analytical complexity) and Openness to Experience (novelty-seeking, experimentation, and comfort with ambiguity). Both aspects create predictable sales challenges at their extremes, requiring systematic intervention to balance innovation with execution and curiosity with consistency.
                </p>
              </Card>

              {/* Intellect Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Intellect</h3>
                
                {/* High Intellect */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Intellect: Overanalysis & Complexity Addiction</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high intellect overthink prospect objections instead of using calibrated questions, create elaborate theories about buyer psychology rather than testing assumptions, and intellectualize emotional dynamics instead of responding tactically. They prioritize being interesting over being effective, craft complex explanations when simple questions would suffice, and experience discomfort with straightforward tactical execution that feels "too simple" for their cognitive capacity.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Analysis paralysis extending sales cycles while competitors close deals</li>
                        <li>• Talking past prospects with sophisticated concepts instead of discovering needs</li>
                        <li>• Delayed response time while mentally processing "optimal" answers</li>
                        <li>• Overcomplicating simple objections with theoretical frameworks</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission-and-purpose framework replaces analysis with action. "Stick to the mission" becomes mantra. Intellectual curiosity redirected toward mission execution rather than problem theorizing. Complexity serves mission, not ego.</li>
                        <li>• <strong>Voss Tool:</strong> Mirroring forces listening over thinking. Three-word mirror eliminates space for elaborate analysis: "So you're saying?" Simple tactical repetition replaces complex interpretation.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Question Replacement Protocol</p>
                        <p className="text-sm mb-2">When tempted to explain or analyze, pause and deploy calibrated question instead. Track every instance where explanation impulse emerges. Replace with: "Help me understand..." or "What makes you say that?" Log replacement count daily.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every prospect interaction, review daily (10 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Mirror Over Analysis</p>
                        <p className="text-sm mb-2">When prospect makes statement, immediately mirror last 1-3 words with upward inflection instead of formulating elaborate response. Practice 10 mirrors per call. Silence after mirror becomes comfortable. Track thinking time reduction.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every call, with partner review 3x per week</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Simplicity Challenge</p>
                        <p className="text-sm mb-2">Before each call, identify 3 calibrated questions that capture all complexity in simple language. Ban multi-clause questions. Each question limited to 10 words maximum. Practice with accountability partner who scores simplicity.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Pre-call ritual, every prospect interaction</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Intellect */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Intellect: Surface-Level Understanding & Pattern Blindness</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low intellect struggle to identify patterns across deals, miss subtle objection signals requiring deeper probing, and fail to connect prospect statements to underlying concerns. They accept surface-level answers without curiosity, repeat identical approaches despite negative outcomes, and experience difficulty adapting tactics when situational complexity increases beyond simple scripts.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Missing hidden objections that remain unaddressed until late-stage deal collapse</li>
                        <li>• Inability to read between lines when prospects provide indirect signals</li>
                        <li>• Failed pattern recognition preventing learning from successful/failed approaches</li>
                        <li>• Struggles with sophisticated buyers requiring nuanced conversation</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission-and-purpose checklist provides external structure for pattern recognition. Pre-defined decision points identify when deeper probing required. System substitutes for intuitive pattern detection.</li>
                        <li>• <strong>Voss Tool:</strong> Labeling forces observation of emotional patterns: "It seems like..." "It sounds like..." "It looks like..." Structured emotional detection replaces intuitive reading. Formula creates synthetic pattern awareness.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Label Every Emotion</p>
                        <p className="text-sm mb-2">Use 5 emotion labels per call: "It seems like you're concerned about..." Practice identifying prospect tone, word choice, pacing changes. Create label library: frustrated, uncertain, skeptical, pressured, conflicted. Force systematic observation.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every call, log and review weekly</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Post-Call Pattern Analysis</p>
                        <p className="text-sm mb-2">After each call, answer 3 questions: What objection appeared? What emotion was present? What similar pattern did I see before? Build pattern database. Review weekly with manager to identify recurring themes missed in real-time.</p>
                        <p className="text-xs text-muted-foreground">Frequency: After every call (5 minutes), weekly review (30 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Depth Questioning Protocol</p>
                        <p className="text-sm mb-2">When prospect gives simple answer, deploy mandatory follow-up: "Tell me more about that" or "What else?" Use 3-layer questioning: surface answer → first follow-up → second follow-up. Never accept first response as complete.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every prospect statement, track depth achieved per call</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Openness to Experience Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Openness to Experience</h3>
                
                {/* High Openness to Experience */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Openness to Experience: Novelty Addiction & Inconsistent Execution</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high openness to experience chase new techniques before mastering current ones, abandon working approaches for novel strategies, and experience boredom with repetitive but effective execution. They prioritize experimentation over optimization, resist standard processes as "limiting creativity," and constantly revise messaging, structure, and tactics instead of achieving systematic mastery through repetition.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Inconsistent performance from constant approach changes preventing skill mastery</li>
                        <li>• Inability to diagnose what works when variables change every interaction</li>
                        <li>• Decreased confidence from lack of proven repeatable methodology</li>
                        <li>• Pipeline unpredictability from experimental approach rather than systematic execution</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission clarity with single checklist becomes non-negotiable constraint. "One mission, one method" until mastery achieved. Novelty redirected toward prospect discovery, not process experimentation. Creativity serves mission execution, not personal stimulation.</li>
                        <li>• <strong>Voss Tool:</strong> Calibrated questions provide structured variety: same tactical framework applied to infinite prospect scenarios. Consistency in method creates sustainable novelty through prospect uniqueness rather than tactical variation.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: 30-Day Methodology Lock</p>
                        <p className="text-sm mb-2">Select single approach for prospecting, discovery, demo, close. Commit to zero deviation for 30 days. Document every temptation to experiment. Track metrics weekly. Only modify after 30-day baseline established. Treat boredom as signal of impending mastery.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Continuous 30-day blocks, log deviations daily</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Red Flag Deviation Tracking</p>
                        <p className="text-sm mb-2">Every time you deviate from established script, framework, or sequence, mark it red in CRM notes. Calculate deviation percentage weekly. Goal: Reduce deviation to under 10%. Use deviation log to identify novelty-seeking triggers.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Real-time during calls, weekly analysis (15 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Mastery Before Modification</p>
                        <p className="text-sm mb-2">Before adopting any new technique, demonstrate 80% success rate with current method across minimum 20 interactions. Create "mastery checklist" where each element requires documented proficiency. New techniques enter waitlist, not active practice.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Ongoing, review modification requests weekly with manager</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Openness to Experience */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Openness to Experience: Rigidity & Adaptation Resistance</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low openness to experience resist new frameworks even when current approach fails consistently, experience discomfort with unfamiliar sales situations requiring improvisation, and maintain rigid scripts despite prospect signals requiring flexibility. They prioritize comfort over effectiveness, avoid learning new methodologies, and struggle when market conditions change or buyer sophistication increases beyond familiar patterns.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Declining performance when market shifts render old approaches ineffective</li>
                        <li>• Inability to adapt to sophisticated buyers requiring nuanced conversation</li>
                        <li>• Missed opportunities from script-bound responses when creativity required</li>
                        <li>• Resistance to coaching and new techniques limiting skill development</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission-and-purpose provides safe container for tactical flexibility. Clear mission creates security during method changes. "Start Your Mission" maintains continuity while allowing tactical adaptation. Purpose remains constant, methods evolve.</li>
                        <li>• <strong>Voss Tool:</strong> Calibrated questions offer structured flexibility: same question framework adapts to any scenario. Formula provides comfort ("How am I supposed to...?" "What would need to happen...?") while enabling situational variation.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Micro-Adaptation Practice</p>
                        <p className="text-sm mb-2">Introduce one small tactical variation per week: new opening line, different question sequence, alternative closing approach. Start micro, build gradually. Each change deployed for full week before assessment. Track comfort level and effectiveness separately.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Weekly new element introduction, daily execution</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Improvisation Training</p>
                        <p className="text-sm mb-2">Roleplay unusual prospect scenarios weekly: hostile buyer, technical expert, extreme time pressure. Practice deploying calibrated questions in unfamiliar contexts. Build comfort with uncertainty. Celebrate successful adaptation, not perfect execution.</p>
                        <p className="text-xs text-muted-foreground">Frequency: 2x per week with roleplay partner (20 minutes each)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Framework Switching Protocol</p>
                        <p className="text-sm mb-2">Learn one new Camp concept or Voss technique per month. Study for week one, practice in roleplay week two, deploy live weeks three-four. Manager validates understanding before live deployment. Build tactical library gradually.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Monthly new technique cycle, weekly check-ins</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 7: Neuroticism Aspects */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6" id="neuroticism">
              <h2 className="text-3xl font-bold text-brand-green">Neuroticism: Volatility and Withdrawal</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Understanding Neuroticism in Sales</h3>
                <p className="text-lg leading-relaxed">
                  Neuroticism encompasses two distinct behavioral dimensions: Volatility (emotional reactivity, anger, frustration tolerance) and Withdrawal (anxiety, fear of negative evaluation, and avoidance). Both aspects create predictable sales challenges at their extremes, requiring systematic intervention to achieve emotional stability and consistent execution regardless of prospect behavior or rejection frequency.
                </p>
              </Card>

              {/* Volatility Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Volatility</h3>
                
                {/* High Volatility */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Volatility: Emotional Reactivity & Defensive Responses</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high volatility experience intense emotional spikes in response to prospect pushback, interpret objections as personal attacks requiring defense, and struggle to maintain composure when challenged. They react immediately to perceived disrespect, escalate tension when prospects show skepticism, and experience difficulty separating prospect behavior from self-worth. Emotional flooding impairs tactical execution during high-stakes moments.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Fighting with prospects instead of tactical probing when challenged</li>
                        <li>• Rushing through calls to escape emotional discomfort from tension</li>
                        <li>• Defensive explanations replacing calibrated questions when objections arise</li>
                        <li>• Inconsistent performance driven by emotional state rather than process discipline</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Emotional detachment from outcome becomes foundational principle. Mission serves as anchor during emotional flooding. "Detach from outcome, attach to mission" mantra creates psychological distance. Prospect rejection reflects their world, not representative's value.</li>
                        <li>• <strong>Voss Tool:</strong> Labeling own emotions creates meta-awareness: "It seems like I'm getting frustrated right now." External verbalization interrupts reactive loop. Pre-call emotional acknowledgment prevents mid-conversation flooding.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Real-Time Emotion Labeling</p>
                        <p className="text-sm mb-2">During every call where tension emerges, silently label your emotion: "I'm feeling defensive" or "I'm experiencing frustration." After call, journal emotion → trigger → tactical response that should have replaced reaction. Build pattern awareness.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every call with emotional activation, daily journal review (10 minutes)</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Detachment Breathing Protocol</p>
                        <p className="text-sm mb-2">When emotional spike detected, deploy 4-2-6 breathing: Inhale 4 counts, hold 2, exhale 6. Repeat 3 cycles before responding. Practice during roleplay until automatic during live calls. Breathing creates temporal space between stimulus and response.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Pre-call preparation (5 minutes), deploy during emotional activation</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Adversity Roleplay Desensitization</p>
                        <p className="text-sm mb-2">Practice with aggressive roleplay partner weekly: hostile tone, personal attacks, dismissive responses. Goal: Maintain tactical execution regardless of emotional provocation. Partner increases intensity gradually. Track composure maintenance across sessions.</p>
                        <p className="text-xs text-muted-foreground">Frequency: 2x per week (20 minutes each), escalating difficulty</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Volatility */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Volatility: Emotional Flatness & Disengagement</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low volatility maintain flat affect regardless of prospect engagement level, display minimal emotional variation that prospects interpret as disinterest, and struggle to generate interpersonal warmth that builds rapport. They remain calm but appear robotic, fail to match prospect energy appropriately, and experience difficulty conveying genuine enthusiasm when deals progress. Emotional stability becomes interpersonal coldness.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Prospects perceive lack of investment or care about their situation</li>
                        <li>• Failed rapport building from insufficient emotional mirroring</li>
                        <li>• Inability to convey excitement about solutions, reducing prospect enthusiasm</li>
                        <li>• Monotone delivery diminishing message impact and memorability</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission-and-purpose generates manufactured conviction. Clear mission provides emotional content when natural affect absent. "Start Your Mission" becomes emotional activation trigger. Purpose creates synthetic urgency replacing spontaneous emotion.</li>
                        <li>• <strong>Voss Tool:</strong> Late-night FM DJ voice provides formula for vocal warmth. Deliberate tone modulation creates perception of engagement. Labeling prospect emotions demonstrates care systematically: "It sounds like this timeline concerns you..." Formula replaces intuitive emotional expression.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Vocal Variety Exercise</p>
                        <p className="text-sm mb-2">Record calls and mark monotone segments. Practice same content with exaggerated vocal variation: speed changes, volume shifts, pitch modulation. Re-record and compare. Goal: Increase dynamic range by 30% while maintaining authenticity.</p>
                        <p className="text-xs text-muted-foreground">Frequency: 3x per week (15 minutes), before-after recording comparison</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Strategic Energy Matching</p>
                        <p className="text-sm mb-2">Assess prospect energy level early in call: low, medium, high. Deliberately match at 80% of their intensity. Practice in roleplay with partner who varies energy. Track whether prospects reciprocate increased warmth.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every call, weekly partner feedback session</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Enthusiasm Scripting</p>
                        <p className="text-sm mb-2">Pre-script 5 moments of manufactured enthusiasm per call: "I'm excited to explore this with you" "This could be really valuable for your team" "I appreciate you taking time for this." Deliver with elevated tone. Build emotional vocabulary.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Pre-call preparation, deploy during every interaction</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Withdrawal Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-orange">Withdrawal</h3>
                
                {/* High Withdrawal */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">High Withdrawal: Fear-Based Avoidance & Rejection Sensitivity</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with high withdrawal avoid prospecting activities due to anticipated rejection, ruminate on negative interactions for extended periods, and interpret "no" as personal failure rather than information. They delay outreach when fear peaks, create elaborate justifications for avoiding call blocks, and experience physical anxiety symptoms before prospecting sessions. Pipeline depletion follows anxiety cycles.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Inconsistent pipeline generation creating revenue volatility</li>
                        <li>• Avoidance of high-value targets perceived as more likely to reject</li>
                        <li>• Prolonged recovery periods after rejections reducing daily activity</li>
                        <li>• Self-sabotage through inadequate preparation justifying avoidance</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Reframe "no" as progress marker rather than rejection. Camp's "No-Oriented Questions" make rejection into tactical tool. "Is this a bad time?" gives permission for no, removing fear. Rejection becomes expected, desirable outcome advancing mission.</li>
                        <li>• <strong>Voss Tool:</strong> Micro-commitments through calibrated questions reduce stakes: "Would it be crazy if we spent two minutes on this?" Small requests lower rejection fear. Accusation audit preempts rejection: "You probably think this is a waste of time..."</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Rejection Exposure Therapy</p>
                        <p className="text-sm mb-2">Deliberately seek 10 "no" responses daily. Track rejection as success metric: "Today's goal: Get rejected 10 times." Celebrate each no. Build calluses through systematic exposure. Rejection becomes positive reinforcement rather than negative outcome.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Daily minimum (30 minutes), weekly reflection on fear reduction</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Micro-Dial Sprint Protocol</p>
                        <p className="text-sm mb-2">Execute 20 calls under 30 seconds each: "Quick question—is this a bad time?" Hang up after response. Goal: Reduce call significance, increase volume. Exposure without extended vulnerability. Track comfort increase over 30 days.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Daily warm-up (10 minutes), before main prospecting block</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Pre-Call Reframing Ritual</p>
                        <p className="text-sm mb-2">Before prospecting, verbalize Camp reframes: "No is information" "Rejection serves my mission" "Fear protects me from nothing real." Write daily affirmations. Build psychological armor through repetition. Replace fear narrative with mission narrative.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Pre-prospecting ritual (5 minutes), daily written affirmations</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Low Withdrawal */}
                <Card className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-brand-green">Low Withdrawal: Low Caution & Reckless Outreach</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Personality Tendency:</p>
                      <p className="text-sm text-muted-foreground">
                        Representatives with low withdrawal lack appropriate caution about prospect perception, execute outreach without considering timing or context appropriateness, and ignore signals that aggressive approach damages relationships. They over-contact without strategic spacing, push when prospects indicate need for space, and fail to recognize when persistence becomes harassment. Fearlessness becomes social blindness.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Sales Problems:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Damaged relationships from excessive contact frequency without value</li>
                        <li>• Negative brand reputation from pushy behavior</li>
                        <li>• Missed long-term opportunities from burning bridges with aggressive tactics</li>
                        <li>• Compliance issues from ignoring prospect boundaries and requests</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 rounded">
                      <p className="font-semibold mb-2">Systematic Override (Camp/Voss):</p>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Camp System:</strong> Mission clarity includes protecting long-term relationship value. "Never seek approval" doesn't mean ignore boundaries. Decision-based thinking requires prospect psychological safety. Checklist includes relationship health indicators alongside activity metrics.</li>
                        <li>• <strong>Voss Tool:</strong> Calibrated questions test temperature: "Is this still a priority for you?" "Would it make sense to reconnect in [timeframe]?" Accusation audit builds permission: "You probably think I'm being too pushy..." Creates space for honest feedback.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-3 text-brand-orange">Implementation Drills:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 1: Contact Cadence Discipline</p>
                        <p className="text-sm mb-2">Establish maximum contact frequency rules: No more than 3 touches per week without explicit permission. Use CRM to enforce spacing. Practice delayed gratification. Build systematic patience into outreach rhythm.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Ongoing CRM monitoring, weekly cadence audit</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 2: Temperature Check Protocol</p>
                        <p className="text-sm mb-2">Every third contact, include explicit temperature check: "Should I keep reaching out?" "Is this still valuable?" "Would you prefer I pause?" Record responses. Adjust cadence based on feedback. Build systematic sensitivity.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Every third contact point, log responses</p>
                      </div>
                      <div className="p-4 bg-muted rounded">
                        <p className="font-semibold mb-2">Drill 3: Value-Per-Touch Assessment</p>
                        <p className="text-sm mb-2">Before every outreach, answer: "What value am I providing this time?" Ban zero-value touches. Each contact must include insight, relevant content, or specific question. Build discipline around value creation.</p>
                        <p className="text-xs text-muted-foreground">Frequency: Pre-outreach ritual, every contact requires value justification</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

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
                <p className="text-lg font-semibold">Your people need practice, not theory.</p>
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
                <h3 className="text-xl font-semibold mb-4 text-brand-green">Weekly Drills</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Review 2 recorded calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Isolate trait patterns (Compassion, Orderliness, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Roleplay adversity scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
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

          {/* Section 9: Module Assessment */}
          {currentSectionIndex === 9 && (
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
                  {
                    id: "a",
                    text: "Fixed traits that limit performance",
                    isCorrect: false,
                    feedback: "Swiftcourse views traits as tendencies that can be managed, not fixed limitations.",
                  },
                  {
                    id: "b",
                    text: "Predictors of long-term success",
                    isCorrect: false,
                    feedback: "Traits predict tendencies but not ultimate success—systems determine success.",
                  },
                  {
                    id: "c",
                    text: "Tendencies that can be overridden with systems",
                    isCorrect: true,
                    feedback: "Correct! Swiftcourse treats personality traits as tendencies—not limitations. They can be overridden with disciplined systems from Camp and emotional-control tools from Voss.",
                  },
                  {
                    id: "d",
                    text: "Indicators of natural sales talent",
                    isCorrect: false,
                    feedback: "Traits indicate tendencies, but talent comes from applying systems consistently.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz1", correct)}
              />

              <MultipleChoice
                question="High Orderliness most commonly leads to which sales problem?"
                options={[
                  {
                    id: "a",
                    text: "Poor listening",
                    isCorrect: false,
                    feedback: "Poor listening is typically associated with high Enthusiasm, not Orderliness.",
                  },
                  {
                    id: "b",
                    text: "Analysis paralysis and over-preparation",
                    isCorrect: true,
                    feedback: "Correct! High Orderliness creates perfectionism, over-preparation, and fear of imperfect action, leading to analysis paralysis.",
                  },
                  {
                    id: "c",
                    text: "Overselling too early",
                    isCorrect: false,
                    feedback: "Overselling is typically linked to high Enthusiasm or low Politeness.",
                  },
                  {
                    id: "d",
                    text: "Aggressive pushiness",
                    isCorrect: false,
                    feedback: "Aggressive pushiness is more related to high Assertiveness or low Agreeableness.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz2", correct)}
              />

              <MultipleChoice
                question="Which Camp/Voss countermeasure best helps a highly volatile salesperson remain stable?"
                options={[
                  {
                    id: "a",
                    text: "Mirroring",
                    isCorrect: false,
                    feedback: "Mirroring helps with gathering information, but doesn't directly stabilize volatile emotions.",
                  },
                  {
                    id: "b",
                    text: "Detachment from the mission",
                    isCorrect: false,
                    feedback: "Detachment from the mission would undermine the negotiation—Camp teaches attachment to mission, detachment from outcome.",
                  },
                  {
                    id: "c",
                    text: "Tactical Empathy to focus only on customer needs",
                    isCorrect: true,
                    feedback: "Correct! Tactical empathy creates emotional stability by redirecting attention outward. When volatile sales representatives focus on understanding and labeling the prospect's emotions ('It seems like you're frustrated with your current solution'), their attention shifts from their own emotional reactions to the prospect's state. This external focus prevents the emotional flooding that triggers volatility. Combined with Camp's emotional detachment from outcomes and Voss's labeling techniques, tactical empathy transforms emotional reactivity into disciplined observation—the sales representative becomes a neutral diagnostician rather than a defensive participant.",
                  },
                  {
                    id: "d",
                    text: "Asking for the 'No'",
                    isCorrect: false,
                    feedback: "Asking for 'No' creates clarity but doesn't directly stabilize emotional volatility.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz3", correct)}
              />

              <MultipleChoice
                question="High Agreeableness–Compassion tends to create what behavioral pattern in sales?"
                options={[
                  {
                    id: "a",
                    text: "Talking too much",
                    isCorrect: false,
                    feedback: "Talking too much is associated with high Enthusiasm, not Compassion.",
                  },
                  {
                    id: "b",
                    text: "Avoiding necessary tension and commitment questions",
                    isCorrect: true,
                    feedback: "Correct! High Compassion leads to avoiding tension, fearing commitment questions, and struggling to push prospects when necessary.",
                  },
                  {
                    id: "c",
                    text: "Refusing to prepare",
                    isCorrect: false,
                    feedback: "Refusing to prepare is more related to low Industriousness or low Orderliness.",
                  },
                  {
                    id: "d",
                    text: "Oversimplifying objections",
                    isCorrect: false,
                    feedback: "Oversimplifying objections might be linked to low Intellect or high Enthusiasm.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz4", correct)}
              />

              <MultipleChoice
                question="Which tool helps counter high Enthusiasm and talking too much?"
                options={[
                  {
                    id: "a",
                    text: "Accusation Audit",
                    isCorrect: false,
                    feedback: "Accusation Audit addresses negative perceptions, not over-talking.",
                  },
                  {
                    id: "b",
                    text: "2-second pause + labeling yourself",
                    isCorrect: false,
                    feedback: "While pausing helps, the combination of tone and calibrated questions is more effective.",
                  },
                  {
                    id: "c",
                    text: "Late-night FM DJ tone and calibrated questions",
                    isCorrect: true,
                    feedback: "Correct! Late-night FM DJ tone—a slow, deliberate, calm vocal style—physiologically forces the rep to slow their speech rate and reduces their natural energy level. This tone makes rapid-fire talking physically difficult to maintain. Calibrated questions ('How am I supposed to do that?' 'What about this is important to you?') transfer conversational control to the prospect, requiring the rep to stop talking and listen. Together, these tools create structural pauses that interrupt the enthusiasm-driven monologue pattern. The rep cannot simultaneously deliver calibrated questions and dominate airtime—the format itself enforces listening discipline.",
                  },
                  {
                    id: "d",
                    text: "Boundary statements",
                    isCorrect: false,
                    feedback: "Boundary statements set limits but don't directly counter over-talking.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz5", correct)}
              />

              <MultipleChoice
                question="Low Industriousness most often results in:"
                options={[
                  {
                    id: "a",
                    text: "Too many ideas",
                    isCorrect: false,
                    feedback: "Too many ideas is more associated with high Openness or Intellect.",
                  },
                  {
                    id: "b",
                    text: "Inconsistent prospecting activity",
                    isCorrect: true,
                    feedback: "Correct! Low Industriousness creates inconsistent work patterns and prospecting activity.",
                  },
                  {
                    id: "c",
                    text: "Overthinking objections",
                    isCorrect: false,
                    feedback: "Overthinking objections is linked to high Intellect or high Orderliness.",
                  },
                  {
                    id: "d",
                    text: "Overselling without listening",
                    isCorrect: false,
                    feedback: "Overselling without listening is typically from high Enthusiasm.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz6", correct)}
              />

              <MultipleChoice
                question="What is the purpose of Jim Camp's mission-focused thinking in this system?"
                options={[
                  {
                    id: "a",
                    text: "To create emotional investment",
                    isCorrect: false,
                    feedback: "Camp's mission creates emotional detachment, not investment.",
                  },
                  {
                    id: "b",
                    text: "To eliminate the need for listening",
                    isCorrect: false,
                    feedback: "Mission-focused thinking enhances listening by removing emotional distractions.",
                  },
                  {
                    id: "c",
                    text: "To anchor behavior in process instead of emotion",
                    isCorrect: true,
                    feedback: "Correct! Camp's mission-focused thinking anchors behavior in process instead of emotion, creating stability regardless of natural wiring.",
                  },
                  {
                    id: "d",
                    text: "To maximize enthusiasm",
                    isCorrect: false,
                    feedback: "Mission-focused thinking controls enthusiasm rather than maximizing it.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz7", correct)}
              />

              <MultipleChoice
                question="Which Voss tool slows down fast-talking, over-enthusiastic sales representatives?"
                options={[
                  {
                    id: "a",
                    text: "Mirroring",
                    isCorrect: true,
                    feedback: "Correct! Mirroring forces listening and slows down the conversation, helping over-enthusiastic sales representatives to pause and reflect.",
                  },
                  {
                    id: "b",
                    text: "'Why' questions",
                    isCorrect: false,
                    feedback: "'Why' questions can make people defensive—Voss recommends 'How' and 'What' questions instead.",
                  },
                  {
                    id: "c",
                    text: "High-energy tone",
                    isCorrect: false,
                    feedback: "High-energy tone would accelerate the conversation, not slow it down.",
                  },
                  {
                    id: "d",
                    text: "Long explanations",
                    isCorrect: false,
                    feedback: "Long explanations come from the rep—mirroring gets the prospect talking.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz8", correct)}
              />

              <MultipleChoice
                question="High Intellect in the Big 10 model often results in:"
                options={[
                  {
                    id: "a",
                    text: "Overanalyzing objections instead of asking questions",
                    isCorrect: true,
                    feedback: "Correct! High Intellect leads to overthinking and overanalyzing objections instead of simply asking calibrated questions.",
                  },
                  {
                    id: "b",
                    text: "Emotional breakdowns",
                    isCorrect: false,
                    feedback: "Emotional breakdowns are more associated with high Volatility or Withdrawal.",
                  },
                  {
                    id: "c",
                    text: "A refusal to use scripts",
                    isCorrect: false,
                    feedback: "While high Intellect might resist structure, this isn't the primary sales problem.",
                  },
                  {
                    id: "d",
                    text: "Avoiding outreach completely",
                    isCorrect: false,
                    feedback: "Avoiding outreach is more related to high Withdrawal.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz9", correct)}
              />

              <MultipleChoice
                question="The goal of integrating Big 10 + Camp + Voss in Swiftcourse is:"
                options={[
                  {
                    id: "a",
                    text: "To make personality traits irrelevant to performance",
                    isCorrect: true,
                    feedback: "Correct! The goal is to make personality traits irrelevant to performance by using systems and tools to override natural tendencies.",
                  },
                  {
                    id: "b",
                    text: "To create a personality-based selling style",
                    isCorrect: false,
                    feedback: "Swiftcourse rejects personality-based selling in favor of system-based selling.",
                  },
                  {
                    id: "c",
                    text: "To categorize sales representatives into fixed roles",
                    isCorrect: false,
                    feedback: "Swiftcourse aims to transcend personality limitations, not categorize people by them.",
                  },
                  {
                    id: "d",
                    text: "To eliminate the need for structure",
                    isCorrect: false,
                    feedback: "Swiftcourse requires more structure, not less, to override personality tendencies.",
                  },
                ]}
                onAnswer={(correct) => handleQuizComplete("quiz10", correct)}
              />

              <MatchingGame
                title="Match the Item to Its Answer"
                pairs={[
                  { 
                    id: "1", 
                    term: "High Compassion",
                    definition: "Avoids conflict and fears asking direct commitment questions"
                  },
                  { 
                    id: "2", 
                    term: "Camp's No-Based Decision Path",
                    definition: "Reframes rejection as information, not personal failure"
                  },
                  { 
                    id: "3", 
                    term: "Voss's Mirroring",
                    definition: "Repeating last 3 words to slow conversation and force listening"
                  },
                  { 
                    id: "4", 
                    term: "High Orderliness",
                    definition: "Creates perfectionism and analysis paralysis through over-preparation"
                  },
                  { 
                    id: "5", 
                    term: "Voss's Labeling",
                    definition: "Naming the prospect's emotion to redirect attention outward"
                  },
                  { 
                    id: "6", 
                    term: "Camp's Mission Clarity",
                    definition: "Puts mission before ego to anchor behavior in process"
                  },
                  { 
                    id: "7", 
                    term: "Withdrawal and Volatility",
                    definition: "Emotional reactivity that interprets rejection personally"
                  },
                  { 
                    id: "8", 
                    term: "Voss's Calibrated Questions",
                    definition: "Open-ended questions that transfer conversational control"
                  },
                  { 
                    id: "9", 
                    term: "Swiftcourse Execution Framework",
                    definition: "Systematic approach using checklists to override personality"
                  },
                  { 
                    id: "10", 
                    term: "High Enthusiasm",
                    definition: "Over-talking and dominating airtime with excessive energy"
                  },
                ]}
                onComplete={(correct) => handleQuizComplete("matching", correct)}
              />

              {allQuizComplete && (
                <Card className="p-6 bg-green-50 dark:bg-green-950 border-2 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                        🎉 Module 4 Complete!
                      </h3>
                      <p className="text-green-800 dark:text-green-200 mb-4">
                        Congratulations! You've mastered the integration of the Big 10 Aspects Model with Camp and Voss
                        negotiation systems. You now have the tools to make your personality traits irrelevant to your
                        performance.
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
