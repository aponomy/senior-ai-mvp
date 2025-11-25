// @typedef {import('mcp-react-slides').Slide} Slide

/** @type {Slide} */
export default {
  id: "competition",
  title: "Competitive Positioning",
  subtitle: "Owning the complex tasks + elderly design quadrant",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "2×2 market landscape"
    },
    {
      type: "bulletList",
      items: [
        "Simple tasks + generic design: Alexa, Google Assistant.",
        "Simple tasks + elderly design: ElliQ, senior tablets.",
        "Complex tasks + generic design: ChatGPT, Claude, AI suites.",
        "Complex tasks + elderly design: Senior AI (only player)."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Why competitors can't follow quickly"
    },
    {
      type: "bulletList",
      items: [
        "Proprietary Conversation Atlas + DAG architecture (18–24 months R&D).",
        "Regulatory moat: GDPR-first, EN 301 549 readiness, BankID / eIDAS integration.",
        "Population-specific safety tuning delivering 60–80% fewer critical errors.",
        "Network effects: More domains = richer, shareable memory across services."
      ]
    }
  ]
};
