// @typedef {import('mcp-react-slides').Slide} Slide
// A Slide is an object with: id, title, optional subtitle & notes, and blocks.

/**
 * COPILOT EDITING INSTRUCTIONS:
 * - Each slide file exports a single Slide object
 * - Slides are ordered by filename (use NNN_ prefix)
 * - To add a slide: create a new file like 001_topic.mjs
 * 
 * Slide structure:
 * {
 *   id: string,           // unique identifier
 *   title?: string,       // optional title
 *   subtitle?: string,    // optional subtitle
 *   notes?: string,       // optional presenter notes
 *   blocks: Block[]       // array of content blocks
 * }
 * 
 * Block types:
 * - { type: 'heading', level: 1|2|3, text: string }
 * - { type: 'text', text: string }
 * - { type: 'bulletList', items: string[] }
 * - { type: 'metric', label: string, value: string, sublabel?: string }
 * - { type: 'image', src: string, alt: string }
 */

/** @type {Slide} */
export default {
  id: "title-vision",
  title: "Senior AI",
  subtitle: "The Accessible Gateway to AI for 125M Elderly Europeans",
  blocks: [
    {
      type: "heading",
      level: 3,
      text: "Create • Learn • Explore • Execute"
    },
    {
      type: "text",
      text: "EU-Sovereign • Cognitive-Accessible • 14+ Domains"
    },
    {
      type: "heading",
      level: 2,
      text: "Why Now: The Mandate for Inclusion"
    },
    {
      type: "bulletList",
      items: [
        "🤖 AI Revolution: Thousands of tools are inaccessible to elderly users.",
        "🇪🇺 Accessibility Act June 2025: Compliance deadline mandates accessible services.",
        "📊 Digital Decade 2030: 80% digital skills target with a 40-50 point gap for seniors."
      ]
    },
    {
      type: "heading",
      level: 2,
      text: "Proven Results (TRL 5 Validation)"
    },
    {
      type: "metric",
      label: "Task Completion",
      value: "2×",
      sublabel: "vs. leading voice assistants"
    },
    {
      type: "metric",
      label: "Cognitive Load",
      value: "-50%",
      sublabel: "NASA-TLX improvement"
    },
    {
      type: "metric",
      label: "Critical Errors",
      value: "-80%",
      sublabel: "Validated with elderly users"
    },
    {
      type: "metric",
      label: "Context Retention",
      value: "30+ turns",
      sublabel: "vs. 3-5 turn baseline"
    }
  ]
};
