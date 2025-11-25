// @typedef {import('mcp-react-slides').Slide} Slide

/** @type {Slide} */
export default {
  id: "roadmap",
  title: "18-Month Roadmap",
  subtitle: "From TRL 5 prototype to TRL 8 production",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Phase 1 – Alpha (M1–M6)"
    },
    {
      type: "bulletList",
      items: [
        "4 core domains live: Healthcare, Banking, Transport, Government.",
        "50–100 test users in Sweden; BankID sandbox integrations.",
        "Milestone M3: first e-prescription workflow, M6: alpha launch."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Phase 2 – Beta (M7–M12)"
    },
    {
      type: "bulletList",
      items: [
        "Add Shopping, Food, Energy, Tax for 8 domains total.",
        "150–250 users in pilots across Scandinavia.",
        "Milestone M9: EN 301 549 audit, M12: Production v1.0 + BankID approval."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Phase 3 – Production (M13–M18)"
    },
    {
      type: "bulletList",
      items: [
        "All 14+ domains live including Legal, Insurance, Communication, Travel, Home services.",
        "250–450 users via pilots in Scandinavia and DACH.",
        "Milestones: M15 ISO 27001, M18 TRL 8 qualification & Series A readiness."
      ]
    },
    {
      type: "text",
      text: "Risk budget: €800K (12%) reserved for AI Act compliance, integration delays, and user adoption experiments."
    }
  ]
};
