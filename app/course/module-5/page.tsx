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
import { ArrowRight, CheckCircle2, Brain, Target, Zap, Users, Lightbulb, User, MapPin, Clock, ChevronDown, Award, Compass, MessageCircle, Shield, RefreshCw } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { MultipleChoice } from "@/components/learning/multiple-choice"
import { GridDisplay } from "@/components/learning/grid-display"
import { ComparisonCard } from "@/components/learning/comparison-card"
import { FlipCard } from "@/components/learning/flip-card"

/**
 * Interactive Character Skills Component
 * Allows users to explore each of the five character skills with expandable cards
 */
function CharacterSkillsInteractive() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null)

  const skills = [
    {
      id: 1,
      title: "Discipline",
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500",
      summary: "Consistent action despite fluctuating motivation",
      details: [
        "Building habits that persist when motivation wanes",
        "Creating environmental cues that trigger desired behaviors",
        "Showing up consistently, even when it's uncomfortable",
        "Example: A top rep makes 20 prospecting calls every morning at 9 AM, regardless of mood or previous day's results"
      ]
    },
    {
      id: 2,
      title: "Grit with Flexibility",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500",
      summary: "Persistence combined with strategic adaptation",
      details: [
        "Staying committed to long-term goals while adjusting tactics",
        "Knowing when to pivot vs. when to push through",
        "Resilience that learns from failure rather than just enduring it",
        "Example: A rep maintains the goal of enterprise sales mastery but adapts their pitch approach after feedback reveals a disconnect with technical buyers"
      ]
    },
    {
      id: 3,
      title: "Curiosity",
      icon: Compass,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500",
      summary: "Active exploration beyond current knowledge",
      details: [
        "Asking questions that reveal blind spots",
        "Seeking diverse perspectives and approaches",
        "Experimenting with new techniques without fear of failure",
        "Example: A sales rep regularly asks 'What would happen if I framed this objection as an opportunity?' and tests variations in real calls"
      ]
    },
    {
      id: 4,
      title: "Accountability",
      icon: Award,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500",
      summary: "Taking ownership of progress and setbacks",
      details: [
        "Tracking metrics that reflect effort, not just outcomes",
        "Owning mistakes without deflecting to external factors",
        "Sharing goals publicly to create external commitment",
        "Example: A rep tracks not just deals closed but also quality of discovery questions asked, accepting that poor questions lead to lost deals"
      ]
    },
    {
      id: 5,
      title: "Humility to Recalibrate",
      icon: RefreshCw,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500",
      summary: "Willingness to update strategies when stuck",
      details: [
        "Recognizing when current methods aren't working",
        "Actively seeking feedback, especially critical feedback",
        "Viewing plateaus as signals to adjust, not just work harder",
        "Example: After three months of stagnant conversion rates, a rep seeks peer review of recorded calls and discovers they're rushing the discovery phase"
      ]
    }
  ]

  const toggleSkill = (id: number) => {
    setSelectedSkill(selectedSkill === id ? null : id)
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {skills.map((skill) => {
        const Icon = skill.icon
        const isSelected = selectedSkill === skill.id

        return (
          <div
            key={skill.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
              isSelected
                ? `${skill.bgColor} ${skill.borderColor} shadow-lg scale-[1.02]`
                : "bg-muted border-transparent hover:border-muted-foreground/20 hover:shadow-md"
            } ${skill.id === 5 ? "md:col-span-2" : ""}`}
            onClick={() => toggleSkill(skill.id)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1">
                <Icon className={`h-6 w-6 ${skill.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <p className="font-semibold mb-1 flex items-center gap-2">
                    {skill.title}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isSelected ? "rotate-180" : ""
                      }`}
                    />
                  </p>
                  <p className="text-sm text-muted-foreground">{skill.summary}</p>
                  
                  {isSelected && (
                    <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {skill.details.map((detail, index) => (
                        <div
                          key={index}
                          className={`pl-4 border-l-2 ${skill.borderColor} py-1`}
                        >
                          <p className="text-sm leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Interactive Scaffolding Component
 * Allows users to explore each type of scaffolding support
 */
function ScaffoldingInteractive() {
  const [selectedScaffold, setSelectedScaffold] = useState<number | null>(null)

  const scaffolds = [
    {
      id: 1,
      title: "Mentors who stretch you",
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500",
      summary: "Push beyond comfort zones with guidance",
      details: [
        "Mentors provide calibrated challenges—difficult enough to stretch you, manageable enough to avoid overwhelm",
        "They model expert thinking patterns, making invisible decision-making visible",
        "Effective mentors ask questions that reveal your reasoning gaps rather than just providing answers",
        "Example: A mentor reviews your discovery call and asks, 'What did you learn about their decision-making process?' exposing that you focused on features instead of buying criteria"
      ]
    },
    {
      id: 2,
      title: "Structured practice",
      icon: Target,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500",
      summary: "Deliberate, focused repetition with clear objectives",
      details: [
        "Break complex skills into specific sub-skills that can be practiced in isolation",
        "Create practice scenarios with immediate feedback loops",
        "Focus on one improvement area at a time rather than trying to perfect everything",
        "Example: Spend 15 minutes daily practicing just the 'objection handling' phase of calls using role-play recordings, tracking improvement in response clarity"
      ]
    },
    {
      id: 3,
      title: "Psychological safety",
      icon: Shield,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500",
      summary: "Environment where mistakes are learning opportunities",
      details: [
        "Teams that frame errors as data rather than failures enable faster iteration",
        "Safety means you can share lost deals for group analysis without fear of judgment",
        "Leaders model vulnerability by sharing their own failures and what they learned",
        "Example: Weekly 'failure forums' where reps present deals they lost and the team collaboratively identifies what could be tested differently next time"
      ]
    },
    {
      id: 4,
      title: "Feedback loops",
      icon: RefreshCw,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500",
      summary: "Rapid, specific input on performance",
      details: [
        "Feedback should be immediate, specific, and actionable—not vague or delayed",
        "Focus on behaviors you can control, not just outcomes you can't",
        "Use objective criteria (recorded calls, tracked metrics) rather than memory or impression",
        "Example: After each demo, a peer reviews your screen-sharing flow and gives one specific suggestion: 'Pause for questions after each feature instead of monologuing for 10 minutes'"
      ]
    },
    {
      id: 5,
      title: "Communities that normalize struggle",
      icon: MessageCircle,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500",
      summary: "Groups where difficulty is expected and shared",
      details: [
        "When everyone shares challenges openly, struggle becomes part of the growth process rather than a sign of inadequacy",
        "Peer learning accelerates when the group values 'productive struggle' over appearing competent",
        "Communities provide accountability and shared problem-solving",
        "Example: A Slack channel where reps post daily learning struggles ('Can't figure out how to handle the pricing objection with technical buyers') and peers share their experiments"
      ]
    }
  ]

  const toggleScaffold = (id: number) => {
    setSelectedScaffold(selectedScaffold === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {scaffolds.map((scaffold) => {
        const Icon = scaffold.icon
        const isSelected = selectedScaffold === scaffold.id

        return (
          <div
            key={scaffold.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
              isSelected
                ? `${scaffold.bgColor} ${scaffold.borderColor} shadow-lg`
                : "bg-muted border-transparent hover:border-muted-foreground/20 hover:shadow-md"
            }`}
            onClick={() => toggleScaffold(scaffold.id)}
          >
            <div className="flex items-start gap-3">
              <Icon className={`h-5 w-5 ${scaffold.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">
                    {scaffold.title}
                  </p>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 flex-shrink-0 ${
                      isSelected ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{scaffold.summary}</p>
                
                {isSelected && (
                  <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {scaffold.details.map((detail, index) => (
                      <div
                        key={index}
                        className={`pl-4 border-l-2 ${scaffold.borderColor} py-2`}
                      >
                        <p className="text-sm leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Interactive Deliberate Discomfort Component
 * Explores the elements of practice that builds potential
 */
function DeliberateDiscomfortInteractive() {
  const [selectedElement, setSelectedElement] = useState<number | null>(null)

  const elements = [
    {
      id: 1,
      title: "Aim beyond your comfort zone",
      icon: Target,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500",
      summary: "Choose challenges that feel slightly out of reach",
      details: [
        "Practice at the edge of competence where you fail about 15-20% of the time—hard enough to require effort, achievable enough to maintain motivation",
        "If practice feels easy and comfortable, you're not building new capabilities, just reinforcing existing ones",
        "The discomfort of stretching is a signal that neuroplastic change is occurring",
        "Example: If you're comfortable with small business sales, deliberately practice enterprise discovery calls where stakeholder complexity forces new listening patterns"
      ],
      quote: "Growth lives in the space between 'I can do this' and 'I have no idea how'"
    },
    {
      id: 2,
      title: "Seek corrective feedback",
      icon: MessageCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500",
      summary: "Not just praise, but specific improvement guidance",
      details: [
        "Generic feedback ('great job!') doesn't improve performance—specific, corrective feedback does",
        "Ask for criticism: 'What's one thing I should do differently next time?'",
        "The most valuable feedback points to gaps between your self-assessment and reality",
        "Example: Instead of asking 'How was my demo?', ask 'At what point did I lose their attention, and what was I doing when it happened?'"
      ],
      quote: "Praise tells you what to repeat. Correction tells you how to improve."
    },
    {
      id: 3,
      title: "Break skills into micro-components",
      icon: Lightbulb,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500",
      summary: "Master small pieces before integration",
      details: [
        "Complex skills are built from micro-skills practiced in isolation before combining them",
        "Isolating one component allows focused attention without cognitive overload",
        "Practice micro-components until they become automatic, then layer in the next piece",
        "Example: Rather than practicing 'full sales calls', isolate just the objection-handling segment and drill 10 variations of the same objection until responses are fluid"
      ],
      quote: "Mastery is micro-components practiced to automaticity, then woven together"
    },
    {
      id: 4,
      title: "Create consistent reps",
      icon: RefreshCw,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500",
      summary: "Frequency matters more than intensity",
      details: [
        "Daily 15-minute practice sessions outperform monthly 2-hour marathons for skill retention",
        "Consistency builds automaticity—your brain reinforces neural pathways through repetition",
        "Create environmental triggers that make practice inevitable (same time, same place, same cue)",
        "Example: Every morning at 8:45 AM, before first call, spend 15 minutes role-playing discovery questions with a peer—consistency turns it into automatic behavior"
      ],
      quote: "Elite performers aren't more motivated. They're more consistent."
    }
  ]

  const toggleElement = (id: number) => {
    setSelectedElement(selectedElement === id ? null : id)
  }

  return (
    <div className="space-y-3">
      <div className="p-4 bg-brand-orange/10 rounded-lg border-2 border-brand-orange/30 mb-4">
        <p className="font-semibold text-center">Not all practice builds mastery. Deliberate practice does.</p>
      </div>
      
      {elements.map((element) => {
        const Icon = element.icon
        const isSelected = selectedElement === element.id

        return (
          <div
            key={element.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
              isSelected
                ? `${element.bgColor} ${element.borderColor} shadow-lg`
                : "bg-muted border-transparent hover:border-muted-foreground/20 hover:shadow-md"
            }`}
            onClick={() => toggleElement(element.id)}
          >
            <div className="flex items-start gap-3">
              <Icon className={`h-5 w-5 ${element.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">
                    {element.title}
                  </p>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 flex-shrink-0 ${
                      isSelected ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{element.summary}</p>
                
                {isSelected && (
                  <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {element.details.map((detail, index) => (
                      <div
                        key={index}
                        className={`pl-4 border-l-2 ${element.borderColor} py-2`}
                      >
                        <p className="text-sm leading-relaxed">{detail}</p>
                      </div>
                    ))}
                    <div className={`mt-3 p-3 ${element.bgColor} rounded italic text-sm`}>
                      <p>"{element.quote}"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Interactive Systems Over Goals Component
 * Compares outcome-based goals with systems thinking
 */
function SystemsOverGoalsInteractive() {
  const [activeTab, setActiveTab] = useState<'goals' | 'systems'>('goals')
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const goalsData = [
    {
      id: 1,
      title: "Close 10 deals this month",
      icon: Target,
      problem: "Why this is less effective:",
      details: [
        "Focuses on an outcome you don't fully control—customer decisions, market conditions, and timing affect deal closure",
        "Creates binary success/failure thinking—if you close 9, you 'failed' even though you improved",
        "Motivation crashes when goals feel out of reach or already achieved",
        "No guidance on HOW to improve when you're not hitting the target"
      ],
      systemAlternative: "System alternative: '20 targeted prospecting conversations daily, asking 5 diagnostic questions per call to uncover pain points'"
    },
    {
      id: 2,
      title: "Hit $500K in revenue",
      icon: Target,
      problem: "Why this is less effective:",
      details: [
        "Revenue depends on factors outside your control: deal size, budget cycles, competitive dynamics",
        "Doesn't specify the behaviors that generate revenue",
        "Can lead to short-term tactics that undermine long-term relationships",
        "Provides no feedback loop until the end of the measurement period"
      ],
      systemAlternative: "System alternative: 'Conduct 3 value-discovery sessions per week, documenting ROI metrics for each prospect'"
    },
    {
      id: 3,
      title: "Achieve 40% win rate",
      icon: Target,
      problem: "Why this is less effective:",
      details: [
        "Win rate is a lagging indicator—tells you what happened, not what to do",
        "Ignores the quality of opportunities—winning bad-fit deals is worse than losing them",
        "Can incentivize cherry-picking easy deals instead of developing skills",
        "Motivation-dependent: requires constant willpower to sustain effort"
      ],
      systemAlternative: "System alternative: 'Score every opportunity for fit criteria before proposal, track which qualification questions predict wins'"
    },
    {
      id: 4,
      title: "Get promoted to Senior Rep",
      icon: Target,
      problem: "Why this is less effective:",
      details: [
        "Promotion depends on organizational needs, not just your performance",
        "External validation as the goal creates fragility when it's delayed",
        "Doesn't define the capabilities you need to build",
        "Can lead to gaming metrics instead of genuine skill development"
      ],
      systemAlternative: "System alternative: 'Master advanced objection handling—practice 10 role-plays weekly, get peer feedback, implement one new technique per month'"
    }
  ]

  const systemsData = [
    {
      id: 1,
      title: "20 prospecting calls daily at 9 AM",
      icon: RefreshCw,
      benefit: "Why this is more effective:",
      details: [
        "Controllable behavior you can execute regardless of motivation",
        "Creates consistency through scheduling and environmental design",
        "Builds automatic habit—reduces decision fatigue",
        "Provides daily feedback: did I do it or not?"
      ],
      outcome: "Outcome it produces: Consistent pipeline generation, mastery of prospecting skills through repetition, protection against pipeline gaps"
    },
    {
      id: 2,
      title: "3 feedback sessions per week",
      icon: MessageCircle,
      benefit: "Why this is more effective:",
      details: [
        "Rapid improvement through consistent corrective input",
        "Habit-driven: scheduled into calendar, not motivation-dependent",
        "Controllable: you can always request feedback",
        "Compound learning: small improvements weekly create massive annual gains"
      ],
      outcome: "Outcome it produces: Accelerated skill development, blind spot elimination, calibration with best practices"
    },
    {
      id: 3,
      title: "Track calibrated questions used per call",
      icon: Lightbulb,
      benefit: "Why this is more effective:",
      details: [
        "Process metric you control, not an outcome you hope for",
        "Immediate feedback on behavior quality",
        "Focuses attention on skill execution during calls",
        "Creates data for experimentation: which questions correlate with progress?"
      ],
      outcome: "Outcome it produces: Better discovery quality, higher win rates, deeper customer understanding"
    },
    {
      id: 4,
      title: "Identity: 'I am someone who masters craft'",
      icon: Award,
      benefit: "Why this is more effective:",
      details: [
        "Identity-based habits are more durable than outcome-based goals",
        "Shifts from 'What do I want?' to 'Who am I becoming?'",
        "Every practice session becomes evidence of identity, not just progress toward a goal",
        "Makes deliberate practice intrinsically rewarding"
      ],
      outcome: "Outcome it produces: Consistent improvement behavior, resilience through setbacks, intrinsic motivation"
    }
  ]

  const currentData = activeTab === 'goals' ? goalsData : systemsData

  const toggleItem = (id: number) => {
    setSelectedItem(selectedItem === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          onClick={() => {
            setActiveTab('goals')
            setSelectedItem(null)
          }}
          className={`flex-1 px-4 py-2 rounded transition-all ${
            activeTab === 'goals'
              ? 'bg-red-500/20 text-red-700 dark:text-red-400 font-semibold'
              : 'hover:bg-background'
          }`}
        >
          ❌ Outcome-Based Goals (Less Effective)
        </button>
        <button
          onClick={() => {
            setActiveTab('systems')
            setSelectedItem(null)
          }}
          className={`flex-1 px-4 py-2 rounded transition-all ${
            activeTab === 'systems'
              ? 'bg-green-500/20 text-green-700 dark:text-green-400 font-semibold'
              : 'hover:bg-background'
          }`}
        >
          ✓ Process-Based Goals (More Effective)
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {currentData.map((item) => {
          const Icon = item.icon
          const isSelected = selectedItem === item.id

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'goals'
                  ? isSelected
                    ? 'bg-red-500/10 border-red-500 shadow-lg'
                    : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 hover:shadow-md'
                  : isSelected
                  ? 'bg-green-500/10 border-green-500 shadow-lg'
                  : 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 hover:shadow-md'
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                  activeTab === 'goals' ? 'text-red-500' : 'text-green-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">
                      {item.title}
                    </p>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 flex-shrink-0 ${
                        isSelected ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {isSelected && (
                    <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-sm font-semibold">
                        {activeTab === 'goals' ? item.problem : (item as any).benefit}
                      </p>
                      <div className="space-y-2">
                        {item.details.map((detail, index) => (
                          <div
                            key={index}
                            className={`pl-4 border-l-2 py-1 ${
                              activeTab === 'goals' ? 'border-red-500' : 'border-green-500'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">• {detail}</p>
                          </div>
                        ))}
                      </div>
                      <div className={`mt-3 p-3 rounded ${
                        activeTab === 'goals' 
                          ? 'bg-green-500/10 border border-green-500/30' 
                          : 'bg-blue-500/10 border border-blue-500/30'
                      }`}>
                        <p className="text-sm font-semibold mb-1">
                          {activeTab === 'goals' ? '💡 System Alternative:' : '🎯 Outcome it produces:'}
                        </p>
                        <p className="text-sm">
                          {activeTab === 'goals' ? item.systemAlternative : (item as any).outcome}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-4 bg-brand-orange/10 rounded-lg border-2 border-brand-orange/30">
        <p className="text-center font-semibold italic">
          Progress = the result of systems, not motivation alone.
        </p>
      </div>
    </div>
  )
}

/**
 * Interactive Hidden Potential Formula Component
 * Explores the three components that multiply together
 */
function HiddenPotentialFormulaInteractive() {
  const [selectedComponent, setSelectedComponent] = useState<number | null>(null)

  const components = [
    {
      id: 1,
      title: "Character Skills",
      icon: Shield,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500",
      symbol: "CS",
      summary: "Discipline, grit, curiosity, accountability, and humility",
      details: [
        "These are the traits that determine who keeps improving when others plateau",
        "Unlike IQ or innate talent, character skills can be deliberately developed",
        "They enable you to persist through difficulty, adapt strategies, and seek corrective feedback",
        "Example: A rep with high character skills doesn't give up after 20 rejections—they analyze what's not working and adjust their approach"
      ],
      multiplierEffect: "If character skills = 0 (no discipline, no grit, no curiosity), the entire equation = 0. You can't compensate with talent alone."
    },
    {
      id: 2,
      title: "Deliberate Practice",
      icon: Target,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500",
      symbol: "DP",
      summary: "Practice at the edge of competence with corrective feedback",
      details: [
        "Not all practice builds skill—only deliberate practice does",
        "Requires operating at the edge of your comfort zone where you fail 15-20% of the time",
        "Must include specific, corrective feedback on what to improve",
        "Focus on micro-components (e.g., just objection handling) before full integration"
      ],
      multiplierEffect: "If deliberate practice = 0 (no focused effort, no feedback), the equation = 0. Experience without deliberate practice doesn't create growth."
    },
    {
      id: 3,
      title: "Supportive Scaffolding",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500",
      symbol: "SS",
      summary: "Environmental support that makes growth inevitable",
      details: [
        "Mentors who push you beyond your comfort zone with guidance",
        "Psychological safety where mistakes are learning opportunities",
        "Structured feedback loops that provide rapid, specific input",
        "Communities that normalize struggle and celebrate experimentation"
      ],
      multiplierEffect: "If scaffolding = 0 (no support, no mentorship, no safe environment), the equation = 0. Individual effort can't overcome a hostile or unsupportive environment."
    }
  ]

  const toggleComponent = (id: number) => {
    setSelectedComponent(selectedComponent === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {/* Formula Display */}
      <div className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 rounded-lg border-2 border-brand-orange/30">
        <p className="text-2xl font-bold text-center mb-2">
          Hidden Potential = Character Skills × Deliberate Practice × Supportive Scaffolding
        </p>
        <p className="text-center text-sm text-muted-foreground">
          Click each component below to understand why they multiply (not add)
        </p>
      </div>

      {/* Interactive Components */}
      <div className="grid md:grid-cols-3 gap-4">
        {components.map((component) => {
          const Icon = component.icon
          const isSelected = selectedComponent === component.id

          return (
            <div
              key={component.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? `${component.bgColor} ${component.borderColor} shadow-lg`
                  : "bg-muted border-transparent hover:border-muted-foreground/20 hover:shadow-md"
              }`}
              onClick={() => toggleComponent(component.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${component.bgColor} flex items-center justify-center mb-3`}>
                  <Icon className={`h-8 w-8 ${component.color}`} />
                </div>
                <p className="font-bold text-lg mb-1">{component.title}</p>
                <p className="text-xs text-muted-foreground mb-2">({component.symbol})</p>
                <p className="text-sm text-muted-foreground">{component.summary}</p>
                
                <ChevronDown
                  className={`h-5 w-5 mt-2 transition-transform duration-300 ${
                    isSelected ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Expanded Details */}
      {selectedComponent !== null && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {components
            .filter(c => c.id === selectedComponent)
            .map((component) => {
              const Icon = component.icon
              return (
                <div
                  key={component.id}
                  className={`p-6 rounded-lg ${component.bgColor} border-2 ${component.borderColor}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`h-6 w-6 ${component.color}`} />
                    <h4 className="text-lg font-semibold">{component.title}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {component.details.map((detail, index) => (
                      <div
                        key={index}
                        className={`pl-4 border-l-2 ${component.borderColor} py-2`}
                      >
                        <p className="text-sm leading-relaxed">• {detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-background/50 rounded border border-muted-foreground/20">
                    <p className="text-sm font-semibold mb-1">⚠️ The Multiplier Effect:</p>
                    <p className="text-sm">{component.multiplierEffect}</p>
                  </div>
                </div>
              )
            })}
        </div>
      )}

      {/* Bottom Explanation */}
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm leading-relaxed">
          <strong>Why multiplication matters:</strong> The components multiply (not add) because if any single factor is zero, 
          the entire equation equals zero. You can't compensate for missing character skills with just practice, 
          or offset poor scaffolding with just grit. All three must be present for potential to unlock.
        </p>
      </div>
    </div>
  )
}

/**
 * Interactive Paradox of Change Component
 * Allows users to explore the mind's protective mechanisms
 */
function ParadoxOfChangeInteractive() {
  const [selectedMechanism, setSelectedMechanism] = useState<number | null>(null)

  const mechanisms = [
    {
      id: 1,
      title: "Avoid Anxiety",
      icon: Shield,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500",
      summary: "The brain protects you from psychological discomfort",
      details: [
        "Change triggers uncertainty, which the amygdala interprets as threat",
        "Anxiety is the body's early warning system, designed to keep you safe",
        "Staying with familiar behaviors feels safer, even when they're ineffective",
        "Sales Example: A rep avoids prospecting because the potential for rejection creates anticipatory anxiety—staying busy with 'research' feels safer"
      ],
      consequence: "Without addressing the underlying anxiety, pushing harder just increases avoidance behavior"
    },
    {
      id: 2,
      title: "Preserve Identity",
      icon: User,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500",
      summary: "Your brain defends who you think you are",
      details: [
        "Self-concept is a cognitive structure the mind works to maintain",
        "Behaviors that conflict with identity feel 'not like me' and get rejected",
        "Changing behavior can feel like losing yourself or betraying your values",
        "Sales Example: A rep who sees themselves as 'consultative' resists assertive closing techniques because 'I'm not pushy'—even when prospects need clear direction"
      ],
      consequence: "Identity-threatening change requires reframing who you are, not just what you do"
    },
    {
      id: 3,
      title: "Maintain Coherence",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500",
      summary: "The mind creates narratives to make sense of the world",
      details: [
        "Your brain builds stories that explain why things happen",
        "New behaviors that contradict your narrative create cognitive dissonance",
        "The mind will defend its existing story, even when evidence suggests otherwise",
        "Sales Example: A rep believes 'People don't like being sold to'—when using direct techniques feels uncomfortable, they interpret it as proof the technique doesn't work, rather than recognizing their own discomfort"
      ],
      consequence: "Challenging core beliefs requires exposing the assumptions behind them, not just willpower"
    }
  ]

  const toggleMechanism = (id: number) => {
    setSelectedMechanism(selectedMechanism === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <p className="text-sm text-muted-foreground mb-4">
        Click each protective mechanism to understand how the mind actively resists change:
      </p>

      {/* Mechanism Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {mechanisms.map((mechanism) => {
          const Icon = mechanism.icon
          const isSelected = selectedMechanism === mechanism.id

          return (
            <div
              key={mechanism.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? `${mechanism.bgColor} ${mechanism.borderColor} shadow-lg`
                  : "bg-muted border-transparent hover:border-muted-foreground/20 hover:shadow-md"
              }`}
              onClick={() => toggleMechanism(mechanism.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${mechanism.bgColor} flex items-center justify-center mb-3`}>
                  <Icon className={`h-8 w-8 ${mechanism.color}`} />
                </div>
                <p className="font-bold text-base mb-2">{mechanism.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{mechanism.summary}</p>
                
                <ChevronDown
                  className={`h-5 w-5 mt-2 transition-transform duration-300 ${
                    isSelected ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Expanded Details */}
      {selectedMechanism !== null && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {mechanisms
            .filter(m => m.id === selectedMechanism)
            .map((mechanism) => {
              const Icon = mechanism.icon
              return (
                <div
                  key={mechanism.id}
                  className={`p-6 rounded-lg ${mechanism.bgColor} border-2 ${mechanism.borderColor}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`h-6 w-6 ${mechanism.color}`} />
                    <h4 className="text-lg font-semibold">{mechanism.title}</h4>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {mechanism.details.map((detail, index) => (
                      <div
                        key={index}
                        className={`pl-4 border-l-2 ${mechanism.borderColor} py-2`}
                      >
                        <p className="text-sm leading-relaxed">• {detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-background/50 rounded border border-muted-foreground/20">
                    <p className="text-sm font-semibold mb-2">💡 The Implication:</p>
                    <p className="text-sm italic">{mechanism.consequence}</p>
                  </div>
                </div>
              )
            })}
        </div>
      )}

      {/* Bottom Context */}
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm italic text-center">
          These protections operate outside conscious awareness—you genuinely want to change while simultaneously working to prevent it.
        </p>
      </div>
    </div>
  )
}

/**
 * Interactive Technical vs Adaptive Challenges Component
 * Visual comparison with interactive examples
 */
function TechnicalVsAdaptiveInteractive() {
  const [selectedType, setSelectedType] = useState<'technical' | 'adaptive' | null>(null)

  const technicalChallenges = {
    type: 'technical',
    title: 'Technical Challenges',
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500',
    accentColor: 'bg-green-500',
    characteristics: [
      { label: 'Can be solved with new skills', icon: CheckCircle2 },
      { label: 'Information or procedures fix it', icon: CheckCircle2 },
      { label: 'No mindset change required', icon: CheckCircle2 },
      { label: 'Training addresses the gap', icon: CheckCircle2 }
    ],
    examples: [
      {
        scenario: 'Learning CRM Software',
        problem: 'Rep doesn\'t know how to log activities in the CRM',
        solution: 'Provide step-by-step training and documentation',
        outcome: 'Rep successfully uses CRM after 2-hour training session'
      },
      {
        scenario: 'Email Template Creation',
        problem: 'Rep writes unclear follow-up emails',
        solution: 'Share proven templates and formatting guidelines',
        outcome: 'Email response rates improve with structured templates'
      },
      {
        scenario: 'Product Knowledge',
        problem: 'Rep can\'t answer technical questions about features',
        solution: 'Product training sessions and reference materials',
        outcome: 'Rep confidently explains features after study'
      }
    ]
  }

  const adaptiveChallenges = {
    type: 'adaptive',
    title: 'Adaptive/Developmental Challenges',
    icon: Brain,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500',
    accentColor: 'bg-orange-500',
    characteristics: [
      { label: 'Require change in identity or meaning', icon: User },
      { label: 'Trigger fear or threat to self-concept', icon: Shield },
      { label: 'Mindset transformation needed', icon: RefreshCw },
      { label: 'Training alone doesn\'t work', icon: Brain }
    ],
    examples: [
      {
        scenario: 'Being Vulnerable in Calls',
        problem: 'Rep avoids admitting gaps in knowledge to prospects',
        solution: 'Must challenge belief that "admitting ignorance = incompetence"',
        outcome: 'Requires identity shift to see vulnerability as strength'
      },
      {
        scenario: 'Handling Direct Rejection',
        problem: 'Rep personalizes "no" and avoids follow-up',
        solution: 'Must reframe rejection as data, not judgment of self-worth',
        outcome: 'Requires changing relationship to failure and self-image'
      },
      {
        scenario: 'Assertive Closing',
        problem: 'Rep fears being "pushy" and never asks for the sale',
        solution: 'Must challenge assumption that "directness = manipulation"',
        outcome: 'Requires reconciling assertiveness with being helpful'
      }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Interactive Toggle Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Technical Card */}
        <div
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
            selectedType === 'technical'
              ? `${technicalChallenges.bgColor} ${technicalChallenges.borderColor} shadow-xl scale-[1.02]`
              : 'bg-muted border-muted-foreground/20 hover:shadow-lg hover:scale-[1.01]'
          }`}
          onClick={() => setSelectedType(selectedType === 'technical' ? null : 'technical')}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full ${technicalChallenges.bgColor} flex items-center justify-center`}>
              <Target className={`h-6 w-6 ${technicalChallenges.color}`} />
            </div>
            <h4 className="text-lg font-bold">{technicalChallenges.title}</h4>
          </div>

          <div className="space-y-2">
            {technicalChallenges.characteristics.map((char, idx) => {
              const Icon = char.icon
              return (
                <div key={idx} className="flex items-start gap-2">
                  <Icon className={`h-4 w-4 ${technicalChallenges.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-sm">{char.label}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-muted-foreground/20">
            <p className="text-xs text-muted-foreground text-center">
              {selectedType === 'technical' ? 'Click to collapse' : 'Click to see examples →'}
            </p>
          </div>
        </div>

        {/* Adaptive Card */}
        <div
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
            selectedType === 'adaptive'
              ? `${adaptiveChallenges.bgColor} ${adaptiveChallenges.borderColor} shadow-xl scale-[1.02]`
              : 'bg-muted border-muted-foreground/20 hover:shadow-lg hover:scale-[1.01]'
          }`}
          onClick={() => setSelectedType(selectedType === 'adaptive' ? null : 'adaptive')}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full ${adaptiveChallenges.bgColor} flex items-center justify-center`}>
              <Brain className={`h-6 w-6 ${adaptiveChallenges.color}`} />
            </div>
            <h4 className="text-lg font-bold">{adaptiveChallenges.title}</h4>
          </div>

          <div className="space-y-2">
            {adaptiveChallenges.characteristics.map((char, idx) => {
              const Icon = char.icon
              return (
                <div key={idx} className="flex items-start gap-2">
                  <Icon className={`h-4 w-4 ${adaptiveChallenges.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-sm">{char.label}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-muted-foreground/20">
            <p className="text-xs text-muted-foreground text-center">
              {selectedType === 'adaptive' ? 'Click to collapse' : 'Click to see examples →'}
            </p>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      {selectedType === 'technical' && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className={`p-6 rounded-lg ${technicalChallenges.bgColor} border-2 ${technicalChallenges.borderColor}`}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className={`h-5 w-5 ${technicalChallenges.color}`} />
              Technical Challenge Examples
            </h4>
            <div className="grid gap-4">
              {technicalChallenges.examples.map((example, idx) => (
                <div key={idx} className="p-4 bg-background/80 rounded border border-muted-foreground/20">
                  <p className="font-semibold mb-3 flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${technicalChallenges.accentColor} text-white text-xs font-bold`}>
                      {idx + 1}
                    </span>
                    {example.scenario}
                  </p>
                  <div className="space-y-2 text-sm ml-8">
                    <p><span className="font-semibold">Problem:</span> {example.problem}</p>
                    <p><span className="font-semibold text-green-600 dark:text-green-400">Solution:</span> {example.solution}</p>
                    <p><span className="font-semibold text-blue-600 dark:text-blue-400">Outcome:</span> {example.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedType === 'adaptive' && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className={`p-6 rounded-lg ${adaptiveChallenges.bgColor} border-2 ${adaptiveChallenges.borderColor}`}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className={`h-5 w-5 ${adaptiveChallenges.color}`} />
              Adaptive Challenge Examples
            </h4>
            <div className="grid gap-4">
              {adaptiveChallenges.examples.map((example, idx) => (
                <div key={idx} className="p-4 bg-background/80 rounded border border-muted-foreground/20">
                  <p className="font-semibold mb-3 flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${adaptiveChallenges.accentColor} text-white text-xs font-bold`}>
                      {idx + 1}
                    </span>
                    {example.scenario}
                  </p>
                  <div className="space-y-2 text-sm ml-8">
                    <p><span className="font-semibold">Problem:</span> {example.problem}</p>
                    <p><span className="font-semibold text-orange-600 dark:text-orange-400">Required Change:</span> {example.solution}</p>
                    <p><span className="font-semibold text-purple-600 dark:text-purple-400">Why It's Hard:</span> {example.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Critical Warning */}
      <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg border-2 border-red-200 dark:border-red-800">
        <div className="flex items-start gap-3">
          <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
            ⚠️
          </div>
          <div>
            <p className="font-bold text-red-700 dark:text-red-400 mb-2">The Critical Mistake</p>
            <p className="text-sm text-red-900 dark:text-red-300">
              Most behavior change failures occur because <strong>adaptive challenges are treated as technical ones</strong>. 
              When identity, fear, or core beliefs are involved, more training won't help—you need to address the underlying assumptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Interactive Behavior Scorecard Component
 * Allows users to explore behavior tracking metrics with visual progress
 */
function InteractiveBehaviorScorecard() {
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null)
  const [demoScores, setDemoScores] = useState({
    consistency: 4,
    quality: 3,
    autonomy: 4,
    environmental: 3
  })

  const metrics = [
    {
      id: 1,
      title: "Consistency Score",
      icon: CheckCircle2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      metric: "Days behavior was performed / 5",
      target: "5/5 days for at least 3 consecutive weeks",
      currentScore: demoScores.consistency,
      maxScore: 5,
      details: [
        "Track whether the behavior happens daily, not whether it's perfect",
        "Even 5 minutes counts—consistency beats intensity",
        "Missing 2+ days signals the need for environmental redesign",
        "Example: Rep completes 20 prospecting calls by 10 AM every day this week = 5/5"
      ],
      interpretation: [
        "5/5 = Behavior is becoming automatic",
        "4/5 = On track, but watch for patterns in missed days",
        "3/5 or below = Intervention needed, redesign environment"
      ]
    },
    {
      id: 2,
      title: "Quality Score",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      metric: "Manager observation rating (1-5)",
      target: "Consistent 4+ with decreasing coaching needed",
      currentScore: demoScores.quality,
      maxScore: 5,
      details: [
        "Rate execution quality based on actual call reviews",
        "Focus on technique adherence (e.g., using Camp/Voss correctly)",
        "Quality can lag consistency—that's normal in skill development",
        "Example: Manager reviews 3 recorded calls and rates objection handling technique as 4/5"
      ],
      interpretation: [
        "5/5 = Mastery level execution",
        "3-4/5 = Competent with room for refinement",
        "1-2/5 = Needs focused coaching on technique"
      ]
    },
    {
      id: 3,
      title: "Autonomy Score",
      icon: User,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      metric: "Self-initiated vs. prompted",
      target: "Behaviors happen without external reminders",
      currentScore: demoScores.autonomy,
      maxScore: 5,
      details: [
        "Track whether rep needs reminders to perform behavior",
        "Autonomy increases as behavior becomes habitual",
        "Low autonomy despite high consistency suggests external dependence",
        "Example: Rep starts morning prospecting routine without manager check-ins = High autonomy"
      ],
      interpretation: [
        "5/5 = Fully self-directed, behavior is habitual",
        "3-4/5 = Occasionally needs prompting",
        "1-2/5 = Relies heavily on external accountability"
      ]
    },
    {
      id: 4,
      title: "Environmental Support",
      icon: MapPin,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      metric: "Setup completion checklist",
      target: "All environmental supports in place and maintained",
      currentScore: demoScores.environmental,
      maxScore: 5,
      details: [
        "Checklist of environmental supports: templates, schedules, physical cues",
        "Rate how many supports are actively maintained (not just created)",
        "Degrading environment is an early warning sign",
        "Example: Prospecting template saved, 9 AM calendar block exists, call list prepared nightly = 5/5"
      ],
      interpretation: [
        "5/5 = All supports in place and actively used",
        "3-4/5 = Most supports present, some need refreshing",
        "1-2/5 = Environment lacks behavior triggers"
      ]
    }
  ]

  const toggleMetric = (id: number) => {
    setSelectedMetric(selectedMetric === id ? null : id)
  }

  const adjustScore = (metricKey: keyof typeof demoScores, delta: number) => {
    setDemoScores(prev => ({
      ...prev,
      [metricKey]: Math.max(0, Math.min(5, prev[metricKey] + delta))
    }))
  }

  const getMetricKey = (id: number): keyof typeof demoScores => {
    const keys: (keyof typeof demoScores)[] = ['consistency', 'quality', 'autonomy', 'environmental']
    return keys[id - 1]
  }

  const getProgressColor = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Target className="h-7 w-7 text-brand-green" />
        <div>
          <h3 className="text-xl font-semibold">The Behavior Scorecard</h3>
          <p className="text-sm text-muted-foreground">Track these metrics weekly for each rep (click to explore)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const isSelected = selectedMetric === metric.id
          const metricKey = getMetricKey(metric.id)
          const currentScore = metric.currentScore

          return (
            <div key={metric.id} className="space-y-2">
              <div
                className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? `${metric.bgColor} ${metric.borderColor} shadow-lg`
                    : 'bg-muted border-transparent hover:border-muted-foreground/20 hover:shadow-md'
                }`}
                onClick={() => toggleMetric(metric.id)}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-6 w-6 ${metric.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-semibold">{metric.title}</p>
                        <p className="text-xs text-muted-foreground">{metric.metric}</p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 flex-shrink-0 ${
                          isSelected ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Score</span>
                        <span className="font-bold">
                          {currentScore}/{metric.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(currentScore, metric.maxScore)} transition-all duration-500 rounded-full`}
                          style={{ width: `${(currentScore / metric.maxScore) * 100}%` }}
                        />
                      </div>
                      
                      {/* Interactive Adjuster */}
                      <div className="flex items-center gap-2 justify-center pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            adjustScore(metricKey, -1)
                          }}
                          disabled={currentScore === 0}
                          className="h-7 w-7 p-0"
                        >
                          -
                        </Button>
                        <span className="text-xs text-muted-foreground">Adjust demo score</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            adjustScore(metricKey, 1)
                          }}
                          disabled={currentScore === metric.maxScore}
                          className="h-7 w-7 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <p className="text-sm font-semibold mb-2">🎯 Target: {metric.target}</p>
                      <div className="space-y-2">
                        {metric.details.map((detail, index) => (
                          <div key={index} className={`pl-4 border-l-2 ${metric.borderColor} py-1`}>
                            <p className="text-sm leading-relaxed">• {detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`p-3 ${metric.bgColor} rounded border ${metric.borderColor}`}>
                      <p className="text-sm font-semibold mb-2">📊 Interpretation:</p>
                      <div className="space-y-1">
                        {metric.interpretation.map((interp, index) => (
                          <p key={index} className="text-xs">{interp}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-brand-green/10 to-brand-orange/10 rounded-lg border border-brand-green/30">
        <p className="text-sm font-semibold mb-2">💡 Weekly Review Protocol:</p>
        <p className="text-sm leading-relaxed">
          Score all four metrics each Friday. If any metric drops below target for 2 consecutive weeks, 
          schedule an immediate 1-on-1 to diagnose barriers and redesign the environment or approach.
        </p>
      </div>
    </Card>
  )
}

/**
 * Interactive Red Flags Component
 * Allows users to explore warning signs of regression
 */
function InteractiveRedFlags() {
  const [selectedFlag, setSelectedFlag] = useState<number | null>(null)
  const [checkedFlags, setCheckedFlags] = useState<number[]>([])

  const redFlags = [
    {
      id: 1,
      title: "Consistency drops below 4/5 days",
      icon: "📉",
      severity: "high",
      timeframe: "For two consecutive weeks",
      details: [
        "Missing one day per week is normal variance",
        "Missing 2+ days consistently indicates environmental breakdown",
        "Often the first visible signal that motivation is waning",
        "Common causes: competing priorities, removed calendar blocks, unclear process"
      ],
      intervention: [
        "Review and strengthen environmental cues",
        "Identify what changed in the last 2 weeks",
        "Simplify the behavior if it feels too complex",
        "Add accountability partner or daily check-in"
      ]
    },
    {
      id: 2,
      title: "Excuses or rationalizations increase",
      icon: "💬",
      severity: "high",
      timeframe: "Multiple instances per week",
      warning: '"I\'ll do it later," "It doesn\'t work for this prospect," "I\'m too busy today"',
      details: [
        "Language shifts from 'I will' to 'I can't' or 'I shouldn't have to'",
        "Rationalizations are the mind protecting against discomfort",
        "Often accompanies a return to old, familiar behaviors",
        "Indicates the behavior hasn't become identity-based yet"
      ],
      intervention: [
        "Revisit the 'why'—reconnect behavior to identity or values",
        "Reduce barrier to entry (make it easier to start)",
        "Address underlying fears or beliefs blocking action",
        "Celebrate small wins to rebuild momentum"
      ]
    },
    {
      id: 3,
      title: "Environmental supports are removed",
      icon: "🗑️",
      severity: "critical",
      timeframe: "Any removal is a red flag",
      warning: "Scripts deleted, calendar blocks canceled, templates abandoned",
      details: [
        "Physical or digital cues that trigger behavior are gone",
        "Often done unconsciously when reverting to old patterns",
        "Indicates rep has mentally 'given up' on the system",
        "Without cues, behavior relies entirely on willpower (which fails)"
      ],
      intervention: [
        "Immediately restore all environmental supports",
        "Have rep verbally commit to maintaining them",
        "Add redundant cues (multiple triggers for same behavior)",
        "Manager spot-check that supports remain in place"
      ]
    },
    {
      id: 4,
      title: "Rep stops self-reporting or tracking",
      icon: "📊",
      severity: "critical",
      timeframe: "Missed tracking for 3+ days",
      warning: "No longer filling out scorecards, sharing progress, or logging behaviors",
      details: [
        "Tracking creates awareness; stopping tracking creates blind spots",
        "Often the last step before complete regression",
        "May indicate shame about performance or belief that tracking 'doesn't matter'",
        "Without data, you can't course-correct"
      ],
      intervention: [
        "1-on-1 conversation: Why did tracking stop?",
        "Simplify tracking to absolute minimum (one metric only)",
        "Make tracking public or shared with peer (social pressure)",
        "Frame tracking as 'learning data' not 'performance evaluation'"
      ]
    }
  ]

  const toggleFlag = (id: number) => {
    setSelectedFlag(selectedFlag === id ? null : id)
  }

  const toggleCheck = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCheckedFlags(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-300'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-300'
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-300'
    }
  }

  const checkedCount = checkedFlags.length

  return (
    <Card className="p-6 border-2 border-red-200">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="h-7 w-7 text-red-600" />
        <div>
          <h3 className="text-xl font-semibold text-red-700">Red Flags for Regression</h3>
          <p className="text-sm text-muted-foreground">Watch for these warning signs (check any you've observed)</p>
        </div>
      </div>

      {checkedCount > 0 && (
        <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
          <p className="font-semibold text-red-800 mb-1">
            ⚠️ {checkedCount} red flag{checkedCount > 1 ? 's' : ''} detected!
          </p>
          <p className="text-sm text-red-700">
            Immediate action required: Schedule 1-on-1 coaching to diagnose and address barriers.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {redFlags.map((flag) => {
          const isSelected = selectedFlag === flag.id
          const isChecked = checkedFlags.includes(flag.id)
          const severityClass = getSeverityColor(flag.severity)

          return (
            <div
              key={flag.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? severityClass
                  : 'bg-muted border-transparent hover:border-red-300 hover:shadow-md'
              }`}
              onClick={() => toggleFlag(flag.id)}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{flag.icon}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => toggleCheck(flag.id, e as any)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold">{flag.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="font-medium">Timeframe:</span> {flag.timeframe}
                        </p>
                        {flag.warning && (
                          <p className="text-xs italic text-red-600 mt-1">
                            {flag.warning}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 flex-shrink-0 ${
                        isSelected ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {isSelected && (
                    <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <p className="text-sm font-semibold mb-2">🔍 What to watch for:</p>
                        <div className="space-y-2">
                          {flag.details.map((detail, index) => (
                            <div key={index} className="pl-4 border-l-2 border-red-500 py-1">
                              <p className="text-sm leading-relaxed">• {detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 rounded border border-green-300">
                        <p className="text-sm font-semibold text-green-800 mb-2">✅ Intervention Steps:</p>
                        <div className="space-y-1">
                          {flag.intervention.map((step, index) => (
                            <p key={index} className="text-sm text-green-800">
                              {index + 1}. {step}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-4 bg-red-50 rounded-lg border-2 border-red-300">
        <p className="font-semibold text-red-700 mb-2">🚨 Critical Principle:</p>
        <p className="text-sm text-red-800">
          Don't wait for complete regression—intervene at the first warning sign. Early intervention has a 90% 
          success rate; waiting until multiple flags appear drops success to &lt;30%.
        </p>
      </div>
    </Card>
  )
}

/**
 * Interactive Pitfalls Explorer Component
 * An engaging, visual way to explore common implementation pitfalls
 */
function InteractivePitfallsExplorer() {
  const [selectedPitfall, setSelectedPitfall] = useState<number | null>(null)
  const [checkedPitfalls, setCheckedPitfalls] = useState<number[]>([])
  const [showImpactVisualization, setShowImpactVisualization] = useState(false)

  const pitfalls = [
    {
      id: 1,
      title: "Too Much, Too Fast",
      icon: "🏃💨",
      severity: "critical",
      impactScore: 95,
      color: "red",
      gradient: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      problem: "Trying to implement all Camp principles, all Voss techniques, and personality assessment simultaneously.",
      realWorldExample: "A sales manager launches 'Camp + Voss + Personality Training Week' where sales representatives are expected to master 15+ new techniques immediately. Within 2 weeks, sales representatives are overwhelmed, revert to old habits, and training ROI = $0.",
      whyItHappens: [
        "Pressure from leadership for quick wins",
        "Assumption that 'more content = more value'",
        "Underestimating cognitive load of behavior change",
        "Belief that adults can absorb unlimited information"
      ],
      consequences: [
        {
          label: "Cognitive Overload",
          description: "Sales representatives can't remember which technique to use when",
          severity: "high"
        },
        {
          label: "Analysis Paralysis",
          description: "Too many choices lead to decision fatigue and inaction",
          severity: "high"
        },
        {
          label: "Regression to Default",
          description: "Under pressure, sales representatives revert to familiar (ineffective) behaviors",
          severity: "critical"
        },
        {
          label: "Decreased Confidence",
          description: "Failure to execute perfectly creates self-doubt",
          severity: "medium"
        }
      ],
      theFix: {
        principle: "Sequential Mastery: One Behavior at a Time",
        steps: [
          "Choose ONE keystone behavior (e.g., daily prospecting)",
          "Practice that behavior for 21 consecutive days until automatic",
          "Add second behavior only after first shows consistency",
          "Maximum 1-2 new behaviors per month"
        ],
        timeline: "3-6 months for comprehensive implementation",
        successMetric: "Behavior becomes automatic (can do while distracted) before adding next"
      },
      diagnosticQuestions: [
        "Are your sales representatives trying to apply 3+ new techniques simultaneously?",
        "Do training sessions introduce 5+ concepts in a single day?",
        "Have you launched multiple initiatives in the same quarter?"
      ]
    },
    {
      id: 2,
      title: "No Environmental Support",
      icon: "🌪️",
      severity: "critical",
      impactScore: 90,
      color: "orange",
      gradient: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      problem: "Teaching concepts in a training session, then sending sales representatives back to the same desk, same distractions, same triggers.",
      realWorldExample: "Sales representatives attend an excellent Camp training workshop, return to their desks with no templates, no scheduled prospecting time, and a CRM that doesn't prompt for discovery questions. The training content fades within 72 hours.",
      whyItHappens: [
        "Training teams focus on content delivery, not environment design",
        "Belief that motivation + knowledge = behavior change",
        "Lack of authority to change physical/digital workspace",
        "Separation between 'training' and 'operations'"
      ],
      consequences: [
        {
          label: "Knowledge-Action Gap",
          description: "Sales representatives know what to do but environment prevents execution",
          severity: "critical"
        },
        {
          label: "Friction Decay",
          description: "Every barrier reduces likelihood of behavior by 30-50%",
          severity: "high"
        },
        {
          label: "Willpower Depletion",
          description: "Relying on motivation exhausts mental resources",
          severity: "high"
        },
        {
          label: "Invisible Regression",
          description: "Sales representatives think they're trying but environment sabotages them",
          severity: "medium"
        }
      ],
      theFix: {
        principle: "Design the Environment Before Teaching Behavior",
        steps: [
          "Create templates (email, call scripts, discovery frameworks) in advance",
          "Block calendar time for new behaviors before training",
          "Add environmental cues (sticky notes, desktop wallpapers, Slack reminders)",
          "Modify CRM to prompt desired behaviors automatically",
          "Assign accountability partners who check in daily"
        ],
        timeline: "1-2 weeks of environment prep before behavior training",
        successMetric: "Desired behavior becomes the path of least resistance"
      },
      diagnosticQuestions: [
        "Do sales representatives have templates/tools ready to use immediately?",
        "Is the behavior scheduled or just 'expected'?",
        "Are there physical/digital cues triggering the behavior?"
      ]
    },
    {
      id: 3,
      title: "Focusing Only on Outcomes",
      icon: "🎯💰",
      severity: "high",
      impactScore: 85,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      problem: "Celebrating deals closed but ignoring whether Camp/Voss behaviors were used.",
      realWorldExample: "A sales representative closes a big deal using old-school pressure tactics. Leadership celebrates publicly. Other sales representatives see: 'Why bother learning Camp/Voss if pressure still works?' The new system loses credibility.",
      whyItHappens: [
        "Quarterly targets create outcome obsession",
        "Easier to measure results than behavior quality",
        "Belief that 'results justify methods'",
        "Short-term pressure overrides long-term development"
      ],
      consequences: [
        {
          label: "Wrong Behaviors Reinforced",
          description: "Sales representatives learn what gets rewarded, not what's taught",
          severity: "critical"
        },
        {
          label: "System Credibility Loss",
          description: "If old methods still work, why change?",
          severity: "high"
        },
        {
          label: "Cherry-Picking Execution",
          description: "Sales representatives use new system only when convenient",
          severity: "high"
        },
        {
          label: "Learning Plateau",
          description: "Without process feedback, skill development stalls",
          severity: "medium"
        }
      ],
      theFix: {
        principle: "Reward Process Adherence, Not Just Results",
        steps: [
          "Track leading indicators: # of discovery questions asked, use of accusation audits, etc.",
          "Celebrate 'perfect process, no close' as much as 'closed deal'",
          "Review call recordings for technique quality, not just win rate",
          "Create dual scoreboard: Process Execution + Results",
          "Publicly recognize sales representatives who execute system perfectly even during slumps"
        ],
        timeline: "Immediate—change recognition criteria this week",
        successMetric: "Sales representatives can articulate: 'I'm rewarded for how I sell, not just what I sell'"
      },
      diagnosticQuestions: [
        "Do your celebrations mention HOW the deal was won?",
        "Can sales representatives get recognized for great execution even without a close?",
        "Are leading indicators tracked as closely as revenue?"
      ]
    },
    {
      id: 4,
      title: "No Feedback Loop",
      icon: "🔇",
      severity: "high",
      impactScore: 80,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      problem: "Sales representatives don't know if they're doing it right until weeks later when results (or lack of results) appear.",
      realWorldExample: "A sales representative practices calibrated questions for 3 weeks but receives no coaching. They unknowingly develop a habit of leading questions that feel like interrogations. By the time poor results show up, the bad habit is ingrained.",
      whyItHappens: [
        "Managers too busy to provide real-time feedback",
        "Belief that 'practice makes perfect' (vs. perfect practice makes perfect)",
        "Lack of systems for rapid feedback (call recording review, peer observation)",
        "Fear of micro-managing or over-coaching"
      ],
      consequences: [
        {
          label: "Ingrained Bad Habits",
          description: "Incorrect execution becomes automatic before correction",
          severity: "critical"
        },
        {
          label: "Wasted Practice Time",
          description: "Hours of practice reinforcing wrong technique",
          severity: "high"
        },
        {
          label: "Confidence Erosion",
          description: "Sales representatives question their ability without understanding what's wrong",
          severity: "high"
        },
        {
          label: "Late Course Corrections",
          description: "Problems discovered only after results tank",
          severity: "medium"
        }
      ],
      theFix: {
        principle: "Rapid, Specific Feedback Within 24-48 Hours",
        steps: [
          "Require all sales representatives to record 2-3 calls per week for review",
          "Managers commit to 24-hour feedback turnaround on recordings",
          "Implement peer review: sales representatives review each other's calls using rubric",
          "Weekly 1-on-1s focused on technique quality, not just metrics",
          "Create feedback loops: Sales representative executes → Records → Reviews → Adjusts → Repeats"
        ],
        timeline: "Weekly feedback cycles minimum, daily for new behaviors",
        successMetric: "Sales representatives can describe what they're doing well/poorly before results appear"
      },
      diagnosticQuestions: [
        "How long between sales representative execution and manager feedback?",
        "Do sales representatives receive feedback on HOW they executed vs. just outcomes?",
        "Is call recording + review a standard practice?"
      ]
    },
    {
      id: 5,
      title: "Leadership Doesn't Model the Behavior",
      icon: "👔🚫",
      severity: "critical",
      impactScore: 100,
      color: "gray",
      gradient: "from-gray-500 to-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-400",
      problem: "Sales managers tell sales representatives to use Camp/Voss but don't use it themselves in meetings, coaching sessions, or their own prospecting.",
      realWorldExample: "A sales VP mandates that all sales representatives use discovery-first selling, then opens the quarterly business review with: 'Here's what you're going to do this quarter.' No discovery questions, pure directive communication. Sales representatives see the hypocrisy and disengage.",
      whyItHappens: [
        "'Do as I say, not as I do' leadership culture",
        "Belief that managers are exempt from new systems",
        "Time pressure makes shortcuts tempting",
        "Lack of accountability for leadership behavior"
      ],
      consequences: [
        {
          label: "Credibility Collapse",
          description: "If leaders don't use it, why should sales representatives?",
          severity: "critical"
        },
        {
          label: "Behavioral Permission",
          description: "Sales representatives learn shortcuts are acceptable",
          severity: "critical"
        },
        {
          label: "Cultural Dissonance",
          description: "'We say X but do Y' creates cynicism",
          severity: "high"
        },
        {
          label: "Learning Ceiling",
          description: "Sales representatives won't surpass leadership's visible skill level",
          severity: "high"
        }
      ],
      theFix: {
        principle: "Leaders Go First and Make Their Practice Visible",
        steps: [
          "Managers record their own calls and share for team critique",
          "Use Camp/Voss in all internal meetings (team meetings, 1-on-1s, QBRs)",
          "Leaders practice new behaviors publicly before rolling to sales representatives",
          "Create 'Manager Practice Sessions' where leaders demonstrate techniques",
          "Hold leadership accountable: Track whether managers use the system"
        ],
        timeline: "Continuous—leadership modeling is ongoing, not one-time",
        successMetric: "Sales representatives can point to specific examples of leaders using the system"
      },
      diagnosticQuestions: [
        "Do managers use Camp/Voss in internal meetings?",
        "Have leaders demonstrated the behavior publicly?",
        "Can sales representatives name times they've seen leadership struggle/learn the system?"
      ]
    }
  ]

  const togglePitfall = (id: number) => {
    setSelectedPitfall(selectedPitfall === id ? null : id)
  }

  const toggleCheck = (id: number) => {
    setCheckedPitfalls(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getImpactColor = (score: number) => {
    if (score >= 90) return 'bg-red-500'
    if (score >= 80) return 'bg-orange-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getRiskLevel = () => {
    const totalImpact = checkedPitfalls.reduce((sum, id) => {
      const pitfall = pitfalls.find(p => p.id === id)
      return sum + (pitfall?.impactScore || 0)
    }, 0)
    
    if (totalImpact >= 200) return { level: 'CRITICAL', color: 'red', message: 'Immediate intervention required' }
    if (totalImpact >= 150) return { level: 'HIGH', color: 'orange', message: 'Significant risk of failure' }
    if (totalImpact >= 80) return { level: 'MODERATE', color: 'yellow', message: 'Address before proceeding' }
    return { level: 'LOW', color: 'green', message: 'Implementation on track' }
  }

  const riskLevel = getRiskLevel()

  return (
    <div className="space-y-6">
      {/* Interactive Diagnostic */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">
            ⚠️
          </div>
          <div>
            <h3 className="text-xl font-semibold">Interactive Pitfall Diagnostic</h3>
            <p className="text-sm text-muted-foreground">Check any pitfalls you're experiencing to see your implementation risk</p>
          </div>
        </div>

        {checkedPitfalls.length > 0 && (
          <div className={`mb-6 p-4 bg-${riskLevel.color}-100 border-2 border-${riskLevel.color}-400 rounded-lg`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg">Risk Level: {riskLevel.level}</span>
              <span className="text-sm font-semibold">{riskLevel.message}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-${riskLevel.color}-500 transition-all duration-500`}
                style={{ 
                  width: `${Math.min(100, (checkedPitfalls.reduce((sum, id) => {
                    const pitfall = pitfalls.find(p => p.id === id)
                    return sum + (pitfall?.impactScore || 0)
                  }, 0) / 300) * 100)}%` 
                }}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {pitfalls.map((pitfall) => {
            const isSelected = selectedPitfall === pitfall.id
            const isChecked = checkedPitfalls.includes(pitfall.id)

            return (
              <div
                key={pitfall.id}
                className={`rounded-lg border-2 transition-all duration-300 ${
                  isSelected
                    ? `${pitfall.bgColor} ${pitfall.borderColor} shadow-lg`
                    : isChecked
                    ? `${pitfall.bgColor} ${pitfall.borderColor} shadow-md`
                    : 'bg-muted border-transparent hover:border-muted-foreground/20 hover:shadow-md'
                }`}
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => togglePitfall(pitfall.id)}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(pitfall.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 cursor-pointer w-5 h-5"
                    />
                    <span className="text-3xl flex-shrink-0">{pitfall.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xl font-bold mb-1">{pitfall.title}</p>
                          <p className="text-sm text-muted-foreground">{pitfall.problem}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="px-5 pb-5 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Real-World Example */}
                    <div className={`p-4 bg-gradient-to-r ${pitfall.gradient} bg-opacity-10 rounded-lg border-l-4 ${pitfall.borderColor}`}>
                      <p className="font-semibold mb-2">💡 Real-World Example:</p>
                      <p className="text-sm leading-relaxed italic">{pitfall.realWorldExample}</p>
                    </div>

                    {/* Why It Happens */}
                    <div>
                      <p className="font-semibold mb-2">🔍 Why This Pitfall Happens:</p>
                      <div className="grid md:grid-cols-2 gap-2">
                        {pitfall.whyItHappens.map((reason, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded">
                            <span className="text-red-500">•</span>
                            <p className="text-sm">{reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Consequences */}
                    <div>
                      <p className="font-semibold mb-3">⚡ Cascading Consequences:</p>
                      <div className="space-y-2">
                        {pitfall.consequences.map((consequence, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              consequence.severity === 'critical' ? 'bg-red-500' :
                              consequence.severity === 'high' ? 'bg-orange-500' :
                              consequence.severity === 'medium' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`} />
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{consequence.label}</p>
                              <p className="text-xs text-muted-foreground">{consequence.description}</p>
                            </div>
                            <span className={`text-xs font-bold uppercase ${getSeverityColor(consequence.severity)}`}>
                              {consequence.severity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* The Fix */}
                    <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border-2 border-green-300 dark:border-green-700">
                      <p className="text-lg font-bold text-green-700 dark:text-green-400 mb-3">
                        ✅ The Fix: {pitfall.theFix.principle}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-sm mb-2">Implementation Steps:</p>
                          <div className="space-y-2">
                            {pitfall.theFix.steps.map((step, index) => (
                              <div key={index} className="flex items-start gap-2 pl-2">
                                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <p className="text-sm">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 pt-2">
                          <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Timeline</p>
                            <p className="text-sm font-semibold">{pitfall.theFix.timeline}</p>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Success Metric</p>
                            <p className="text-sm font-semibold">{pitfall.theFix.successMetric}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Diagnostic Questions */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-300">
                      <p className="font-semibold mb-2">🎯 Self-Diagnostic Questions:</p>
                      <div className="space-y-1">
                        {pitfall.diagnosticQuestions.map((question, index) => (
                          <p key={index} className="text-sm">
                            <span className="text-blue-600 font-semibold">?</span> {question}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Compound Effect Warning */}
      <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-300">
        <div className="flex items-start gap-4">
          <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-xl">
            🔥
          </div>
          <div>
            <p className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
              The Compound Effect: Pitfalls Multiply, Not Add
            </p>
            <p className="text-sm leading-relaxed text-red-900 dark:text-red-300 mb-3">
              When multiple pitfalls exist simultaneously, their impact doesn't add—it multiplies. 
              <strong> Pitfall 1 × Pitfall 2 × Pitfall 5 = Near-certain failure.</strong>
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm"><strong>Example Cascade:</strong> Too Much Too Fast (#1) + No Environmental Support (#2) = 
                Sales representatives overwhelmed with content they can't execute because environment blocks them = Immediate regression.</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm"><strong>Critical Combination:</strong> Leadership Doesn't Model (#5) + Focusing Only on Outcomes (#3) = 
                Sales representatives see leaders ignore new system while being judged only on old metrics = Total system failure within 30 days.</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mt-3">
              ⚠️ Action Required: Address checked pitfalls before proceeding with implementation. One pitfall can derail months of work.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

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
    q11: boolean
    q12: boolean
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
    q11: false,
    q12: false,
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

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">The Four Barriers to Change</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FlipCard
                    frontTitle="1. Cognitive Load"
                    frontContent={<Brain className="h-24 w-24 mx-auto text-brand-orange" />}
                    backTitle="Cognitive Load"
                    backContent="New behaviors require conscious attention and working memory, which are limited resources. Your brain must actively process each step instead of running on autopilot."
                  />

                  <FlipCard
                    frontTitle="2. Identity Conflict"
                    frontContent={<User className="h-24 w-24 mx-auto text-brand-green" />}
                    backTitle="Identity Conflict"
                    backContent="People resist changes that conflict with their self-image or threaten their status in a group. 'I'm not the type of person who does that' becomes a protective barrier."
                  />

                  <FlipCard
                    frontTitle="3. Environmental Cues"
                    frontContent={<MapPin className="h-24 w-24 mx-auto text-brand-orange" />}
                    backTitle="Environmental Cues"
                    backContent="The same environment that supported old behaviors triggers them automatically, making new behaviors harder. Your workspace, routines, and context all reinforce existing patterns."
                  />

                  <FlipCard
                    frontTitle="4. Immediate vs Delayed Rewards"
                    frontContent={<Clock className="h-24 w-24 mx-auto text-brand-green" />}
                    backTitle="Immediate vs Delayed Rewards"
                    backContent="Old behaviors often provide immediate comfort, while benefits of new behaviors appear later. The brain prioritizes instant gratification over long-term gain."
                  />
                </div>
              </div>

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
                      <strong>No Environmental Support:</strong> Sales representatives return to the same triggers for old behavior
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

          {/* Section 2: Adam Grant's Hidden Potential */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="hidden-potential">
              <h2 className="text-3xl font-bold text-brand-green">Adam Grant's Hidden Potential Model</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Reframing Potential</h3>
                <p className="text-lg leading-relaxed">
                  Adam Grant argues that potential is not a fixed trait predicted by talent—it's unlocked through
                  systems, strategies, and motivation. Your starting point matters far less than your rate of improvement.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Character Skills Over Cognitive Skills</h3>
                <p className="leading-relaxed mb-4">
                  We overvalue IQ and innate ability while undervaluing character skills that determine who keeps
                  improving when others stop. Click each skill to learn more:
                </p>
                <CharacterSkillsInteractive />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Power of Scaffolding</h3>
                <p className="leading-relaxed mb-4">
                  Growth accelerates when you build the right scaffolds—temporary support that enables permanent capability. Click each type to explore:
                </p>
                <ScaffoldingInteractive />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Deliberate Discomfort: Practice That Builds Potential</h3>
                <p className="leading-relaxed mb-4">
                  Improvement comes from practicing at the edge of your competence, not repeating what you already do well. Click each element to explore:
                </p>
                <DeliberateDiscomfortInteractive />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Systems Over Goals</h3>
                <p className="leading-relaxed mb-4">
                  Switch between goal-based and systems-based thinking to understand why systems drive more sustainable progress. Click each item for deeper insights:
                </p>
                <SystemsOverGoalsInteractive />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Adaptive Learner vs. Fragile Perfect Mindset</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded border-2 border-red-200">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-3">❌ Fragile Perfect (Stagnates)</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Avoids failure to protect image</li>
                      <li>• Ties identity to "being gifted"</li>
                      <li>• Fears looking incompetent</li>
                      <li>• Stops when challenge increases</li>
                      <li>• Confidence from performance</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded border-2 border-green-200">
                    <p className="font-semibold text-green-700 dark:text-green-400 mb-3">✓ Adaptive Learner (Grows)</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Fails forward deliberately</li>
                      <li>• Switches strategies when stuck</li>
                      <li>• Seeks challenge over comfort</li>
                      <li>• Increases effort with difficulty</li>
                      <li>• Confidence from growth rate</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Motivation Comes From Progress</h3>
                <div className="p-4 bg-brand-green/10 rounded mb-3">
                  <p className="text-lg font-semibold text-center">
                    "You don't need motivation to start. You gain motivation by starting."
                  </p>
                </div>
                <p className="leading-relaxed mb-3">Grant flips the traditional model. Instead of waiting for motivation:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span><strong>Track small wins</strong> – Document daily progress, no matter how minor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span><strong>Celebrate progress</strong> – Acknowledge improvement over perfection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span><strong>Use accountability partners</strong> – External commitment creates consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span><strong>Build routines that reduce friction</strong> – Make starting automatic</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Hidden Potential Formula</h3>
                <HiddenPotentialFormulaInteractive />
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 3: Kegan & Lahey's Immunity to Change */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="immunity-to-change">
              <h2 className="text-3xl font-bold text-brand-green">Kegan & Lahey: Immunity to Change</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">The Core Thesis</h3>
                <p className="text-lg leading-relaxed">
                  Most people and organizations do not fail to change because they lack willpower or skill. They fail
                  because they are protected by an internal immune system of hidden commitments and assumptions that
                  actively prevent change. Change is therefore not a technical problem—it is a developmental one.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Paradox of Change</h3>
                <p className="leading-relaxed mb-4">
                  People genuinely want to change and often know what to do—yet consistently do the opposite. This is not
                  resistance or laziness. It is self-protection.
                </p>
                <ParadoxOfChangeInteractive />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Technical vs. Adaptive Challenges</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  Understanding the difference between these two types of challenges is critical for effective change implementation. Click each type to explore real examples:
                </p>
                <TechnicalVsAdaptiveInteractive />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Immunity to Change Map</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  This four-step process reveals the hidden immune system protecting old behaviors. Follow the flow from left to right to understand why change feels impossible:
                </p>
                
                {/* Four Column Grid - Desktop */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-4 mb-6">
                  {/* Column 1 */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-5 border-2 border-blue-500/30 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                          1
                        </div>
                        <p className="font-bold text-sm">Improvement Goal</p>
                      </div>
                      <p className="text-xs mb-3 text-muted-foreground flex-grow">
                        A genuine, heartfelt change the person wants to make.
                      </p>
                      <div className="p-3 bg-background/80 rounded border border-blue-500/20">
                        <p className="text-xs italic text-blue-600 dark:text-blue-400">
                          "I want to make more cold calls daily."
                        </p>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-5 border-2 border-orange-500/30 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                          2
                        </div>
                        <p className="font-bold text-sm">Doing / Not Doing</p>
                      </div>
                      <p className="text-xs mb-3 text-muted-foreground flex-grow">
                        Behaviors that work directly against the stated goal.
                      </p>
                      <div className="p-3 bg-background/80 rounded border border-orange-500/20">
                        <p className="text-xs italic text-orange-600 dark:text-orange-400">
                          "I spend hours perfecting my list, research each prospect excessively, avoid dialing."
                        </p>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-5 border-2 border-purple-500/30 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                          3
                        </div>
                        <p className="font-bold text-sm">Hidden Competing Commitments</p>
                      </div>
                      <p className="text-xs mb-3 text-muted-foreground flex-grow">
                        Unspoken commitments that make the counterproductive behaviors necessary.
                      </p>
                      <div className="p-3 bg-background/80 rounded border border-purple-500/20 space-y-1">
                        <p className="text-xs text-purple-600 dark:text-purple-400">• Not looking incompetent</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">• Staying in control</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">• Being liked</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">• Avoiding conflict</p>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Column 4 */}
                  <div>
                    <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg p-5 border-2 border-red-500/30 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
                          4
                        </div>
                        <p className="font-bold text-sm">Big Assumptions</p>
                      </div>
                      <p className="text-xs mb-3 text-muted-foreground flex-grow">
                        Beliefs that make the competing commitments feel essential.
                      </p>
                      <div className="p-3 bg-background/80 rounded border border-red-500/20 space-y-1">
                        <p className="text-xs text-red-600 dark:text-red-400">"If I fail, I'll lose respect."</p>
                        <p className="text-xs text-red-600 dark:text-red-400">"If I assert myself, I'll be rejected."</p>
                        <p className="text-xs text-red-600 dark:text-red-400">"If I let go of control, things will fall apart."</p>
                      </div>
                      <p className="text-xs mt-3 font-semibold text-red-600 dark:text-red-400">
                        These assumptions are rarely tested—they are treated as facts.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet View - Stacked */}
                <div className="lg:hidden space-y-4">
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-5 border-2 border-blue-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <p className="font-bold">Improvement Goal</p>
                    </div>
                    <p className="text-sm mb-3 text-muted-foreground">
                      A genuine, heartfelt change the person wants to make.
                    </p>
                    <div className="p-3 bg-background/80 rounded border border-blue-500/20">
                      <p className="text-sm italic text-blue-600 dark:text-blue-400">
                        Example: "I want to make more cold calls daily."
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-5 border-2 border-orange-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <p className="font-bold">Doing / Not Doing</p>
                    </div>
                    <p className="text-sm mb-3 text-muted-foreground">
                      Behaviors that work directly against the stated goal.
                    </p>
                    <div className="p-3 bg-background/80 rounded border border-orange-500/20">
                      <p className="text-sm italic text-orange-600 dark:text-orange-400">
                        Example: "I spend hours perfecting my list, research each prospect excessively, avoid dialing."
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-5 border-2 border-purple-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <p className="font-bold">Hidden Competing Commitments</p>
                    </div>
                    <p className="text-sm mb-3 text-muted-foreground">
                      Unspoken commitments that make the counterproductive behaviors necessary.
                    </p>
                    <div className="p-3 bg-background/80 rounded border border-purple-500/20 space-y-1">
                      <p className="text-sm text-purple-600 dark:text-purple-400">• Commitment to not looking incompetent</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">• Commitment to staying in control</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">• Commitment to being liked</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">• Commitment to avoiding conflict</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                  </div>

                  <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg p-5 border-2 border-red-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <p className="font-bold">Big Assumptions</p>
                    </div>
                    <p className="text-sm mb-3 text-muted-foreground">
                      Beliefs that make the competing commitments feel essential.
                    </p>
                    <div className="p-3 bg-background/80 rounded border border-red-500/20 space-y-1">
                      <p className="text-sm text-red-600 dark:text-red-400">"If I fail, I'll lose respect."</p>
                      <p className="text-sm text-red-600 dark:text-red-400">"If I assert myself, I'll be rejected."</p>
                      <p className="text-sm text-red-600 dark:text-red-400">"If I let go of control, things will fall apart."</p>
                    </div>
                    <p className="text-sm mt-3 font-semibold text-red-600 dark:text-red-400">
                      These assumptions are rarely tested—they are treated as facts.
                    </p>
                  </div>
                </div>

                {/* Bottom Context */}
                <div className="p-4 bg-muted/50 rounded-lg border border-muted-foreground/20 mt-6">
                  <p className="text-sm text-center">
                    <strong>The Flow:</strong> Your goal triggers counter-behaviors, which protect competing commitments, which are powered by untested assumptions. Change requires working backwards from Column 4.
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Why Willpower and Motivation Fail</h3>
                <p className="leading-relaxed mb-3">Traditional change efforts rely on:</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">→</span>
                    <span>More effort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">→</span>
                    <span>Better discipline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">→</span>
                    <span>Accountability pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">→</span>
                    <span>External incentives</span>
                  </li>
                </ul>
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-2">But if the immunity system is intact:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Effort increases anxiety</li>
                    <li>• Accountability increases avoidance</li>
                    <li>• Incentives increase defensive behavior</li>
                  </ul>
                  <p className="text-sm mt-2 italic">The system simply adapts to protect itself.</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Real Change: Surfacing and Testing Assumptions</h3>
                <p className="leading-relaxed mb-4">
                  Transformation happens when individuals:
                </p>
                <div className="space-y-3">
                  <div className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-brand-green/5 hover:shadow-md hover:scale-[1.02] cursor-pointer">
                    <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                    <div className="transition-all duration-300 group-hover:translate-x-1">
                      <p className="font-semibold group-hover:text-brand-green transition-colors duration-300">Make competing commitments visible</p>
                      <p className="text-sm text-muted-foreground">Surface the hidden commitments protecting old behavior</p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-brand-green/5 hover:shadow-md hover:scale-[1.02] cursor-pointer">
                    <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                    <div className="transition-all duration-300 group-hover:translate-x-1">
                      <p className="font-semibold group-hover:text-brand-green transition-colors duration-300">Identify the assumptions behind them</p>
                      <p className="text-sm text-muted-foreground">Uncover the big assumptions treated as facts</p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-brand-green/5 hover:shadow-md hover:scale-[1.02] cursor-pointer">
                    <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                    <div className="transition-all duration-300 group-hover:translate-x-1">
                      <p className="font-semibold group-hover:text-brand-green transition-colors duration-300">Design safe, small tests to challenge those assumptions</p>
                      <p className="text-sm text-muted-foreground">Gather evidence through low-risk experiments</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-brand-green/10 rounded mt-4">
                  <p className="font-semibold">Change is not about "letting go"—it is about updating reality models.</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Small Tests, Not Big Leaps</h3>
                <p className="leading-relaxed mb-4">
                  Kegan & Lahey emphasize modest, low-risk experiments rather than heroic transformations:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="group p-4 bg-muted rounded cursor-pointer transition-all duration-300 hover:bg-brand-green/10 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
                    <Target className="h-6 w-6 text-brand-green mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-semibold text-sm mb-1 group-hover:text-brand-green transition-colors duration-300">Modest, Low-Risk</p>
                    <p className="text-xs">Small experiments that feel safe enough to try</p>
                  </div>
                  <div className="group p-4 bg-muted rounded cursor-pointer transition-all duration-300 hover:bg-brand-orange/10 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
                    <Brain className="h-6 w-6 text-brand-orange mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-semibold text-sm mb-1 group-hover:text-brand-orange transition-colors duration-300">Data Gathering</p>
                    <p className="text-xs">Not self-judgment, just evidence collection</p>
                  </div>
                  <div className="group p-4 bg-muted rounded cursor-pointer transition-all duration-300 hover:bg-brand-green/10 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
                    <Zap className="h-6 w-6 text-brand-green mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-semibold text-sm mb-1 group-hover:text-brand-green transition-colors duration-300">Curiosity Over Courage</p>
                    <p className="text-xs">Approach with scientific interest, not pressure</p>
                  </div>
                </div>
                <p className="mt-4 text-sm italic">
                  These tests gradually weaken the immune system by replacing fear with evidence.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Sales Application: Working With Immunity</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  See how the Immunity to Change framework applies to common sales challenges. Click each scenario to explore the full map:
                </p>
                <div className="space-y-4">
                  {/* Example 1: Cold Calls */}
                  <div className="group border-2 border-muted rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-green/50 hover:shadow-lg">
                    <div className="p-4 bg-gradient-to-r from-brand-green/5 to-brand-green/10 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center">
                            <span className="text-xl">📞</span>
                          </div>
                          <div>
                            <p className="font-bold text-base group-hover:text-brand-green transition-colors duration-300">
                              Rep Who Avoids Cold Calls
                            </p>
                            <p className="text-xs text-muted-foreground">Common prospecting avoidance pattern</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 bg-background border-t">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">1</div>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">GOAL</p>
                          </div>
                          <p className="text-sm">Make 20 calls daily</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">2</div>
                            <p className="text-xs font-bold text-orange-600 dark:text-orange-400">DOING INSTEAD</p>
                          </div>
                          <p className="text-sm">Research, list building, email prospecting</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">3</div>
                            <p className="text-xs font-bold text-purple-600 dark:text-purple-400">HIDDEN COMMITMENT</p>
                          </div>
                          <p className="text-sm">"I'm committed to not sounding desperate or pushy"</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">4</div>
                            <p className="text-xs font-bold text-red-600 dark:text-red-400">BIG ASSUMPTION</p>
                          </div>
                          <p className="text-sm">"If I sound desperate, prospects will reject me and tell others I'm incompetent"</p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-brand-green/5 rounded-lg border border-brand-green/20">
                        <p className="text-xs font-semibold text-brand-green mb-2">💡 Safe Test:</p>
                        <p className="text-sm">Make 3 calls where you deliberately use a more direct opener. Track: Do people actually respond negatively? Do they tell others? What actually happens?</p>
                      </div>
                    </div>
                  </div>

                  {/* Example 2: Objection Handling */}
                  <div className="group border-2 border-muted rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-orange/50 hover:shadow-lg">
                    <div className="p-4 bg-gradient-to-r from-brand-orange/5 to-brand-orange/10 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
                            <span className="text-xl">🛡️</span>
                          </div>
                          <div>
                            <p className="font-bold text-base group-hover:text-brand-orange transition-colors duration-300">
                              Rep Who Deflects Objections
                            </p>
                            <p className="text-xs text-muted-foreground">Avoiding difficult conversations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 bg-background border-t">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">1</div>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">GOAL</p>
                          </div>
                          <p className="text-sm">Address pricing objections directly</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">2</div>
                            <p className="text-xs font-bold text-orange-600 dark:text-orange-400">DOING INSTEAD</p>
                          </div>
                          <p className="text-sm">Offering discounts immediately, changing subject, sending more materials</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">3</div>
                            <p className="text-xs font-bold text-purple-600 dark:text-purple-400">HIDDEN COMMITMENT</p>
                          </div>
                          <p className="text-sm">"I'm committed to avoiding conflict and being liked"</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">4</div>
                            <p className="text-xs font-bold text-red-600 dark:text-red-400">BIG ASSUMPTION</p>
                          </div>
                          <p className="text-sm">"If I push back on objections, prospects will think I'm argumentative and walk away"</p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-brand-orange/5 rounded-lg border border-brand-orange/20">
                        <p className="text-xs font-semibold text-brand-orange mb-2">💡 Safe Test:</p>
                        <p className="text-sm">On next 2 pricing objections, pause and ask: "Help me understand what's driving that concern?" Test if curiosity creates conflict or deepens trust.</p>
                      </div>
                    </div>
                  </div>

                  {/* Example 3: Follow-up */}
                  <div className="group border-2 border-muted rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg">
                    <div className="p-4 bg-gradient-to-r from-purple-500/5 to-purple-500/10 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <span className="text-xl">⏰</span>
                          </div>
                          <div>
                            <p className="font-bold text-base group-hover:text-purple-500 transition-colors duration-300">
                              Rep Who Won't Follow Up
                            </p>
                            <p className="text-xs text-muted-foreground">Letting opportunities die</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 bg-background border-t">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">1</div>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">GOAL</p>
                          </div>
                          <p className="text-sm">Follow up persistently on warm leads</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">2</div>
                            <p className="text-xs font-bold text-orange-600 dark:text-orange-400">DOING INSTEAD</p>
                          </div>
                          <p className="text-sm">Sends one email then waits for prospect to respond, assumes silence = no interest</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">3</div>
                            <p className="text-xs font-bold text-purple-600 dark:text-purple-400">HIDDEN COMMITMENT</p>
                          </div>
                          <p className="text-sm">"I'm committed to not being annoying or needy"</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">4</div>
                            <p className="text-xs font-bold text-red-600 dark:text-red-400">BIG ASSUMPTION</p>
                          </div>
                          <p className="text-sm">"If I follow up multiple times, prospects will see me as desperate and lose respect for me"</p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">💡 Safe Test:</p>
                        <p className="text-sm">Follow up 3 times over two weeks with one lead. Track their actual response. Do they complain? Block you? Or appreciate the persistence?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">The Core Formula</h3>
                <div className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-orange/20 rounded-lg">
                  <p className="text-xl font-bold text-center mb-2">
                    Sustainable Change = Exposing Hidden Commitments + Testing Big Assumptions
                  </p>
                  <p className="text-center text-sm">
                    Not motivation. Not pressure. Not persuasion.
                  </p>
                </div>
                <p className="mt-4 leading-relaxed">
                  People are not broken—their change systems are working exactly as designed. Lasting change occurs when
                  the protective system is respected, examined, and gradually updated.
                </p>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 4: The Change Agency Framework */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="change-framework">
              <h2 className="text-3xl font-bold text-brand-green">The Change Agency Framework</h2>

              {/* Core Principle Card */}
              <Card className="p-6 bg-gradient-to-br from-brand-green/20 to-brand-green/10 border-2 border-brand-green/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-green mb-2">The Core Principle</h4>
                    <p className="text-sm leading-relaxed">
                      Sustainable behavior change doesn't come from willpower—it comes from designing an environment where the desired behavior is the easiest option. When you make it obvious, attractive, easy, and satisfying, you work with human nature instead of fighting against it.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6">
                {/* Principle 1: Make It Obvious */}
                <div className="group border-2 border-muted rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-green hover:shadow-xl">
                  <div className="p-5 bg-gradient-to-r from-brand-green/10 to-brand-green/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-brand-green transition-colors duration-300">
                          Make It Obvious
                        </h3>
                        <p className="text-sm text-muted-foreground">Design visible cues and triggers</p>
                      </div>
                      <Lightbulb className="h-6 w-6 text-brand-green group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="p-5 bg-background border-t">
                    <p className="leading-relaxed mb-4">
                      Design the environment so the right behavior is visible, easy to start, and hard to avoid.
                    </p>
                    <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/20">
                      <p className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Sales Applications:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Script templates saved as desktop shortcuts</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Daily call blocks pre-scheduled in calendar</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Prospecting list automatically opens at 9 AM</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Camp/Voss question cards on every desk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Principle 2: Make It Attractive */}
                <div className="group border-2 border-muted rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-green hover:shadow-xl">
                  <div className="p-5 bg-gradient-to-r from-brand-green/10 to-brand-green/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-brand-green transition-colors duration-300">
                          Make It Attractive
                        </h3>
                        <p className="text-sm text-muted-foreground">Bundle with immediate rewards</p>
                      </div>
                      <Zap className="h-6 w-6 text-brand-green group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="p-5 bg-background border-t">
                    <p className="leading-relaxed mb-4">
                      Bundle new behaviors with immediate rewards or social proof to trigger dopamine.
                    </p>
                    <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/20">
                      <p className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Sales Applications:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Public leaderboards for activity metrics (not just results)</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Team celebration after 100 collective "No's" received</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Pair new behaviors with preferred activities (calls before coffee)</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Highlight top performers using the new system</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Principle 3: Make It Easy */}
                <div className="group border-2 border-muted rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-green hover:shadow-xl">
                  <div className="p-5 bg-gradient-to-r from-brand-green/10 to-brand-green/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-brand-green transition-colors duration-300">
                          Make It Easy
                        </h3>
                        <p className="text-sm text-muted-foreground">Reduce friction for desired behaviors</p>
                      </div>
                      <Target className="h-6 w-6 text-brand-green group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="p-5 bg-background border-t">
                    <p className="leading-relaxed mb-4">
                      Reduce friction for the desired behavior and increase friction for old patterns.
                    </p>
                    <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/20">
                      <p className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Sales Applications:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Pre-load CRM with calibrated questions</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Two-click access to mission/purpose statements</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Auto-fill templates for accusation audits</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Remove distractions during call blocks (close email, Slack)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Principle 4: Make It Satisfying */}
                <div className="group border-2 border-muted rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-green hover:shadow-xl">
                  <div className="p-5 bg-gradient-to-r from-brand-green/10 to-brand-green/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        4
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-brand-green transition-colors duration-300">
                          Make It Satisfying
                        </h3>
                        <p className="text-sm text-muted-foreground">Create immediate feedback loops</p>
                      </div>
                      <Award className="h-6 w-6 text-brand-green group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="p-5 bg-background border-t">
                    <p className="leading-relaxed mb-4">
                      Provide immediate feedback loops so the brain gets rewarded for the new behavior.
                    </p>
                    <div className="bg-brand-green/5 rounded-lg p-4 border border-brand-green/20">
                      <p className="font-semibold mb-3 text-brand-green flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Sales Applications:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Visual habit tracker (streak counter for daily prospecting)</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Instant Slack notification when goals are hit</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Weekly 1-on-1 recognition for process adherence</span>
                        </div>
                        <div className="flex items-start gap-2 group/item hover:translate-x-1 transition-transform duration-200">
                          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Real-time dashboard showing daily activity completion</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 5: Implementation Strategy */}
          {currentSectionIndex === 5 && (
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

          {/* Section 6: Measuring Success */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="measuring-success">
              <h2 className="text-3xl font-bold text-brand-green">Measuring Behavioral Change</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10 border-2 border-brand-green/20">
                <div className="flex items-start gap-3">
                  <Target className="h-8 w-8 text-brand-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-semibold mb-2">The Shift from Outcomes to Behaviors</p>
                    <p className="leading-relaxed">
                      Traditional sales metrics focus on outcomes (deals closed, revenue). Change agency requires <strong>leading
                      indicators</strong> that measure behavior adoption—the actions you control that predict future results.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Lagging Indicators */}
                <Card className="p-6 border-2 border-red-200 bg-red-50/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-6 w-6 text-red-600" />
                    <h3 className="text-xl font-semibold text-red-700">Lagging Indicators</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Outcomes you measure after the work is done</p>
                  <div className="space-y-3">
                    {[
                      { icon: "💰", label: "Deals closed", desc: "Result of past behaviors" },
                      { icon: "📊", label: "Revenue generated", desc: "Depends on market factors" },
                      { icon: "🎯", label: "Win rate percentage", desc: "Tells you what happened" },
                      { icon: "💵", label: "Average deal size", desc: "Influenced by external factors" },
                      { icon: "⏱️", label: "Sales cycle length", desc: "Reflects past decisions" },
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200 hover:shadow-md transition-shadow"
                      >
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Leading Indicators */}
                <Card className="p-6 border-2 border-green-200 bg-green-50/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-green-700">Leading Indicators</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Behaviors you control that predict results</p>
                  <div className="space-y-3">
                    {[
                      { icon: "📞", label: "Daily prospecting completion", desc: "Action you control today" },
                      { icon: "❓", label: "Calibrated questions asked", desc: "Skill execution you track" },
                      { icon: "📝", label: "Mission statements documented", desc: "Process adherence" },
                      { icon: "🚫", label: '"No\'s" received per week', desc: "Activity leading to discovery" },
                      { icon: "🎪", label: "Camp/Voss technique usage", desc: "System implementation" },
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200 hover:shadow-md transition-shadow"
                      >
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <InteractiveBehaviorScorecard />

              <InteractiveRedFlags />

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-7 w-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-900">The Golden Rule of Measurement</h3>
                    <p className="leading-relaxed text-blue-800">
                      Track behaviors daily, review outcomes weekly, adjust strategy monthly. When behaviors are consistent but 
                      outcomes lag, trust the process—results follow behavior with a delay. When outcomes drop AND behaviors 
                      drop, intervene immediately on the behaviors.
                    </p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 7: Common Pitfalls */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6" id="common-pitfalls">
              <h2 className="text-3xl font-bold text-brand-green">Common Implementation Pitfalls</h2>

              <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-200 dark:border-red-800">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl">
                    ⚠️
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                      Why Most Implementations Fail
                    </p>
                    <p className="text-sm leading-relaxed text-red-900 dark:text-red-300">
                      Even the best change frameworks fail when these pitfalls aren't avoided. Each pitfall compounds the others, 
                      creating a cascade of failure. Use the interactive explorer below to diagnose which pitfalls might be affecting your implementation.
                    </p>
                  </div>
                </div>
              </Card>

              <InteractivePitfallsExplorer />

              <Button onClick={handleSectionComplete} size="lg" className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Section 8: Module Assessment */}
          {currentSectionIndex === 8 && (
            <div className="space-y-6" id="module-assessment">
              <h2 className="text-3xl font-bold text-brand-green">Module Assessment</h2>

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <p className="text-lg">Test your understanding of behavioral change and implementation strategies.</p>
              </Card>

              <MultipleChoice
                question="Why does most sales training fail to produce lasting behavioral change?"
                options={[
                  {
                    id: "a",
                    text: "Reps don't pay attention during training",
                    isCorrect: false,
                    feedback: "Attention isn't the issue—most reps pay attention but lack environmental support to change behavior.",
                  },
                  {
                    id: "b",
                    text: "Training focuses on knowledge transfer rather than creating environmental support for new behaviors",
                    isCorrect: true,
                    feedback: "Correct! Most sales training fails because it focuses on transferring knowledge (concepts, theories) without creating the environmental structures, accountability systems, and feedback loops necessary to support new behaviors. Knowledge alone doesn't create action.",
                  },
                  {
                    id: "c",
                    text: "The concepts taught are too complex",
                    isCorrect: false,
                    feedback: "Complexity isn't the problem—the lack of environmental support for behavior change is.",
                  },
                  {
                    id: "d",
                    text: "Sales managers don't follow up enough",
                    isCorrect: false,
                    feedback: "Follow-up helps, but without environmental design, even follow-up won't create lasting change.",
                  },
                ]}
                explanation="Most sales training fails because it focuses on transferring knowledge (concepts, theories) without creating the environmental structures, accountability systems, and feedback loops necessary to support new behaviors. Knowledge alone doesn't create action."
                onAnswer={(correct) => handleQuizComplete("q1", correct)}
              />

              <MultipleChoice
                question="According to the Change Agency framework, what does 'Make It Obvious' mean?"
                options={[
                  {
                    id: "a",
                    text: "Tell people exactly what to do",
                    isCorrect: false,
                    feedback: "Telling isn't enough—the environment must be designed to make the behavior visible and easy.",
                  },
                  {
                    id: "b",
                    text: "Design the environment so the right behavior is visible, easy to start, and hard to avoid",
                    isCorrect: true,
                    feedback: "Correct! 'Make It Obvious' means designing the physical, digital, and social environment so that the desired behavior is clearly visible and the easiest action to take. This includes visual cues, pre-scheduled activities, templates, and environmental triggers.",
                  },
                  {
                    id: "c",
                    text: "Make training presentations clearer",
                    isCorrect: false,
                    feedback: "Clearer presentations are about knowledge transfer, not environmental design.",
                  },
                  {
                    id: "d",
                    text: "Send daily reminder emails",
                    isCorrect: false,
                    feedback: "Reminder emails are a form of environmental cue, but 'Make It Obvious' is much broader.",
                  },
                ]}
                explanation="'Make It Obvious' means designing the physical, digital, and social environment so that the desired behavior is clearly visible and the easiest action to take. This includes visual cues, pre-scheduled activities, templates, and environmental triggers."
                onAnswer={(correct) => handleQuizComplete("q2", correct)}
              />

              <MultipleChoice
                question="What is a 'keystone behavior' in the context of change agency?"
                options={[
                  {
                    id: "a",
                    text: "The most important skill in sales",
                    isCorrect: false,
                    feedback: "A keystone behavior is about creating momentum for change, not just importance.",
                  },
                  {
                    id: "b",
                    text: "A single foundational behavior that creates momentum and makes subsequent changes easier",
                    isCorrect: true,
                    feedback: "Correct! A keystone behavior is one foundational behavior that, when mastered, creates momentum and proves that change is possible. This makes subsequent behavior changes easier. Examples include daily prospecting or starting calls with mission clarity.",
                  },
                  {
                    id: "c",
                    text: "The first thing taught in training",
                    isCorrect: false,
                    feedback: "The first thing taught may not be a keystone behavior—keystone behaviors are strategic choices.",
                  },
                  {
                    id: "d",
                    text: "The behavior that generates the most revenue",
                    isCorrect: false,
                    feedback: "Keystone behaviors create momentum for change, not necessarily the most revenue.",
                  },
                ]}
                explanation="A keystone behavior is one foundational behavior that, when mastered, creates momentum and proves that change is possible. This makes subsequent behavior changes easier. Examples include daily prospecting or starting calls with mission clarity."
                onAnswer={(correct) => handleQuizComplete("q3", correct)}
              />

              <MultipleChoice
                question="Why should you measure 'leading indicators' rather than just 'lagging indicators'?"
                options={[
                  {
                    id: "a",
                    text: "Leading indicators are easier to measure",
                    isCorrect: false,
                    feedback: "Leading indicators aren't necessarily easier—they're more useful for behavior change.",
                  },
                  {
                    id: "b",
                    text: "Leading indicators (behaviors) can be corrected immediately, while lagging indicators (outcomes) appear too late to adjust",
                    isCorrect: true,
                    feedback: "Correct! Leading indicators measure the behaviors that drive outcomes. They provide early feedback, allowing for immediate course correction. Lagging indicators (like deals closed) appear too late to adjust behavior during the change process.",
                  },
                  {
                    id: "c",
                    text: "Lagging indicators are not important",
                    isCorrect: false,
                    feedback: "Lagging indicators are important for outcomes, but leading indicators drive behavior change.",
                  },
                  {
                    id: "d",
                    text: "Leading indicators are more impressive to executives",
                    isCorrect: false,
                    feedback: "The value of leading indicators is in enabling behavior change, not impressing executives.",
                  },
                ]}
                explanation="Leading indicators measure the behaviors that drive outcomes. They provide early feedback, allowing for immediate course correction. Lagging indicators (like deals closed) appear too late to adjust behavior during the change process."
                onAnswer={(correct) => handleQuizComplete("q4", correct)}
              />

              <MultipleChoice
                question="What does 'habit stacking' mean in the implementation strategy?"
                options={[
                  {
                    id: "a",
                    text: "Learning multiple habits at the same time",
                    isCorrect: false,
                    feedback: "Habit stacking is about linking habits sequentially, not learning them simultaneously.",
                  },
                  {
                    id: "b",
                    text: "Layering new behaviors on top of existing routines using a trigger-behavior-reward sequence",
                    isCorrect: true,
                    feedback: "Correct! Habit stacking is the practice of linking a new behavior to an existing routine using the formula: 'After [EXISTING BEHAVIOR], I will [NEW BEHAVIOR], followed by [REWARD].' This leverages existing neural pathways to make new behaviors stick.",
                  },
                  {
                    id: "c",
                    text: "Stacking books about habits on your desk",
                    isCorrect: false,
                    feedback: "This is a literal interpretation—habit stacking is about linking behaviors.",
                  },
                  {
                    id: "d",
                    text: "Teaching habits in a specific order",
                    isCorrect: false,
                    feedback: "While order matters, habit stacking specifically refers to linking new behaviors to existing ones.",
                  },
                ]}
                explanation="Habit stacking is the practice of linking a new behavior to an existing routine using the formula: 'After [EXISTING BEHAVIOR], I will [NEW BEHAVIOR], followed by [REWARD].' This leverages existing neural pathways to make new behaviors stick."
                onAnswer={(correct) => handleQuizComplete("q5", correct)}
              />

              <MultipleChoice
                question="What is the most critical warning sign that a rep is regressing to old behaviors?"
                options={[
                  {
                    id: "a",
                    text: "They miss one day of the new behavior",
                    isCorrect: false,
                    feedback: "Missing one day isn't necessarily a critical sign—look for sustained patterns.",
                  },
                  {
                    id: "b",
                    text: "Consistency drops below 4/5 days for two consecutive weeks",
                    isCorrect: true,
                    feedback: "Correct! When consistency drops below 4/5 days for two consecutive weeks, it indicates the behavior is not becoming automatic and regression is likely. This requires immediate intervention with 1-on-1 coaching.",
                  },
                  {
                    id: "c",
                    text: "They ask questions during training",
                    isCorrect: false,
                    feedback: "Asking questions is a sign of engagement, not regression.",
                  },
                  {
                    id: "d",
                    text: "They achieve lower results in one week",
                    isCorrect: false,
                    feedback: "One week of lower results may be normal variation—watch for sustained behavioral patterns.",
                  },
                ]}
                explanation="When consistency drops below 4/5 days for two consecutive weeks, it indicates the behavior is not becoming automatic and regression is likely. This requires immediate intervention with 1-on-1 coaching."
                onAnswer={(correct) => handleQuizComplete("q6", correct)}
              />

              <MultipleChoice
                question="Why is environmental support more important than willpower in creating change?"
                options={[
                  {
                    id: "a",
                    text: "Because willpower doesn't exist",
                    isCorrect: false,
                    feedback: "Willpower exists but is limited—environmental design is more reliable.",
                  },
                  {
                    id: "b",
                    text: "Because willpower is a limited resource that depletes, while environmental design makes desired behaviors automatic",
                    isCorrect: true,
                    feedback: "Correct! Willpower is a limited cognitive resource that depletes throughout the day. Environmental design creates structures where the desired behavior becomes the path of least resistance, requiring minimal willpower to maintain.",
                  },
                  {
                    id: "c",
                    text: "Because environmental support is cheaper",
                    isCorrect: false,
                    feedback: "Cost isn't the issue—effectiveness and sustainability are.",
                  },
                  {
                    id: "d",
                    text: "Because managers prefer environmental changes",
                    isCorrect: false,
                    feedback: "Manager preference isn't the reason—neuroscience supports environmental design.",
                  },
                ]}
                explanation="Willpower is a limited cognitive resource that depletes throughout the day. Environmental design creates structures where the desired behavior becomes the path of least resistance, requiring minimal willpower to maintain."
                onAnswer={(correct) => handleQuizComplete("q7", correct)}
              />

              <MultipleChoice
                question="What should managers celebrate during the behavior change process?"
                options={[
                  {
                    id: "a",
                    text: "Only closed deals",
                    isCorrect: false,
                    feedback: "Closed deals matter, but celebrating only outcomes can discourage reps during the learning phase.",
                  },
                  {
                    id: "b",
                    text: "Both process adherence (correct behavior execution) and results",
                    isCorrect: true,
                    feedback: "Correct! Managers should celebrate process adherence as much as results. A rep who perfectly follows the Camp/Voss system but doesn't close deals this week should be recognized, as consistent process execution will eventually drive results.",
                  },
                  {
                    id: "c",
                    text: "Only revenue numbers",
                    isCorrect: false,
                    feedback: "Revenue is important, but celebrating only revenue ignores the behaviors that drive it.",
                  },
                  {
                    id: "d",
                    text: "Only reps who exceed quota",
                    isCorrect: false,
                    feedback: "This overlooks reps who are executing behaviors correctly and building toward quota.",
                  },
                ]}
                explanation="Managers should celebrate process adherence as much as results. A rep who perfectly follows the Camp/Voss system but doesn't close deals this week should be recognized, as consistent process execution will eventually drive results."
                onAnswer={(correct) => handleQuizComplete("q8", correct)}
              />

              <MultipleChoice
                question="Why is 'Make It Satisfying' important in the four-part framework?"
                options={[
                  {
                    id: "a",
                    text: "It keeps people happy",
                    isCorrect: false,
                    feedback: "Happiness is a bonus, but the real purpose is neurological reinforcement.",
                  },
                  {
                    id: "b",
                    text: "The brain needs immediate feedback and rewards to reinforce new behaviors and create positive associations",
                    isCorrect: true,
                    feedback: "Correct! 'Make It Satisfying' provides immediate feedback loops and rewards so the brain gets reinforcement for the new behavior. This creates positive associations and accelerates habit formation through dopamine release.",
                  },
                  {
                    id: "c",
                    text: "It makes training more fun",
                    isCorrect: false,
                    feedback: "Fun is good, but the purpose is to create neurological reinforcement for behavior change.",
                  },
                  {
                    id: "d",
                    text: "It reduces complaints",
                    isCorrect: false,
                    feedback: "Reducing complaints isn't the goal—creating brain-based habit reinforcement is.",
                  },
                ]}
                explanation="'Make It Satisfying' provides immediate feedback loops and rewards so the brain gets reinforcement for the new behavior. This creates positive associations and accelerates habit formation through dopamine release."
                onAnswer={(correct) => handleQuizComplete("q9", correct)}
              />

              <MultipleChoice
                question="What is the biggest pitfall when implementing behavioral change in sales teams?"
                options={[
                  {
                    id: "a",
                    text: "Not having enough budget for training",
                    isCorrect: false,
                    feedback: "Budget helps, but behavioral change requires environmental design, not just funding.",
                  },
                  {
                    id: "b",
                    text: "Trying to change too many behaviors at once without environmental support or feedback systems",
                    isCorrect: true,
                    feedback: "Correct! The biggest pitfall is attempting to change too many behaviors simultaneously without creating environmental support structures or feedback systems. This cognitive overload leads to failure. Focus on one keystone behavior at a time with proper environmental design.",
                  },
                  {
                    id: "c",
                    text: "Choosing the wrong behaviors to change",
                    isCorrect: false,
                    feedback: "Behavior selection matters, but even correct behaviors fail without environmental support.",
                  },
                  {
                    id: "d",
                    text: "Not having a good CRM system",
                    isCorrect: false,
                    feedback: "CRMs are tools, but behavioral change requires environmental design and support systems.",
                  },
                ]}
                explanation="The biggest pitfall is attempting to change too many behaviors simultaneously without creating environmental support structures or feedback systems. This cognitive overload leads to failure. Focus on one keystone behavior at a time with proper environmental design."
                onAnswer={(correct) => handleQuizComplete("q10", correct)}
              />

              <MultipleChoice
                question="According to Adam Grant's Hidden Potential model, what is more important than talent in determining long-term success?"
                options={[
                  {
                    id: "a",
                    text: "IQ and cognitive ability",
                    isCorrect: false,
                    feedback: "Grant argues we overvalue IQ—character skills matter more for sustained improvement.",
                  },
                  {
                    id: "b",
                    text: "Character skills like discipline, grit with flexibility, curiosity, and accountability",
                    isCorrect: true,
                    feedback: "Correct! Grant emphasizes that character skills—discipline, grit with flexibility, curiosity, accountability, and humility to recalibrate—determine who keeps improving when others plateau. These skills enable continuous progress regardless of starting talent level.",
                  },
                  {
                    id: "c",
                    text: "Years of experience",
                    isCorrect: false,
                    feedback: "Experience helps, but character skills and deliberate practice drive improvement more than time alone.",
                  },
                  {
                    id: "d",
                    text: "Natural charisma",
                    isCorrect: false,
                    feedback: "Charisma may help initially, but character skills enable sustained growth.",
                  },
                ]}
                explanation="Grant emphasizes that character skills—discipline, grit with flexibility, curiosity, accountability, and humility to recalibrate—determine who keeps improving when others plateau. These skills enable continuous progress regardless of starting talent level."
                onAnswer={(correct) => handleQuizComplete("q11", correct)}
              />

              <MultipleChoice
                question="According to Kegan & Lahey's Immunity to Change model, why do people fail to change even when they genuinely want to?"
                options={[
                  {
                    id: "a",
                    text: "They lack willpower and discipline",
                    isCorrect: false,
                    feedback: "Kegan & Lahey show that willpower isn't the issue—hidden immune systems are.",
                  },
                  {
                    id: "b",
                    text: "They have an internal immune system with hidden commitments and big assumptions that actively protect against change",
                    isCorrect: true,
                    feedback: "Correct! People have hidden competing commitments (like 'not looking incompetent') and big untested assumptions (like 'if I fail, I'll lose respect') that create an immunity to change. This is self-protection, not resistance. Real change requires surfacing and testing these assumptions.",
                  },
                  {
                    id: "c",
                    text: "They don't really want to change",
                    isCorrect: false,
                    feedback: "The desire to change is genuine—the immune system operates outside conscious awareness.",
                  },
                  {
                    id: "d",
                    text: "They need better training",
                    isCorrect: false,
                    feedback: "This treats change as a technical problem, but immunity to change is an adaptive/developmental challenge.",
                  },
                ]}
                explanation="People have hidden competing commitments (like 'not looking incompetent') and big untested assumptions (like 'if I fail, I'll lose respect') that create an immunity to change. This is self-protection, not resistance. Real change requires surfacing and testing these assumptions."
                onAnswer={(correct) => handleQuizComplete("q12", correct)}
              />

              {allQuizComplete && (
                <Card className="p-6 bg-green-50 dark:bg-green-950 border-2 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                        🎉 Module 5 Complete!
                      </h3>
                      <p className="text-green-800 dark:text-green-200 mb-4">
                        Congratulations! You've mastered the Change Agency framework. You now understand why behavioral
                        change is difficult, how to design environments that support new behaviors, and how to implement
                        sustainable change in sales teams using the four-part framework: Make It Obvious, Make It
                        Attractive, Make It Easy, and Make It Satisfying.
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
