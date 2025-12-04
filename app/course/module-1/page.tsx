/**
 * MODULE 1: NEUROBIOLOGY & GROWTH MINDSET
 * Comprehensive module covering brain science and mindset for sales success
 */

"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { FlipCard } from "@/components/learning/flip-card"
import { ComparisonCard } from "@/components/learning/comparison-card"
import { GridDisplay } from "@/components/learning/grid-display"
import { MatchingGame } from "@/components/learning/matching-game"
import { TextInputExercise } from "@/components/learning/text-input-exercise"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"

export default function Module1Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<{
    matching: boolean
    textInput: boolean
    quiz1: boolean
    quiz2: boolean
    quiz3: boolean
  }>({
    matching: false,
    textInput: false,
    quiz1: false,
    quiz2: false,
    quiz3: false,
  })

  const MODULE_ID = "module-1"
  const courseStructure = getCourseStructure()
  const module = courseStructure.modules.find((m) => m.id === MODULE_ID)
  const sections = module?.sections || []
  const totalSections = sections.length

  const completedSectionIds = getCompletedSections(MODULE_ID)

  const sectionParam = useMemo(() => searchParams?.get("section"), [searchParams])

  useEffect(() => {
    const savedQuiz = localStorage.getItem(`${MODULE_ID}-quiz-results`)
    if (savedQuiz) {
      setQuizResults(JSON.parse(savedQuiz))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`${MODULE_ID}-quiz-results`, JSON.stringify(quizResults))
  }, [quizResults])

  useEffect(() => {
    if (sectionParam && sections.length > 0) {
      const sectionIndex = sections.findIndex((s) => s.id === sectionParam)
      if (sectionIndex !== -1 && sectionIndex !== currentSectionIndex) {
        setCurrentSectionIndex(sectionIndex)
      }
    }
  }, [sectionParam])

  const handleSectionComplete = () => {
    const currentSection = sections[currentSectionIndex]
    if (currentSection) {
      markSectionComplete(MODULE_ID, currentSection.id)
      // Update global position when user explicitly navigates
      setCurrentPosition(MODULE_ID, currentSection.id)
    }

    // Move to next section
    if (currentSectionIndex < totalSections - 1) {
      const nextIndex = currentSectionIndex + 1
      setCurrentSectionIndex(nextIndex)
      // Update URL to reflect new section
      const nextSection = sections[nextIndex]
      if (nextSection) {
        router.push(`/course/module-1?section=${nextSection.id}`)
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

        <main className="flex-1 p-8 max-w-5xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-balance font-heading">
              Module 1: Neurobiology & Growth Mindset
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding the brain science behind goal achievement and developing a growth mindset
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Never Split the Difference */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-heading">Never Split the Difference</h2>
                <p className="text-sm text-muted-foreground mb-4">Chris Voss - How Not to Get Paid (p. 156)</p>
                <blockquote className="border-l-4 border-brand-green pl-4 italic text-lg leading-relaxed mb-4">
                  "Let's pause for a minute here, because there is one vitally important thing you have to remember when
                  you enter a negotiation armed with your list of calibrated questions. That is, all of this is great,
                  but there's a rub: without self-control and emotional regulation, it doesn't work."
                </blockquote>
                <p className="text-muted-foreground">
                  This foundational quote sets the stage for understanding how neurobiology affects our ability to
                  succeed in sales and negotiations. Self-control and emotional regulation are not just soft skills—they
                  are neurological functions that can be understood and improved.
                </p>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Neurology of Goal Seeking
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 1: Neurology of Goal Seeking (Combined Sections 2 & 3) */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-heading">Neurology of Goal Seeking</h2>
                <p className="text-muted-foreground mb-4">Understanding the Brain Regions Involved in Achievement</p>
                <p>
                  The human brain has specific regions responsible for goal-seeking behavior, fear management, and
                  persistence. Understanding these regions helps us develop strategies to overcome obstacles and achieve
                  our sales objectives.
                </p>
                <p className="mt-4 text-sm text-muted-foreground italic">
                  Click each card to flip between the brain region and its function in goal achievement.
                </p>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amygdalae */}
                <FlipCard
                  frontTitle="Amygdalae"
                  frontContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        The amygdalae are almond-shaped structures deep in the brain that process emotions, particularly
                        fear and anxiety.
                      </p>
                      <p className="text-sm font-medium text-brand-green">Click to see its role in goal seeking →</p>
                    </div>
                  }
                  backTitle="Amygdalae Function"
                  backContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        <strong>Responsible for:</strong> Fear and anxiety related to goal seeking and avoidance
                      </p>
                      <p className="text-sm">
                        <strong>Impact:</strong> Fear of punishments like embarrassment or financial ruin
                      </p>
                      <p className="text-sm">
                        <strong>Key Insight:</strong> Mild agitation is the preferred state of mind for most people
                      </p>
                    </div>
                  }
                />

                {/* Ventral Striatum */}
                <FlipCard
                  frontTitle="Ventral Striatum"
                  frontContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        Part of the Basal Ganglia, this region acts as the brain's decision-making motor system.
                      </p>
                      <p className="text-sm font-medium text-brand-green">Click to see its role in goal seeking →</p>
                    </div>
                  }
                  backTitle="Ventral Striatum Function"
                  backContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        <strong>Function:</strong> Our "go or no-go" motor and brake system
                      </p>
                      <p className="text-sm">
                        <strong>Two Circuits:</strong>
                      </p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• One circuit initiates action</li>
                        <li>• The other circuit stops the initiation of action</li>
                      </ul>
                    </div>
                  }
                />

                {/* Anterior Mid-Cingulate Cortex */}
                <FlipCard
                  frontTitle="Anterior Mid-Cingulate Cortex"
                  frontContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        This region is crucial for maintaining effort and pushing through challenges.
                      </p>
                      <p className="text-sm font-medium text-brand-green">Click to see its role in goal seeking →</p>
                    </div>
                  }
                  backTitle="Anterior Mid-Cingulate Function"
                  backContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        <strong>Responsible for:</strong> Persistence and willpower regulation
                      </p>
                      <p className="text-sm">
                        <strong>Impact:</strong> Determines how long you can maintain effort toward a goal despite
                        obstacles
                      </p>
                      <p className="text-sm">
                        <strong>Sales Application:</strong> Critical for consistent prospecting and follow-up activities
                      </p>
                    </div>
                  }
                />

                {/* Lateral Pre-Frontal Cortex */}
                <FlipCard
                  frontTitle="Lateral Pre-Frontal Cortex"
                  frontContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        The executive function center of the brain, responsible for complex planning and
                        decision-making.
                      </p>
                      <p className="text-sm font-medium text-brand-green">Click to see its role in goal seeking →</p>
                    </div>
                  }
                  backTitle="Lateral Pre-Frontal Function"
                  backContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        <strong>Function:</strong> Planning and thinking across different time scales
                      </p>
                      <p className="text-sm">
                        <strong>Executive Function:</strong> Coordinates complex goal-directed behavior
                      </p>
                      <p className="text-sm">
                        <strong>Sales Application:</strong> Essential for strategic account planning and long-term
                        relationship building
                      </p>
                    </div>
                  }
                />

                {/* Orbital Frontal Cortex */}
                <FlipCard
                  frontTitle="Orbital Frontal Cortex"
                  frontContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        This region connects our current emotional state with anticipated future emotional states.
                      </p>
                      <p className="text-sm font-medium text-brand-green">Click to see its role in goal seeking →</p>
                    </div>
                  }
                  backTitle="Orbital Frontal Function"
                  backContent={
                    <div className="space-y-3">
                      <p className="text-sm">
                        <strong>Function:</strong> Meshes current emotionality with future emotional states
                      </p>
                      <p className="text-sm">
                        <strong>Process:</strong> Compares "Comparison Level" vs "Comparison Level (Alternative)"
                      </p>
                      <p className="text-sm">
                        <strong>Sales Application:</strong> Helps evaluate whether pursuing a deal is worth the
                        emotional investment
                      </p>
                    </div>
                  }
                />
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to MAD Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 2: MAD Analysis */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-heading">MAD Analysis</h2>
                <p className="text-sm text-muted-foreground mb-4">Does this Make a Difference?</p>
                <p className="leading-relaxed mb-4">
                  Understanding how the brain functions will be a key to determining what strategies and language to use
                  when developing persuasive speech.
                </p>
                <p className="leading-relaxed mb-4">
                  We must understand that <strong>selling is a negotiation process</strong> and understanding how and
                  why our counterparts move forward only strengthens our propositions.
                </p>
                <div className="mt-6 p-4 bg-brand-green/10 rounded-lg border border-brand-green/20">
                  <p className="text-sm font-medium text-brand-green mb-2">Key Takeaway:</p>
                  <p className="text-sm">
                    By understanding the neurobiology of decision-making, we can craft more effective sales strategies
                    that work with—not against—the natural functioning of the human brain.
                  </p>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Growth Mindset
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 3: Growth Mindset */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 font-heading">Growth Mindset</h2>
                <p className="text-lg text-muted-foreground italic">"The key to Continuous Improvement"</p>
              </div>

              <ComparisonCard
                leftSide={{
                  title: "Fixed Mindset",
                  subtitle: "Limiting beliefs about ability",
                  color: "red",
                  items: [
                    "Believe talent, intelligence, and ability are fixed",
                    "May be motivated to learn but believe their abilities are limited",
                    "Tendency to fear failure",
                    "Focus on proving themselves",
                    "Reluctant to accept criticism or feedback",
                    "Avoids challenges",
                  ],
                }}
                rightSide={{
                  title: "Growth Mindset",
                  subtitle: "Embracing potential for development",
                  color: "green",
                  items: [
                    "View challenges as opportunities",
                    "Embrace constructive feedback",
                    "Focus on process not the results",
                    "Learn and grow from failures",
                    "Believes that talent is ever-improving",
                    "Is inspired by others' success",
                  ],
                }}
              />

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Mindset Discoveries
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 4: Mindset Discoveries */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-heading">Mindset Discoveries</h2>
                <p className="text-sm text-muted-foreground mb-4">Carol Dweck's Groundbreaking Research</p>
                <p className="font-medium mb-4">First study compared compliments of children on effort vs talent:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">•</span>
                    <span>Students were given a set of problems to complete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">•</span>
                    <span>
                      Students who were praised for their <strong>talents</strong> were less willing to engage in more
                      challenging tasks vs those who were praised for their <strong>effort</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">•</span>
                    <span>
                      Talent-praised students were willing to game the system or exaggerate their accomplishments to
                      continue receiving praise for their efforts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">•</span>
                    <span>
                      Effort-praised students looked to find additional challenges that would lead to additional
                      compliments on their efforts
                    </span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
                  <p className="text-sm font-medium text-brand-orange mb-2">Sales Application:</p>
                  <p className="text-sm">
                    Focus on praising your own effort and process rather than innate talent. This mindset shift leads to
                    greater resilience and willingness to tackle difficult prospects.
                  </p>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Stress Levels
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 5: Elevated Stress Levels */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-heading">Elevated Stress Levels</h2>
                <p className="text-sm text-muted-foreground mb-4">Good or Bad?</p>
                <p className="mb-4">Common stress indicators include:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-brand-orange">•</span>
                    <span>Sweaty palms</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-brand-orange">•</span>
                    <span>Increased heart rate</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-brand-orange">•</span>
                    <span>Quakiness and quivering</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-brand-orange">•</span>
                    <span>Difficult to concentrate</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="text-brand-orange">•</span>
                    <span>Snap at others</span>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground">
                  But is stress always negative? The next section explores how our mindset about stress can dramatically
                  affect our performance.
                </p>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Stress & Achievement
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 6: Does Stress Limit Achievement */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-heading">Does Stress Limit Achievement?</h2>
                <p className="text-sm text-muted-foreground mb-4">Stress is Enhancing vs Limiting Mindset</p>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Impromptu Speech Study:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-green mt-1">•</span>
                        <span>Subjects were given opposing descriptions of stress as "enhancing" vs "limiting"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-green mt-1">•</span>
                        <span>Subjects were then told they would have to give an impromptu speech</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-green mt-1">•</span>
                        <span>
                          <strong>Results:</strong> Those who were given a "stress is enhancing" mindset description
                          outperformed those who were given a "stress is limiting" description
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-brand-green/10 rounded-lg border border-brand-green/20">
                    <h4 className="font-semibold mb-3 text-brand-green">Key Conclusions:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-green mt-1">•</span>
                        <span>
                          Effort praise with a "stress is enhancing" mindset leads to more activity in overcoming
                          challenges
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-green mt-1">•</span>
                        <span>
                          Those who accept improving what they control focus on attention and effort and accept that the
                          results will come
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
                    <h4 className="font-semibold mb-3 text-brand-orange">Discoveries:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange mt-1">•</span>
                        <span>
                          Growth mindset shifts physiology to psychology and sees stress as an opportunity to learn from
                          errors
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-orange mt-1">•</span>
                        <span>
                          GM and stress-enhancing mindset leads to looking and thinking about what leads to errors and
                          how to fix them vs an emotional state
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Goals & Improvement
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 7: Goals and Improvement */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6">
              <GridDisplay
                title="Goals and Improvement: Four Key Principles"
                items={[
                  {
                    title: "1. View Goal Achievement as a Testing Opportunity",
                    description:
                      "View goal achievement as an opportunity to test yourself and where you need to improve. Every sales call is a chance to learn.",
                  },
                  {
                    title: "2. Gentle Self-Feedback",
                    description:
                      "Feedback on errors to ourselves should be done with a gentle approach. Others will be brutal enough so that we don't need to pile on. Instead, look at them as a problem to solve and overcome.",
                  },
                  {
                    title: "3. Seek Constructive Criticism",
                    description:
                      "Seek constructive criticism from trusted friends and colleagues for honest feedback. Accept the feedback as a discovery on what to improve.",
                  },
                  {
                    title: "4. 3x5 Index Card Exercise",
                    description:
                      "Take a 3 x 5 index card and write a short letter to the next person who wants to achieve in your given field. Write what it would take to succeed with a stress-as-growth mindset and how it improves performance.",
                  },
                ]}
              />

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Interactive Quiz
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 8: Interactive Quiz */}
          {currentSectionIndex === 8 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-heading">Module 1 Assessment</h2>
                <p className="text-muted-foreground">
                  Complete all exercises and questions correctly to unlock Module 2. You must get all answers correct to
                  proceed.
                </p>
              </div>

              {/* Matching Game */}
              <MatchingGame
                title="1. Neurobiology Matching Game"
                pairs={[
                  {
                    id: "amygdalae",
                    term: "Amygdalae",
                    definition: "Responsible for fear and anxiety related to goal seeking and avoidance",
                  },
                  {
                    id: "ventral",
                    term: "Ventral Striatum",
                    definition: "Functions as our 'go or no-go' motor and brake system",
                  },
                  {
                    id: "anterior",
                    term: "Anterior Mid-Cingulate Cortex",
                    definition: "Persistence and willpower are regulated here",
                  },
                  {
                    id: "lateral",
                    term: "Lateral Pre-Frontal Cortex",
                    definition: "Handles planning and thinking across different time scales (Executive Function)",
                  },
                  {
                    id: "orbital",
                    term: "Orbital Frontal Cortex",
                    definition:
                      "Meshes current state of emotionality and compares it to future state after objective is met",
                  },
                ]}
                onComplete={(correct) => handleQuizComplete("matching", correct)}
              />

              {/* Text Input Exercise */}
              <TextInputExercise
                title="2. Digital 3x5 Card Exercise"
                prompt="Write a short letter to the next person who wants to achieve in your field. Explain what it takes to succeed with a stress-as-growth mindset and how it improves performance."
                placeholder="Dear Future Achiever,

Success in sales requires..."
                minLength={100}
                onComplete={() => handleQuizComplete("textInput", true)}
              />

              {/* Multiple Choice Questions */}
              <MultipleChoice
                question="3. According to Carol Dweck's research, what happened to students who were praised for their talent?"
                options={[
                  {
                    id: "a",
                    text: "They sought out more challenging tasks",
                    isCorrect: false,
                    feedback: "This was actually the behavior of effort-praised students.",
                  },
                  {
                    id: "b",
                    text: "They were less willing to engage in challenging tasks and sometimes exaggerated accomplishments",
                    isCorrect: true,
                    feedback:
                      "Correct! Talent-praised students avoided challenges and sometimes gamed the system to maintain their 'talented' image.",
                  },
                  {
                    id: "c",
                    text: "They performed the same as effort-praised students",
                    isCorrect: false,
                    feedback: "There was a significant difference between the two groups.",
                  },
                  {
                    id: "d",
                    text: "They became more resilient to failure",
                    isCorrect: false,
                    feedback: "This was a characteristic of effort-praised students, not talent-praised ones.",
                  },
                ]}
                explanation="Dweck's research showed that praising talent can actually limit growth, while praising effort encourages a growth mindset."
                onAnswer={(correct) => handleQuizComplete("quiz1", correct)}
              />

              <MultipleChoice
                question="4. In the impromptu speech study, what was the key finding about stress mindset?"
                options={[
                  {
                    id: "a",
                    text: "Stress always limits performance regardless of mindset",
                    isCorrect: false,
                    feedback: "The study showed that mindset about stress matters significantly.",
                  },
                  {
                    id: "b",
                    text: "Those with a 'stress is enhancing' mindset outperformed those with a 'stress is limiting' mindset",
                    isCorrect: true,
                    feedback: "Correct! How we think about stress dramatically affects our performance under pressure.",
                  },
                  {
                    id: "c",
                    text: "Stress had no impact on speech performance",
                    isCorrect: false,
                    feedback: "Stress did impact performance, but the mindset about stress was the key variable.",
                  },
                  {
                    id: "d",
                    text: "Only experienced speakers benefited from stress",
                    isCorrect: false,
                    feedback: "The benefit came from mindset, not experience level.",
                  },
                ]}
                explanation="Viewing stress as enhancing rather than limiting can improve performance by shifting focus from emotional state to problem-solving."
                onAnswer={(correct) => handleQuizComplete("quiz2", correct)}
              />

              <MultipleChoice
                question="5. What is the primary difference between a fixed mindset and a growth mindset?"
                options={[
                  {
                    id: "a",
                    text: "Fixed mindset believes abilities are unchangeable; growth mindset believes abilities can be developed",
                    isCorrect: true,
                    feedback:
                      "Correct! This fundamental difference affects how people approach challenges, feedback, and failure.",
                  },
                  {
                    id: "b",
                    text: "Fixed mindset is for beginners; growth mindset is for experts",
                    isCorrect: false,
                    feedback: "Mindset is not related to skill level—it's about beliefs about ability.",
                  },
                  {
                    id: "c",
                    text: "Fixed mindset focuses on effort; growth mindset focuses on talent",
                    isCorrect: false,
                    feedback: "This is backwards—growth mindset focuses on effort, fixed mindset on talent.",
                  },
                  {
                    id: "d",
                    text: "There is no significant difference between the two",
                    isCorrect: false,
                    feedback:
                      "Research shows significant differences in behavior and outcomes between the two mindsets.",
                  },
                ]}
                explanation="Growth mindset is the foundation for continuous improvement and resilience in sales and entrepreneurship."
                onAnswer={(correct) => handleQuizComplete("quiz3", correct)}
              />

              {/* Completion Status */}
              {allQuizComplete && (
                <Card className="p-6 bg-green-50 dark:bg-green-950 border-2 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                        🎉 Module 1 Complete!
                      </h3>
                      <p className="text-green-800 dark:text-green-200 mb-4">
                        Congratulations! You've successfully completed all sections and assessments for Module 1. You
                        now understand the neurobiology of goal achievement and the power of a growth mindset.
                      </p>
                      <Button onClick={() => router.push("/")} className="bg-brand-green hover:bg-[#143d31] text-white">
                        Return to Dashboard
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {!allQuizComplete && (
                <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                        Complete All Assessments
                      </h3>
                      <p className="text-yellow-800 dark:text-yellow-200 mb-3">
                        You must complete all exercises and answer all questions correctly to unlock the next module.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          {quizResults.matching ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-yellow-600" />
                          )}
                          <span>Neurobiology Matching Game</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {quizResults.textInput ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-yellow-600" />
                          )}
                          <span>3x5 Card Exercise</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {quizResults.quiz1 ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-yellow-600" />
                          )}
                          <span>Question 3: Carol Dweck's Research</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {quizResults.quiz2 ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-yellow-600" />
                          )}
                          <span>Question 4: Stress Mindset Study</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {quizResults.quiz3 ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-yellow-600" />
                          )}
                          <span>Question 5: Fixed vs Growth Mindset</span>
                        </div>
                      </div>
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
