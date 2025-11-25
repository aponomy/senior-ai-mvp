// @typedef {import('mcp-react-slides').Slide} Slide

/** @type {Slide} */
export default {
  id: "validation",
  title: "Validation & TRL Progression",
  subtitle: "Prototype proven with elderly users (TRL 5)",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Controlled trial vs. Alexa / Google"
    },
    {
      type: "metric",
      label: "Task Completion",
      value: "82–89%",
      sublabel: "≥2× improvement over baseline"
    },
    {
      type: "metric",
      label: "Cognitive Load",
      value: "3.2",
      sublabel: "50% reduction on NASA-TLX"
    },
    {
      type: "metric",
      label: "Critical Errors",
      value: "0.8–1.2",
      sublabel: "60–80% fewer per task"
    },
    {
      type: "metric",
      label: "Context Retention",
      value: "30+ turns",
      sublabel: "6–10× improvement"
    },
    {
      type: "heading",
      level: 2,
      text: "Path to TRL 8 (18 months with EIC grant)"
    },
    {
      type: "bulletList",
      items: [
        "M6 Alpha: 4 domains live, 50–100 users, BankID sandbox.",
        "M12 Production v1.0: 14 domains, 150–250 users, BankID production approval.",
        "M18 TRL 8: 10–15 pilots, 250–450 users, EN 301 549 certification."
      ]
    }
  ]
};
