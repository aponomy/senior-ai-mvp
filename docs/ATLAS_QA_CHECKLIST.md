# Atlas Visual QA Checklist

Open http://localhost:5173/ and verify each item:

## ✅ Overall Layout

- [ ] Three columns visible side-by-side
- [ ] Dark charcoal background (#22262B)
- [ ] Columns have glass morphism effect (slightly transparent, blurred)
- [ ] Spacing between columns looks balanced (~27px)
- [ ] Page width maxes out at ~2048px centered

## ✅ Top Header (106px height)

- [ ] Header background is lighter gray (#37383B)
- [ ] Title "Senior AI: Accessible Ecosystem Through Visual Cards" visible
- [ ] Icon buttons on the right (Share, Grid, More)
- [ ] Logo/emoji icon on the left (🎯)

## ✅ Left Column - Sources

### Header
- [ ] "SOURCES" label in uppercase, gray text
- [ ] Copy icon button on the right

### Content
- [ ] Green/cyan "Try Deep Research" banner with 🔍 emoji
- [ ] Search bar with "Search the web for new sources" placeholder
- [ ] Globe icon and keyboard shortcut visible in search bar
- [ ] "Select all sources" text link

### Source List
- [ ] 8 source items visible
- [ ] Each has a checkbox on the left (all checked)
- [ ] PDF icon (FileText) or Globe icon on right
- [ ] Source names are readable
- [ ] Dark background (#1A1D22) for each item
- [ ] Scrollable if needed

## ✅ Center Column - Chat

### Header
- [ ] "CHAT" label in uppercase
- [ ] Info icon (ℹ️) next to label
- [ ] Menu and more buttons on right

### Content
- [ ] Document title: "Senior AI: Accessible Ecosystem Through Visual Cards"
- [ ] "8 sources" subtitle below title
- [ ] Long assistant message visible (starts with "The sources comprise...")
- [ ] Action buttons below message (Copy, Reload, Thumbs Up/Down)
- [ ] Suggested prompt visible below

### Input Area
- [ ] Rounded pill-shaped input at bottom
- [ ] Mic icon on left
- [ ] "Start typing..." placeholder
- [ ] "8 sources" indicator in middle
- [ ] Send icon on right
- [ ] Border separates input from content

## ✅ Right Column - Studio

### Header
- [ ] "STUDIO" label in uppercase
- [ ] Grid icon and more button on right

### Tool Cards (2×2 grid)
- [ ] **Audio Over** card (top-left, bluish #393B45)
  - [ ] AudioLines icon in 32px circle
  - [ ] "Listen to this report" description
  - [ ] Glass effect with subtle gradient
  
- [ ] **Video Over** card (top-right, greenish #373D39)
  - [ ] Video icon in 32px circle
  - [ ] "Generate a video explainer" description
  - [ ] Emerald tint gradient
  
- [ ] **Mind Map** card (bottom-left, purple-ish #3D343C)
  - [ ] BrainCircuit icon in 32px circle
  - [ ] "Visualise key ideas" description
  - [ ] Fuchsia tint gradient
  
- [ ] **Reports** card (bottom-right, olive #3D3D31)
  - [ ] FileText icon in 32px circle
  - [ ] "Create a structured report" description
  - [ ] Amber tint gradient

- [ ] Cards are exactly same size (~218×90px)
- [ ] 12px gap horizontally
- [ ] 15px gap vertically
- [ ] Cards have rounded corners (16px)

### Divider
- [ ] Horizontal line with small icon buttons
- [ ] FileText, BrainCircuit, Copy icons visible

### Studio List
- [ ] 5 studio items visible
- [ ] Each has small icon on left (36×36px)
- [ ] Title and subtitle visible
- [ ] Copy and more buttons on right of each item
- [ ] Dark background (#25282C)
- [ ] 11px spacing between items
- [ ] Each item ~61px min height
- [ ] Scrollable

### Footer
- [ ] White pill button "Add note" with Plus icon
- [ ] Aligned to right side
- [ ] Stands out from dark background

## ✅ Interactions & Hover States

- [ ] Tool cards brighten on hover
- [ ] Tool card shadows intensify on hover
- [ ] List items lighten on hover
- [ ] Icon buttons show bg highlight on hover
- [ ] All buttons have pointer cursor
- [ ] Smooth transitions (150ms)

## ✅ Typography

- [ ] Text is crisp and readable
- [ ] Headers are uppercase with wide letter-spacing
- [ ] Body text is 13px
- [ ] Small text (timestamps) is 11px
- [ ] Font looks system/modern (SF Pro/Inter-like)

## ✅ Colors & Contrast

- [ ] Primary text is very light gray (#E6E6E6)
- [ ] Secondary text is medium gray (#B6B7B7)
- [ ] All text readable on dark backgrounds
- [ ] Borders are subtle but visible
- [ ] Overall feel is "elegant dark mode"

## ✅ Details

- [ ] Scrollbars work smoothly in left and right columns
- [ ] No layout shift or jank
- [ ] Glass blur effect visible (columns slightly transparent)
- [ ] Shadows create depth/elevation
- [ ] Spacing feels consistent throughout
- [ ] No console errors in browser DevTools

---

## 🎯 Overall Impression

Does it **feel like the screenshot**? 
- [ ] Yes, pixel-perfect match
- [ ] Close, minor differences only
- [ ] Needs adjustment

## Notes / Issues Found

```
[Write any issues or observations here]




```

---

**Tested by**: ________________  
**Date**: ________________  
**Browser**: ________________  
**Screen size**: ________________  
