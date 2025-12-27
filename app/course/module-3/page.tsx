/**
 * MODULE 3: WIN WITH NO
 * Jim Camp and Chris Voss negotiation systems
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Brain, Target } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { MultipleChoice } from "@/components/learning/multiple-choice"

export default function Module3Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<{
    campQ1: boolean
    campQ2: boolean
    campQ3: boolean
    campQ4: boolean
    campQ5: boolean
    campQ6: boolean
    campQ7: boolean
    campQ8: boolean
    vossQ1: boolean
    vossQ2: boolean
    vossQ3: boolean
    vossQ4: boolean
    vossQ5: boolean
    vossQ6: boolean
    vossQ7: boolean
    vossQ8: boolean
  }>({
    campQ1: false,
    campQ2: false,
    campQ3: false,
    campQ4: false,
    campQ5: false,
    campQ6: false,
    campQ7: false,
    campQ8: false,
    vossQ1: false,
    vossQ2: false,
    vossQ3: false,
    vossQ4: false,
    vossQ5: false,
    vossQ6: false,
    vossQ7: false,
    vossQ8: false,
  })

  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<string>>(new Set())
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false)

  const MODULE_ID = "module-3"
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

  const allQuizAnswered = attemptedQuestions.size === 16
  const allQuizComplete = Object.values(quizResults).every((result) => result === true)

  useEffect(() => {
    // Mark the module-assessment section as complete when all quiz questions are answered correctly
    if (assessmentSubmitted && allQuizComplete && currentSectionIndex === 4) {
      const assessmentSection = sections[4]
      if (assessmentSection && assessmentSection.id === "module-assessment") {
        markSectionComplete(MODULE_ID, assessmentSection.id)
        setCurrentPosition(MODULE_ID, assessmentSection.id)
      }
    }
  }, [assessmentSubmitted, allQuizComplete, currentSectionIndex, sections, markSectionComplete, setCurrentPosition])

  const handleSubmitAssessment = () => {
    setAssessmentSubmitted(true)
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
        router.push(`/course/module-3?section=${nextSection.id}`)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
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
            <h1 className="text-4xl font-bold mb-2">Module 3: Win With NO</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Master the negotiation systems of Jim Camp and Chris Voss
            </p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: Module Overview */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6" id="module-overview">
              <h2 className="text-3xl font-bold text-brand-green">Module Overview</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-8 w-8 text-brand-orange" />
                  <h3 className="text-xl font-semibold">The Neuroscience of "No"</h3>
                </div>
                <p className="text-lg leading-relaxed mb-4">
                  Recall the section on neurology that discussed the autonomic nervous system. When someone is asked to
                  agree to something before they are ready, their <strong>sympathetic nervous system</strong> kicks in
                  and all their walls go up to defend against an unwelcome request.
                </p>
                <p className="text-lg leading-relaxed">
                  Conversely, when people are allowed to say "no" and feel in control of a situation, their{" "}
                  <strong>parasympathetic nervous system</strong> is responding and they can better engage in dialogue.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-brand-green" />
                  <h3 className="text-xl font-semibold">The Goal of the Salesperson</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  Keep prospects engaged and feel comfortable enough to express their wants or needs{" "}
                  <strong>without tension</strong>. To achieve this, the salesperson must also be in a relaxed and
                  comfortable state of mind to keep the dialogue moving smoothly.
                </p>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-green">Jim Camp</h3>
                  <p className="text-sm mb-2 font-semibold">Author of "Start With No"</p>
                  <p className="text-sm leading-relaxed">
                    A systematic way to keep counterparts relaxed and feeling in control through mission-driven,
                    emotion-neutral negotiation.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">Chris Voss</h3>
                  <p className="text-sm mb-2 font-semibold">Author of "Never Split the Difference"</p>
                  <p className="text-sm leading-relaxed">
                    FBI lead hostage negotiator who teaches tactical empathy, calibrated questions, and emotional
                    intelligence.
                  </p>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 1: Jim Camp System */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6" id="camp-system">
              <h2 className="text-3xl font-bold text-brand-green">Jim Camp's System: Start With No</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">The Seven Core Principles</h3>
                <p className="text-lg">
                  A systematic approach to keeping counterparts relaxed and in control while maintaining your own
                  emotional neutrality.
                </p>
              </Card>

              {/* Principle 1 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">"No" Is a Safe Word</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Camp teaches that the word "no" reduces pressure, increases honesty, and restores control to the
                    other party.
                  </p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold mb-2">Key Insight:</p>
                    <p>It is not rejection — it is clarity.</p>
                    <p className="text-brand-green font-semibold">Clarity leads to better decisions.</p>
                  </div>
                </div>
              </Card>

              {/* Principle 2 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold">Decisions, Not Agreements</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Your job is not to "close deals." Your job is to help the other person make a clear decision—even
                    if that decision is "no."
                  </p>
                  <div className="p-4 bg-brand-orange/10 rounded">
                    <p className="font-semibold text-brand-orange">
                      Decision-making is the source of forward movement.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Principle 3 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold">Mission and Purpose Anchor All Behavior</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">Every interaction must start with:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>A mission</strong> (what outcome you want to help the other side reach)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>A purpose</strong> (why you're taking this step now)
                      </span>
                    </li>
                  </ul>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p>This prevents emotional manipulation, sales theatrics, and neediness.</p>
                  </div>
                </div>
              </Card>

              {/* Principle 4 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold">Neediness Is the Enemy</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed text-lg font-semibold text-brand-orange">
                    If you need the sale, you lose the negotiation.
                  </p>
                  <p className="leading-relaxed">
                    Camp trains you to remove emotional investment so you can think clearly, listen fully, and behave
                    strategically.
                  </p>
                </div>
              </Card>

              {/* Principle 5 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    5
                  </div>
                  <h3 className="text-xl font-semibold">Ask, Don't Tell</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    High-performance negotiation relies on questions, not presentations. Camp's{" "}
                    <strong>Validating Questions</strong> uncover:
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded">• Vision</div>
                    <div className="p-3 bg-muted rounded">• Problems</div>
                    <div className="p-3 bg-muted rounded">• Consequences</div>
                    <div className="p-3 bg-muted rounded">• Resources</div>
                    <div className="p-3 bg-muted rounded">• Decision constraints</div>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold text-brand-green">The other side builds the case — not you.</p>
                  </div>
                </div>
              </Card>

              {/* Principle 6 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    6
                  </div>
                  <h3 className="text-xl font-semibold">The Negotiator Controls Themselves, Not Others</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">Camp rejects persuasion and pressure. A strong negotiator controls:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                      <span>Their emotions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                      <span>Their behaviors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                      <span>Their pace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                      <span>Their planning</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-brand-orange/10 rounded">
                    <p className="font-semibold">…not the other person's feelings.</p>
                  </div>
                </div>
              </Card>

              {/* Principle 7 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    7
                  </div>
                  <h3 className="text-xl font-semibold">The Checklist Is the System</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Camp teaches that elite performance comes from consistent structure, not charisma.
                  </p>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold text-brand-green">
                      Preparation reduces fear, increases clarity, and keeps you from improvising under pressure.
                    </p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 2: Chris Voss System - Part 1 */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="voss-system-1">
              <h2 className="text-3xl font-bold text-brand-orange">Chris Voss: Never Split the Difference (Part 1)</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-green/10">
                <h3 className="text-xl font-semibold mb-3">FBI Hostage Negotiation Principles</h3>
                <p className="text-lg leading-relaxed">
                  Chris Voss reframes negotiation as an emotional, psychological, and behavioral science rather than a
                  logical argument. Drawing from his work as the FBI's lead international hostage negotiator, Voss
                  rejects compromise and "win-win" fantasies.
                </p>
                <p className="text-lg font-semibold text-brand-orange mt-3">
                  Real negotiation is not splitting the difference—it is uncovering information, building trust, and
                  guiding behavior through emotional intelligence.
                </p>
              </Card>

              {/* Concept 1 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">Negotiation Runs on Emotion, Not Logic</h3>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    Humans make decisions emotionally and justify them afterward. The negotiator's job is to create
                    psychological safety so the counterpart will talk, reveal information, and collaborate.
                  </p>

                  <div className="p-4 bg-brand-orange/10 rounded">
                    <h4 className="font-semibold mb-2 text-brand-orange">Tactical Empathy</h4>
                    <p>
                      The disciplined effort to understand the other person's perspective—fears, pressures,
                      motivations—and articulate it without judgment.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded">
                      <h4 className="font-semibold mb-2">Mirroring</h4>
                      <p className="text-sm">Repeat the last 1–3 words to draw out more information.</p>
                    </div>
                    <div className="p-4 bg-muted rounded">
                      <h4 className="font-semibold mb-2">Labeling</h4>
                      <p className="text-sm">Identify emotions or dynamics ("It seems like…").</p>
                    </div>
                  </div>

                  <p className="text-sm italic">
                    These tools calm the other side, lower tension, and expose what matters most.
                  </p>
                </div>
              </Card>

              {/* Concept 2 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold">Calibrated Questions: Steering Without Pushing</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">Voss replaces arguments with How and What questions:</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-brand-green/10 rounded">"How am I supposed to do that?"</div>
                    <div className="p-3 bg-brand-green/10 rounded">
                      "What is the biggest challenge you're facing?"
                    </div>
                    <div className="p-3 bg-brand-green/10 rounded">
                      "What about this works or doesn't work for you?"
                    </div>
                  </div>
                  <p className="leading-relaxed">
                    Calibrated questions slow the pace, surface constraints, and shift problem-solving onto the
                    counterpart—making them a partner, not an adversary.
                  </p>
                </div>
              </Card>

              {/* Concept 3 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold">Summaries, Labels & The Power of "That's Right"</h3>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    Before asking for anything, Voss teaches you to create a neutral summary of the other side's
                    world—built entirely from their fears, frustrations, constraints, and motivations.
                  </p>

                  <div className="space-y-2">
                    <p className="font-semibold">This summary uses labels to reflect their internal state:</p>
                    <div className="p-3 bg-muted rounded text-sm">
                      "It sounds like you're under pressure to avoid a mistake."
                    </div>
                    <div className="p-3 bg-muted rounded text-sm">
                      "It seems like you've been burned before and want to avoid a repeat."
                    </div>
                    <div className="p-3 bg-muted rounded text-sm">
                      "It looks like flexibility is extremely important to you."
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-brand-orange/20 to-brand-green/20 border-2 border-brand-orange rounded">
                    <h4 className="font-semibold mb-2 text-brand-orange text-lg">Triggering "That's Right"</h4>
                    <p className="mb-2">The goal of the summary is to hear: <strong>"That's right."</strong></p>
                    <p className="text-sm mb-2">This phrase signals:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Deep alignment</li>
                      <li>• Emotional safety</li>
                      <li>• Trust</li>
                      <li>• Lowered defenses</li>
                      <li>• Readiness to collaborate</li>
                    </ul>
                    <p className="font-semibold text-brand-green mt-3">
                      "That's right" is the pivot point where a counterpart stops resisting and starts engaging.
                    </p>
                    <p className="font-semibold mt-2">Only after this moment does real negotiation begin.</p>
                  </div>
                </div>
              </Card>

              {/* Concept 4 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold">The Three Types of Yes</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Once you reach "That's right," Voss warns not to chase "yes." Most yeses are traps.
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                      <h4 className="font-semibold mb-2">1. Counterfeit Yes</h4>
                      <p className="text-sm mb-2">The most common. Said to:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Avoid conflict</li>
                        <li>• End the conversation</li>
                        <li>• Gain advantage</li>
                        <li>• Get you off the phone</li>
                      </ul>
                      <p className="font-semibold text-sm mt-2">It is NOT agreement.</p>
                    </div>

                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                      <h4 className="font-semibold mb-2">2. Confirmation Yes</h4>
                      <p className="text-sm">A simple acknowledgment of facts. Useful but meaningless.</p>
                    </div>

                    <div className="p-4 bg-green-50 border-l-4 border-brand-green rounded">
                      <h4 className="font-semibold mb-2">3. Commitment Yes</h4>
                      <p className="text-sm mb-2">
                        The only yes that matters—one tied to action. It happens only after the counterpart feels:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Understood</li>
                        <li>• Safe</li>
                        <li>• Heard</li>
                        <li>• Unpressured</li>
                      </ul>
                      <p className="font-semibold text-sm mt-2 text-brand-green">
                        It is a yes with a "how to proceed."
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold">The sequence is:</p>
                    <p className="text-lg">Summary → "That's Right" → THEN pursue a real yes.</p>
                  </div>
                </div>
              </Card>

              {/* Concept 5 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    5
                  </div>
                  <h3 className="text-xl font-semibold">Why "No" Is More Valuable Than "Yes"</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Voss teaches that "no" is the beginning of real conversation, not the end.
                  </p>
                  <div className="p-4 bg-brand-orange/10 rounded">
                    <p className="font-semibold mb-2">"No" gives people:</p>
                    <ul className="space-y-1">
                      <li>• Safety</li>
                      <li>• Autonomy</li>
                      <li>• Control</li>
                      <li>• Boundaries</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">You use no-oriented questions to lower defenses:</p>
                    <div className="p-3 bg-muted rounded text-sm">"Is now a bad time?"</div>
                    <div className="p-3 bg-muted rounded text-sm">"Is it a ridiculous idea to explore this?"</div>
                    <div className="p-3 bg-muted rounded text-sm">"Would it be impossible to consider…?"</div>
                  </div>
                  <p className="leading-relaxed font-semibold text-brand-orange">
                    Once they can say "no," they stop feeling trapped—and start telling you the truth.
                  </p>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 3: Chris Voss System - Part 2 */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="voss-system-2">
              <h2 className="text-3xl font-bold text-brand-orange">Chris Voss: Never Split the Difference (Part 2)</h2>

              {/* Concept 6 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    6
                  </div>
                  <h3 className="text-xl font-semibold">Accusation Audits: Disarming Negatives</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    Before making your ask, list every bad thing they might believe about you:
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded text-sm">"You might think I'm here to pressure you."</div>
                    <div className="p-3 bg-muted rounded text-sm">
                      "You may feel like this is going to waste your time."
                    </div>
                    <div className="p-3 bg-muted rounded text-sm">
                      "You probably think saying yes creates risk for you."
                    </div>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold text-brand-green">Naming negatives shrinks them.</p>
                    <p className="font-semibold text-red-600">Ignoring them allows them to grow.</p>
                  </div>
                </div>
              </Card>

              {/* Concept 7 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    7
                  </div>
                  <h3 className="text-xl font-semibold">Tone Control & Strategic Silence</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">Voss emphasizes tone as much as words:</p>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded">
                      <h4 className="font-semibold mb-1">Late-Night FM DJ Voice</h4>
                      <p className="text-sm">Calm and steady; creates authority and safety</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded">
                      <h4 className="font-semibold mb-1">Positive/Playful Voice</h4>
                      <p className="text-sm">Friendly and flexible; keeps the conversation open</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded">
                      <h4 className="font-semibold mb-1">Assertive Voice</h4>
                      <p className="text-sm">Avoid; triggers defensiveness</p>
                    </div>
                  </div>
                  <div className="p-4 bg-brand-orange/10 rounded">
                    <p className="font-semibold mb-2">Strategic Silence</p>
                    <p className="text-sm">
                      After a label or calibrated question, stop talking. Silence forces the counterpart to reveal
                      more.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Concept 8 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    8
                  </div>
                  <h3 className="text-xl font-semibold">Bargaining Without Compromising Value</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">Voss rejects splitting the difference. Instead he teaches:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>The Ackerman Model — a structured bargaining strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Anchoring (in certain situations)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>Non-monetary trades that hold high perceived value</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-brand-green/10 rounded">
                    <p className="font-semibold text-brand-green">
                      Bargaining becomes a discovery process—not a price fight.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Concept 9 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    9
                  </div>
                  <h3 className="text-xl font-semibold">Deadlines, Loss Aversion & Behavioral Drivers</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed text-lg font-semibold text-brand-orange">
                    People fear losses twice as much as they value gains.
                  </p>
                  <p className="leading-relaxed">
                    Frame your message around what the counterpart stands to lose—not gain.
                  </p>
                  <div className="p-4 bg-brand-orange/10 rounded">
                    <p className="font-semibold mb-2">Also, most deadlines are:</p>
                    <ul className="space-y-1">
                      <li>• Psychological</li>
                      <li>• Flexible</li>
                      <li>• Invented to create pressure</li>
                    </ul>
                    <p className="mt-2">Understanding this prevents panic-based concessions.</p>
                  </div>
                </div>
              </Card>

              {/* Concept 10 */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    10
                  </div>
                  <h3 className="text-xl font-semibold">The Negotiator's Mindset</h3>
                </div>
                <div className="space-y-3">
                  <p className="leading-relaxed">Elite negotiators share:</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-brand-green/10 rounded text-center">
                      <p className="font-semibold text-lg">1. Emotional Calm</p>
                    </div>
                    <div className="p-4 bg-brand-orange/10 rounded text-center">
                      <p className="font-semibold text-lg">2. Insatiable Curiosity</p>
                    </div>
                    <div className="p-4 bg-brand-green/10 rounded text-center">
                      <p className="font-semibold text-lg">3. Patience</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-brand-orange/20 to-brand-green/20 border-2 border-brand-orange rounded">
                    <p className="text-lg font-semibold text-center mb-2">
                      Negotiation is a slow uncovering of truth.
                    </p>
                    <p className="text-center">
                      When you make people feel safe, understood, and unpressured, they willingly reveal the path to an
                      agreement.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3 text-brand-orange">Voss's Philosophy in One Line:</h3>
                <p className="text-lg font-semibold text-center">
                  Understand the human first. "No" is progress. "That's right" is the breakthrough. "Yes" must be
                  earned.
                </p>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 4: Module Assessment */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="module-assessment">
              <h2 className="text-3xl font-bold text-brand-green">Module Assessment</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg">Test your understanding of Jim Camp and Chris Voss negotiation systems.</p>
              </Card>

              {/* Camp Questions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-green">Jim Camp System Questions</h3>

                <MultipleChoice
                  question="What is the primary purpose of a Mission and Purpose statement in the Camp system?"
                  options={[
                    {
                      id: "a",
                      text: "To establish your authority and expertise in the negotiation",
                      isCorrect: false,
                      feedback: "While authority matters, Mission and Purpose focuses on emotional neutrality and serving others, not establishing dominance.",
                    },
                    {
                      id: "b",
                      text: "To clearly communicate your value proposition to the counterpart",
                      isCorrect: false,
                      feedback: "Mission and Purpose is internal guidance for you, not a message to deliver to the counterpart.",
                    },
                    {
                      id: "c",
                      text: "To define why you are in the negotiation and who you serve, keeping you emotionally neutral",
                      isCorrect: true,
                      feedback: "Correct! A Mission and Purpose defines why you are in the negotiation and who you serve. It keeps you emotionally neutral, prevents you from chasing the deal, and forces you to behave in ways aligned with discipline, clarity, and responsibility—not neediness.",
                    },
                    {
                      id: "d",
                      text: "To outline your minimum acceptable terms before negotiation begins",
                      isCorrect: false,
                      feedback: "Mission and Purpose is about behavioral discipline and emotional control, not setting price floors or minimums.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ1", correct)}
                />

                <MultipleChoice
                  question='According to Jim Camp, why is "No" considered a decision and not a failure?'
                  options={[
                    {
                      id: "a",
                      text: '"No" reveals the counterpart\'s negotiating position and opens the door to compromise',
                      isCorrect: false,
                      feedback: 'Camp doesn\'t focus on compromise or positioning—"No" is about clarity, safety, and avoiding false commitments.',
                    },
                    {
                      id: "b",
                      text: '"No" is a valid decision that prevents wasted time pursuing a "maybe" or a counterfeit yes and allows the adversary to feel safe',
                      isCorrect: true,
                      feedback: 'Correct! "No" is a valid decision that reveals boundaries, concerns, or lack of fit. It prevents wasted time pursuing a "maybe" or a counterfeit yes. It protects you from emotional attachment and allows the adversary to feel safe.',
                    },
                    {
                      id: "c",
                      text: '"No" creates urgency that motivates the counterpart to reconsider their position',
                      isCorrect: false,
                      feedback: 'Camp rejects using urgency or pressure. "No" provides clarity and emotional safety, not motivation through scarcity.',
                    },
                    {
                      id: "d",
                      text: '"No" provides leverage to negotiate better terms in the next round',
                      isCorrect: false,
                      feedback: 'Camp views "No" as a final decision worthy of respect, not a tactical move for leverage in future rounds.',
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ2", correct)}
                />

                <MultipleChoice
                  question="How does the Camp principle of not needing the deal influence your emotional state?"
                  options={[
                    {
                      id: "a",
                      text: "It keeps you calm, rational, and focused while eliminating emotional pressure",
                      isCorrect: true,
                      feedback: "Correct! When you do not need the deal, you remain calm, rational, and focused. It eliminates emotional pressure, which reduces mistakes, and it increases your power because you cannot be manipulated by urgency, deadlines, or neediness.",
                    },
                    {
                      id: "b",
                      text: "It creates emotional detachment that allows you to negotiate more aggressively",
                      isCorrect: false,
                      feedback: "Not needing the deal isn't about aggression—it's about calm rationality and preventing manipulation, not increasing aggressive behavior.",
                    },
                    {
                      id: "c",
                      text: "It reduces your motivation to thoroughly understand the adversary's needs",
                      isCorrect: false,
                      feedback: "Not needing doesn't reduce diligence—it actually allows you to listen more objectively without emotional interference.",
                    },
                    {
                      id: "d",
                      text: "It builds confidence by ensuring you always have alternative options ready",
                      isCorrect: false,
                      feedback: "While alternatives help, the principle is about emotional neutrality regardless of options, not just having a Plan B.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ3", correct)}
                />

                <MultipleChoice
                  question='What is the difference between "pain" and "problem" in the Camp system?'
                  options={[
                    {
                      id: "a",
                      text: "Pain is the immediate symptom; Problem is the root cause you must address",
                      isCorrect: false,
                      feedback: "While this sounds logical, Camp defines them differently: Pain is emotional impact, Problem is the structural issue—both must be understood, not just root causes.",
                    },
                    {
                      id: "b",
                      text: "Pain is what motivates action; Problem is what requires a solution",
                      isCorrect: false,
                      feedback: "Both pain and problem are important, but the key distinction is emotional vs. logical dimensions, not motivation vs. solution.",
                    },
                    {
                      id: "c",
                      text: "Problem is what the adversary can articulate; Pain is the deeper concern they may not express",
                      isCorrect: false,
                      feedback: "Both must be explicitly discovered through questions—Camp forbids assumptions about unstated concerns.",
                    },
                    {
                      id: "d",
                      text: "Pain is emotional impact; Problem is the logical, structural issue causing the pain",
                      isCorrect: true,
                      feedback: "Correct! Pain = the emotional impact or discomfort the adversary feels. Problem = the logical, structural issue causing the pain. You must identify both because value is only meaningful when tied to the adversary's emotional motivation and the underlying issue.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ4", correct)}
                />

                <MultipleChoice
                  question='How does Camp define "the adversary"?'
                  options={[
                    {
                      id: "a",
                      text: "The decision-maker who controls whether the deal moves forward",
                      isCorrect: false,
                      feedback: "While identifying decision-makers matters, Camp defines the adversary more broadly as the person you serve, not just control.",
                    },
                    {
                      id: "b",
                      text: "A neutral party whose interests you must balance with your own",
                      isCorrect: false,
                      feedback: "Camp's system isn't about balancing interests—it's about serving the adversary by making their world better.",
                    },
                    {
                      id: "c",
                      text: "Simply the person on the other side; your responsibility is to make their world better",
                      isCorrect: true,
                      feedback: "Correct! The adversary is simply the person on the other side of the negotiation—not an enemy. Your responsibility is to make their world better, clarify their decisions, protect them from bad decisions, and guide them toward clarity without manipulation.",
                    },
                    {
                      id: "d",
                      text: "The individual or group with opposing objectives in the negotiation",
                      isCorrect: false,
                      feedback: "This frames negotiation as opposition. Camp teaches that your role is service and guidance, not opposition.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ5", correct)}
                />

                <MultipleChoice
                  question="Why does the Camp system forbid assumptions?"
                  options={[
                    {
                      id: "a",
                      text: "Assumptions save time and help you move negotiations forward faster",
                      isCorrect: false,
                      feedback: "Assumptions rarely save time—they create false narratives that lead to mistakes and wasted effort.",
                    },
                    {
                      id: "b",
                      text: "Assumptions are necessary to show expertise and industry knowledge",
                      isCorrect: false,
                      feedback: "Camp values real data over assumed expertise. Assumptions create emotional errors, not credibility.",
                    },
                    {
                      id: "c",
                      text: "Assumptions create false narratives; instead use questions, listening, and real data",
                      isCorrect: true,
                      feedback: "Correct! Assumptions create false narratives, emotional errors, and bad decisions. Instead, Camp recommends asking questions, letting the adversary talk, hearing real data, maintaining emotional detachment, and listening for what is actually said.",
                    },
                    {
                      id: "d",
                      text: "Assumptions should only be avoided in the early stages of negotiation",
                      isCorrect: false,
                      feedback: "Camp forbids assumptions at all stages of negotiation—they create false narratives and emotional errors throughout the process.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ6", correct)}
                />

                <MultipleChoice
                  question="What does Camp mean by saying 'It's never about you'?"
                  options={[
                    {
                      id: "a",
                      text: "You should remain invisible and let the adversary do all the talking",
                      isCorrect: false,
                      feedback: "Being invisible isn't the point—you still guide the conversation, but the focus is on the adversary's world.",
                    },
                    {
                      id: "b",
                      text: "The negotiation is entirely about the adversary's problems, constraints, and mission—not your goals",
                      isCorrect: true,
                      feedback: "Correct! The negotiation is entirely about the adversary's problems, constraints, risks, and mission—not your goals. This forces you to stop selling, start asking, stay curious, avoid self-focused behavior, and make decisions based only on their real situation.",
                    },
                    {
                      id: "c",
                      text: "Your emotions and feelings don't matter in negotiations",
                      isCorrect: false,
                      feedback: "Your emotional control does matter, but 'It's never about you' means the negotiation content focuses on their needs, not yours.",
                    },
                    {
                      id: "d",
                      text: "You should always prioritize the adversary's interests over your own",
                      isCorrect: false,
                      feedback: "It's not about prioritizing their interests—it's about focusing the negotiation discussion on their world to serve them effectively.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ7", correct)}
                />

                <MultipleChoice
                  question="How does the Camp system evaluate success in negotiation?"
                  options={[
                    {
                      id: "a",
                      text: "Success is reaching an agreement that benefits both parties equally",
                      isCorrect: false,
                      feedback: "Camp doesn't focus on equal benefits or balanced outcomes—success is about your disciplined behavior and process adherence.",
                    },
                    {
                      id: "b",
                      text: "Success is defined by your behavior and following the process, not the outcome",
                      isCorrect: true,
                      feedback: "Correct! Success is defined by your behavior, not the deal. If you follow the system—mission, purpose, discipline, questions, data-gathering—you win regardless of outcome. The process protects you from emotional errors, even if the deal does not close.",
                    },
                    {
                      id: "c",
                      text: "Success means achieving your mission while maintaining emotional control throughout",
                      isCorrect: false,
                      feedback: "Emotional control is key, but success is defined by following the process—even if the deal doesn't close and the mission isn't achieved.",
                    },
                    {
                      id: "d",
                      text: "Success is measured by how well you understood and addressed the adversary's pain and problem",
                      isCorrect: false,
                      feedback: "Understanding pain and problem is part of the process, but Camp defines success by your disciplined behavior, not just understanding.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("campQ8", correct)}
                />
              </div>

              {/* Voss Questions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-orange">Chris Voss System Questions</h3>

                <MultipleChoice
                  question="What is Tactical Empathy in the Voss system?"
                  options={[
                    {
                      id: "a",
                      text: "Building genuine rapport by finding common ground with the counterpart",
                      isCorrect: false,
                      feedback: "While rapport helps, Tactical Empathy is specifically about understanding and verbalizing emotions strategically, not just building common ground.",
                    },
                    {
                      id: "b",
                      text: "Demonstrating sympathy for the counterpart's difficult situation",
                      isCorrect: false,
                      feedback: "Tactical Empathy isn't sympathy or feeling sorry for them—it's strategic understanding and verbalization of their emotions to guide behavior.",
                    },
                    {
                      id: "c",
                      text: "Adapting your communication style to match the counterpart's personality type",
                      isCorrect: false,
                      feedback: "Adaptation is useful, but Tactical Empathy specifically involves understanding and verbalizing emotions, not just matching communication styles.",
                    },
                    {
                      id: "d",
                      text: "The deliberate act of understanding and verbalizing the other person's emotions and perspective",
                      isCorrect: true,
                      feedback: "Correct! Tactical Empathy is the deliberate act of understanding the other person's emotions, fears, pressures, and perspective—and demonstrating that understanding verbally. Unlike rapport-building, it is not friendliness or similarity; it is psychological insight used to guide behavior.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ1", correct)}
                />

                <MultipleChoice
                  question="How do mirroring and labeling work together?"
                  options={[
                    {
                      id: "a",
                      text: "Mirroring keeps them talking; labeling identifies emotions, triggering deeper disclosure",
                      isCorrect: true,
                      feedback: "Correct! Mirroring keeps the other person talking and encourages them to expand. Labeling identifies emotions or dynamics, reducing defensiveness and creating emotional safety. Used together, they trigger deeper disclosure and reveal motive, pressure points, and hidden concerns.",
                    },
                    {
                      id: "b",
                      text: "Mirroring validates their position; labeling reframes it in your terms",
                      isCorrect: false,
                      feedback: "Labeling doesn't reframe in your terms—it identifies their emotions to create safety and trigger disclosure.",
                    },
                    {
                      id: "c",
                      text: "Labeling establishes rapport; mirroring maintains it throughout the conversation",
                      isCorrect: false,
                      feedback: "Both are active techniques that work simultaneously—mirroring encourages expansion while labeling identifies emotions for safety.",
                    },
                    {
                      id: "d",
                      text: "Mirroring shows active listening; labeling demonstrates your expertise",
                      isCorrect: false,
                      feedback: "Labeling isn't about showing expertise—it identifies emotions to reduce defensiveness and create psychological safety.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ2", correct)}
                />

                <MultipleChoice
                  question="What is the meaning of 'That's right' in Voss's system?"
                  options={[
                    {
                      id: "a",
                      text: "'That's right' confirms factual accuracy and moves the conversation forward",
                      isCorrect: false,
                      feedback: "That's a confirmation yes. 'That's right' is deeper—it signals they feel fully understood and psychologically aligned, not just factually correct.",
                    },
                    {
                      id: "b",
                      text: "'That's right' signals the counterpart feels fully understood and aligned—a psychological breakthrough",
                      isCorrect: true,
                      feedback: "Correct! 'That's right' indicates the counterpart feels fully understood and aligned. It is a psychological breakthrough that reduces resistance. Most 'yes' responses are counterfeit or premature, while 'That's right' signals true collaboration.",
                    },
                    {
                      id: "c",
                      text: "'That's right' indicates agreement with your proposed solution or next steps",
                      isCorrect: false,
                      feedback: "'That's right' isn't about agreement with proposals—it signals they feel understood after you've summarized their perspective accurately.",
                    },
                    {
                      id: "d",
                      text: "'That's right' shows the counterpart is ready to commit to action",
                      isCorrect: false,
                      feedback: "'That's right' indicates psychological alignment and understanding, but doesn't necessarily mean commitment to action yet.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ3", correct)}
                />

                <MultipleChoice
                  question='What are the three types of "Yes"?'
                  options={[
                    {
                      id: "a",
                      text: "Conditional (requires negotiation), Tentative (needs more information), Final (closes the deal)",
                      isCorrect: false,
                      feedback: "Voss categorizes yes differently: Counterfeit (avoids pressure), Confirmation (factual), and Commitment (tied to action).",
                    },
                    {
                      id: "b",
                      text: "Emotional (based on feeling), Logical (based on reasoning), Strategic (based on calculated advantage)",
                      isCorrect: false,
                      feedback: "Voss doesn't categorize yes by motivation source—his categories are Counterfeit, Confirmation, and Commitment based on intent and follow-through.",
                    },
                    {
                      id: "c",
                      text: "Counterfeit (avoids pressure), Confirmation (factual), Commitment (tied to action)—only Commitment matters",
                      isCorrect: true,
                      feedback: "Correct! Counterfeit Yes: Used to avoid pressure or end the conversation. Confirmation Yes: A factual acknowledgment with no commitment. Commitment Yes: The only yes tied to action and follow-through. Only the commitment yes matters because it reflects real alignment and willingness to proceed with a how to proceed.",
                    },
                    {
                      id: "d",
                      text: "Verbal (spoken explicitly), Implicit (shown through behavior), Written (formally documented)",
                      isCorrect: false,
                      feedback: "Voss's categories are about the quality and intent of yes: Counterfeit, Confirmation, and Commitment—not the format.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ4", correct)}
                />

                <MultipleChoice
                  question='How do calibrated questions like "How am I supposed to do that?" shift responsibility?'
                  options={[
                    {
                      id: "a",
                      text: "They transfer ownership of the problem from you to the counterpart",
                      isCorrect: false,
                      feedback: "Calibrated questions don't transfer ownership—they invite collaboration where the counterpart helps solve the problem together.",
                    },
                    {
                      id: "b",
                      text: "They demonstrate transparency about your constraints, building trust",
                      isCorrect: false,
                      feedback: "While transparency can help, the primary function is to make the counterpart explain demands and participate in problem-solving.",
                    },
                    {
                      id: "c",
                      text: "They create negotiating space by revealing your limitations without saying no",
                      isCorrect: false,
                      feedback: "This is a benefit, but the key shift is forcing the counterpart to explain demands, reveal their constraints, and help solve the problem.",
                    },
                    {
                      id: "d",
                      text: "They force the counterpart to explain demands and participate in solving the problem",
                      isCorrect: true,
                      feedback: "Correct! Calibrated questions force the counterpart to explain their demands, reveal constraints, and participate in solving the problem. They reduce pressure and invite collaboration by making the counterpart reconsider their position.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ5", correct)}
                />

                <MultipleChoice
                  question='Why are no-oriented questions ("Is now a bad time?") more effective?'
                  options={[
                    {
                      id: "a",
                      text: 'People feel safer and more in control when allowed to say "no," which deactivates defensive behavior',
                      isCorrect: true,
                      feedback: 'Correct! People feel safer, more autonomous, and more in control when allowed to say "no." No-oriented questions deactivate defensive behavior and remove the fear of commitment associated with "yes."',
                    },
                    {
                      id: "b",
                      text: 'They lower expectations, making any positive response feel like a win',
                      isCorrect: false,
                      feedback: 'No-oriented questions aren\'t about managing expectations—they work by giving autonomy and removing the pressure to say yes.',
                    },
                    {
                      id: "c",
                      text: 'They reverse psychology, making people more likely to agree',
                      isCorrect: false,
                      feedback: 'This isn\'t reverse psychology or manipulation—no-oriented questions create genuine safety by allowing the counterpart to say no without fear.',
                    },
                    {
                      id: "d",
                      text: 'They demonstrate respect for the counterpart\'s time and priorities',
                      isCorrect: false,
                      feedback: 'While respect is a benefit, the primary effectiveness comes from deactivating defensive behavior and removing fear of commitment.',
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ6", correct)}
                />

                <MultipleChoice
                  question='What role does the "late-night FM DJ voice" play?'
                  options={[
                    {
                      id: "a",
                      text: "It creates a casual atmosphere that makes the counterpart more comfortable sharing",
                      isCorrect: false,
                      feedback: "While comfort helps, the specific function is lowering tension, signaling confidence, and building trust through tone—not just casualness.",
                    },
                    {
                      id: "b",
                      text: "It slows down the conversation, giving you more time to think strategically",
                      isCorrect: false,
                      feedback: "While pacing helps, the primary role is psychological—the calm, reassuring tone lowers tension and increases trust.",
                    },
                    {
                      id: "c",
                      text: "The calm, slow, reassuring tone lowers tension, signals confidence, and increases trust",
                      isCorrect: true,
                      feedback: "Correct! The late-night FM DJ voice is calm, slow, and reassuring. It instantly lowers tension, signals confidence, and increases trust. Tone often matters more than the actual words.",
                    },
                    {
                      id: "d",
                      text: "It projects authority and seriousness about the negotiation stakes",
                      isCorrect: false,
                      feedback: "The late-night FM DJ voice isn't about projecting authority—it's about calm reassurance that lowers tension and builds trust.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ7", correct)}
                />

                <MultipleChoice
                  question="What is an accusation audit?"
                  options={[
                    {
                      id: "a",
                      text: "A way to point out the counterpart's mistakes and lies",
                      isCorrect: false,
                      feedback: "An accusation audit addresses their perceptions of you, not accusations against them.",
                    },
                    {
                      id: "b",
                      text: "A review of all past failed negotiations to learn from mistakes",
                      isCorrect: false,
                      feedback: "An accusation audit is forward-looking and used in current negotiations, not a retrospective analysis.",
                    },
                    {
                      id: "c",
                      text: "A technique to avoid difficult conversations by staying silent",
                      isCorrect: false,
                      feedback: "An accusation audit is the opposite—it proactively addresses negatives before making a request.",
                    },
                    {
                      id: "d",
                      text: "A proactive list of every negative they may think about you, deployed before an ask",
                      isCorrect: true,
                      feedback: "Correct! An accusation audit is a proactive list of every negative the counterpart may think about you. It is deployed before presenting an ask or sensitive request. This disarms fear, reduces defensiveness, and makes the counterpart more willing to listen.",
                    },
                  ]}
                  onAnswer={(correct) => handleQuizComplete("vossQ8", correct)}
                />
              </div>

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
                        🎉 Module 3 Complete!
                      </h3>
                      <p className="text-green-800 dark:text-green-200 mb-4">
                        Congratulations! You've mastered the negotiation systems of Jim Camp and Chris Voss. You now
                        understand how to use "No" as a tool for clarity, maintain emotional neutrality, deploy tactical
                        empathy, and guide prospects to real commitment through calibrated questions and strategic
                        communication.
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
