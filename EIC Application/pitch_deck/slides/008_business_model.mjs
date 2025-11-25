// @typedef {import('mcp-react-slides').Slide} Slide

/** @type {Slide} */
export default {
  id: "business-model",
  title: "Business Model & Unit Economics",
  subtitle: "Dual revenue engine with SaaS margins",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Revenue mix (Year 3 estimate)"
    },
    {
      type: "bulletList",
      items: [
        "B2C Direct – 40%: €120–180 ARPU via self-serve SaaS tiers.",
        "B2B2C White-Label – 45%: €30–50 ARPU subsidized by banks, insurers, municipalities.",
        "B2B Enterprise – 15%: €600–1,200 per seat for call centers and care homes."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Unit economics at scale"
    },
    {
      type: "metric",
      label: "Gross Margin",
      value: "85%",
      sublabel: "Software-only model"
    },
    {
      type: "metric",
      label: "LTV",
      value: "€540",
      sublabel: "4+ year lifetime"
    },
    {
      type: "metric",
      label: "CAC",
      value: "€80",
      sublabel: "Blended across channels"
    },
    {
      type: "metric",
      label: "LTV:CAC",
      value: "6.8 : 1",
      sublabel: "Year 5 target"
    },
    {
      type: "text",
      text: "Break-even by Year 2–3 at 40–66K monthly active users with 10 month payback."
    }
  ]
};
