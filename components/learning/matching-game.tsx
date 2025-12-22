"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, X, RefreshCw, Clock } from "lucide-react"

interface MatchPair {
  id: string
  term: string
  definition: string
}

interface MatchingGameProps {
  title: string
  pairs: MatchPair[]
  onComplete?: (correct: boolean) => void
}

export function MatchingGame({ title, pairs, onComplete }: MatchingGameProps) {
  // Shuffle definitions for the game
  const shuffledDefinitions = useMemo(() => {
    const defs = pairs.map((p) => ({ id: p.id, text: p.definition }))
    return defs.sort(() => Math.random() - 0.5)
  }, [pairs])

  const [matches, setMatches] = useState<Record<string, string>>({}) // termId -> definitionId
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState<Record<string, "correct" | "incorrect">>({})
  const [incorrectPair, setIncorrectPair] = useState<{ termId: string; defId: string } | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  useEffect(() => {
    if (!isTimerRunning) return

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning])

  useEffect(() => {
    if (isComplete) {
      setIsTimerRunning(false)
    }
  }, [isComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle term selection
  const handleTermClick = (termId: string) => {
    if (isComplete || feedback[termId] === "correct") return
    setSelectedTerm(termId)
  }

  const handleDefinitionClick = (defId: string) => {
    if (!selectedTerm || isComplete) return

    // Check if this definition is already correctly matched
    const alreadyMatched = Object.entries(feedback).find(
      ([termId, status]) => status === "correct" && matches[termId] === defId,
    )
    if (alreadyMatched) return

    // Check if this is the correct match
    const isCorrect = selectedTerm === defId

    if (isCorrect) {
      setMatches((prev) => ({
        ...prev,
        [selectedTerm]: defId,
      }))

      setFeedback((prev) => ({
        ...prev,
        [selectedTerm]: "correct",
      }))

      setSelectedTerm(null)

      const newMatches = { ...matches, [selectedTerm]: defId }
      const newFeedback = { ...feedback, [selectedTerm]: "correct" }
      const allCorrect = pairs.every((pair) => newFeedback[pair.id] === "correct")

      if (allCorrect) {
        setTimeout(() => {
          setIsComplete(true)
          if (onComplete) {
            onComplete(true)
          }
        }, 500)
      }
    } else {
      setMatches((prev) => ({
        ...prev,
        [selectedTerm]: defId,
      }))

      setFeedback((prev) => ({
        ...prev,
        [selectedTerm]: "incorrect",
      }))

      setIncorrectPair({ termId: selectedTerm, defId })

      setTimeout(() => {
        setMatches((prev) => {
          const newMatches = { ...prev }
          delete newMatches[selectedTerm]
          return newMatches
        })

        setFeedback((prev) => {
          const newFeedback = { ...prev }
          delete newFeedback[selectedTerm]
          return newFeedback
        })

        setIncorrectPair(null)
      }, 1000)

      setSelectedTerm(null)
    }
  }

  const handleReset = () => {
    setMatches({})
    setSelectedTerm(null)
    setIsComplete(false)
    setFeedback({})
    setIncorrectPair(null)
    setElapsedTime(0)
    setIsTimerRunning(true)
  }

  // Calculate score
  const correctCount = pairs.filter((pair) => feedback[pair.id] === "correct").length
  const totalCount = pairs.length

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-balance">{title}</h3>
        <div className="flex items-center gap-2 text-lg font-mono font-semibold text-brand-orange">
          <Clock className="h-5 w-5" />
          <span>{formatTime(elapsedTime)}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Click a term on the left, then click its matching definition on the right. Get immediate feedback!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Terms Column */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">Terms</h4>
          {pairs.map((pair) => {
            const isSelected = selectedTerm === pair.id
            const isMatched = !!matches[pair.id]
            const matchFeedback = feedback[pair.id]
            const isCorrect = matchFeedback === "correct"
            const isIncorrect = matchFeedback === "incorrect"

            return (
              <button
                key={pair.id}
                onClick={() => handleTermClick(pair.id)}
                disabled={isCorrect || isComplete}
                className={cn(
                  "w-full p-4 text-left rounded-lg border-2 transition-all min-h-[80px]",
                  "hover:border-primary hover:bg-primary/5",
                  isSelected && "border-primary bg-primary/10 ring-2 ring-primary/20",
                  isMatched && !matchFeedback && "border-muted-foreground/30 bg-muted/20",
                  isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/50 cursor-not-allowed",
                  isIncorrect && "border-red-500 bg-red-50 dark:bg-red-950/50",
                  isComplete && !isCorrect && "opacity-50",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{pair.term}</span>
                  {isCorrect && <Check className="h-5 w-5 text-green-600" />}
                  {isIncorrect && <X className="h-5 w-5 text-red-600" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Definitions Column */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">Definitions</h4>
          {shuffledDefinitions.map((def) => {
            const isMatchedTo = Object.entries(matches).find(([_, defId]) => defId === def.id)?.[0]
            const isMatched = !!isMatchedTo
            const isCorrectlyMatched = isMatchedTo && feedback[isMatchedTo] === "correct"
            const isIncorrectlyMatched = incorrectPair?.defId === def.id

            return (
              <button
                key={def.id}
                onClick={() => handleDefinitionClick(def.id)}
                disabled={!selectedTerm || isComplete || isCorrectlyMatched}
                className={cn(
                  "w-full p-4 text-left rounded-lg border-2 transition-all min-h-[80px]",
                  "hover:border-primary hover:bg-primary/5",
                  !selectedTerm && !isComplete && "opacity-50 cursor-not-allowed",
                  isMatched && !isCorrectlyMatched && !isIncorrectlyMatched && "border-muted-foreground/30 bg-muted/20",
                  isCorrectlyMatched && "border-green-500 bg-green-50 dark:bg-green-950/50 cursor-not-allowed opacity-100",
                  isIncorrectlyMatched && "border-red-500 bg-red-50 dark:bg-red-950/50",
                  isComplete && !isCorrectlyMatched && "opacity-50",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{def.text}</span>
                  {isCorrectlyMatched && <Check className="h-5 w-5 text-green-600" />}
                  {isIncorrectlyMatched && <X className="h-5 w-5 text-red-600" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {isComplete && (
        <div className="p-4 rounded-lg mb-4 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100">
          <p className="font-medium mb-2">🎉 Perfect! All matches are correct!</p>
          <p className="text-sm mb-2">Time taken: {formatTime(elapsedTime)}</p>
          <p className="text-sm">Great job matching all the pairs correctly!</p>
        </div>
      )}

      {!isComplete && correctCount > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Progress: {correctCount} of {totalCount} matched correctly
          </p>
        </div>
      )}

      {isComplete && (
        <div className="flex gap-3">
          <Button onClick={handleReset} variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      )}
    </Card>
  )
}
