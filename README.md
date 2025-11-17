# senior-ai-mvp

A modern full-stack application with a React frontend and Cloudflare Pages backend.

## Project Structure

```
senior-ai-mvp/
├── apps/
│   ├── client/          # Vite + React + TypeScript + shadcn/ui
│   └── server/          # Cloudflare Pages + Hono
└── README.md
```

## Tech Stack

### Client (`apps/client`)
- **Framework**: Vite + React 18
- **Language**: TypeScript
- **UI Library**: shadcn/ui (with Tailwind CSS + Radix UI)
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite

### Server (`apps/server`)
- **Runtime**: Cloudflare Workers/Pages
- **Framework**: Hono (lightweight web framework)
- **Language**: TypeScript
- **Tooling**: Wrangler CLI

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
