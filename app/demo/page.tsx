/**
 * DEMO PAGE
 * Full Module 0 content as a demo of the course
 * Includes interactive components and OCEAN personality test
 */

"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PublicHeader } from "@/components/layout/public-header"
import { TextDisplay } from "@/components/learning/text-display"
import { Slideshow } from "@/components/learning/slideshow"
import { ProgressBar } from "@/components/learning/progress-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, CheckCircle2, Target, Users, TrendingDown, Clock } from "lucide-react"
import { FlipCard } from "@/components/learning/flip-card"
import { SourceCard } from "@/components/learning/source-card"

export default function DemoPage() {
  const searchParams = useSearchParams()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())

  // Demo sections (same as module 0)
  const sections = [
    { id: "about-swiftcourse", title: "About Swiftcourse" },
    { id: "the-problem", title: "The Problem" },
    { id: "our-solution", title: "Our Solution" },
    { id: "the-product", title: "The Product" },
    { id: "strategic-model", title: "Strategic Model" },
    { id: "big-five-factors", title: "Big Five Factors" },
    { id: "action-plan", title: "Action Plan" },
    { id: "summary", title: "Summary" },
  ]
  const totalSections = sections.length

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
    setCompletedSections(prev => new Set([...prev, currentSectionIndex]))

    if (currentSectionIndex < totalSections) {
      const nextIndex = currentSectionIndex + 1
      setCurrentSectionIndex(nextIndex)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Module 0: Introduction to Swiftcourse</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Experience the full Introduction module - Discover how personality assessment drives sales success
          </p>
          <ProgressBar current={completedSections.size} total={totalSections} label="Module Progress" />
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

              <TextDisplay
                variant="callout"
                content="Click each card to discover more details about our solution."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  frontTitle="Close the Gap"
                  frontContent={
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-brand-green/10 p-4 rounded-full">
                          <Target className="h-10 w-10 text-brand-green" />
                        </div>
                      </div>
                      <p className="text-sm">
                        Our approach is the most comprehensive in the market today for personality-driven sales training.
                      </p>
                    </div>
                  }
                  backTitle="Complete Picture"
                  backContent={
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <CheckCircle2 className="h-8 w-8 text-brand-green" />
                      </div>
                      <p className="text-sm">
                        Other personality assessments measure segments of personality. Only the Big Five Aspects Model (BFAM) gives a complete picture of temperament.
                      </p>
                      <p className="text-sm font-semibold text-brand-green">
                        We measure all 10 aspects across 5 major traits for complete insight.
                      </p>
                    </div>
                  }
                />

                <FlipCard
                  frontTitle="Target Audience"
                  frontContent={
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-brand-green/10 p-4 rounded-full">
                          <Users className="h-10 w-10 text-brand-green" />
                        </div>
                      </div>
                      <p className="text-sm">
                        Designed for entrepreneurs and sales personnel struggling to achieve their performance goals.
                      </p>
                    </div>
                  }
                  backTitle="Personalized Approach"
                  backContent={
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <CheckCircle2 className="h-8 w-8 text-brand-green" />
                      </div>
                      <p className="text-sm">
                        Our program specifically targets the issues that hold you back while strengthening your positive traits.
                      </p>
                      <p className="text-sm font-semibold text-brand-green">
                        Work with your personality, not against it.
                      </p>
                    </div>
                  }
                />

                <FlipCard
                  frontTitle="Cost Savings"
                  frontContent={
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-brand-orange/10 p-4 rounded-full">
                          <TrendingDown className="h-10 w-10 text-brand-orange" />
                        </div>
                      </div>
                      <p className="text-sm">
                        Massive savings through better hiring decisions and more effective training investments.
                      </p>
                    </div>
                  }
                  backTitle="Smart Investment"
                  backContent={
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <CheckCircle2 className="h-8 w-8 text-brand-orange" />
                      </div>
                      <p className="text-sm">
                        Reduce costs from poor hires and eliminate wasted spending on training personnel who don't adapt their behavior.
                      </p>
                      <p className="text-sm font-semibold text-brand-orange">
                        Invest in what works, eliminate what doesn't.
                      </p>
                    </div>
                  }
                />

                <FlipCard
                  frontTitle="Easy to Use"
                  frontContent={
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-brand-orange/10 p-4 rounded-full">
                          <Clock className="h-10 w-10 text-brand-orange" />
                        </div>
                      </div>
                      <p className="text-sm">
                        The Big Five Aspects Model assessment takes just 15 minutes to complete.
                      </p>
                    </div>
                  }
                  backTitle="Comprehensive Analysis"
                  backContent={
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <CheckCircle2 className="h-8 w-8 text-brand-orange" />
                      </div>
                      <p className="text-sm">
                        A detailed analysis is created to identify the best approach for your personal improvement strategy.
                      </p>
                      <p className="text-sm font-semibold text-brand-orange">
                        Quick assessment, lasting impact.
                      </p>
                    </div>
                  }
                />
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
                    title: "Hyper Focused Sales Personnel",
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
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
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

          {/* Section 6: Three-Phase Action Plan */}
          {currentSectionIndex === 6 && (
            <div className="space-y-6" id="action-plan">
              <h2 className="text-3xl font-bold text-brand-green">Three-Phase Action Plan</h2>

              <TextDisplay
                variant="callout"
                content="Our comprehensive program is divided into three strategic phases to build salespeople who can override their personality defaults and operate with discipline."
              />

              <div className="space-y-6">
                {/* Phase 1 */}
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-green">Phase 1: Personality Traits and Introduction to Neurobiology</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Understand your Big 10 traits and the neuroscience of goal-seeking and growth mindset
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          0
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 0: Introduction</h4>
                          <p className="text-sm text-muted-foreground">
                            The Big Five OCEAN model and 10 personality aspects
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 1: Neurobiology & Growth Mindset</h4>
                          <p className="text-sm text-muted-foreground">
                            Neural mechanisms, growth mindset, and MAD Analysis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Phase 2 */}
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-green">Phase 2: Systematic Negotiation</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Master Jim Camp's "Start With No" and Chris Voss's FBI tactics to stay calm and in control
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 2: Learning, Habits & Measurement</h4>
                          <p className="text-sm text-muted-foreground">
                            Science of learning, habit formation, and the 21-day protocol
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 3: Win With NO</h4>
                          <p className="text-sm text-muted-foreground">
                            Jim Camp's system and Chris Voss's tactical empathy
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 4: Integrating Big 10 with Camp & Voss</h4>
                          <p className="text-sm text-muted-foreground">
                            Override personality traits with systematic negotiation skills
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Phase 3 */}
                <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-green/5">
                  <h3 className="text-2xl font-bold mb-4 text-brand-green">Phase 3: Implementation & Accountability</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Build sustainable change agency and master the Participant Self-Training Model for weekly self-assessment and growth tracking
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          5
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 5: Change Agency</h4>
                          <p className="text-sm text-muted-foreground">
                            Creating sustainable environments for behavior change
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
                          6
                        </div>
                        <div>
                          <h4 className="font-semibold">Module 6: Participant Self-Training Model</h4>
                          <p className="text-sm text-muted-foreground">
                            Weekly self-assessment and continuous improvement
                          </p>
                        </div>
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
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl">
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

              <div className="space-y-4">
                <Button onClick={handleSectionComplete} className="bg-brand-green hover:bg-[#14b8a6] text-white w-full">
                  Complete Module 0
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Module 0 Completion Section */}
          {currentSectionIndex === totalSections && (
            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-brand-green/10 via-background to-brand-orange/10">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-20 w-20 text-brand-green" />
                  </div>
                  <h2 className="text-4xl font-bold">Congratulations! 🎉</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    You've completed Module 0: Introduction to Swiftcourse
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Now you understand how personality assessment drives sales success and the power of the Big 5 model.
                  </p>
                </div>
              </Card>

              <Card className="p-8 bg-brand-green/5 border-2 border-brand-green">
                <h3 className="text-2xl font-bold mb-4 text-center">What You'll Achieve</h3>
                <ul className="space-y-3 max-w-2xl mx-auto">
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

              <div className="text-center space-y-6 py-8">
                <h3 className="text-3xl font-bold">What's Next?</h3>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Ready to unlock your full sales potential? Choose how you'd like to continue:
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold mb-3">Schedule a Consultation</h4>
                    <p className="text-muted-foreground mb-6">
                      Talk to our team about the full course and how it can transform your sales approach. Get personalized insights and discuss your goals.
                    </p>
                    <Button asChild className="w-full bg-brand-orange hover:bg-[#e64a19] text-white" size="lg">
                      <Link href="https://calendly.com/lfederico-swiftcourse/30min?month=2026-01" target="_blank" rel="noopener noreferrer">
                        Book an Appointment
                      </Link>
                    </Button>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold mb-3">Explore More</h4>
                    <p className="text-muted-foreground mb-6">
                      Return to our website to learn more about the full course, review pricing options, and see what else is included.
                    </p>
                    <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
                      <Link href="/">Back to Website</Link>
                    </Button>
                  </Card>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-brand-orange/5 to-brand-green/5">
                <h3 className="text-xl font-bold mb-4 text-center">The Full Course Includes</h3>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-orange mb-1">Module 1: Neurobiology & Growth Mindset</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn the neuroscience behind goal-seeking, develop a growth mindset, and understand how stress affects performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-green mb-1">Module 2: Learning, Habits & Measurement</h4>
                      <p className="text-sm text-muted-foreground">
                        Master the learning process, build sustainable habits with the 21-day protocol, and measure your progress.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </main>
    </div>
  )
}
