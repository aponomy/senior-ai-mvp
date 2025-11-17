# Senior AI MVP - Client

A clean React + TypeScript application with a futuristic glass UI featuring animated cloud backgrounds.

## Project Structure

```
src/
├── App.tsx                          # Main app entry
├── main.tsx                         # Vite entry point
├── index.css                        # Global styles
├── components/
│   ├── Dashboard.tsx                # Main dashboard component
│   └── cards/
│       ├── DynamicCard.tsx          # Customizable card/button component
│       └── DynamicCard.css          # Card styles
├── styles/
│   └── glass.css                    # Glass morphism styles
└── lib/
    └── utils.ts                     # Utility functions
```

## Components

### Dashboard
The main view component with gradient background and centered content.

### DynamicCard
A highly customizable card/button component featuring:
- WebGL shader-based cloud animations
- Glass morphism effect with backdrop blur
- Material Design ripple effect
- Flexible content slots (header, icon, image, label, body, footer)
- Customizable borders, colors, opacity, and lighting

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **WebGL** - Shader-based cloud animations
- **Tailwind CSS** - Utility-first CSS

## Usage Example

```tsx
<DynamicCard
  size="xl"
  accent="#4a9eff"
  lightIntensity={0.4}
  showClouds={true}
  rippleEnabled={true}
  label="Launch"
  onClick={() => console.log('Clicked!')}
/>
```

## Key Features

- 🌊 Living cloud animations with WebGL shaders
- 💎 Glass morphism with backdrop blur
- 💧 Material Design ripple effects
- �� Fully customizable styling
- ⚡ 60fps performance
- ♿ Accessible & respects reduced motion
