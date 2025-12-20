/**
 * PUBLIC HOMEPAGE
 * Main landing page for Swiftcourse with course information and CTAs
 */

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PublicHeader } from "@/components/layout/public-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Brain, Target, TrendingUp, BookOpen } from "lucide-react"

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    "/car-sales.png",
    "/house-sales.png",
    "/professional-sales.png"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/10 via-emerald-50 to-brand-orange/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="text-brand-orange">Personality Traits</span> Are Tendencies.{" "}
                  <span className="text-brand-green">Mindset</span> Is Character.
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  Strengthen entrepreneurial and sales success through personality trait assessment with the Big 5 Model
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-brand-orange hover:bg-[#e64a19] text-white text-lg px-8">
                    <Link href="/demo">Try Module 0</Link>
                  </Button>
                </div>
              </div>

              {/* Right side - Image slideshow */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  {images.map((image, index) => (
                    <div
                      key={image}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Sales scenario ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
                {/* Slideshow indicators */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-brand-orange w-8"
                          : "bg-gray-400 hover:bg-gray-600"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">About Swiftcourse</h2>
            </div>

            <Card className="border-2 border-brand-green/20">
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Our mission is to equip sales teams with the skills to outgrow their default traits and operate with disciplined, repeatable negotiation behaviors. We use the Big 10 Aspects Model to reveal each salesperson's instinctive patterns, then train them to counterbalance these tendencies through Jim Camp's systematic thinking, Chris Voss's tactical empathy, and a metrics-driven approach to productive activity.
                </p>
                <p className="text-lg leading-relaxed font-semibold text-brand-green">
                  We aim to build salespeople who can stay calm, assertive, and in control—no matter their personality—so they can navigate complex conversations and drive meaningful results.
                </p>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card>
                <CardHeader>
                  <Brain className="h-10 w-10 text-brand-green mb-2" />
                  <CardTitle>Science-Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built on the Big 5 personality model, the most scientifically validated framework in psychology
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-brand-orange mb-2" />
                  <CardTitle>Actionable Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get specific strategies tailored to your personality traits to maximize your sales potential
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-brand-green mb-2" />
                  <CardTitle>Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn from neuroscience research and proven techniques used by top sales professionals
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-20 bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-center">The Problem</h2>
              <Card className="border-2 border-destructive/20">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-lg">
                    Most sales training programs focus on techniques and scripts, but they ignore three fundamental challenges:
                  </p>
                  <p className="text-xl font-semibold text-brand-orange">
                    Personality defaults, lack of systematic approaches, and no sustained change framework
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Your personality traits create blind spots and inconsistent behaviors in high-pressure situations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Without systematic negotiation skills, you react emotionally instead of strategically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>No clear measurement system to track growth across personality, mindset, and sales activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span>Change doesn&apos;t stick because there&apos;s no environment or agency supporting new habits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-center">Our Solution</h2>
              <Card className="border-2 border-brand-green/20">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-lg">
                    Swiftcourse uses the Big 10 Aspects Model combined with systematic negotiation training and change agency frameworks to build salespeople who can override their personality defaults and operate with discipline.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Phase 1 - Personality & Neurobiology:</strong> Understand your Big 10 traits and the neuroscience of goal-seeking and growth mindset
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Phase 2 - Systematic Negotiation:</strong> Master Jim Camp&apos;s "Start With No" and Chris Voss&apos;s FBI tactics to stay calm and in control
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Phase 3 - Change Agency & Measurement:</strong> Design environments for sustained behavior change and track progress with the 4D Growth Framework
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Neuroscience-backed approach:</strong> Build context-independent habits through deliberate practice and 21-day protocols
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">What You&apos;ll Learn</h2>
              <p className="text-xl text-muted-foreground">
                A comprehensive course covering personality assessment, neuroscience, and practical application
              </p>
            </div>

            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="pt-4">
                <h3 className="text-2xl font-bold text-brand-green mb-4">Phase 1: Personality Traits and Introduction to Neurobiology</h3>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-brand-green" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">Module 0: Introduction</CardTitle>
                      <CardDescription className="text-base">
                        Understanding the Big Five personality model and how it applies to sales success
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-6">
                    <li>• The Big Five OCEAN model and 10 personality aspects</li>
                    <li>• How personality traits predict sales behaviors</li>
                    <li>• Identifying your natural strengths and blind spots</li>
                    <li>• Creating your personalized development plan</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-orange/10 p-3 rounded-lg">
                      <Brain className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">Module 1: Neurobiology & Growth Mindset</CardTitle>
                      <CardDescription className="text-base">
                        The neuroscience of goal-seeking and developing a growth mindset
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-6">
                    <li>• Neural mechanisms of goal-seeking behavior</li>
                    <li>• Growth mindset vs. fixed mindset in sales</li>
                    <li>• Managing stress and the autonomic nervous system</li>
                    <li>• MAD Analysis: Motivation, Ability, and Discipline</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Phase 2 */}
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-brand-orange mb-4">Phase 2: Growth Mindset and Growth Perspectives</h3>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg">
                      <Target className="h-6 w-6 text-brand-green" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">Module 2: Learning, Habits & Measurement</CardTitle>
                      <CardDescription className="text-base">
                        Building sustainable habits and measuring progress with KPIs
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-6">
                    <li>• The science of learning and neuroplasticity</li>
                    <li>• Creating context-independent habits</li>
                    <li>• The 21-day habit formation protocol</li>
                    <li>• Overcoming perfectionism and self-judgment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-orange/10 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">Module 3: Win With NO</CardTitle>
                      <CardDescription className="text-base">
                        Mastering Jim Camp&apos;s and Chris Voss&apos;s negotiation frameworks
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-6">
                    <li>• Jim Camp&apos;s "Start With No" system and decision-based commitment</li>
                    <li>• Chris Voss&apos;s tactical empathy and calibrated questions</li>
                    <li>• Mirroring, labeling, and accusation audits</li>
                    <li>• Creating "That&apos;s right" moments for genuine agreement</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg">
                      <Brain className="h-6 w-6 text-brand-green" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">Module 4: Integrating Big 10 with Camp & Voss</CardTitle>
                      <CardDescription className="text-base">
                        Using systematic skills to override personality defaults
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-6">
                    <li>• How each personality aspect affects negotiation behaviors</li>
                    <li>• Tactical responses to counterbalance trait tendencies</li>
                    <li>• Building calm, assertive presence under pressure</li>
                    <li>• Systematic thinking vs. emotional reactivity</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Phase 3 */}
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-brand-green mb-4">Phase 3: Implementation and Change Agency</h3>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-orange/10 p-3 rounded-lg">
                      <Target className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">Module 5: Change Agency</CardTitle>
                      <CardDescription className="text-base">
                        Designing environments that support sustained behavioral change
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-6">
                    <li>• Systems thinking for behavior change in sales teams</li>
                    <li>• Environmental design for habit formation</li>
                    <li>• Social accountability and team culture</li>
                    <li>• Routine architecture and deliberate practice structures</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/10 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-brand-green" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">Module 6: Measurement and Accountability</CardTitle>
                      <CardDescription className="text-base">
                        The 4D Growth Framework for tracking transformation
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-6">
                    <li>• D1: SCTI personality reassessment for trait awareness</li>
                    <li>• D2: Mindset tracking (growth vs. fixed)</li>
                    <li>• D3: Change agency metrics (habits, environment, accountability)</li>
                    <li>• D4: Sales activity KPIs (calls, meetings, proposals)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center pt-8">
              <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white text-lg px-8">
                <Link href="/demo">Start With Module 0</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">Ready to Transform Your Sales Approach?</h2>
            <p className="text-xl text-muted-foreground">
              Start with Module 0 to experience how personality-based training can give you a competitive edge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-[#e64a19] text-white text-lg px-8">
                <Link href="/demo">Try Module 0 Now</Link>
              </Button>
              <Button
                asChild size="lg" variant="outline" className="text-lg px-8"
              >
                <Link href="https://calendly.com/your-calendly-link" target="_blank" rel="noopener noreferrer">
                  Schedule a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-green/10 to-brand-orange/10 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-3xl">
                <span className="font-serif font-light italic text-brand-orange">Swift </span>
                <span className="font-heading font-light text-brand-green">Course</span>
              </div>
            </div>
            <p className="text-muted-foreground">
              Strengthen entrepreneurial and sales success through personality trait assessment
            </p>
            <p className="text-sm text-muted-foreground pt-4">
              © {new Date().getFullYear()} Swiftcourse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
