/**
 * COURSE STRUCTURE
 * Centralized definition of all modules and sections
 * Single source of truth for course content
 */

export interface Section {
  id: string
  title: string
  completed: boolean
}

export interface Module {
  id: string
  title: string
  sections: Section[]
}

export interface CourseStructure {
  modules: Module[]
}

export const courseStructure: CourseStructure = {
  modules: [
    {
      id: "module-0",
      title: "Module 0: Introduction",
      sections: [
        { id: "about-swiftcourse", title: "About Swiftcourse", completed: false },
        { id: "the-problem", title: "The Problem", completed: false },
        { id: "our-solution", title: "Our Solution", completed: false },
        { id: "the-product", title: "The Product", completed: false },
        { id: "strategic-model", title: "Strategic Model", completed: false },
        { id: "big-five-factors", title: "Big Five Factors", completed: false },
        { id: "action-plan", title: "Action Plan", completed: false },
        { id: "summary", title: "Summary", completed: false },
      ],
    },
    {
      id: "module-1",
      title: "Module 1: Neurobiology & Growth Mindset",
      sections: [
        { id: "never-split-difference", title: "Never Split the Difference", completed: false },
        { id: "neurology-goal-seeking", title: "Neurology of Goal Seeking", completed: false },
        { id: "mad-analysis", title: "MAD Analysis", completed: false },
        { id: "growth-mindset", title: "Growth Mindset", completed: false },
        { id: "mindset-discoveries", title: "Mindset Discoveries", completed: false },
        { id: "elevated-stress", title: "Elevated Stress Levels", completed: false },
        { id: "stress-achievement", title: "Does Stress Limit Achievement", completed: false },
        { id: "goals-improvement", title: "Goals and Improvement", completed: false },
        { id: "interactive-quiz", title: "Interactive Quiz", completed: false },
      ],
    },
    {
      id: "module-2",
      title: "Module 2: Learning, Habits & Measurement",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "process-of-learning", title: "The Process of Learning", completed: false },
        { id: "limbic-friction", title: "Limbic Friction", completed: false },
        { id: "making-mistakes", title: "Making Mistakes", completed: false },
        { id: "learning-styles", title: "Learning Styles", completed: false },
        { id: "absorptive-capacity", title: "Building Absorptive Capacity", completed: false },
        { id: "perfectionism-spiral", title: "Perfectionism Spiral", completed: false },
        { id: "self-judgment", title: "Self-Judgment", completed: false },
        { id: "harmonious-passion", title: "Harmonious Passion", completed: false },
        { id: "task-bracketing", title: "Task Bracketing", completed: false },
        { id: "21-day-protocol", title: "21-Day Habit Protocol", completed: false },
        { id: "context-independent", title: "Context-Independent Habits", completed: false },
        { id: "key-takeaways", title: "Key Takeaways", completed: false },
        { id: "module-assessment", title: "Module Assessment", completed: false },
      ],
    },
    {
      id: "module-3",
      title: "Module 3: Win With NO",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "camp-system", title: "Jim Camp's System", completed: false },
        { id: "voss-system-1", title: "Chris Voss System - Part 1", completed: false },
        { id: "voss-system-2", title: "Chris Voss System - Part 2", completed: false },
        { id: "module-assessment", title: "Module Assessment", completed: false },
      ],
    },
    {
      id: "module-4",
      title: "Module 4: Integrating Big 10 with Camp & Voss",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "big-10-aspects", title: "Understanding Big 10 Aspects", completed: false },
        { id: "counterweight-system", title: "The Counterweight System", completed: false },
        { id: "extraversion", title: "Extraversion: Assertiveness & Enthusiasm", completed: false },
        { id: "agreeableness", title: "Agreeableness: Compassion & Politeness", completed: false },
        { id: "conscientiousness", title: "Conscientiousness: Industriousness & Orderliness", completed: false },
        { id: "openness", title: "Openness: Intellect and Openness to Experience", completed: false },
        { id: "neuroticism", title: "Neuroticism: Volatility and Withdrawal", completed: false },
        { id: "daily-practice", title: "Field Drills & Daily Practice", completed: false },
        { id: "module-assessment", title: "Module Assessment", completed: false },
      ],
    },
    {
      id: "module-5",
      title: "Module 5: Change Agency",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "why-change-hard", title: "Why Behavioral Change Is Hard", completed: false },
        { id: "hidden-potential", title: "Adam Grant's Hidden Potential", completed: false },
        { id: "immunity-to-change", title: "Kegan & Lahey: Immunity to Change", completed: false },
        { id: "change-framework", title: "The Change Agency Framework", completed: false },
        { id: "implementation", title: "Implementation Strategy", completed: false },
        { id: "measuring-success", title: "Measuring Behavioral Change", completed: false },
        { id: "common-pitfalls", title: "Common Implementation Pitfalls", completed: false },
        { id: "module-assessment", title: "Module Assessment", completed: false },
      ],
    },
    {
      id: "module-6",
      title: "Module 6: Measurement and Accountability",
      sections: [
        { id: "module-overview", title: "Module Overview", completed: false },
        { id: "d1-personality", title: "D1: Personality Work", completed: false },
        { id: "d2-mindset", title: "D2: Mindset Shifts", completed: false },
        { id: "d3-change-agency", title: "D3: Change Agency", completed: false },
        { id: "d4-sales-activity", title: "D4: Sales Activity", completed: false },
        { id: "composite-score", title: "The SwiftCourse Transformation Index", completed: false },
        { id: "module-summary", title: "Module Summary", completed: false },
        { id: "daily-call-sheet", title: "Daily Call Sheet", completed: false },
      ],
    },
  ],
}
