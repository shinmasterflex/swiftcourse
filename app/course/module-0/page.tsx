/**
 * MODULE 0 PAGE
 * Introduction module covering all pitch deck content
 * Includes interactive components and OCEAN personality test
 */

"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { TextDisplay } from "@/components/learning/text-display"
import { Slideshow } from "@/components/learning/slideshow"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, CheckCircle2 } from "lucide-react"
import { FlipCard } from "@/components/learning/flip-card"
import { SourceCard } from "@/components/learning/source-card"
import { useProgress } from "@/hooks/use-progress"

export default function Module0Page() {
  const searchParams = useSearchParams()
  const { markSectionComplete, setCurrentPosition, getCompletedSections, getCourseStructure } = useProgress()

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const MODULE_ID = "module-0"
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

  const handleSectionComplete = () => {
    const currentSection = sections[currentSectionIndex]
    if (currentSection) {
      markSectionComplete(MODULE_ID, currentSection.id)

      if (currentSectionIndex < totalSections - 1) {
        const nextIndex = currentSectionIndex + 1
        const nextSection = sections[nextIndex]
        setCurrentSectionIndex(nextIndex)
        setCurrentPosition(MODULE_ID, nextSection.id)
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Module 0: Introduction to Swiftcourse</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Discover how personality assessment drives sales success
            </p>
            <ProgressBar current={completedSectionIds.length} total={totalSections} label="Module Progress" />
          </div>

          {/* Section 0: About Us */}
          {currentSectionIndex === 0 && (
            <div className="space-y-6" id="about">
              <h2 className="text-3xl font-bold text-brand-green">About Swiftcourse</h2>

              <TextDisplay
                variant="callout"
                content="At Swiftcourse, everything we do is to strengthen entrepreneurial and sales success through personality trait assessment."
              />

              <TextDisplay content="Our application of the Big 5 Personality Assessment identifies specific strategies entrepreneurs should leverage to increase their success. Additionally, The Big 5 identifies where your personality traits can hold you back." />

              <TextDisplay content="So, if you are the type of person who always looks for a competitive edge, then a look inside yourself may be the answer." />

              <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-xl font-semibold mb-3">Personality Traits Are Tendencies. Mindset Is Character.</h3>
                <p className="mb-3">Understanding the difference:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Personality traits are your natural tendencies—how you're inclined to think, feel, and behave</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Mindset is your character—the conscious choices you make despite your tendencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>You can't change your personality traits, but you can develop strategies to work with them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Character develops through awareness, discipline, and intentional action aligned with your goals</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Problem Statement
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 1: The Problem */}
          {currentSectionIndex === 1 && (
            <div className="space-y-6" id="problem">
              <h2 className="text-3xl font-bold text-brand-green">The Problem</h2>

              <TextDisplay
                variant="warning"
                content="Few, if any, companies leverage the most complete personality assessment known as the Big Five Aspects Model (BFAM) for sales success."
              />

              <Slideshow
                slides={[
                  {
                    id: "market-gap",
                    title: "Market Gap",
                    content:
                      "Entrepreneurs and sales professionals can gain a competitive advantage applying the BFAM for team building and sales success. Currently, this powerful tool is underutilized in the industry.",
                  },
                  {
                    id: "customers",
                    title: "Who Struggles?",
                    content:
                      "Sales professionals and entrepreneurs who struggle with organization, creativity, focus, unwarranted fearfulness, or feel like they are taken advantage of can learn why with BFAM and develop a counter-strategy.",
                  },
                  {
                    id: "financials",
                    title: "The Cost of Ignorance",
                    content:
                      "A study by Exceptional Sales estimates that only 43% of sales quotas are met when a type of personality trait known as neuroticism affects salespeople. This represents massive lost revenue.",
                  },
                  {
                    id: "costs",
                    title: "Hidden Productivity Loss",
                    content:
                      "Loss of productivity and haphazard goal attainment can be attributed to the negative impacts of personality temperament. With the BFAM, Swiftcourse pinpoints where those demons hide and how to overcome them.",
                  },
                ]}
              />

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Solution
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 2: The Solution */}
          {currentSectionIndex === 2 && (
            <div className="space-y-6" id="solution">
              <h2 className="text-3xl font-bold text-brand-green">Our Solution</h2>

              <TextDisplay
                variant="success"
                content="Swiftcourse provides the most comprehensive personality-driven sales training in the market today."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-green">Close the Gap</h3>
                  <p>
                    Our approach is the most comprehensive in the market today. Other personality assessments measure
                    segments of personality. Only the BFAM gives a complete picture of temperament.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-green">Target Audience</h3>
                  <p>
                    Our target audience are entrepreneurs and sales personnel that are struggling to achieve their
                    performance goals. Our program is designed to specifically target the issues that hold them back
                    while strengthening their positive traits.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">Cost Savings</h3>
                  <p>
                    Massive savings in reducing poor hires and spending on training for existing personnel that do not
                    adapt their behavior.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-brand-orange">Easy to Use</h3>
                  <p>
                    The Big Five Aspects Model is a short personality assessment that takes about 15 minutes. A
                    comprehensive analysis is created to identify how to best approach a strategy for improvement.
                  </p>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Product Overview
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 3: The Product */}
          {currentSectionIndex === 3 && (
            <div className="space-y-6" id="product">
              <h2 className="text-3xl font-bold text-brand-green">The Product</h2>

              <Card className="p-8 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Your Competitive Opportunity</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">✓</div>
                    <div className="font-semibold">UNIQUE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">✓</div>
                    <div className="font-semibold">FIRST TO MARKET</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-orange mb-2">✓</div>
                    <div className="font-semibold">TESTED</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-orange mb-2">✓</div>
                    <div className="font-semibold">AUTHENTIC</div>
                  </div>
                </div>
              </Card>

              <h3 className="text-2xl font-semibold">Product Benefits</h3>

              <Slideshow
                slides={[
                  {
                    id: "benefit-1",
                    title: "Increased Sales Activity",
                    content:
                      "Learn how to leverage your personality traits to engage more prospects and close more deals consistently. Our approach helps you identify the natural behaviors that drive activity.",
                  },
                  {
                    id: "benefit-2",
                    title: "Hyper Focused Sales Personal",
                    content:
                      "Develop laser-like focus by understanding which personality traits help or hinder your concentration and goal pursuit. Eliminate distractions that stem from your temperament.",
                  },
                  {
                    id: "benefit-3",
                    title: "Strong Tactical Approach to Sales",
                    content:
                      "Master tactical negotiation techniques that align with your personality strengths for maximum effectiveness. Learn strategies that feel natural to you.",
                  },
                  {
                    id: "benefit-4",
                    title: "Strengthened Client Retention Skills",
                    content:
                      "Build deeper client relationships by understanding how your personality affects communication and trust-building. Turn your traits into relationship advantages.",
                  },
                ]}
              />

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Strategic Model
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 4: Strategic Model */}
          {currentSectionIndex === 4 && (
            <div className="space-y-6" id="strategic-model">
              <h2 className="text-3xl font-bold text-brand-green">Strategic Model</h2>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Our Three-Step Approach</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Identify Traits</h4>
                      <p className="text-muted-foreground">
                        Based on The Big Five Aspects Model, we identify your unique personality profile across all five
                        major traits and their aspects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Purpose</h4>
                      <p className="text-muted-foreground">
                        Tailored action plans for maximum effectiveness. We create specific strategies that work with
                        your personality, not against it.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Outcome</h4>
                      <p className="text-muted-foreground">
                        Engaged and productive salesforce. Transform personality insights into measurable sales
                        performance improvements.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <TextDisplay
                variant="callout"
                content="This model moves you from WASTE to SALES by eliminating unproductive behaviors and amplifying your natural strengths."
              />

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Big Five Overview
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 5: Big Five Overview */}
          {currentSectionIndex === 5 && (
            <div className="space-y-6" id="big-five">
              <h2 className="text-3xl font-bold text-brand-green">The Big Five Personality Factors</h2>

              <SourceCard
                sources={[
                  {
                    author: "Jordan Peterson",
                    title: "Between Facets and Domains",
                    url: "https://www.jordanbpeterson.com/docs/230/2014/15DeYoung.pdf",
                  },
                ]}
              />

              <TextDisplay
                variant="callout"
                content="Click each card to flip between high and low ratings. Understanding both sides helps you recognize your complete personality profile."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Openness Flip Card */}
                <FlipCard
                  frontTitle="Openness to Experience (High)"
                  frontContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Openness (Aesthetic)</h4>
                        <p className="text-sm">
                          Tendency to appreciate art, emotion, and adventure. Can see beauty where others can't. Great
                          for creative sales approaches.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Intellectual Openness</h4>
                        <p className="text-sm">
                          Interested in solving complex problems with new solutions. Excellent for consultative selling.
                        </p>
                      </div>
                    </div>
                  }
                  backTitle="Openness to Experience (Low)"
                  backContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Openness (Aesthetic)</h4>
                        <p className="text-sm">
                          Conventional and engages in familiar experiences. May prefer proven sales scripts over
                          creative approaches.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Intellectual Openness</h4>
                        <p className="text-sm">
                          Prefers to stick with what they know. May struggle with complex or technical sales.
                        </p>
                      </div>
                    </div>
                  }
                />

                {/* Conscientiousness Flip Card */}
                <FlipCard
                  frontTitle="Conscientiousness (High)"
                  frontContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Orderliness</h4>
                        <p className="text-sm">
                          Likes to see rules and protocols strictly followed. Perfect for systematic sales processes and
                          CRM discipline.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Industriousness</h4>
                        <p className="text-sm">
                          Goal achievement oriented. Essential for consistent prospecting and pipeline management.
                        </p>
                      </div>
                    </div>
                  }
                  backTitle="Conscientiousness (Low)"
                  backContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Orderliness</h4>
                        <p className="text-sm">
                          Disorganized and dislikes schedules. May struggle with CRM systems and follow-up processes.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Industriousness</h4>
                        <p className="text-sm">
                          Not concerned with pursuing goals. Can lead to inconsistent prospecting and quota challenges.
                        </p>
                      </div>
                    </div>
                  }
                />

                {/* Extraversion Flip Card */}
                <FlipCard
                  frontTitle="Extraversion (High)"
                  frontContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Enthusiasm</h4>
                        <p className="text-sm">
                          Energized by interacting with groups. Natural networkers who thrive in social selling.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Assertiveness</h4>
                        <p className="text-sm">
                          Likes to take charge and lead. Great for closing deals and leading sales teams.
                        </p>
                      </div>
                    </div>
                  }
                  backTitle="Extraversion (Low)"
                  backContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Enthusiasm</h4>
                        <p className="text-sm">
                          Social gatherings deplete energy. May prefer written communication or one-on-one meetings.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Assertiveness</h4>
                        <p className="text-sm">
                          Dislikes small talk. May struggle with cold calling and networking events.
                        </p>
                      </div>
                    </div>
                  }
                />

                {/* Agreeableness Flip Card */}
                <FlipCard
                  frontTitle="Agreeableness (High)"
                  frontContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Compassion</h4>
                        <p className="text-sm">
                          Focuses on others' emotions. Excellent for building trust and long-term relationships.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Politeness</h4>
                        <p className="text-sm">
                          Follows social protocols of niceness. Good for maintaining harmony with clients.
                        </p>
                      </div>
                    </div>
                  }
                  backTitle="Agreeableness (Low)"
                  backContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Compassion</h4>
                        <p className="text-sm">
                          Highly competitive with little concern for others' emotions. May damage relationships.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Politeness</h4>
                        <p className="text-sm">
                          Challenges authority and social norms. May create friction with clients and management.
                        </p>
                      </div>
                    </div>
                  }
                />

                {/* Neuroticism Flip Card */}
                <FlipCard
                  frontTitle="Neuroticism (High)"
                  frontContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Withdrawal</h4>
                        <p className="text-sm">Expects negative outcomes. Can lead to call reluctance and avoidance.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Volatility</h4>
                        <p className="text-sm">Temper flare ups or loss of motivation in response to setbacks.</p>
                      </div>
                    </div>
                  }
                  backTitle="Neuroticism (Low)"
                  backContent={
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Withdrawal</h4>
                        <p className="text-sm">Emotionally stable. Handles rejection well and maintains optimism.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Volatility</h4>
                        <p className="text-sm">Maintains composure during setbacks. Provides consistent performance.</p>
                      </div>
                    </div>
                  }
                />
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Action Plan
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 6: Two-Phase Action Plan (was section 7) */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="action-plan">
              <h2 className="text-3xl font-bold text-brand-green">Two-Phase Action Plan</h2>

              <TextDisplay
                variant="callout"
                content="Our comprehensive 12-week program is divided into Strategic (Weeks 1-6) and Tactical (Weeks 7-12) phases."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strategic Phase */}
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-green">Strategic Phase (Weeks 1-6)</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Labeling</h4>
                        <p className="text-sm text-muted-foreground">Understanding your personality profile</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Temperament and Goal Attainment</h4>
                        <p className="text-sm text-muted-foreground">How personality affects your goals</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Purpose Planning</h4>
                        <p className="text-sm text-muted-foreground">Creating your personalized strategy</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Habit Formation</h4>
                        <p className="text-sm text-muted-foreground">Building sustainable behaviors</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold">Measurement</h4>
                        <p className="text-sm text-muted-foreground">Tracking progress and adjusting</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                        6
                      </div>
                      <div>
                        <h4 className="font-semibold">Intro to Tactical</h4>
                        <p className="text-sm text-muted-foreground">Preparing for tactical skills</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Tactical Phase */}
                <Card className="p-6 bg-gradient-to-br from-brand-orange/10 to-brand-orange/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-orange">Tactical Phase (Weeks 7-12)</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                        7
                      </div>
                      <div>
                        <h4 className="font-semibold">Tactical Empathy</h4>
                        <p className="text-sm text-muted-foreground">Understanding client emotions</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                        8
                      </div>
                      <div>
                        <h4 className="font-semibold">Mirroring</h4>
                        <p className="text-sm text-muted-foreground">Building rapport through reflection</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                        9
                      </div>
                      <div>
                        <h4 className="font-semibold">Paraphrase & Summarize</h4>
                        <p className="text-sm text-muted-foreground">Active listening techniques</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                        10
                      </div>
                      <div>
                        <h4 className="font-semibold">Types of Yes</h4>
                        <p className="text-sm text-muted-foreground">Getting commitment effectively</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                        11
                      </div>
                      <div>
                        <h4 className="font-semibold">Calibrated Questions</h4>
                        <p className="text-sm text-muted-foreground">Guiding conversations strategically</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-bold">
                        12
                      </div>
                      <div>
                        <h4 className="font-semibold">Accusation Audit & Black Swan</h4>
                        <p className="text-sm text-muted-foreground">Advanced negotiation tactics</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Button onClick={handleSectionComplete} className="bg-brand-orange hover:bg-[#e64a19] text-white">
                Continue to Summary
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Section 7: Summary (was section 8) */}
          {currentSectionIndex === 7 && (
            <div className="space-y-6" id="summary">
              <h2 className="text-3xl font-bold text-brand-green">Program Summary</h2>

              <Card className="p-8 bg-gradient-to-br from-brand-green/10 via-background to-brand-orange/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Two Core Objectives</h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Strategic Understanding</h4>
                      <p className="text-muted-foreground">
                        Explain what is happening within your sales organization that holds back your advisors from
                        accomplishing additional production. We explore temperament, motivation, sales habits, and
                        corporate culture as the key variables in the strategic approach to your overarching goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Tactical Execution</h4>
                      <p className="text-muted-foreground">
                        Provide tactical approaches to attract additional clients, as well as acquiring marginal
                        business from existing clients. We insist on measurement to determine whether we are making any
                        progress towards increased production and prospecting activities.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <TextDisplay
                variant="success"
                content="By combining personality insights with proven tactical skills, Swiftcourse creates a comprehensive framework for sustainable sales success."
              />

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">What You'll Achieve</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Deep understanding of how your personality affects your sales performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Personalized strategies to overcome personality-driven challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Advanced tactical negotiation skills aligned with your strengths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Measurable improvements in prospecting and closing activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>Sustainable behavior changes that last beyond the program</span>
                  </li>
                </ul>
              </Card>

              <Button onClick={handleSectionComplete} className="bg-brand-green hover:bg-[#14b8a6] text-white">
                Complete Module
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
