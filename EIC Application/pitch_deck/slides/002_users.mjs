// @typedef {import('mcp-react-slides').Slide} Slide

/** @type {Slide} */
export default {
  id: "users-market",
  title: "Our Users & Market Opportunity",
  subtitle: "Creative, curious, and independent seniors",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Personas we design for"
    },
    {
      type: "bulletList",
      items: [
        "Maria, 78 – Creates family photo books, learns history, writes memoirs. Needs long-term context and safe exploration.",
        "Lars, 83 – Researches WWII ships, generates images, stays informed. Needs multi-day memory and tools that preserve independence.",
        "Ingrid, 72 – Digital artist with ADHD, collaborates with grandkids. Needs non-destructive branching and structured support."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Total Addressable Market"
    },
    {
      type: "bulletList",
      items: [
        "Primary: 70–85M seniors with low digital skills facing exclusion (€6.7–12.2B).",
        "Secondary: 23–31M users with cognitive challenges such as MCI or ADHD (€0.8–2.9B).",
        "Tertiary: 20–25M proactive users preparing to age-in-place (€1.0–2.2B)."
      ]
    },
    {
      type: "text",
      text: "Combined annual opportunity: €6–14B driven by the need for cognitive-accessible digital support."
    }
  ]
};
