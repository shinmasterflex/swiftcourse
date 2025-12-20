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
                        <p className="text-sm text-muted-foreground">
                          High Compassion = avoids conflict. High Assertiveness = talks too much. Low Withdrawal = pushes too hard.
                        </p>
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
                        <p className="font-semibold mb-2">Example Application:</p>
                        <p className="text-sm">
                          <strong>Tendency:</strong> High Compassion rep avoids asking for commitments.<br />
                          <strong>Camp Override:</strong> Mission-first mindset + "No" framework = Ask direct commitment questions without guilt.
                        </p>
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
                        <p className="font-semibold mb-2">Example Application:</p>
                        <p className="text-sm">
                          <strong>Tendency:</strong> High Enthusiasm rep oversells and talks too much.<br />
                          <strong>Voss Override:</strong> Mirroring + labeling excitement = Forces listening, creates space for prospect to talk.
                        </p>
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
                explanation="Swiftcourse treats personality traits as tendencies—not limitations. They can be overridden with disciplined systems from Camp and emotional-control tools from Voss."
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
                explanation="High Orderliness creates perfectionism, over-preparation, and fear of imperfect action, leading to analysis paralysis."
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
                    feedback: "Correct! Tactical empathy, combined with Camp's emotional detachment and Voss's labeling, helps volatile salespeople focus on customer needs instead of emotional reactions.",
                  },
                  {
                    id: "d",
                    text: "Asking for the 'No'",
                    isCorrect: false,
                    feedback: "Asking for 'No' creates clarity but doesn't directly stabilize emotional volatility.",
                  },
                ]}
                explanation="Tactical empathy, combined with Camp's emotional detachment and Voss's labeling, helps volatile salespeople focus on customer needs instead of emotional reactions."
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
                explanation="High Compassion leads to avoiding tension, fearing commitment questions, and struggling to push prospects when necessary."
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
                    feedback: "Correct! Late-night FM DJ tone and calibrated questions slow down the conversation and force listening, countering the tendency to over-talk.",
                  },
                  {
                    id: "d",
                    text: "Boundary statements",
                    isCorrect: false,
                    feedback: "Boundary statements set limits but don't directly counter over-talking.",
                  },
                ]}
                explanation="Late-night FM DJ tone and calibrated questions slow down the conversation and force listening, countering the tendency to over-talk."
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
                explanation="Low Industriousness creates inconsistent work patterns and prospecting activity."
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
                explanation="Camp's mission-focused thinking anchors behavior in process instead of emotion, creating stability regardless of natural wiring."
                onAnswer={(correct) => handleQuizComplete("quiz7", correct)}
              />

              <MultipleChoice
                question="Which Voss tool slows down fast-talking, over-enthusiastic reps?"
                options={[
                  {
                    id: "a",
                    text: "Mirroring",
                    isCorrect: true,
                    feedback: "Correct! Mirroring forces listening and slows down the conversation, helping over-enthusiastic reps to pause and reflect.",
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
                explanation="Mirroring forces listening and slows down the conversation, helping over-enthusiastic reps to pause and reflect."
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
                explanation="High Intellect leads to overthinking and overanalyzing objections instead of simply asking calibrated questions."
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
                    text: "To categorize reps into fixed roles",
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
                explanation="The goal is to make personality traits irrelevant to performance by using systems and tools to override natural tendencies."
                onAnswer={(correct) => handleQuizComplete("quiz10", correct)}
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
