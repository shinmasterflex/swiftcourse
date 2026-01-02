/**
 * MODULE 2: LEARNING, HABITS & MEASUREMENT
 * Comprehensive module covering learning processes, habit formation, and KPI tracking
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
import { ArrowRight, CheckCircle2, RefreshCw } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import Image from "next/image"
import { MatchingGame } from "@/components/learning/matching-game"
import { TextInputExercise } from "@/components/learning/text-input-exercise"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { SourceCard } from "@/components/learning/source-card"

export default function Module2Page() {
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

  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<string>>(new Set())
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false)

  const MODULE_ID = "module-2"
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

  useEffect(() => {
    localStorage.setItem(`${MODULE_ID}-attempted-questions`, JSON.stringify(Array.from(attemptedQuestions)))
  }, [attemptedQuestions])

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
        router.push(`/course/module-2?section=${nextSection.id}`)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const allQuizAnswered = attemptedQuestions.size === 5
  const allQuizComplete = Object.values(quizResults).every((result) => result === true)

  useEffect(() => {
    if (assessmentSubmitted && allQuizComplete && currentSectionIndex === 13) {
      const assessmentSection = sections[13]
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

        <main className="flex-1 p-8 max-w-5xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-balance font-heading">
              Module 2: Learning, Habits & Measurement
            </h1>
            <p className="text-lg text-muted-foreground">
              Master the process of learning, build context-independent habits, and track your progress
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Module Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h2 className="text-2xl font-bold mb-4 font-heading">Module Overview</h2>
                <p className="mb-4 leading-relaxed">This training module focuses on two core pillars:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg">
                    <h3 className="font-semibold text-brand-green mb-2">Learning</h3>
                    <p className="text-sm text-muted-foreground">Understanding the process and overcoming barriers</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h3 className="font-semibold text-brand-green mb-2">Habit Formation</h3>
                    <p className="text-sm text-muted-foreground">
                      Context-independent habits that are uncompromising towards success
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-brand-orange">
                <p className="text-lg italic text-center font-medium">
                  Core Philosophy: "Better not to start. Once started, better to finish."
                </p>
                <p className="text-sm text-muted-foreground text-center mt-2">- Unknown Author</p>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to The Process of Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 1: The Process of Learning */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">Part 1: The Process of Learning</h2>

              <SourceCard
                sources={[
                  {
                    author: "Adam Grant",
                    title: "Hidden Potential: The Science of Achieving Greater Things",
                    url: "https://www.adamgrant.net/book/hidden-potential/",
                  },
                ]}
              />

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Three Critical Questions Every Learner Must Answer</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Duration</h4>
                      <p className="text-muted-foreground">How long will this take?</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Path</h4>
                      <p className="text-muted-foreground">What is involved in learning this new thing?</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Outcome</h4>
                      <p className="text-muted-foreground">What will I get out of this?</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-brand-orange/10 border-2 border-brand-orange/30">
                <h3 className="text-xl font-semibold mb-3">The Comfort Paradox in Learning</h3>
                <p className="mb-4 italic font-medium">
                  Key Insight: "You can't become truly comfortable with a skill until you've practiced it enough to
                  master it. But practicing it before you master it is uncomfortable, so you often avoid it."
                </p>

                <h4 className="font-semibold mb-3">Three Forms of Courage Required:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Embracing discomfort:</strong> Accepting minimal discomfort when it arises
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Seeking discomfort:</strong> Actively pursuing uncomfortable situations
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Amplifying discomfort:</strong> Being brave enough to make more mistakes
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-background rounded-lg">
                  <p className="font-medium">Practical Application:</p>
                  <p className="text-sm mt-2">
                    Don't wait until you feel ready. You become prepared by taking the leap anyway. Your comfort grows
                    AS you practice your skills, not before.
                  </p>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Limbic Friction
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 2: Limbic Friction */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">
                Part 2: Limbic Friction - The Dream Killer
              </h2>

              <SourceCard
                sources={[
                  {
                    author: "Andrew Huberman",
                    title: "Huberman Lab Podcast",
                    url: "https://www.youtube.com/@hubermanlab",
                  },
                ]}
              />

              <Card className="p-6 bg-red-50 dark:bg-red-950 border-2 border-red-300">
                <h3 className="text-xl font-semibold mb-2 text-red-900 dark:text-red-100">Definition</h3>
                <p className="italic text-lg mb-4 text-red-800 dark:text-red-200">
                  "The single cause of more failed dreams and ambitions than any other source."
                </p>
              </Card>

              <div className="space-y-4">
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                  <div className="relative w-full h-full">
                    <Image
                      src="/start-ready.png"
                      alt="If you start when you're ready - minimal progress"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                  <div className="relative w-full h-full">
                    <Image
                      src="/start-today.png"
                      alt="If you start today - steady growth"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">What Is It?</h3>
                <p className="mb-4 leading-relaxed">
                  Andrew Huberman defines limbic friction as the stress created from entering into an unknown behavior or situation. It is the
                  amplification of negative emotion from the anticipated new behavior. Unlike general stress (which is
                  attributed solely to the nervous system), limbic friction can be managed from the top of the brain to
                  dissipate.
                </p>

                <h4 className="font-semibold mb-3">Consequences:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Leads to procrastination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Causes people to quit before achieving goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Creates a barrier between intention and action</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Making Mistakes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 3: Making Mistakes - The Growth Accelerator */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">
                Part 3: Making Mistakes - The Growth Accelerator
              </h2>

              <SourceCard
                sources={[
                  {
                    author: "Andrew Huberman",
                    title: "Huberman Lab Podcast",
                    url: "https://www.youtube.com/@hubermanlab",
                  },
                  {
                    author: "Adam Grant",
                    title: "Hidden Potential",
                    url: "https://www.adamgrant.net/book/hidden-potential/",
                  },
                  {
                    author: "Carol Dweck",
                    title: "Mindset: The New Psychology of Success",
                    url: "https://www.penguinrandomhouse.com/books/44330/mindset-by-carol-s-dweck-phd/",
                  },
                  {
                    author: "David Yeager",
                    title: "10 to 25: The Science of Motivating Young People",
                    url: "https://www.davidyeagerphd.com/10-to-25",
                  },
                ]}
              />

              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/mistakes.png"
                    alt="Making more mistakes - theory vs reality"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Page 40 Concept: Making More Mistakes</h3>
                <p className="mb-4 leading-relaxed">
                  <strong>Research Finding:</strong> When students are learning new information, if they're randomly
                  assigned to guess wrong before being given the right answer, they're less likely to make errors later
                  on tests.
                </p>

                <div className="p-4 bg-brand-green/10 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2 text-brand-green">The Mistake Principle:</h4>
                  <p className="italic mb-3">
                    "When we're encouraged to make mistakes, we end up making fewer of them"
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Early mistakes help us remember the correct answer and motivate us to keep learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Set a goal to make at least 200 mistakes per day when learning something new</span>
                    </li>
                  </ul>
                </div>

                <h4 className="font-semibold mb-3">Why This Works:</h4>
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>The more mistakes you make, the faster you will improve</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>The best cure to feeling uncomfortable about making mistakes is to make MORE mistakes</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>
                      This creates "learned industriousness" - when you get praised for effort, the feeling of effort
                      itself becomes rewarding
                    </span>
                  </p>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Learning Styles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 4: Learning Styles */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">
                Part 4: Learning Styles - Matching Method to Task
              </h2>

              <SourceCard
                sources={[
                  {
                    author: "Adam Grant",
                    title: "Hidden Potential, Page 41",
                    url: "https://www.adamgrant.net/book/hidden-potential/",
                  },
                ]}
              />

              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/learning.png"
                    alt="How learning actually happens vs how we think it happens"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <ComparisonCard
                leftSide={{
                  title: "Traditional Belief",
                  subtitle: "How we think we learn",
                  color: "red",
                  items: [
                    "We all have a preferred learning style",
                    "Visual learners learn best by seeing",
                    "Auditory learners learn best by hearing",
                    "Kinesthetic learners learn best by doing",
                    "Stick to your preferred style for all tasks",
                  ],
                }}
                rightSide={{
                  title: "Reality",
                  subtitle: "What actually works",
                  color: "green",
                  items: [
                    "Match the METHOD to the TASK",
                    "Reading/Writing: Best for critical thinking",
                    "Listening: Ideal for understanding emotions",
                    "Doing: Better for remembering information",
                    "Use different methods for different goals",
                  ],
                }}
              />

              <Card className="p-6 bg-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Language Learning Example:</h3>
                <p className="leading-relaxed">
                  Students were more adept at understanding and speaking a new language when they had been taught to{" "}
                  <strong>produce it</strong> rather than only comprehend it.
                </p>
                <p className="mt-3 italic font-medium">
                  "If you don't use it, you might never gain it in the first place."
                </p>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Absorptive Capacity
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 5: Building Absorptive Capacity */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">
                Part 5: Building Absorptive Capacity - Becoming a Sponge
              </h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Page 55 & 57: Which Sources to Trust</h3>
                <p className="mb-4">Listen to coaches/sources who have three qualities:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-brand-green/10 rounded-lg">
                    <h4 className="font-semibold text-brand-green mb-2">Credibility</h4>
                    <p className="text-sm">Relevant expertise in the area</p>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded-lg">
                    <h4 className="font-semibold text-brand-green mb-2">Familiarity</h4>
                    <p className="text-sm">They know you well</p>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded-lg">
                    <h4 className="font-semibold text-brand-green mb-2">Care</h4>
                    <p className="text-sm">They want what's best for you</p>
                  </div>
                </div>
              </Card>

              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/sources.png"
                    alt="Which sources to trust - care, credibility, familiarity"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Absorptive Capacity Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-2 border-border p-3 bg-muted">Filtering Goal →</th>
                        <th className="border-2 border-border p-3 bg-red-50 dark:bg-red-950">Ego-Driven</th>
                        <th className="border-2 border-border p-3 bg-green-50 dark:bg-green-950">Growth-Driven</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-border p-3 font-semibold bg-muted">Reactive</td>
                        <td className="border-2 border-border p-3">
                          <strong>Rubber</strong>
                          <br />
                          <span className="text-sm text-muted-foreground">(defensive bubble)</span>
                        </td>
                        <td className="border-2 border-border p-3">
                          <strong>Clay</strong>
                          <br />
                          <span className="text-sm text-muted-foreground">(coachable, but passive)</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 border-border p-3 font-semibold bg-muted">Proactive</td>
                        <td className="border-2 border-border p-3">
                          <strong>Teflon</strong>
                          <br />
                          <span className="text-sm text-muted-foreground">(nothing sticks)</span>
                        </td>
                        <td className="border-2 border-border p-3 bg-brand-green/20">
                          <strong className="text-brand-green text-lg">SPONGE</strong>
                          <br />
                          <span className="text-sm">(ideal state) ✓</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 p-4 bg-brand-green/10 rounded-lg">
                  <strong>Goal:</strong> Become proactive AND growth-oriented = become a SPONGE who consistently takes
                  initiative to expand and adapt.
                </p>
              </Card>

              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/change.png"
                    alt="What you can and cannot change - past vs future"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Perfectionism Spiral
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 6: Perfectionism Spiral */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">Part 6: Perfectionism Spiral</h2>

              <Card className="p-6 bg-red-50 dark:bg-red-950 border-2 border-red-300">
                <h3 className="text-xl font-semibold mb-3 text-red-900 dark:text-red-100">
                  Page 68: The Perfectionism Trap
                </h3>
                <p className="mb-4 text-red-800 dark:text-red-200">
                  <strong>The Problem:</strong> Perfectionists focus on creating a flawless image in others' eyes, which
                  is a risk factor for depression, anxiety, and burnout.
                </p>
              </Card>

              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/perfection-spiral.png"
                    alt="The perfectionism spiral - try, mistake, never again cycle"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">The Perfectionism Spiral:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <strong>Setting impossibly high standards</strong>
                      <p className="text-sm text-muted-foreground mt-1">Nothing is ever good enough</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <strong>Focusing on every flaw as a deduction</strong>
                      <p className="text-sm text-muted-foreground mt-1">Magnifying small mistakes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <strong>Wasting time on minor imperfections</strong>
                      <p className="text-sm text-muted-foreground mt-1">Instead of major improvements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <strong>Balking and freezing progress</strong>
                      <p className="text-sm text-muted-foreground mt-1">Paralyzed by fear of imperfection</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-brand-green/10 border-2 border-brand-green/30">
                <h3 className="text-xl font-semibold mb-3">The Solution - Wabi Sabi</h3>
                <p className="mb-4 italic">The art of honoring beauty in imperfection (a Japanese aesthetic concept)</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Strive for EXCELLENCE, not perfection</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Set specific, challenging goals</strong> (not "do your best")
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>A score of 10 doesn't mean perfection</strong> - it means excellence
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      Ask yourself:{" "}
                      <strong>"Did you make yourself better today? Did you make someone else better today?"</strong>
                    </span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Self-Judgment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 7: Self-Judgment */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">Part 7: Self-Judgment</h2>

              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/frustration.png"
                    alt="Self-judgment - doing well vs making a minor mistake"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Page 73: Managing Your Inner Critic</h3>
                <p className="text-lg italic mb-6 font-medium">
                  Key Insight: "Beating yourself up doesn't make you stronger—it leaves you bruised."
                </p>

                <div className="p-4 bg-brand-orange/10 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3 text-brand-orange">Mental Time Travel Technique:</h4>
                  <p>
                    Ask yourself:{" "}
                    <strong>
                      "If you knew five years ago what you'd accomplish now, how proud would you have been?"
                    </strong>
                  </p>
                </div>

                <h4 className="font-semibold mb-3">The Compassion Principle:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Being kind to yourself isn't about ignoring weaknesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>It's about giving yourself permission to learn from disappointments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>We grow by embracing our shortcomings, not punishing them</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>When you make a mistake, allow yourself the grace to forgive yourself</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>People judge your potential from your BEST moments, not your worst</strong>
                    </span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-brand-orange/10 border-2 border-brand-orange/30">
                <h4 className="font-semibold mb-3 text-brand-orange">The George Lucas Principle:</h4>
                <p className="leading-relaxed">
                  Everyone judges George Lucas from <em>Star Wars</em>, not <em>Howard the Duck</em>. Your reputation is
                  built on your successes, not your failures. People remember what you did well, not the mistakes along
                  the way.
                </p>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Harmonious Passion
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 8: Harmonious Passion */}
          {currentSectionIndex === 8 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">Part 8: Harmonious Passion</h2>

              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border-2 border-border bg-white px-8 py-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/progress.png"
                    alt="Progress - I have to vs I want to mindset"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Page 91: Pushed vs. Pulled - Harmonious Action</h3>
                <p className="mb-4">
                  <strong>Definition:</strong> Harmonious passion = being pulled toward an activity rather than pushed
                  into it
                </p>

                <h4 className="font-semibold mb-3">Characteristics:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-brand-green/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mb-2" />
                    <p className="text-sm">You feel energized, not depleted</p>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mb-2" />
                    <p className="text-sm">The activity aligns with your identity</p>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mb-2" />
                    <p className="text-sm">You're intrinsically motivated, not seeking external validation</p>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mb-2" />
                    <p className="text-sm">You can maintain it sustainably over time</p>
                  </div>
                </div>

                <h4 className="font-semibold mb-3">How to Cultivate It:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Transform practice into play (deliberate play)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Compete against yourself, not others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Introduce novelty and variety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Take breaks and prioritize recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Find joy in the daily grind</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Task Bracketing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 9: Task Bracketing */}
          {currentSectionIndex === 9 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">
                Part 9: Task Bracketing - The Limbic Friction Solution
              </h2>

              <SourceCard
                sources={[
                  {
                    author: "Andrew Huberman",
                    title: "Huberman Lab Podcast - Task Bracketing Protocol",
                    url: "https://www.youtube.com/@hubermanlab",
                  },
                ]}
              />

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-4">Protocol to Form New Habits</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <p>Identify a new habit you wish to build</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <p>Visualize the procedural steps to achieve it</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <p className="mb-2">Write down both NEGATIVE and POSITIVE feelings you expect to experience:</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Prior to engaging in the new habit</li>
                        <li>• When you complete it</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-brand-orange">
                <h4 className="font-semibold mb-3 text-brand-orange">The Dopamine Effect:</h4>
                <p className="mb-3">
                  When you bracket the expected negative feelings and move forward anyway, your brain rewards you with
                  dopamine <strong>BEFORE</strong> completing the task. You get another boost when you complete it.
                </p>
                <p className="p-3 bg-brand-orange/10 rounded-lg">
                  <strong>Result:</strong> Creates a positive feedback loop even when preparing for the new behavior
                  (Dopamine Reward Prediction Error)
                </p>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to 21-Day Protocol
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 10: The 21-Day Habit Protocol */}
          {currentSectionIndex === 10 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">Part 10: The 21-Day Habit Protocol</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Step-by-Step Implementation</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <strong>Write down 6 habits</strong> you want to incorporate
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        For <strong>21 straight days</strong>, complete the 6 habits daily (you'll most likely complete
                        4-5)
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        If you miss a day, simply move on to completing what you can the following day (
                        <strong>DO NOT double up</strong> on missed days)
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <div>
                        <strong>Bundle 21 days into 2-day performances:</strong> Think "if I can do it one day, then two
                        days is more likely." After two days, start again
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm">
                        5
                      </div>
                      <div>
                        At the end of 21 days, <strong>STOP thinking about performing the habits daily</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-brand-green/10 border-2 border-brand-green/30">
                <h4 className="font-semibold mb-2 text-brand-green text-lg">Why It Works:</h4>
                <p>
                  The habits that hold are performed anyway and have become context-independent (you do them regardless
                  of how you feel)
                </p>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Context-Independent Habits
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 11: Context-Independent vs Dependent Habits */}
          {currentSectionIndex === 11 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">
                Part 11: Context-Independent vs. Dependent Habits
              </h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-background">
                <h3 className="text-xl font-semibold mb-4">The Goal of Habit Formation</h3>
                <p className="mb-4 text-lg">
                  Create <strong>context-independent habits that are uncompromising towards success</strong>
                </p>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-brand-green/50">
                  <h4 className="text-lg font-semibold mb-3 text-brand-green">Independent Habits (THE GOAL)</h4>
                  <p className="mb-4">You do these habits regardless of how you feel</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Automatic and consistent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Not affected by mood or circumstances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Deeply ingrained in your routine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Sustainable long-term</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-2 border-red-300">
                  <h4 className="text-lg font-semibold mb-3 text-red-600">Dependent Habits (TO AVOID)</h4>
                  <p className="mb-4">You must be in a particular state of mind to perform</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      <span>Require motivation or willpower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      <span>Affected by mood swings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      <span>Easily disrupted by circumstances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      <span>Inconsistent over time</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <Card className="p-6 bg-brand-orange/10">
                <h4 className="font-semibold mb-3">Strategy to Build Context-Independent Habits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Use task bracketing to anticipate and overcome limbic friction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Follow the 21-day protocol consistently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-orange mt-1">→</span>
                    <span>Understand and manage your limbic friction triggers</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Key Takeaways
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 12: Key Takeaways - UPDATED index from 13 to 12 */}
          {currentSectionIndex === 12 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-brand-green">Key Takeaways</h2>

              <GridDisplay
                title="Module 2 Essential Principles"
                items={[
                  {
                    title: "Learning requires discomfort",
                    description: "Seek it, don't avoid it. Growth happens outside your comfort zone.",
                  },
                  {
                    title: "Limbic friction is manageable",
                    description: "Use task bracketing to overcome it and turn intention into action.",
                  },
                  {
                    title: "Mistakes accelerate learning",
                    description: "Make more, not fewer. Set a goal of 200 mistakes per day.",
                  },
                  {
                    title: "Match method to task",
                    description: "Not to your preferred style. Different tasks require different approaches.",
                  },
                  {
                    title: "Filter information wisely",
                    description: "Seek credible, caring, familiar sources. Become a sponge.",
                  },
                  {
                    title: "Excellence > Perfection",
                    description: "Aim for specific, challenging goals. Embrace wabi sabi.",
                  },
                  {
                    title: "Be kind to yourself",
                    description: "Judgment hinders growth. Use mental time travel for perspective.",
                  },
                  {
                    title: "Build harmonious passion",
                    description: "Be pulled, not pushed. Transform practice into play.",
                  },
                  {
                    title: "Use the 21-day protocol",
                    description: "Create context-independent habits that stick.",
                  },
                  {
                    /* Replaced "Measure consistently" with "Your activity is your success" */
                    title: "Your activity is your success",
                    description: "Focus on consistent action and daily progress, not just outcomes.",
                  },
                ]}
              />

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white gap-2">
                Continue to Module Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 13: Module Assessment - UPDATED index from 14 to 13 */}
          {currentSectionIndex === 13 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-heading">Module 2 Assessment</h2>
                <p className="text-muted-foreground">
                  Complete all exercises and questions correctly to unlock Module 3. You must get all answers correct to
                  proceed.
                </p>
              </div>

              {/* Matching Game - Learning Concepts */}
              <MatchingGame
                title="1. Learning Concepts Matching Game"
                pairs={[
                  {
                    id: "limbic",
                    term: "Limbic Friction",
                    definition: "The stress created from entering into an unknown behavior or situation",
                  },
                  {
                    id: "bracketing",
                    term: "Task Bracketing",
                    definition: "Writing down expected negative and positive feelings before and after a task",
                  },
                  {
                    id: "sponge",
                    term: "Sponge (Absorptive Capacity)",
                    definition: "Being proactive and growth-oriented in seeking and applying new knowledge",
                  },
                  {
                    id: "harmonious",
                    term: "Harmonious Passion",
                    definition: "Being pulled toward an activity rather than pushed into it",
                  },
                  {
                    id: "wabi",
                    term: "Wabi Sabi",
                    definition: "The art of honoring beauty in imperfection; striving for excellence over perfection",
                  },
                ]}
                onComplete={(correct) => handleQuizComplete("matching", correct)}
              />

              {/* Text Input Exercise - 21-Day Protocol */}
              <TextInputExercise
                title="2. Your 21-Day Habit Protocol"
                prompt="Write down 6 specific habits you will implement using the 21-day protocol. For each habit, describe how you will use task bracketing to overcome limbic friction."
                placeholder="Habit 1: Daily prospecting calls (30 min)
Task Bracketing: I expect to feel anxious before starting, but accomplished after completing...

Habit 2: ..."
                minLength={150}
                onComplete={() => handleQuizComplete("textInput", true)}
              />

              {/* Multiple Choice Questions */}
              <MultipleChoice
                question="3. According to the research on learning, what happens when students are encouraged to make mistakes while learning new information?"
                options={[
                  {
                    id: "a",
                    text: "They become discouraged and give up more easily",
                    isCorrect: false,
                    feedback: "Actually, the opposite occurs when mistakes are embraced as part of learning.",
                  },
                  {
                    id: "b",
                    text: "They end up making fewer mistakes on tests later",
                    isCorrect: true,
                    feedback:
                      "Correct! When students guess wrong before being given the right answer, they're less likely to make errors later. Early mistakes help us remember and motivate continued learning.",
                  },
                  {
                    id: "c",
                    text: "They perform the same as students who avoid mistakes",
                    isCorrect: false,
                    feedback:
                      "Research shows a significant advantage for those who make more mistakes during learning.",
                  },
                  {
                    id: "d",
                    text: "They take longer to master the material",
                    isCorrect: false,
                    feedback: "Making more mistakes actually accelerates learning, not slows it down.",
                  },
                ]}
                explanation="The mistake principle teaches us that making more mistakes during the learning process leads to faster improvement and fewer errors in actual performance."
                onAnswer={(correct) => handleQuizComplete("quiz1", correct)}
              />

              <MultipleChoice
                question="4. What is the difference between context-independent and context-dependent habits?"
                options={[
                  {
                    id: "a",
                    text: "Context-independent habits require motivation; context-dependent habits are automatic",
                    isCorrect: false,
                    feedback: "This is backwards—context-independent habits are the automatic ones.",
                  },
                  {
                    id: "b",
                    text: "Context-independent habits are performed regardless of how you feel; context-dependent habits require specific states of mind",
                    isCorrect: true,
                    feedback:
                      "Correct! Context-independent habits become automatic and aren't affected by mood or circumstances. These are the sustainable habits we want to build.",
                  },
                  {
                    id: "c",
                    text: "There is no meaningful difference between the two types",
                    isCorrect: false,
                    feedback: "The difference is crucial—it determines whether habits stick long-term or fade away.",
                  },
                  {
                    id: "d",
                    text: "Context-dependent habits are more reliable than context-independent ones",
                    isCorrect: false,
                    feedback:
                      "Context-dependent habits are actually less reliable because they depend on circumstances.",
                  },
                ]}
                explanation="The goal of the 21-day protocol is to create context-independent habits that you perform automatically, regardless of your emotional state or circumstances."
                onAnswer={(correct) => handleQuizComplete("quiz2", correct)}
              />

              <MultipleChoice
                question="5. What is the Absorptive Capacity Matrix's ideal state for learning and growth?"
                options={[
                  {
                    id: "a",
                    text: "Rubber - creating a defensive bubble",
                    isCorrect: false,
                    feedback: "Rubber represents being reactive and ego-driven, which blocks learning.",
                  },
                  {
                    id: "b",
                    text: "Clay - being coachable but passive",
                    isCorrect: false,
                    feedback: "While clay is better than rubber, it's still reactive. We need to be more proactive.",
                  },
                  {
                    id: "c",
                    text: "Sponge - proactive and growth-oriented",
                    isCorrect: true,
                    feedback:
                      "Correct! Being a sponge means you're both proactive in seeking knowledge AND growth-oriented in applying it. This is the ideal state for continuous improvement.",
                  },
                  {
                    id: "d",
                    text: "Teflon - nothing sticks to you",
                    isCorrect: false,
                    feedback: "Teflon is proactive but ego-driven, meaning information doesn't stick or get applied.",
                  },
                ]}
                explanation="To maximize your learning and growth, aim to be a sponge: proactively seeking knowledge from credible sources and applying it with a growth-oriented mindset."
                onAnswer={(correct) => handleQuizComplete("quiz3", correct)}
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
                        🎉 Module 2 Complete!
                      </h3>
                      <p className="text-green-800 dark:text-green-200 mb-4">
                        Congratulations! You've successfully completed all sections and assessments for Module 2. You
                        now understand how to learn effectively, build context-independent habits, and measure your
                        progress.
                      </p>
                      <p className="text-green-800 dark:text-green-200 mb-4 font-semibold">
                        Perfect score! You answered all questions correctly. 🌟
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
