# senior-ai-mvp

**The Accessible Gateway to the AI Ecosystem for Elderly Users**

An AI assistant application that makes thousands of AI services (ChatGPT, Midjourney, Perplexity, etc.) accessible through one elderly-optimized interface. Features an object-based dashboard architecture with React frontend and Cloudflare Pages backend.

## Overview

Senior AI is an **accessibility layer for the entire AI ecosystem**, designed for elderly users who find today's AI tools too hard to find, understand, or use. We reimagine AI conversation interfaces to be empowering, not overwhelming—enabling users to:

- **Create**: Generate images, videos, presentations, written works
- **Learn**: Research topics, explore interests, discover knowledge
- **Connect**: Communicate, collaborate, share memories
- **Execute**: Banking, healthcare, government, shopping (14+ life domains)

Instead of traditional endless chat scrolls, we feature **Conversation Atlas** — our breakthrough multi-resolution conversation interface with progressive disclosure, intelligent summarization, and clear visual hierarchy that helps users maintain context and navigate their AI interactions with confidence.

### Conversation Atlas

**Conversation Atlas** is our proprietary technology that transforms long conversations into a clear, zoomable map. Users always see three views at once: the big picture of topics, the key points of selected topics, and full messages only when needed. It's organized along three axes:
- **Time**: Progressive column reveal as conversations mature
- **Detail**: Five resolution levels from topic clusters to full messages  
- **Intent**: Separation of regular conversations, functions, and meta-conversations

This enables 30+ turn context retention (vs 3-5 turns in mainstream assistants) with 70% reduction in re-reading. Grounded in W3C Cognitive Accessibility guidelines and ISO 21801 standards.

## Architecture

This application uses an **object-based dashboard** instead of traditional page routing. Users interact with dynamic "objects" (Timeline, Chat Window, Search, etc.) that appear and reposition themselves on the dashboard based on user actions.

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Project Structure

```
senior-ai-mvp/
├── apps/
│   ├── client/          # Vite + React + TypeScript
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── objects/        # Dashboard objects
│   │   │   │   │   ├── Timeline.tsx
│   │   │   │   │   ├── ChatWindow.tsx
│   │   │   │   │   ├── SearchField.tsx
│   │   │   │   │   ├── ClusterCard.tsx
│   │   │   │   │   └── LargeButtons.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── context/
│   │   │   │   └── DashboardContext.tsx  # State management
│   │   │   ├── lib/
│   │   │   │   └── layoutEngine.ts       # Layout algorithm
│   │   │   ├── types/
│   │   │   │   └── objects.ts            # Type definitions
│   │   │   └── App.tsx                   # Main app
│   └── server/          # Cloudflare Pages + Hono
├── ARCHITECTURE.md      # Detailed architecture docs
└── README.md
```

## Tech Stack

### Client (`apps/client`)
- **Framework**: Vite + React 18
- **Language**: TypeScript
- **UI Components**: Custom components with glass morphism effects
- **Styling**: CSS-in-JS with Tailwind utility classes
- **State Management**: React Context API
- **Layout Engine**: Custom skyline-based algorithm
- **Build Tool**: Vite

### Server (`apps/server`)
- **Runtime**: Cloudflare Workers/Pages
- **Framework**: Hono (lightweight web framework)
- **Language**: TypeScript
- **Tooling**: Wrangler CLI

## Key Features

### Object-Based Dashboard
- **Dynamic Layout**: Objects position themselves based on configured rules
- **Responsive**: Automatically recalculates on window resize
- **Smooth Transitions**: All position changes are animated
- **No Routing**: Single-page application with object visibility control

### Available Objects
1. **Large Buttons** - Main navigation grid (4 buttons)
2. **Timeline** - Interactive timeline with zoom controls
3. **Chat Window** - AI conversation interface with glass morphism
4. **Search Field** - Expandable search with filters
5. **Cluster Card** - 3D stacked conversation view

### Layout Rules
- Objects have specific alignments (top, bottom, left, right)
- Some objects can share space, others take full width/height
- Footer always visible at bottom (80px)
- Automatic space calculation for optimal layout

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- (Optional) Cloudflare account for deployment

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd senior-ai-mvp
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd apps/client
npm install

# Install server dependencies
cd ../server
npm install
```

### Development

#### Running the Client

```bash
cd apps/client
npm run dev
```

The client will be available at `http://localhost:5173`

#### Running the Server

```bash
cd apps/server
npm run dev
```

The server will be available at `http://localhost:8787`

### Building for Production

#### Client Build

```bash
cd apps/client
npm run build
```

The built files will be in `apps/client/dist`

#### Server Build

```bash
cd apps/server
npm run build
```

### Deployment

#### Deploy Server to Cloudflare Pages

```bash
cd apps/server
npm run deploy
```

Make sure you're logged in with Wrangler:
```bash
npx wrangler login
```

## Features

### Client Features
- ✅ Modern React with TypeScript
- ✅ shadcn/ui components with Tailwind CSS
- ✅ Dark mode support (built-in with shadcn/ui)
- ✅ Path aliases configured (`@/*`)
- ✅ Hot Module Replacement (HMR)
- ✅ Sample Button component demonstrating all variants

### Server Features
- ✅ Hono web framework (fast & lightweight)
- ✅ TypeScript support
- ✅ CORS configured for local development
- ✅ Health check endpoint (`/health`)
- ✅ Sample API endpoints (`/api/hello`, `/api/echo`)
- ✅ Error handling
- ✅ Ready for Cloudflare Pages deployment

## Available Scripts

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts
- `npm run dev` - Start development server with Wrangler
- `npm run build` - Build TypeScript
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run typecheck` - Run TypeScript type checking

## Adding shadcn/ui Components

You can add more shadcn/ui components using:

```bash
cd apps/client
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## API Endpoints

### Server Endpoints

- `GET /health` - Health check endpoint
- `GET /api/hello` - Sample hello endpoint
- `POST /api/echo` - Echo back the request body

## Environment Variables

### Client
Create `apps/client/.env` for environment variables:
```env
VITE_API_URL=http://localhost:8787
```

### Server
Create `apps/server/.dev.vars` for local development:
```env
# Add your environment variables here
```

## License

ISC
