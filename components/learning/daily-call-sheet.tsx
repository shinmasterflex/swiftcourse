"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Phone, MessageSquare, UserPlus, Calendar, X, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

type CallState = "none" | "called" | "contacted" | "lead"
type OutcomeState = "none" | "appointment" | "no-interest" | "sale"

interface DailyStats {
  date: string
  totalCalls: number
  contacted: number
  leads: number
  appointments: number
  noInterest: number
  sales: number
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
      {(state === "called" || state === "contacted" || state === "lead") && (
        <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" strokeWidth="2" />
      )}
      
      {/* Second diagonal for "contacted" (creates X) */}
      {(state === "contacted" || state === "lead") && (
        <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
      )}
      
      {/* Circle for "lead" */}
      {state === "lead" && (
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      )}
    </svg>
  )
}

// Component to render outcome state visuals
function OutcomeStateIndicator({ state }: { state: OutcomeState }) {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      {/* Checkmark for "appointment" */}
      {state === "appointment" && (
        <path d="M20 6L9 17L4 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
      
      {/* X for "no-interest" */}
      {state === "no-interest" && (
        <>
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
        </>
      )}
      
      {/* Dollar sign for "sale" */}
      {state === "sale" && (
        <>
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
          <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  )
}

export function DailyCallSheet({ onComplete, storageKey = "daily-call-sheet" }: DailyCallSheetProps) {
  const [date, setDate] = useState<string>("")
  const [isClient, setIsClient] = useState(false)
  const [callLog, setCallLog] = useState<CallState[]>(Array.from({ length: 200 }, () => "none"))
  const [outcomeLog, setOutcomeLog] = useState<OutcomeState[]>(Array.from({ length: 200 }, () => "none"))
  const [showCompletion, setShowCompletion] = useState(false)
  const [historicalStats, setHistoricalStats] = useState<DailyStats[]>([])

  // Initialize date on client side only
  useEffect(() => {
    setIsClient(true)
    const today = new Date()
    setDate(today.toISOString().split("T")[0])
  }, [])

  // Load saved data when date changes
  useEffect(() => {
    if (!isClient || !date) return
    
    const savedCallLog = localStorage.getItem(`${storageKey}-calllog-${date}`)
    const savedOutcomeLog = localStorage.getItem(`${storageKey}-outcomelog-${date}`)
    
    if (savedCallLog) {
      try {
        const parsed = JSON.parse(savedCallLog)
        // Handle migration from old format to new format
        if (Array.isArray(parsed)) {
          // New format - already an array
          setCallLog(parsed)
        } else if (parsed.outboundCalls && Array.isArray(parsed.outboundCalls)) {
          // Old format - has outboundCalls property
          setCallLog(parsed.outboundCalls)
        } else {
          // Unknown format - reset
          setCallLog(Array.from({ length: 200 }, () => "none"))
        }
      } catch (e) {
        console.error("Failed to load call log", e)
        setCallLog(Array.from({ length: 200 }, () => "none"))
      }
    } else {
      setCallLog(Array.from({ length: 200 }, () => "none"))
    }
    
    if (savedOutcomeLog) {
      try {
        const parsed = JSON.parse(savedOutcomeLog)
        setOutcomeLog(Array.isArray(parsed) ? parsed : Array.from({ length: 200 }, () => "none"))
      } catch (e) {
        console.error("Failed to load outcome log", e)
        setOutcomeLog(Array.from({ length: 200 }, () => "none"))
      }
    } else {
      setOutcomeLog(Array.from({ length: 200 }, () => "none"))
    }
  }, [date, storageKey, isClient])
  
  // Auto-save call log
  useEffect(() => {
    if (!isClient || !date) return
    localStorage.setItem(`${storageKey}-calllog-${date}`, JSON.stringify(callLog))
  }, [callLog, date, storageKey, isClient])
  
  // Auto-save outcome log
  useEffect(() => {
    if (!isClient || !date) return
    localStorage.setItem(`${storageKey}-outcomelog-${date}`, JSON.stringify(outcomeLog))
  }, [outcomeLog, date, storageKey, isClient])
  
  // Calculate stats
  const totalCalls = callLog.filter((s) => s !== "none").length
  const totalContacted = callLog.filter((s) => s === "contacted" || s === "lead").length
  const totalLeads = callLog.filter((s) => s === "lead").length
  const totalAppointments = outcomeLog.filter((s) => s === "appointment").length
  const totalNoInterest = outcomeLog.filter((s) => s === "no-interest").length
  const totalSales = outcomeLog.filter((s) => s === "sale").length
  
  // Load historical stats for chart
  useEffect(() => {
    if (!isClient) return
    const savedHistory = localStorage.getItem(`${storageKey}-history`)
    if (savedHistory) {
      try {
        setHistoricalStats(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to load historical stats", e)
      }
    }
  }, [storageKey, isClient])
  
  // Save daily stats to history
  useEffect(() => {
    if (!isClient || !date) return
    
    const stats: DailyStats = {
      date,
      totalCalls,
      contacted: totalContacted,
      leads: totalLeads,
      appointments: totalAppointments,
      noInterest: totalNoInterest,
      sales: totalSales
    }
    
    setHistoricalStats(prev => {
      // Remove existing entry for this date and add new one
      const filtered = prev.filter(s => s.date !== date)
      const updated = [...filtered, stats].sort((a, b) => a.date.localeCompare(b.date))
      // Keep only last 30 days
      const recent = updated.slice(-30)
      localStorage.setItem(`${storageKey}-history`, JSON.stringify(recent))
      return recent
    })
  }, [date, totalCalls, totalContacted, totalLeads, totalAppointments, totalNoInterest, totalSales, storageKey, isClient])
  
  const toggleCallLog = (index: number) => {
    setCallLog((prev) => {
      const currentState = prev[index]
      
      return prev.map((val, i) => {
        if (i !== index) return val
        // Cycle through states: none -> called -> contacted -> lead -> none
        let newState: CallState
        if (val === "none") newState = "called"
        else if (val === "called") newState = "contacted"
        else if (val === "contacted") newState = "lead"
        else newState = "none"
        
        return newState
      })
    })
  }
  
  const toggleOutcomeLog = (index: number) => {
    setOutcomeLog((prev) => {
      return prev.map((val, i) => {
        if (i !== index) return val
        // Cycle through states: none -> appointment -> no-interest -> sale -> none
        let newState: OutcomeState
        if (val === "none") newState = "appointment"
        else if (val === "appointment") newState = "no-interest"
        else if (val === "no-interest") newState = "sale"
        else newState = "none"
        
        return newState
      })
    })
  }

  const handleComplete = () => {
    if (onComplete) {
      setShowCompletion(true)
      onComplete()
    }
  }

  // Don't render date input until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Outbound Prospecting Activity</h2>
              <p className="text-muted-foreground">
                Track your calls, conversations, and leads
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Card with Stats */}
      <Card className="p-6 bg-gradient-to-br from-brand-green/10 to-brand-orange/10">
        <h1 className="text-3xl font-bold">Leading Indicators</h1>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-sm text-muted-foreground">Total Calls</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{totalCalls}</p>
            <p className="text-xs text-muted-foreground mt-1">out of 200</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-sm text-muted-foreground">Contacted</h3>
            </div>
            <p className="text-3xl font-bold text-orange-600">{totalContacted}</p>
            <p className="text-xs text-muted-foreground mt-1">spoken conversations</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-brand-green/30">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className="h-5 w-5 text-brand-green" />
              <h3 className="font-semibold text-sm text-muted-foreground">Leads</h3>
            </div>
            <p className="text-3xl font-bold text-brand-green">{totalLeads}</p>
            <p className="text-xs text-muted-foreground mt-1">qualified prospects</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-sm text-muted-foreground">Appointments</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">{totalAppointments}</p>
            <p className="text-xs text-muted-foreground mt-1">scheduled meetings</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <X className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-sm text-muted-foreground">No Interest</h3>
            </div>
            <p className="text-3xl font-bold text-red-600">{totalNoInterest}</p>
            <p className="text-xs text-muted-foreground mt-1">not interested</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-sm text-muted-foreground">Sales</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{totalSales}</p>
            <p className="text-xs text-muted-foreground mt-1">closed deals</p>
          </div>
        </div>
      </Card>

      {/* Main Call Grid */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-5 w-5 text-brand-green" />
            <h3 className="text-xl font-semibold">Call Tracking Grid</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Click each square to cycle through: Empty → Call Made → Contacted → Lead
          </p>
        </div>
        
        <div className="grid grid-cols-20 gap-1 mb-4">
          {callLog.map((callState, index) => (
            <button
              key={index}
              onClick={() => toggleCallLog(index)}
              className={cn(
                "aspect-square text-[10px] font-mono flex items-center justify-center border rounded transition-all relative",
                callState === "none" && "bg-background border-muted-foreground/20 hover:border-brand-green/50",
                callState === "called" && "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-600",
                callState === "contacted" && "bg-orange-50 dark:bg-orange-950 border-orange-500 text-orange-600",
                callState === "lead" && "bg-brand-green/10 border-brand-green text-brand-green"
              )}
              title={`Call ${index + 1}: ${
                callState === "none" 
                  ? "Empty" 
                  : callState === "called" 
                  ? "Call Made" 
                  : callState === "contacted" 
                  ? "Contacted" 
                  : "Lead"
              }`}
            >
              <div className="absolute inset-1">
                <CallStateIndicator state={callState} />
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p className="mb-3 font-semibold">Legend:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border border-blue-500 rounded flex items-center justify-center flex-shrink-0 bg-blue-50 dark:bg-blue-950">
                <CallStateIndicator state="called" />
              </div>
              <div>
                <p className="font-semibold text-foreground">/ = Call Made</p>
                <p className="text-xs">The call was attempted (voicemail, no answer, etc.)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border border-orange-500 rounded flex items-center justify-center flex-shrink-0 bg-orange-50 dark:bg-orange-950">
                <CallStateIndicator state="contacted" />
              </div>
              <div>
                <p className="font-semibold text-foreground">X = Contacted</p>
                <p className="text-xs">Had a spoken conversation with a person</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border border-brand-green rounded flex items-center justify-center flex-shrink-0 bg-brand-green/10">
                <CallStateIndicator state="lead" />
              </div>
              <div>
                <p className="font-semibold text-foreground">⊗ = Lead</p>
                <p className="text-xs">Qualified prospect - potential customer identified</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Outcome Tracking Grid */}
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <h3 className="text-xl font-semibold">Follow Up Calling Activities</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Click each square to cycle through: Empty → Appointment → No Interest → Sale
          </p>
        </div>
        
        <div className="grid grid-cols-20 gap-1 mb-4">
          {outcomeLog.map((outcomeState, index) => (
            <button
              key={index}
              onClick={() => toggleOutcomeLog(index)}
              className={cn(
                "aspect-square text-[10px] font-mono flex items-center justify-center border rounded transition-all relative",
                outcomeState === "none" && "bg-background border-muted-foreground/20 hover:border-purple-500/50",
                outcomeState === "appointment" && "bg-purple-50 dark:bg-purple-950 border-purple-500 text-purple-600",
                outcomeState === "no-interest" && "bg-red-50 dark:bg-red-950 border-red-500 text-red-600",
                outcomeState === "sale" && "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-600"
              )}
              title={`Outcome ${index + 1}: ${
                outcomeState === "none" 
                  ? "Empty" 
                  : outcomeState === "appointment" 
                  ? "Appointment" 
                  : outcomeState === "no-interest" 
                  ? "No Interest" 
                  : "Sale"
              }`}
            >
              <div className="absolute inset-1">
                <OutcomeStateIndicator state={outcomeState} />
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p className="mb-3 font-semibold">Legend:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border border-purple-500 rounded flex items-center justify-center flex-shrink-0 bg-purple-50 dark:bg-purple-950">
                <OutcomeStateIndicator state="appointment" />
              </div>
              <div>
                <p className="font-semibold text-foreground">✓ = Appointment</p>
                <p className="text-xs">Scheduled a meeting or follow-up appointment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border border-red-500 rounded flex items-center justify-center flex-shrink-0 bg-red-50 dark:bg-red-950">
                <OutcomeStateIndicator state="no-interest" />
              </div>
              <div>
                <p className="font-semibold text-foreground">✕ = No Interest</p>
                <p className="text-xs">Contact expressed no interest or not qualified</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border border-emerald-500 rounded flex items-center justify-center flex-shrink-0 bg-emerald-50 dark:bg-emerald-950">
                <OutcomeStateIndicator state="sale" />
              </div>
              <div>
                <p className="font-semibold text-foreground">$ = Sale</p>
                <p className="text-xs">Successfully closed the deal - converted to sale</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Historical Trends Chart */}
      {isClient && (
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Daily Progress Chart</h3>
            <p className="text-sm text-muted-foreground">
              Cumulative metrics as you progress through the call grid
            </p>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={(() => {
                // Generate data points for every 10 squares
                const dataPoints = []
                for (let i = 10; i <= 200; i += 10) {
                  const callsUpToHere = callLog.slice(0, i).filter((s) => s !== "none").length
                  const contactedUpToHere = callLog.slice(0, i).filter((s) => s === "contacted" || s === "lead").length
                  const leadsUpToHere = callLog.slice(0, i).filter((s) => s === "lead").length
                  const appointmentsUpToHere = outcomeLog.slice(0, i).filter((s) => s === "appointment").length
                  const noInterestUpToHere = outcomeLog.slice(0, i).filter((s) => s === "no-interest").length
                  const salesUpToHere = outcomeLog.slice(0, i).filter((s) => s === "sale").length
                  
                  dataPoints.push({
                    square: i,
                    totalCalls: callsUpToHere,
                    contacted: contactedUpToHere,
                    leads: leadsUpToHere,
                    appointments: appointmentsUpToHere,
                    noInterest: noInterestUpToHere,
                    sales: salesUpToHere
                  })
                }
                return dataPoints
              })()}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="square" 
                  className="text-xs"
                />
                <YAxis 
                  className="text-xs" 
                />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
                          <p className="font-semibold mb-2">
                            Square {payload[0].payload.square}
                          </p>
                          {payload.map((entry: any) => (
                            <div key={entry.name} className="flex items-center gap-2 text-sm">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span>{entry.name}: {entry.value}</span>
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="totalCalls" 
                  name="Total Calls"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="contacted" 
                  name="Contacted"
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  name="Leads"
                  stroke="#1a5940" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  name="Appointments"
                  stroke="#a855f7" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="noInterest" 
                  name="No Interest"
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  name="Sales"
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  )
}
