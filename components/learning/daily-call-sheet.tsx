"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingUp, Phone, Users, Calendar, UserPlus, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPI {
  id: string
  label: string
  goal: number
  outcome: number
  icon: React.ReactNode
  category: "leading" | "lagging"
}

type CallState = "none" | "called" | "answered" | "lead"

interface CallLogState {
  outboundCalls: CallState[]
  followUpCalls: CallState[]
}

interface Lead {
  name: string
  email: string
  phone: string
}

interface DailyCallSheetProps {
  onComplete?: () => void
  storageKey?: string
}

// Component to render call state visuals
function CallStateIndicator({ state }: { state: CallState }) {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      {/* Diagonal line for "called" */}
      {(state === "called" || state === "answered" || state === "lead") && (
        <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" strokeWidth="2" />
      )}
      
      {/* Second diagonal for "answered" (creates X) */}
      {(state === "answered" || state === "lead") && (
        <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
      )}
      
      {/* Circle for "lead" */}
      {state === "lead" && (
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      )}
    </svg>
  )
}

export function DailyCallSheet({ onComplete, storageKey = "daily-call-sheet" }: DailyCallSheetProps) {
  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: "outbound-calls",
      label: "Outbound Calls",
      goal: 0,
      outcome: 0,
      icon: <Phone className="h-5 w-5" />,
      category: "leading",
    },
    {
      id: "follow-up-calls",
      label: "Follow Up Calls",
      goal: 0,
      outcome: 0,
      icon: <Phone className="h-5 w-5" />,
      category: "leading",
    },
    {
      id: "appointments-set",
      label: "Appointments Set",
      goal: 0,
      outcome: 0,
      icon: <Calendar className="h-5 w-5" />,
      category: "leading",
    },
    {
      id: "new-accounts",
      label: "New Accounts",
      goal: 0,
      outcome: 0,
      icon: <UserPlus className="h-5 w-5" />,
      category: "lagging",
    },
    {
      id: "referrals",
      label: "Referrals",
      goal: 0,
      outcome: 0,
      icon: <Users className="h-5 w-5" />,
      category: "lagging",
    },
  ])

  const [date, setDate] = useState<string>("")
  const [isClient, setIsClient] = useState(false)
  const [callLog, setCallLog] = useState<CallLogState>({
    outboundCalls: Array.from({ length: 200 }, () => "none" as CallState),
    followUpCalls: Array.from({ length: 60 }, () => "none" as CallState),
  })
  const [leads, setLeads] = useState<Lead[]>(Array(8).fill({ name: "", email: "", phone: "" }))
  const [showCompletion, setShowCompletion] = useState(false)

  // Initialize date on client side only
  useEffect(() => {
    setIsClient(true)
    const today = new Date()
    setDate(today.toISOString().split("T")[0])
  }, [])

  // Load saved data when date changes
  useEffect(() => {
    if (!isClient || !date) return
    
    const savedData = localStorage.getItem(`${storageKey}-${date}`)
    const savedCallLog = localStorage.getItem(`${storageKey}-calllog-${date}`)
    const savedLeads = localStorage.getItem(`${storageKey}-leads-${date}`)
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        // Restore icons to the parsed data
        const kpisWithIcons = [
          {
            ...parsed[0],
            icon: <Phone className="h-5 w-5" />,
          },
          {
            ...parsed[1],
            icon: <Phone className="h-5 w-5" />,
          },
          {
            ...parsed[2],
            icon: <Calendar className="h-5 w-5" />,
          },
          {
            ...parsed[3],
            icon: <UserPlus className="h-5 w-5" />,
          },
          {
            ...parsed[4],
            icon: <Users className="h-5 w-5" />,
          },
        ]
        setKpis(kpisWithIcons)
      } catch (e) {
        console.error("Failed to load saved data", e)
      }
    } else {
      // Reset to default KPIs for new date
      setKpis([
        {
          id: "outbound-calls",
          label: "Outbound Calls",
          goal: 0,
          outcome: 0,
          icon: <Phone className="h-5 w-5" />,
          category: "leading",
        },
        {
          id: "follow-up-calls",
          label: "Follow Up Calls",
          goal: 0,
          outcome: 0,
          icon: <Phone className="h-5 w-5" />,
          category: "leading",
        },
        {
          id: "appointments-set",
          label: "Appointments Set",
          goal: 0,
          outcome: 0,
          icon: <Calendar className="h-5 w-5" />,
          category: "leading",
        },
        {
          id: "new-accounts",
          label: "New Accounts",
          goal: 0,
          outcome: 0,
          icon: <UserPlus className="h-5 w-5" />,
          category: "lagging",
        },
        {
          id: "referrals",
          label: "Referrals",
          goal: 0,
          outcome: 0,
          icon: <Users className="h-5 w-5" />,
          category: "lagging",
        },
      ])
    }
    
    if (savedCallLog) {
      try {
        const parsed = JSON.parse(savedCallLog)
        // Migrate old boolean format to new CallState format
        const migratedCallLog = {
          outboundCalls: parsed.outboundCalls.map((val: any) => {
            if (val === true || val === "true") return "called" as CallState
            if (val === false || val === "false") return "none" as CallState
            return val as CallState
          }),
          followUpCalls: parsed.followUpCalls.map((val: any) => {
            if (val === true || val === "true") return "called" as CallState
            if (val === false || val === "false") return "none" as CallState
            return val as CallState
          }),
        }
        setCallLog(migratedCallLog)
      } catch (e) {
        console.error("Failed to load call log", e)
      }
    } else {
      setCallLog({
        outboundCalls: Array.from({ length: 200 }, () => "none" as CallState),
        followUpCalls: Array.from({ length: 60 }, () => "none" as CallState),
      })
    }
    
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads))
      } catch (e) {
        console.error("Failed to load leads", e)
      }
    } else {
      setLeads(Array(8).fill({ name: "", email: "", phone: "" }))
    }
  }, [date, storageKey, isClient])

  // Auto-save when KPIs change (exclude icons from serialization)
  useEffect(() => {
    if (!isClient || !date) return
    // Remove icons before saving to avoid circular structure
    const kpisToSave = kpis.map(({ icon, ...rest }) => rest)
    localStorage.setItem(`${storageKey}-${date}`, JSON.stringify(kpisToSave))
  }, [kpis, date, storageKey, isClient])
  
  // Auto-save call log
  useEffect(() => {
    if (!isClient || !date) return
    localStorage.setItem(`${storageKey}-calllog-${date}`, JSON.stringify(callLog))
  }, [callLog, date, storageKey, isClient])
  
  // Auto-save leads
  useEffect(() => {
    if (!isClient || !date) return
    localStorage.setItem(`${storageKey}-leads-${date}`, JSON.stringify(leads))
  }, [leads, date, storageKey, isClient])

  const updateKPI = (id: string, field: "goal" | "outcome", value: number) => {
    setKpis((prev) =>
      prev.map((kpi) => (kpi.id === id ? { ...kpi, [field]: Math.max(0, value) } : kpi))
    )
  }
  
  const toggleCallLog = (type: "outbound" | "followup", index: number) => {
    if (type === "outbound") {
      setCallLog((prev) => {
        const currentState = prev.outboundCalls[index]
        console.log(`Clicking outbound call ${index}: current state = "${currentState}"`)
        
        return {
          ...prev,
          outboundCalls: prev.outboundCalls.map((val, i) => {
            if (i !== index) return val
            // Cycle through states: none -> called -> answered -> lead -> none
            let newState: CallState
            if (val === "none") newState = "called"
            else if (val === "called") newState = "answered"
            else if (val === "answered") newState = "lead"
            else newState = "none"
            
            console.log(`  -> new state = "${newState}"`)
            return newState
          }),
        }
      })
    } else {
      setCallLog((prev) => {
        const currentState = prev.followUpCalls[index]
        console.log(`Clicking followup call ${index}: current state = "${currentState}"`)
        
        return {
          ...prev,
          followUpCalls: prev.followUpCalls.map((val, i) => {
            if (i !== index) return val
            // Cycle through states: none -> called -> answered -> lead -> none
            let newState: CallState
            if (val === "none") newState = "called"
            else if (val === "called") newState = "answered"
            else if (val === "answered") newState = "lead"
            else newState = "none"
            
            console.log(`  -> new state = "${newState}"`)
            return newState
          }),
        }
      })
    }
  }
  
  const updateLead = (index: number, field: keyof Lead, value: string) => {
    setLeads((prev) => prev.map((lead, i) => (i === index ? { ...lead, [field]: value } : lead)))
  }

  const calculateProgress = (kpi: KPI) => {
    if (kpi.goal === 0) return 0
    return Math.min(100, Math.round((kpi.outcome / kpi.goal) * 100))
  }

  const calculateOverallProgress = () => {
    const leadingKpis = kpis.filter((k) => k.category === "leading")
    const totalProgress = leadingKpis.reduce((sum, kpi) => sum + calculateProgress(kpi), 0)
    return leadingKpis.length > 0 ? Math.round(totalProgress / leadingKpis.length) : 0
  }

  const allGoalsSet = kpis.every((kpi) => kpi.goal > 0)
  const overallProgress = calculateOverallProgress()

  const handleComplete = () => {
    if (onComplete && allGoalsSet) {
      setShowCompletion(true)
      onComplete()
    }
  }
  
  const outboundCallCount = callLog.outboundCalls.filter((s) => s !== "none").length
  const followUpCallCount = callLog.followUpCalls.filter((s) => s !== "none").length
  const outboundAnsweredCount = callLog.outboundCalls.filter((s) => s === "answered" || s === "lead").length
  const outboundLeadCount = callLog.outboundCalls.filter((s) => s === "lead").length
  const followUpAnsweredCount = callLog.followUpCalls.filter((s) => s === "answered" || s === "lead").length
  const followUpLeadCount = callLog.followUpCalls.filter((s) => s === "lead").length

  // Don't render date input until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Daily Call Sheet</h2>
              <p className="text-muted-foreground">
                Track your leading and lagging indicators to maintain a healthy prospect pipeline
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Daily Call Sheet</h2>
            <p className="text-muted-foreground">
              Track your leading and lagging indicators to maintain a healthy prospect pipeline
            </p>
          </div>
          <div className="flex flex-col items-end">
            <Label className="text-sm mb-1">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-40"
            />
          </div>
        </div>

        {allGoalsSet && (
          <div className="mb-4 p-4 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress (Leading Indicators)</span>
              <span className="text-2xl font-bold text-brand-green">{overallProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-brand-green rounded-full h-3 transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-brand-green" />
            <h3 className="text-xl font-semibold">Leading Indicators</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Priority activities that drive your pipeline health and ensure commitment to mission
          </p>
        </div>

        <div className="space-y-4">
          {kpis
            .filter((kpi) => kpi.category === "leading")
            .map((kpi) => (
              <div key={kpi.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-brand-green">{kpi.icon}</div>
                  <h4 className="font-semibold">{kpi.label}</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <Label htmlFor={`${kpi.id}-goal`} className="text-xs mb-1">
                      Goal
                    </Label>
                    <Input
                      id={`${kpi.id}-goal`}
                      type="number"
                      min="0"
                      value={kpi.goal}
                      onChange={(e) => updateKPI(kpi.id, "goal", parseInt(e.target.value) || 0)}
                      className="text-lg font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${kpi.id}-outcome`} className="text-xs mb-1">
                      Actual
                    </Label>
                    <Input
                      id={`${kpi.id}-outcome`}
                      type="number"
                      min="0"
                      value={kpi.outcome}
                      onChange={(e) => updateKPI(kpi.id, "outcome", parseInt(e.target.value) || 0)}
                      className="text-lg font-semibold"
                    />
                  </div>
                </div>

                {kpi.goal > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold">{calculateProgress(kpi)}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className={`rounded-full h-2 transition-all duration-300 ${
                          calculateProgress(kpi) >= 100
                            ? "bg-brand-green"
                            : calculateProgress(kpi) >= 50
                            ? "bg-brand-orange"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${calculateProgress(kpi)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-brand-orange" />
            <h3 className="text-xl font-semibold">Lagging Indicators</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Important outcomes that result from consistent leading indicator activity
          </p>
        </div>

        <div className="space-y-4">
          {kpis
            .filter((kpi) => kpi.category === "lagging")
            .map((kpi) => (
              <div key={kpi.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-brand-orange">{kpi.icon}</div>
                  <h4 className="font-semibold">{kpi.label}</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <Label htmlFor={`${kpi.id}-goal`} className="text-xs mb-1">
                      Goal
                    </Label>
                    <Input
                      id={`${kpi.id}-goal`}
                      type="number"
                      min="0"
                      value={kpi.goal}
                      onChange={(e) => updateKPI(kpi.id, "goal", parseInt(e.target.value) || 0)}
                      className="text-lg font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${kpi.id}-outcome`} className="text-xs mb-1">
                      Actual
                    </Label>
                    <Input
                      id={`${kpi.id}-outcome`}
                      type="number"
                      min="0"
                      value={kpi.outcome}
                      onChange={(e) => updateKPI(kpi.id, "outcome", parseInt(e.target.value) || 0)}
                      className="text-lg font-semibold"
                    />
                  </div>
                </div>

                {kpi.goal > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold">{calculateProgress(kpi)}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className={`rounded-full h-2 transition-all duration-300 ${
                          calculateProgress(kpi) >= 100
                            ? "bg-brand-green"
                            : calculateProgress(kpi) >= 50
                            ? "bg-brand-orange"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${calculateProgress(kpi)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-5 w-5 text-brand-green" />
            <h3 className="text-xl font-semibold">Outbound Call Log</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Click to cycle: Call Made → Answered → Lead → Clear • Calls: {outboundCallCount}/200 • Answered: {outboundAnsweredCount} • Leads: {outboundLeadCount}
          </p>
        </div>
        
        <div className="grid grid-cols-20 gap-1 mb-4">
          {callLog.outboundCalls.map((callState, index) => (
            <button
              key={index}
              onClick={() => toggleCallLog("outbound", index)}
              className={cn(
                "aspect-square text-[10px] font-mono flex items-center justify-center border rounded transition-all relative",
                callState === "none" && "bg-background border-muted-foreground/20 hover:border-brand-green/50",
                callState === "called" && "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-600",
                callState === "answered" && "bg-orange-50 dark:bg-orange-950 border-orange-500 text-orange-600",
                callState === "lead" && "bg-brand-green/10 border-brand-green text-brand-green"
              )}
              title={`Call ${index + 1}: ${callState === "none" ? "Not called" : callState === "called" ? "Called" : callState === "answered" ? "Answered" : "Lead"}`}
            >
              <div className="absolute inset-1">
                <CallStateIndicator state={callState} />
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground mb-3">
          <p className="mb-2"><strong>How to use:</strong></p>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-blue-500 rounded flex items-center justify-center flex-shrink-0 bg-blue-50 dark:bg-blue-950">
                <CallStateIndicator state="called" />
              </div>
              <div>
                <p className="font-semibold text-foreground">/ = Call Made</p>
                <p className="text-xs">Represents that call was made, but it did not result in a spoken conversation or lead</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-orange-500 rounded flex items-center justify-center flex-shrink-0 bg-orange-50 dark:bg-orange-950">
                <CallStateIndicator state="answered" />
              </div>
              <div>
                <p className="font-semibold text-foreground">X = Answered</p>
                <p className="text-xs">Represents that you spoke to a person, but the call did not result in a lead</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-brand-green rounded flex items-center justify-center flex-shrink-0 bg-brand-green/10">
                <CallStateIndicator state="lead" />
              </div>
              <div>
                <p className="font-semibold text-foreground">⊗ = Lead Generated</p>
                <p className="text-xs">Represents that the call resulted in a lead—add their contact information below</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-5 w-5 text-brand-orange" />
            <h3 className="text-xl font-semibold">Follow-Up Call Log</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Click to cycle through states • Calls: {followUpCallCount}/60 • Answered: {followUpAnsweredCount} • Leads: {followUpLeadCount}
          </p>
        </div>
        
        <div className="grid grid-cols-20 gap-1 mb-4">
          {callLog.followUpCalls.map((callState, index) => (
            <button
              key={index}
              onClick={() => toggleCallLog("followup", index)}
              className={cn(
                "aspect-square text-[10px] font-mono flex items-center justify-center border rounded transition-all relative",
                callState === "none" && "bg-background border-muted-foreground/20 hover:border-brand-orange/50",
                callState === "called" && "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-600",
                callState === "answered" && "bg-orange-50 dark:bg-orange-950 border-orange-500 text-orange-600",
                callState === "lead" && "bg-brand-orange/10 border-brand-orange text-brand-orange"
              )}
              title={`Follow-up ${index + 1}: ${callState === "none" ? "Not called" : callState === "called" ? "Called" : callState === "answered" ? "Answered" : "Lead"}`}
            >
              <div className="absolute inset-1">
                <CallStateIndicator state={callState} />
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-brand-green" />
            <h3 className="text-xl font-semibold">Lead Tracking</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Record contact information for leads you connect with
          </p>
        </div>
        
        <div className="space-y-3">
          {leads.map((lead, index) => (
            <div key={index} className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
              <div>
                <Label className="text-xs mb-1">Name</Label>
                <Input
                  value={lead.name}
                  onChange={(e) => updateLead(index, "name", e.target.value)}
                  placeholder="Lead name"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs mb-1">Email</Label>
                <Input
                  value={lead.email}
                  onChange={(e) => updateLead(index, "email", e.target.value)}
                  placeholder="email@example.com"
                  type="email"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs mb-1">Phone</Label>
                <Input
                  value={lead.phone}
                  onChange={(e) => updateLead(index, "phone", e.target.value)}
                  placeholder="(555) 555-5555"
                  type="tel"
                  className="text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-2 border-brand-green/30">
        <h3 className="text-lg font-semibold mb-3">The Philosophy Behind This Tracker</h3>
        <div className="space-y-3 text-sm">
          <p>
            <strong className="text-brand-green">Leading Indicators First:</strong> We prioritize prospecting activities
            (calls, follow-ups, appointments) because they are within your direct control and drive future success.
          </p>
          <p>
            <strong className="text-brand-orange">Lagging Indicators Matter:</strong> While new accounts and referrals
            are important outcomes, they result from consistent leading indicator behavior.
          </p>
          <p>
            <strong>Mission-Driven Approach:</strong> This tracker helps you maintain commitment to daily disciplines that
            create a healthy pipeline—ensuring you stay focused on your purpose rather than just outcomes.
          </p>
          <p className="text-muted-foreground italic">
            "What gets measured gets managed. What gets managed gets improved."
          </p>
        </div>
      </Card>

      {allGoalsSet && onComplete && !showCompletion && (
        <div className="flex justify-center">
          <Button
            onClick={handleComplete}
            size="lg"
            className="bg-brand-green hover:bg-[#143d31] text-white px-8"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Complete Call Sheet
          </Button>
        </div>
      )}
    </div>
  )
}
