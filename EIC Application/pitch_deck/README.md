# senior_ai_pitchdeck



## Structure

This is a data-only slide deck folder. All the React/Node.js infrastructure lives in the MCP package.

```
pitch_deck/
├── deck.meta.json    # Presentation metadata
└── slides/           # Slide files (ordered by name)
    ├── 000_intro.mjs
    └── 001_features.mjs
```

## Adding Slides

Create new `.mjs` files in the `slides/` folder:

```javascript
// slides/002_problem.mjs
export default {
  id: "problem",
  title: "The Problem",
  blocks: [
    {
      type: "bulletList",
      items: [
        "Pain point 1",
        "Pain point 2",
        "Pain point 3"
      ]
    }
  ]
};
```

**Naming convention:** Use `NNN_slug.mjs` format (e.g., `002_problem.mjs`) to control slide order.

## Block Types

### Heading
```javascript
{ type: 'heading', level: 2, text: 'Section Title' }
```

### Text
```javascript
{ type: 'text', text: 'Your paragraph here...' }
```

### Bullet List
```javascript
{
  type: 'bulletList',
  items: ['Item 1', 'Item 2', 'Item 3']
}
```

### Metric
```javascript
{
  type: 'metric',
  label: 'Revenue',
  value: '$1M',
  sublabel: 'ARR'  // optional
}
```

### Image
```javascript
{
  type: 'image',
  src: '/path/to/image.png',
  alt: 'Description'
}
```

## Viewing

Ask Copilot to serve the presentation:
```
"Serve the presentation"
```

Or use the MCP tool directly.

## Exporting

Ask Copilot to export as PDF:
```
"Export this deck as PDF"
```

The presenter and PDF export infrastructure are provided by the MCP package.

## Editing with Copilot

Copilot understands the slide format. Just ask:
- "Add a slide about pricing"
- "Add metrics showing 200% growth"
- "Create a slide with our team members"
