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
        router.push(`/course/module-3?section=${nextSection.id}`)
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
                      text: "To create emotional investment in the deal",
                      isCorrect: false,
                      feedback: "A Mission and Purpose is designed to prevent emotional investment, not create it.",
                    },
                    {
                      id: "b",
                      text: "To define why you are in the negotiation and who you serve, keeping you emotionally neutral",
                      isCorrect: true,
                      feedback: "Correct! A Mission and Purpose defines why you are in the negotiation and who you serve. It keeps you emotionally neutral, prevents you from chasing the deal, and forces you to behave in ways aligned with discipline, clarity, and responsibility—not neediness.",
                    },
                    {
                      id: "c",
                      text: "To pressure the counterpart into making a decision",
                      isCorrect: false,
                      feedback: "Camp's system explicitly rejects pressure tactics.",
                    },
                    {
                      id: "d",
                      text: "To maximize profit at all costs",
                      isCorrect: false,
                      feedback: "Mission and Purpose is about serving others, not maximizing profit.",
                    },
                  ]}
                  explanation="A Mission and Purpose defines why you are in the negotiation and who you serve. It keeps you emotionally neutral, prevents you from chasing the deal, and forces you to behave in ways aligned with discipline, clarity, and responsibility—not neediness."
                  onAnswer={(correct) => handleQuizComplete("campQ1", correct)}
                />

                <MultipleChoice
                  question='According to Jim Camp, why is "No" considered a decision and not a failure?'
                  options={[
                    {
                      id: "a",
                      text: '"No" means the deal is permanently dead',
                      isCorrect: false,
                      feedback: '"No" is not the end—it\'s clarity about the current situation.',
                    },
                    {
                      id: "b",
                      text: '"No" is a valid decision that reveals boundaries and prevents wasted time pursuing a "maybe"',
                      isCorrect: true,
                      feedback: 'Correct! "No" is a valid decision that reveals boundaries, concerns, or lack of fit. It prevents wasted time pursuing a "maybe" or a counterfeit yes. It protects you from emotional attachment and allows the adversary to feel safe.',
                    },
                    {
                      id: "c",
                      text: '"No" should be avoided at all costs',
                      isCorrect: false,
                      feedback: 'Camp teaches the opposite—"No" should be welcomed as clarity.',
                    },
                    {
                      id: "d",
                      text: '"No" means you need to try harder to convince them',
                      isCorrect: false,
                      feedback: 'Trying harder shows neediness. "No" is a decision to respect.',
                    },
                  ]}
                  explanation='"No" is a valid decision that reveals boundaries, concerns, or lack of fit. It prevents wasted time pursuing a "maybe" or a counterfeit yes. It protects you from emotional attachment and allows the adversary to feel safe.'
                  onAnswer={(correct) => handleQuizComplete("campQ2", correct)}
                />

                <MultipleChoice
                  question="How does the Camp principle of not needing the deal influence your emotional state?"
                  options={[
                    {
                      id: "a",
                      text: "It makes you appear disinterested and unprofessional",
                      isCorrect: false,
                      feedback: "Not needing the deal shows confidence, not disinterest.",
                    },
                    {
                      id: "b",
                      text: "It keeps you calm, rational, and focused while eliminating emotional pressure",
                      isCorrect: true,
                      feedback: "Correct! When you do not need the deal, you remain calm, rational, and focused. It eliminates emotional pressure, which reduces mistakes, and it increases your power because you cannot be manipulated by urgency, deadlines, or neediness.",
                    },
                    {
                      id: "c",
                      text: "It encourages you to walk away from every negotiation",
                      isCorrect: false,
                      feedback: "Not needing doesn't mean walking away—it means negotiating from strength.",
                    },
                    {
                      id: "d",
                      text: "It makes you appear desperate for any deal",
                      isCorrect: false,
                      feedback: "This is the opposite—neediness creates desperation.",
                    },
                  ]}
                  explanation="When you do not need the deal, you remain calm, rational, and focused. It eliminates emotional pressure, which reduces mistakes, and it increases your power because you cannot be manipulated by urgency, deadlines, or neediness."
                  onAnswer={(correct) => handleQuizComplete("campQ3", correct)}
                />

                <MultipleChoice
                  question='What is the difference between "pain" and "problem" in the Camp system?'
                  options={[
                    {
                      id: "a",
                      text: "They are the same thing",
                      isCorrect: false,
                      feedback: "Pain and problem are distinct concepts in Camp's system.",
                    },
                    {
                      id: "b",
                      text: "Pain is emotional impact; Problem is the logical, structural issue causing the pain",
                      isCorrect: true,
                      feedback: "Correct! Pain = the emotional impact or discomfort the adversary feels. Problem = the logical, structural issue causing the pain. You must identify both because value is only meaningful when tied to the adversary's emotional motivation and the underlying issue.",
                    },
                    {
                      id: "c",
                      text: "Pain is worse than a problem",
                      isCorrect: false,
                      feedback: "It's not about severity—they are different dimensions of the same issue.",
                    },
                    {
                      id: "d",
                      text: "Problem is what the client says; Pain is what you assume",
                      isCorrect: false,
                      feedback: "Camp forbids assumptions. Both pain and problem must be discovered through questions.",
                    },
                  ]}
                  explanation="Pain = the emotional impact or discomfort the adversary feels. Problem = the logical, structural issue causing the pain. You must identify both because value is only meaningful when tied to the adversary's emotional motivation and the underlying issue."
                  onAnswer={(correct) => handleQuizComplete("campQ4", correct)}
                />

                <MultipleChoice
                  question='How does Camp define "the adversary"?'
                  options={[
                    {
                      id: "a",
                      text: "The enemy you must defeat to win",
                      isCorrect: false,
                      feedback: "Camp rejects adversarial thinking—it's not about defeating anyone.",
                    },
                    {
                      id: "b",
                      text: "Simply the person on the other side; your responsibility is to make their world better",
                      isCorrect: true,
                      feedback: "Correct! The adversary is simply the person on the other side of the negotiation—not an enemy. Your responsibility is to make their world better, clarify their decisions, protect them from bad decisions, and guide them toward clarity without manipulation.",
                    },
                    {
                      id: "c",
                      text: "Someone to manipulate into agreement",
                      isCorrect: false,
                      feedback: "Camp's system explicitly rejects manipulation.",
                    },
                    {
                      id: "d",
                      text: "A competitor to outmaneuver",
                      isCorrect: false,
                      feedback: "This is adversarial thinking. Camp teaches service, not competition.",
                    },
                  ]}
                  explanation="The adversary is simply the person on the other side of the negotiation—not an enemy. Your responsibility is to make their world better, clarify their decisions, protect them from bad decisions, and guide them toward clarity without manipulation."
                  onAnswer={(correct) => handleQuizComplete("campQ5", correct)}
                />

                <MultipleChoice
                  question="Why does the Camp system forbid assumptions?"
                  options={[
                    {
                      id: "a",
                      text: "Assumptions save time and are usually correct",
                      isCorrect: false,
                      feedback: "Assumptions are rarely correct and create false narratives.",
                    },
                    {
                      id: "b",
                      text: "Assumptions create false narratives; instead use questions, listening, and real data",
                      isCorrect: true,
                      feedback: "Correct! Assumptions create false narratives, emotional errors, and bad decisions. Instead, Camp recommends asking questions, letting the adversary talk, hearing real data, maintaining emotional detachment, and listening for what is actually said.",
                    },
                    {
                      id: "c",
                      text: "Assumptions should be made early in the process",
                      isCorrect: false,
                      feedback: "Camp forbids assumptions at any stage of negotiation.",
                    },
                    {
                      id: "d",
                      text: "Assumptions are necessary for quick decisions",
                      isCorrect: false,
                      feedback: "Quick decisions based on assumptions lead to errors. Camp prioritizes accuracy.",
                    },
                  ]}
                  explanation="Assumptions create false narratives, emotional errors, and bad decisions. Instead, Camp recommends asking questions, letting the adversary talk, hearing real data, maintaining emotional detachment, and listening for what is actually said."
                  onAnswer={(correct) => handleQuizComplete("campQ6", correct)}
                />

                <MultipleChoice
                  question="What does Camp mean by saying 'It's never about you'?"
                  options={[
                    {
                      id: "a",
                      text: "You should be invisible in the negotiation",
                      isCorrect: false,
                      feedback: "It's not about invisibility—it's about focus on the adversary's needs.",
                    },
                    {
                      id: "b",
                      text: "The negotiation is entirely about the adversary's problems, constraints, and mission—not your goals",
                      isCorrect: true,
                      feedback: "Correct! The negotiation is entirely about the adversary's problems, constraints, risks, and mission—not your goals. This forces you to stop selling, start asking, stay curious, avoid self-focused behavior, and make decisions based only on their real situation.",
                    },
                    {
                      id: "c",
                      text: "Your feelings don't matter at all",
                      isCorrect: false,
                      feedback: "Your emotional control matters, but the negotiation content focuses on them.",
                    },
                    {
                      id: "d",
                      text: "You should always agree with the counterpart",
                      isCorrect: false,
                      feedback: "This isn't about agreement—it's about understanding their perspective.",
                    },
                  ]}
                  explanation="The negotiation is entirely about the adversary's problems, constraints, risks, and mission—not your goals. This forces you to stop selling, start asking, stay curious, avoid self-focused behavior, and make decisions based only on their real situation."
                  onAnswer={(correct) => handleQuizComplete("campQ7", correct)}
                />

                <MultipleChoice
                  question="How does the Camp system evaluate success in negotiation?"
                  options={[
                    {
                      id: "a",
                      text: "Success is measured only by closing the deal",
                      isCorrect: false,
                      feedback: "Camp measures success by behavior, not outcomes.",
                    },
                    {
                      id: "b",
                      text: "Success is defined by your behavior and following the process, not the outcome",
                      isCorrect: true,
                      feedback: "Correct! Success is defined by your behavior, not the deal. If you follow the system—mission, purpose, discipline, questions, data-gathering—you win regardless of outcome. The process protects you from emotional errors, even if the deal does not close.",
                    },
                    {
                      id: "c",
                      text: "Success is determined by the size of the deal",
                      isCorrect: false,
                      feedback: "Deal size is irrelevant to Camp's definition of success.",
                    },
                    {
                      id: "d",
                      text: "Success requires getting a yes every time",
                      isCorrect: false,
                      feedback: "Camp teaches that 'No' can also be success if it brings clarity.",
                    },
                  ]}
                  explanation="Success is defined by your behavior, not the deal. If you follow the system—mission, purpose, discipline, questions, data-gathering—you win regardless of outcome. The process protects you from emotional errors, even if the deal does not close."
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
                      text: "Being friendly and similar to the other person",
                      isCorrect: false,
                      feedback: "Tactical Empathy is more strategic than simple friendliness.",
                    },
                    {
                      id: "b",
                      text: "The deliberate act of understanding and verbalizing the other person's emotions and perspective",
                      isCorrect: true,
                      feedback: "Correct! Tactical Empathy is the deliberate act of understanding the other person's emotions, fears, pressures, and perspective—and demonstrating that understanding verbally. Unlike rapport-building, it is not friendliness or similarity; it is psychological insight used to guide behavior.",
                    },
                    {
                      id: "c",
                      text: "Agreeing with everything they say",
                      isCorrect: false,
                      feedback: "Tactical Empathy is about understanding, not agreement.",
                    },
                    {
                      id: "d",
                      text: "Mirroring their body language",
                      isCorrect: false,
                      feedback: "Body language mirroring is different from Tactical Empathy, which focuses on emotions.",
                    },
                  ]}
                  explanation="Tactical Empathy is the deliberate act of understanding the other person's emotions, fears, pressures, and perspective—and demonstrating that understanding verbally. Unlike rapport-building, it is not friendliness or similarity; it is psychological insight used to guide behavior."
                  onAnswer={(correct) => handleQuizComplete("vossQ1", correct)}
                />

                <MultipleChoice
                  question="How do mirroring and labeling work together?"
                  options={[
                    {
                      id: "a",
                      text: "They confuse the counterpart into revealing information",
                      isCorrect: false,
                      feedback: "These techniques create safety, not confusion.",
                    },
                    {
                      id: "b",
                      text: "Mirroring keeps them talking; labeling identifies emotions, triggering deeper disclosure",
                      isCorrect: true,
                      feedback: "Correct! Mirroring keeps the other person talking and encourages them to expand. Labeling identifies emotions or dynamics, reducing defensiveness and creating emotional safety. Used together, they trigger deeper disclosure and reveal motive, pressure points, and hidden concerns.",
                    },
                    {
                      id: "c",
                      text: "They are the same technique used differently",
                      isCorrect: false,
                      feedback: "Mirroring and labeling are distinct techniques with different purposes.",
                    },
                    {
                      id: "d",
                      text: "They force the counterpart to agree with you",
                      isCorrect: false,
                      feedback: "Voss's techniques guide, not force, behavior.",
                    },
                  ]}
                  explanation="Mirroring keeps the other person talking and encourages them to expand. Labeling identifies emotions or dynamics, reducing defensiveness and creating emotional safety. Used together, they trigger deeper disclosure and reveal motive, pressure points, and hidden concerns."
                  onAnswer={(correct) => handleQuizComplete("vossQ2", correct)}
                />

                <MultipleChoice
                  question='What is the meaning of "That\'s right" in Voss\'s system?'
                  options={[
                    {
                      id: "a",
                      text: '"That\'s right" is just another way of saying yes',
                      isCorrect: false,
                      feedback: '"That\'s right" is much more powerful than a simple yes.',
                    },
                    {
                      id: "b",
                      text: '"That\'s right" signals the counterpart feels fully understood and aligned—a psychological breakthrough',
                      isCorrect: true,
                      feedback: 'Correct! "That\'s right" indicates the counterpart feels fully understood and aligned. It is a psychological breakthrough that reduces resistance. Most "yes" responses are counterfeit or premature, while "That\'s right" signals true collaboration.',
                    },
                    {
                      id: "c",
                      text: '"That\'s right" means they\'re confused',
                      isCorrect: false,
                      feedback: '"That\'s right" is a sign of clarity, not confusion.',
                    },
                    {
                      id: "d",
                      text: '"That\'s right" should be avoided in negotiations',
                      isCorrect: false,
                      feedback: '"That\'s right" is the exact phrase you want to hear.',
                    },
                  ]}
                  explanation='"That\'s right" indicates the counterpart feels fully understood and aligned. It is a psychological breakthrough that reduces resistance. Most "yes" responses are counterfeit or premature, while "That\'s right" signals true collaboration.'
                  onAnswer={(correct) => handleQuizComplete("vossQ3", correct)}
                />

                <MultipleChoice
                  question='What are the three types of "Yes"?'
                  options={[
                    {
                      id: "a",
                      text: "All three types of yes are equally valuable",
                      isCorrect: false,
                      feedback: "Only one type of yes truly matters in negotiation.",
                    },
                    {
                      id: "b",
                      text: "Counterfeit (avoids pressure), Confirmation (factual), Commitment (tied to action)—only Commitment matters",
                      isCorrect: true,
                      feedback: "Correct! Counterfeit Yes: Used to avoid pressure or end the conversation. Confirmation Yes: A factual acknowledgment with no commitment. Commitment Yes: The only yes tied to action and follow-through. Only the commitment yes matters because it reflects real alignment and willingness to proceed with a how to proceed.",
                    },
                    {
                      id: "c",
                      text: "There is only one type of yes in negotiation",
                      isCorrect: false,
                      feedback: "Voss identifies three distinct types of yes.",
                    },
                    {
                      id: "d",
                      text: "The first yes is always the most important",
                      isCorrect: false,
                      feedback: "The first yes is often a counterfeit yes to avoid pressure.",
                    },
                  ]}
                  explanation="Counterfeit Yes: Used to avoid pressure or end the conversation. Confirmation Yes: A factual acknowledgment with no commitment. Commitment Yes: The only yes tied to action and follow-through. Only the commitment yes matters because it reflects real alignment and willingness to proceed with a how to proceed."
                  onAnswer={(correct) => handleQuizComplete("vossQ4", correct)}
                />

                <MultipleChoice
                  question='How do calibrated questions like "How am I supposed to do that?" shift responsibility?'
                  options={[
                    {
                      id: "a",
                      text: "They avoid responsibility completely",
                      isCorrect: false,
                      feedback: "Calibrated questions don't avoid responsibility—they invite collaboration.",
                    },
                    {
                      id: "b",
                      text: "They force the counterpart to explain demands and participate in solving the problem",
                      isCorrect: true,
                      feedback: "Correct! Calibrated questions force the counterpart to explain their demands, reveal constraints, and participate in solving the problem. They reduce pressure and invite collaboration by making the counterpart reconsider their position.",
                    },
                    {
                      id: "c",
                      text: "They show weakness and lack of preparation",
                      isCorrect: false,
                      feedback: "Calibrated questions actually demonstrate strategic thinking, not weakness.",
                    },
                    {
                      id: "d",
                      text: "They confuse the counterpart into giving up",
                      isCorrect: false,
                      feedback: "The goal is clarity and collaboration, not confusion.",
                    },
                  ]}
                  explanation="Calibrated questions force the counterpart to explain their demands, reveal constraints, and participate in solving the problem. They reduce pressure and invite collaboration by making the counterpart reconsider their position."
                  onAnswer={(correct) => handleQuizComplete("vossQ5", correct)}
                />

                <MultipleChoice
                  question='Why are no-oriented questions ("Is now a bad time?") more effective?'
                  options={[
                    {
                      id: "a",
                      text: "They are not more effective",
                      isCorrect: false,
                      feedback: "No-oriented questions are significantly more effective than yes-oriented ones.",
                    },
                    {
                      id: "b",
                      text: 'People feel safer and more in control when allowed to say "no," which deactivates defensive behavior',
                      isCorrect: true,
                      feedback: 'Correct! People feel safer, more autonomous, and more in control when allowed to say "no." No-oriented questions deactivate defensive behavior and remove the fear of commitment associated with "yes."',
                    },
                    {
                      id: "c",
                      text: "They end conversations more quickly",
                      isCorrect: false,
                      feedback: "No-oriented questions actually keep conversations going by creating safety.",
                    },
                    {
                      id: "d",
                      text: "They confuse the counterpart",
                      isCorrect: false,
                      feedback: "No-oriented questions create clarity, not confusion.",
                    },
                  ]}
                  explanation='People feel safer, more autonomous, and more in control when allowed to say "no." No-oriented questions deactivate defensive behavior and remove the fear of commitment associated with "yes."'
                  onAnswer={(correct) => handleQuizComplete("vossQ6", correct)}
                />

                <MultipleChoice
                  question='What role does the "late-night FM DJ voice" play?'
                  options={[
                    {
                      id: "a",
                      text: "It makes you sound unprofessional",
                      isCorrect: false,
                      feedback: "The late-night FM DJ voice is a professional technique for managing tone.",
                    },
                    {
                      id: "b",
                      text: "The calm, slow, reassuring tone lowers tension, signals confidence, and increases trust",
                      isCorrect: true,
                      feedback: "Correct! The late-night FM DJ voice is calm, slow, and reassuring. It instantly lowers tension, signals confidence, and increases trust. Tone often matters more than the actual words.",
                    },
                    {
                      id: "c",
                      text: "It puts people to sleep",
                      isCorrect: false,
                      feedback: "The tone creates calm, not sleepiness—it keeps people engaged.",
                    },
                    {
                      id: "d",
                      text: "It should only be used at night",
                      isCorrect: false,
                      feedback: "The name is metaphorical—this technique works any time.",
                    },
                  ]}
                  explanation="The late-night FM DJ voice is calm, slow, and reassuring. It instantly lowers tension, signals confidence, and increases trust. Tone often matters more than the actual words."
                  onAnswer={(correct) => handleQuizComplete("vossQ7", correct)}
                />

                <MultipleChoice
                  question="What is an accusation audit?"
                  options={[
                    {
                      id: "a",
                      text: "A way to accuse the counterpart of lying",
                      isCorrect: false,
                      feedback: "An accusation audit addresses their perceptions of you, not accusations against them.",
                    },
                    {
                      id: "b",
                      text: "A proactive list of every negative they may think about you, deployed before an ask",
                      isCorrect: true,
                      feedback: "Correct! An accusation audit is a proactive list of every negative the counterpart may think about you. It is deployed before presenting an ask or sensitive request. This disarms fear, reduces defensiveness, and makes the counterpart more willing to listen.",
                    },
                    {
                      id: "c",
                      text: "A review of past failed negotiations",
                      isCorrect: false,
                      feedback: "An accusation audit is forward-looking, not retrospective.",
                    },
                    {
                      id: "d",
                      text: "A technique used only in hostile situations",
                      isCorrect: false,
                      feedback: "Accusation audits can be used in any negotiation to reduce defensiveness.",
                    },
                  ]}
                  explanation="An accusation audit is a proactive list of every negative the counterpart may think about you. It is deployed before presenting an ask or sensitive request. This disarms fear, reduces defensiveness, and makes the counterpart more willing to listen."
                  onAnswer={(correct) => handleQuizComplete("vossQ8", correct)}
                />
              </div>

              {allQuizComplete && (
                <Card className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 border-2 border-brand-green">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-brand-green" />
                    <h3 className="text-2xl font-bold text-brand-green">Module Complete!</h3>
                  </div>
                  <p className="text-lg mb-4">
                    Congratulations! You've mastered the negotiation systems of Jim Camp and Chris Voss. You now
                    understand how to use "No" as a tool for clarity, maintain emotional neutrality, deploy tactical
                    empathy, and guide prospects to real commitment through calibrated questions and strategic
                    communication.
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
