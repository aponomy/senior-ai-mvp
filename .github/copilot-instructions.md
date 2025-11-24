# GitHub Copilot Instructions

## Project Context

This is **senior-ai-mvp**, an AI assistant application specifically designed for elderly users. The application prioritizes accessibility, clarity, and ease of use over technical complexity.

## Key Design Principles

### 1. Elderly-Focused UX
- **Simplicity First**: All interactions should be intuitive and require minimal technical knowledge
- **Clear Visual Hierarchy**: Large, readable text with high contrast
- **Information Clarity Over Size**: A clear, well-organized overview is MORE important than maximum font sizes. Sometimes we need to prioritize information density and visual organization over making everything large. Users need to see the full picture to understand context.
- **Forgiving Interface**: Easy to undo actions, clear feedback on all interactions
- **Reduced Cognitive Load**: Avoid overwhelming users with too much information at once

### 2. Conversation Design
- **Progressive Summarization**: Older conversation content is gradually summarized into boxes
- **Context Preservation**: Users can always expand summaries to see original content
- **Visual Clarity**: Use boxes, spacing, and visual cues to organize information
- **No Endless Scrolling**: Implement intelligent summarization to prevent information overload

### 3. Object-Based Architecture
- This application uses an object-based dashboard instead of traditional page routing
- Objects (Timeline, Chat Window, Search, etc.) appear and position themselves dynamically
- Layout engine handles positioning based on configured rules

## Code Guidelines

### When Writing React Components
- Use TypeScript with explicit types
- Prefer functional components with hooks
- Include accessibility attributes (aria-labels, roles, etc.)
- Test with keyboard navigation in mind
- Consider larger click targets (minimum 44x44px)

### When Styling
- Use high contrast colors (WCAG AA minimum)
- Use readable font sizes (typically 14-15px for body text) - but prioritize clear overview over maximum size
- **Balance readability with information density**: Sometimes showing more context at a reasonable size is better than fewer items at maximum size
- Use CSS-in-JS or Tailwind with glass morphism effects
- Ensure touch targets are large enough for less precise interactions (minimum 44x44px)

### When Implementing AI Features
- Keep responses clear and concise
- Provide visual feedback for all AI processing
- Allow users to easily stop or restart conversations
- Never lose user context - always maintain conversation history

### When Adding Features
- Ask: "Would an 85-year-old understand this?"
- Ask: "Can the user see enough context to make sense of this?"
- Minimize the number of steps to complete any action
- Provide clear onboarding and help text
- Test with screen readers and accessibility tools
- **Balance**: Large touch targets for interaction, clear overview for understanding

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Cloudflare Workers/Pages + Hono
- **Styling**: Tailwind CSS with custom glass morphism
- **State**: React Context API

## Important Files
- `ARCHITECTURE.md` - Detailed architecture documentation
- `apps/client/src/context/DashboardContext.tsx` - State management
- `apps/client/src/lib/layoutEngine.ts` - Layout algorithm
- `apps/client/src/pages/Conversation.tsx` - Main conversation interface

## Remember
Every feature we build should make life easier for elderly users who may not be tech-savvy. Prioritize clarity, accessibility, and user confidence over technical sophistication.

## 🛑 CRITICAL INSTRUCTIONS WHEN WORKING IN THIS PROJECT

**STOP. READ THE ACTUAL WORDS. THINK.**

Before responding:
1. What are the EXACT words the user said?
2. What is the PRECISE scope? (one file? all files? one entity? all entities?)
3. Am I 100% certain, or should I ask?

**If ANY doubt → ASK first, act second.**

**Precision over speed. Clarity over assumptions.**
**Precision over speed. Clarity over assumptions.**
**Precision over speed. Clarity over assumptions.**
